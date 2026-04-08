import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
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
    DialogTitle: defineComponent({
      name: 'DialogTitle',
      template: '<div data-testid="hu-title"><slot /></div>',
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

import DsModal from '@/components/DsModal.vue'

function mountHarness(options: { closeOnBackdrop: boolean }) {
  const Harness = defineComponent({
    name: 'Harness',
    components: { DsModal },
    props: {
      closeOnBackdrop: {
        type: Boolean,
        required: true,
      },
    },
    setup() {
      const open = ref(true)
      return { open }
    },
    template: `
      <DsModal
        v-model="open"
        :close-on-backdrop="closeOnBackdrop"
      >
        <div data-testid="modal-body">Body</div>
      </DsModal>
    `,
  })

  return mount(Harness, {
    props: {
      closeOnBackdrop: options.closeOnBackdrop,
    },
    global: {
      stubs: {
        teleport: true,
      },
    },
  })
}

describe('DsModal (unit)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('рендерит оверлей ниже панели (z-index) и помечает оверлей aria-hidden', () => {
    const wrapper = mountHarness({ closeOnBackdrop: true })

    const overlay = wrapper.find('[data-ds-modal-overlay]')
    const panel = wrapper.find('[data-ds-modal-panel]')

    expect(overlay.exists()).toBe(true)
    expect(panel.exists()).toBe(true)

    expect(overlay.attributes('class')).toContain('z-0')
    expect(overlay.attributes('aria-hidden')).toBe('true')

    expect(panel.attributes('class')).toContain('relative')
    expect(panel.attributes('class')).toContain('z-10')

    wrapper.unmount()
  })

  it('закрывается по ESC (keydown.esc)', async () => {
    const wrapper = mountHarness({ closeOnBackdrop: true })

    expect(wrapper.find('[data-ds-modal-panel]').exists()).toBe(true)

    await wrapper.find('[data-testid="hu-dialog"]').trigger('keydown', { key: 'Escape' })
    await nextTick()

    expect(wrapper.find('[data-ds-modal-panel]').exists()).toBe(false)

    wrapper.unmount()
  })

  it('закрывается по @close, если closeOnBackdrop=true', async () => {
    const wrapper = mountHarness({ closeOnBackdrop: true })

    wrapper.findComponent({ name: 'Dialog' }).vm.$emit('close')
    await nextTick()

    expect(wrapper.find('[data-ds-modal-panel]').exists()).toBe(false)

    wrapper.unmount()
  })

  it('не закрывается по @close, если closeOnBackdrop=false', async () => {
    const wrapper = mountHarness({ closeOnBackdrop: false })

    wrapper.findComponent({ name: 'Dialog' }).vm.$emit('close')
    await nextTick()

    expect(wrapper.find('[data-ds-modal-panel]').exists()).toBe(true)

    wrapper.unmount()
  })

  it('рендерит только базовый контейнер без header/footer и кнопки закрытия', () => {
    const wrapper = mountHarness({ closeOnBackdrop: true })

    expect(wrapper.find('[data-ds-dialog-header]').exists()).toBe(false)
    expect(wrapper.find('[data-ds-dialog-footer]').exists()).toBe(false)
    expect(wrapper.find('button[aria-label="Close"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="hu-title"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="modal-body"]').exists()).toBe(true)

    wrapper.unmount()
  })

  it('рендерит контент напрямую внутри панели', () => {
    const wrapper = mountHarness({ closeOnBackdrop: true })

    expect(wrapper.find('[data-ds-modal-panel] [data-testid="modal-body"]').exists()).toBe(true)

    wrapper.unmount()
  })
})
