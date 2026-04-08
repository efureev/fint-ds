import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('@headlessui/vue', async () => {
  const { defineComponent } = await import('vue')

  return {
    Dialog: defineComponent({
      name: 'Dialog',
      emits: ['close'],
      template: '<div data-testid="hu-dialog"><slot /></div>',
    }),
    DialogPanel: defineComponent({
      name: 'DialogPanel',
      template: '<div data-testid="hu-panel"><slot /></div>',
    }),
    TransitionRoot: defineComponent({
      name: 'TransitionRoot',
      props: { show: { type: Boolean, default: false } },
      template: '<div v-if="show"><slot /></div>',
    }),
    TransitionChild: defineComponent({
      name: 'TransitionChild',
      template: '<div><slot /></div>',
    }),
  }
})

import DsImageViewer from '@/components/DsImageViewer.vue'

function mountHarness(options?: { closeOnPressEscape?: boolean; hideOnClickModal?: boolean }) {
  const Harness = defineComponent({
    name: 'Harness',
    components: { DsImageViewer },
    props: {
      closeOnPressEscape: {
        type: Boolean,
        default: true,
      },
      hideOnClickModal: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const open = ref(true)
      return { open }
    },
    template: `
      <DsImageViewer
        v-model="open"
        :url-list="['/one.png', '/two.png']"
        :close-on-press-escape="closeOnPressEscape"
        :hide-on-click-modal="hideOnClickModal"
      />
    `,
  })

  return mount(Harness, {
    props: {
      closeOnPressEscape: options?.closeOnPressEscape,
      hideOnClickModal: options?.hideOnClickModal,
    },
    global: {
      stubs: {
        teleport: true,
      },
    },
  })
}

describe('DsImageViewer (unit)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('рендерится при modelValue=true', () => {
    const wrapper = mount(DsImageViewer, {
      props: {
        modelValue: true,
        urlList: ['/one.png'],
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    expect(wrapper.find('[data-ds-image-viewer-panel]').exists()).toBe(true)
    expect(wrapper.find('[data-ds-image-viewer-image]').attributes('src')).toBe('/one.png')
    expect(wrapper.find('[data-testid="hu-dialog"]').attributes('style')).toContain('z-index: 2000;')

    wrapper.unmount()
  })

  it('закрывается по Esc при closeOnPressEscape=true', async () => {
    const wrapper = mountHarness({ closeOnPressEscape: true })

    expect(wrapper.find('[data-ds-image-viewer-panel]').exists()).toBe(true)

    await wrapper.find('[data-testid="hu-dialog"]').trigger('keydown', { key: 'Escape' })
    await nextTick()

    expect(wrapper.find('[data-ds-image-viewer-panel]').exists()).toBe(false)

    wrapper.unmount()
  })

  it('не закрывается по Esc при closeOnPressEscape=false', async () => {
    const wrapper = mountHarness({ closeOnPressEscape: false })

    await wrapper.find('[data-testid="hu-dialog"]').trigger('keydown', { key: 'Escape' })
    await nextTick()

    expect(wrapper.find('[data-ds-image-viewer-panel]').exists()).toBe(true)

    wrapper.unmount()
  })

  it('закрывается по клику в backdrop только при hideOnClickModal=true', async () => {
    const closesOnBackdrop = mountHarness({ hideOnClickModal: true })

    await closesOnBackdrop.find('[data-ds-image-viewer-overlay]').trigger('click')
    await nextTick()

    expect(closesOnBackdrop.find('[data-ds-image-viewer-panel]').exists()).toBe(false)
    closesOnBackdrop.unmount()

    const staysOpenOnBackdrop = mountHarness({ hideOnClickModal: false })

    await staysOpenOnBackdrop.find('[data-ds-image-viewer-overlay]').trigger('click')
    await nextTick()

    expect(staysOpenOnBackdrop.find('[data-ds-image-viewer-panel]').exists()).toBe(true)
    staysOpenOnBackdrop.unmount()
  })

  it('закрывается по клику на кнопку close', async () => {
    const wrapper = mountHarness()

    await wrapper.find('[data-ds-image-viewer-close]').trigger('click')
    await nextTick()

    expect(wrapper.find('[data-ds-image-viewer-panel]').exists()).toBe(false)

    wrapper.unmount()
  })

  it('эмитит switch при переходе prev/next', async () => {
    const wrapper = mount(DsImageViewer, {
      props: {
        modelValue: true,
        urlList: ['/one.png', '/two.png', '/three.png'],
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    await wrapper.find('[data-ds-image-viewer-next]').trigger('click')
    await wrapper.find('[data-ds-image-viewer-prev]').trigger('click')

    expect(wrapper.emitted('switch')).toEqual([[1], [0]])

    wrapper.unmount()
  })

  it('сбрасывает transform при смене слайда', async () => {
    const wrapper = mount(DsImageViewer, {
      props: {
        modelValue: true,
        urlList: ['/one.png', '/two.png'],
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    await wrapper.find('[data-ds-image-viewer-zoom-in]').trigger('click')
    await wrapper.find('[data-ds-image-viewer-rotate-right]').trigger('click')

    const transformedImage = wrapper.find('[data-ds-image-viewer-image]')
    expect(transformedImage.attributes('style')).toContain('scale(1.2)')
    expect(transformedImage.attributes('style')).toContain('rotate(90deg)')

    await wrapper.find('[data-ds-image-viewer-next]').trigger('click')
    await nextTick()

    const resetImage = wrapper.find('[data-ds-image-viewer-image]')
    expect(resetImage.attributes('style')).toContain('scale(1)')
    expect(resetImage.attributes('style')).toContain('rotate(0deg)')

    wrapper.unmount()
  })

  it('показывает прогресс 1 / N при showProgress=true', () => {
    const wrapper = mount(DsImageViewer, {
      props: {
        modelValue: true,
        urlList: ['/one.png', '/two.png', '/three.png'],
        showProgress: true,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    expect(wrapper.find('[data-ds-image-viewer-progress]').text()).toBe('1 / 3')

    wrapper.unmount()
  })

  it('показывает текущее значение zoom рядом с прогрессом и обновляет его', async () => {
    const wrapper = mount(DsImageViewer, {
      props: {
        modelValue: true,
        urlList: ['/one.png', '/two.png'],
        showProgress: true,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    const progress = wrapper.find('[data-ds-image-viewer-progress]')
    const zoomValue = wrapper.find('[data-ds-image-viewer-zoom-value]')

    expect(progress.exists()).toBe(true)
    expect(zoomValue.exists()).toBe(true)
    expect(progress.element.parentElement).toBe(zoomValue.element.parentElement)
    expect(wrapper.find('[data-ds-image-viewer-zoom-value]').text()).toBe('100%')

    await wrapper.find('[data-ds-image-viewer-zoom-in]').trigger('click')
    expect(wrapper.find('[data-ds-image-viewer-zoom-value]').text()).toBe('120%')

    await wrapper.find('[data-ds-image-viewer-zoom-out]').trigger('click')
    expect(wrapper.find('[data-ds-image-viewer-zoom-value]').text()).toBe('100%')

    wrapper.unmount()
  })

  it('скрывает текущее значение zoom при showZoomValue=false', () => {
    const wrapper = mount(DsImageViewer, {
      props: {
        modelValue: true,
        urlList: ['/one.png'],
        showZoomValue: false,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    expect(wrapper.find('[data-ds-image-viewer-zoom-value]').exists()).toBe(false)

    wrapper.unmount()
  })

  it('встраивает slot toolbar-actions в дефолтный toolbar и предоставляет actions', async () => {
    const wrapper = mount(DsImageViewer, {
      props: {
        modelValue: true,
        urlList: ['/one.png', '/two.png'],
      },
      slots: {
        'toolbar-actions': ({ displayIndex, total, actions }) => h(
          'button',
          {
            type: 'button',
            'data-ds-image-viewer-custom-action': '',
            onClick: actions.zoomIn,
          },
          `custom ${displayIndex} / ${total}`,
        ),
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    expect(wrapper.find('[data-ds-image-viewer-custom-action]').text()).toBe('custom 1 / 2')
    expect(wrapper.find('[data-ds-image-viewer-rotate-left]').exists()).toBe(true)

    await wrapper.find('[data-ds-image-viewer-custom-action]').trigger('click')
    expect(wrapper.find('[data-ds-image-viewer-zoom-value]').text()).toBe('120%')

    await wrapper.find('[data-ds-image-viewer-next]').trigger('click')
    expect(wrapper.find('[data-ds-image-viewer-custom-action]').text()).toBe('custom 2 / 2')

    wrapper.unmount()
  })

  it('сохраняет полный override toolbar через slot toolbar', () => {
    const wrapper = mount(DsImageViewer, {
      props: {
        modelValue: true,
        urlList: ['/one.png', '/two.png'],
      },
      slots: {
        toolbar: '<div data-ds-image-viewer-toolbar-override>override</div>',
        'toolbar-actions': '<button data-ds-image-viewer-custom-action />',
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    expect(wrapper.find('[data-ds-image-viewer-toolbar-override]').exists()).toBe(true)
    expect(wrapper.find('[data-ds-image-viewer-zoom-in]').exists()).toBe(false)
    expect(wrapper.find('[data-ds-image-viewer-custom-action]').exists()).toBe(false)

    wrapper.unmount()
  })
})