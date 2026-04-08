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

import DsConfirmDialog from '@/components/DsConfirmDialog.vue'
import DsDialog from '@/components/DsDialog.vue'
import DsPromptDialog from '@/components/DsPromptDialog.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('DsConfirmDialog', () => {
  it('эмитит confirm и закрывается', async () => {
    const Harness = defineComponent({
      name: 'HarnessConfirm',
      components: { DsConfirmDialog },
      setup() {
        const open = ref(true)
        const onConfirm = vi.fn()
        return { open, onConfirm }
      },
      template:
        '<DsConfirmDialog v-model="open" title="T" confirm-text="OK" cancel-text="Cancel" @confirm="onConfirm" />',
    })

    const wrapper = mount(Harness, {
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    await wrapper.find('[data-testid="ds-confirm-confirm"]').trigger('click')
    await nextTick()

    expect((wrapper.vm as any).onConfirm).toHaveBeenCalledTimes(1)
    expect((wrapper.vm as any).open).toBe(false)

    wrapper.unmount()
  })

  it('пробрасывает headerConfig и footerConfig в базовый DsDialog', () => {
    const wrapper = mount(
      defineComponent({
        name: 'HarnessConfirmSectionConfig',
        components: { DsConfirmDialog },
        setup() {
          const open = ref(true)
          return { open }
        },
        template: `
          <DsConfirmDialog
            v-model="open"
            title="T"
            :header-config="{ paddingX: 'px-2', paddingY: 'py-2', bordered: false }"
            :footer-config="{ paddingX: 'px-1', paddingY: 'py-2', bordered: false }"
          />
        `,
      }),
      {
        global: {
          stubs: {
            teleport: true,
          },
        },
      },
    )

    expect(wrapper.find('[data-ds-dialog-header]').classes()).toContain('px-2')
    expect(wrapper.find('[data-ds-dialog-header]').classes()).toContain('py-2')
    expect(wrapper.find('[data-ds-dialog-header]').classes()).not.toContain('border-b')

    expect(wrapper.find('[data-ds-dialog-footer]').classes()).toContain('px-1')
    expect(wrapper.find('[data-ds-dialog-footer]').classes()).toContain('py-2')
    expect(wrapper.find('[data-ds-dialog-footer]').classes()).not.toContain('border-t')

    wrapper.unmount()
  })

  it('пробрасывает buttonSize в action-кнопки', () => {
    const wrapper = mount(
      defineComponent({
        name: 'HarnessConfirmButtonSize',
        components: { DsConfirmDialog },
        setup() {
          const open = ref(true)
          return { open }
        },
        template: '<DsConfirmDialog v-model="open" title="T" button-size="sm" />',
      }),
      {
        global: {
          stubs: {
            teleport: true,
          },
        },
      },
    )

    expect(wrapper.find('[data-testid="ds-confirm-cancel"]').classes()).toContain('h-8')
    expect(wrapper.find('[data-testid="ds-confirm-cancel"]').classes()).toContain('px-3')
    expect(wrapper.find('[data-testid="ds-confirm-confirm"]').classes()).toContain('h-8')
    expect(wrapper.find('[data-testid="ds-confirm-confirm"]').classes()).toContain('px-3')

    wrapper.unmount()
  })
})

describe('DsDialog', () => {
  it('рендерит дефолтный header, footer-slot и закрывается по кнопке', async () => {
    const Harness = defineComponent({
      name: 'HarnessDialogDefault',
      components: { DsDialog },
      setup() {
        const open = ref(true)
        return { open }
      },
      template: `
        <DsDialog v-model="open" title="Dialog title">
          <div data-testid="dialog-body">Body</div>

          <template #footer>
            <div data-testid="dialog-footer">Footer</div>
          </template>
        </DsDialog>
      `,
    })

    const wrapper = mount(Harness, {
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    expect(wrapper.find('[data-ds-dialog-header]').exists()).toBe(true)
    expect(wrapper.find('[data-ds-dialog-header]').classes()).toContain('px-5')
    expect(wrapper.find('[data-ds-dialog-header]').classes()).toContain('py-3')
    expect(wrapper.find('[data-ds-dialog-header]').classes()).toContain('border-b')
    expect(wrapper.find('[data-testid="hu-title"]').text()).toContain('Dialog title')
    expect(wrapper.find('[data-testid="dialog-footer"]').exists()).toBe(true)
    expect(wrapper.find('[data-ds-dialog-footer]').classes()).toContain('px-5')
    expect(wrapper.find('[data-ds-dialog-footer]').classes()).toContain('py-4')
    expect(wrapper.find('[data-ds-dialog-footer]').classes()).toContain('border-t')
    expect(wrapper.find('button[aria-label="Close"]').exists()).toBe(true)

    await wrapper.find('button[aria-label="Close"]').trigger('click')
    await nextTick()

    expect((wrapper.vm as any).open).toBe(false)

    wrapper.unmount()
  })

  it('поддерживает кастомный header-slot и скрытие визуального header', () => {
    const withCustomHeader = mount(
      defineComponent({
        name: 'HarnessDialogCustomHeader',
        components: { DsDialog },
        setup() {
          const open = ref(true)
          return { open }
        },
        template: `
          <DsDialog v-model="open" title="Dialog title">
            <template #header="{ title }">
              <div data-testid="custom-header">{{ title }} custom</div>
            </template>

            <div>Body</div>
          </DsDialog>
        `,
      }),
      {
        global: {
          stubs: {
            teleport: true,
          },
        },
      },
    )

    expect(withCustomHeader.find('[data-testid="custom-header"]').text()).toContain('Dialog title')
    expect(withCustomHeader.find('button[aria-label="Close"]').exists()).toBe(true)

    withCustomHeader.unmount()

    const withoutHeader = mount(
      defineComponent({
        name: 'HarnessDialogNoHeader',
        components: { DsDialog },
        setup() {
          const open = ref(true)
          return { open }
        },
        template: '<DsDialog v-model="open" title="Dialog title" :show-header="false"><div>Body</div></DsDialog>',
      }),
      {
        global: {
          stubs: {
            teleport: true,
          },
        },
      },
    )

    expect(withoutHeader.find('[data-ds-dialog-header]').exists()).toBe(false)
    expect(withoutHeader.find('[data-testid="hu-title"]').text()).toBe('Dialog title')

    withoutHeader.unmount()
  })

  it('пробрасывает конфиг отступов и бордеров в header и footer', () => {
    const wrapper = mount(
      defineComponent({
        name: 'HarnessDialogSectionConfig',
        components: { DsDialog },
        setup() {
          const open = ref(true)
          return { open }
        },
        template: `
          <DsDialog
            v-model="open"
            title="Dialog title"
            :header-config="{ paddingX: 'px-3', paddingY: 'py-2', bordered: false }"
            :footer-config="{ paddingX: 'px-2', paddingY: 'py-1', bordered: false }"
          >
            <div>Body</div>

            <template #footer>
              <div data-testid="dialog-footer">Footer</div>
            </template>
          </DsDialog>
        `,
      }),
      {
        global: {
          stubs: {
            teleport: true,
          },
        },
      },
    )

    expect(wrapper.find('[data-ds-dialog-header]').classes()).toContain('px-3')
    expect(wrapper.find('[data-ds-dialog-header]').classes()).toContain('py-2')
    expect(wrapper.find('[data-ds-dialog-header]').classes()).not.toContain('border-b')

    expect(wrapper.find('[data-ds-dialog-footer]').classes()).toContain('px-2')
    expect(wrapper.find('[data-ds-dialog-footer]').classes()).toContain('py-1')
    expect(wrapper.find('[data-ds-dialog-footer]').classes()).not.toContain('border-t')

    wrapper.unmount()
  })
})

describe('DsPromptDialog', () => {
  it('показывает ошибку при пустом значении и подтверждает при заполнении', async () => {
    const Harness = defineComponent({
      name: 'HarnessPrompt',
      components: { DsPromptDialog },
      setup() {
        const open = ref(true)
        const value = ref('')
        const onConfirm = vi.fn()
        return { open, value, onConfirm }
      },
      template:
        '<DsPromptDialog v-model="open" v-model:value="value" title="T" confirm-text="Save" cancel-text="Cancel" @confirm="onConfirm" />',
    })

    const wrapper = mount(Harness, {
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    await wrapper.find('[data-testid="ds-prompt-confirm"]').trigger('click')
    await nextTick()

    expect((wrapper.vm as any).onConfirm).not.toHaveBeenCalled()
    expect(wrapper.text()).toContain('Enter a value.')

    await wrapper.find('[data-testid="ds-prompt-input"]').setValue('New name')
    await wrapper.find('[data-testid="ds-prompt-confirm"]').trigger('click')
    await nextTick()

    expect((wrapper.vm as any).onConfirm).toHaveBeenCalledWith('New name')
    expect((wrapper.vm as any).open).toBe(false)

    wrapper.unmount()
  })

  it('пробрасывает headerConfig и footerConfig в базовый DsDialog', () => {
    const wrapper = mount(
      defineComponent({
        name: 'HarnessPromptSectionConfig',
        components: { DsPromptDialog },
        setup() {
          const open = ref(true)
          const value = ref('Value')
          return { open, value }
        },
        template: `
          <DsPromptDialog
            v-model="open"
            v-model:value="value"
            title="T"
            :header-config="{ paddingX: 'px-4', paddingY: 'py-2', bordered: false }"
            :footer-config="{ paddingX: 'px-3', paddingY: 'py-1', bordered: false }"
          />
        `,
      }),
      {
        global: {
          stubs: {
            teleport: true,
          },
        },
      },
    )

    expect(wrapper.find('[data-ds-dialog-header]').classes()).toContain('px-4')
    expect(wrapper.find('[data-ds-dialog-header]').classes()).toContain('py-2')
    expect(wrapper.find('[data-ds-dialog-header]').classes()).not.toContain('border-b')

    expect(wrapper.find('[data-ds-dialog-footer]').classes()).toContain('px-3')
    expect(wrapper.find('[data-ds-dialog-footer]').classes()).toContain('py-1')
    expect(wrapper.find('[data-ds-dialog-footer]').classes()).not.toContain('border-t')

    wrapper.unmount()
  })

  it('пробрасывает buttonSize в action-кнопки', () => {
    const wrapper = mount(
      defineComponent({
        name: 'HarnessPromptButtonSize',
        components: { DsPromptDialog },
        setup() {
          const open = ref(true)
          const value = ref('Value')
          return { open, value }
        },
        template: '<DsPromptDialog v-model="open" v-model:value="value" title="T" button-size="xs" />',
      }),
      {
        global: {
          stubs: {
            teleport: true,
          },
        },
      },
    )

    expect(wrapper.find('[data-testid="ds-prompt-cancel"]').classes()).toContain('h-7')
    expect(wrapper.find('[data-testid="ds-prompt-cancel"]').classes()).toContain('px-2.5')
    expect(wrapper.find('[data-testid="ds-prompt-confirm"]').classes()).toContain('h-7')
    expect(wrapper.find('[data-testid="ds-prompt-confirm"]').classes()).toContain('px-2.5')

    wrapper.unmount()
  })
})
