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

import DsDrawer from '@/components/DsDrawer.vue'

function mountHarness(options: { closeOnBackdrop: boolean }) {
  const Harness = defineComponent({
    name: 'Harness',
    components: { DsDrawer },
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
    template:
      '<DsDrawer v-model="open" title="Title" :close-on-backdrop="closeOnBackdrop"><div>Body</div></DsDrawer>',
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

describe('DsDrawer (unit)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('рендерит оверлей и помечает его aria-hidden', () => {
    const wrapper = mountHarness({ closeOnBackdrop: true })

    const overlay = wrapper.find('[data-ds-drawer-overlay]')
    const panel = wrapper.find('[data-ds-drawer-panel]')

    expect(overlay.exists()).toBe(true)
    expect(panel.exists()).toBe(true)

    expect(overlay.attributes('aria-hidden')).toBe('true')
    expect(panel.attributes('class')).toContain('fixed')

    wrapper.unmount()
  })

  it('закрывается по ESC (keydown.esc)', async () => {
    const wrapper = mountHarness({ closeOnBackdrop: true })

    expect(wrapper.find('[data-ds-drawer-panel]').exists()).toBe(true)

    await wrapper.find('[data-testid="hu-dialog"]').trigger('keydown', { key: 'Escape' })
    await nextTick()

    expect(wrapper.find('[data-ds-drawer-panel]').exists()).toBe(false)

    wrapper.unmount()
  })

  it('закрывается по @close, если closeOnBackdrop=true', async () => {
    const wrapper = mountHarness({ closeOnBackdrop: true })

    wrapper.findComponent({ name: 'Dialog' }).vm.$emit('close')
    await nextTick()

    expect(wrapper.find('[data-ds-drawer-panel]').exists()).toBe(false)

    wrapper.unmount()
  })

  it('не закрывается по @close, если closeOnBackdrop=false', async () => {
    const wrapper = mountHarness({ closeOnBackdrop: false })

    wrapper.findComponent({ name: 'Dialog' }).vm.$emit('close')
    await nextTick()

    expect(wrapper.find('[data-ds-drawer-panel]').exists()).toBe(true)

    wrapper.unmount()
  })
})
