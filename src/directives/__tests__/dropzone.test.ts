import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it, vi } from 'vitest'

import { vDropzone } from '@/directives/dropzone'
import { maxSizeMbValidator } from '@/utils/fileValidators/maxSizeMbValidator'

function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

const TestComp = defineComponent({
  props: {
    binding: {
      type: Object,
      required: true,
    },
  },
  directives: {
    dropzone: vDropzone,
  },
  template: '<div id="z" v-dropzone="binding" />',
})

describe('vDropzone', () => {
  it('прокидывает файлы в onFiles при drop', async () => {
    const onFiles = vi.fn()
    const onError = vi.fn()

    const wrapper = mount(TestComp, {
      props: {
        binding: {
          onFiles,
          onError,
        },
      },
    })

    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })

    await wrapper.get('#z').trigger('drop', {
      dataTransfer: {
        files: [file],
      },
    })

    await flushPromises()

    expect(onFiles).toHaveBeenCalledTimes(1)
    const [files] = onFiles.mock.calls[0]
    expect(files).toHaveLength(1)
    expect(files[0].name).toBe('hello.txt')
    expect(onError).not.toHaveBeenCalled()
  })

  it('вызывает onError при превышении maxSizeMb', async () => {
    const onFiles = vi.fn()
    const onError = vi.fn()

    const wrapper = mount(TestComp, {
      props: {
        binding: {
          onFiles,
          onError,
          validators: [maxSizeMbValidator(1)],
        },
      },
    })

    const bigFile = new File([new ArrayBuffer(2 * 1024 * 1024)], 'big.bin', { type: 'application/octet-stream' })

    await wrapper.get('#z').trigger('drop', {
      dataTransfer: {
        files: [bigFile],
      },
    })

    await flushPromises()

    expect(onFiles).not.toHaveBeenCalled()
    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('не залипает в состоянии over после обновления binding (rerender во время drag-over)', async () => {
    const onFiles = vi.fn()
    const onStateChange = vi.fn()

    const wrapper = mount(TestComp, {
      props: {
        binding: {
          onFiles,
          onStateChange,
        },
      },
    })

    const zone = wrapper.get('#z')

    await zone.trigger('dragenter', { dataTransfer: {} })

    expect(onStateChange).toHaveBeenCalledWith({ isOver: true })
    expect(zone.classes()).toContain('ds-dropzone--over')

    // Имитируем обновление компонента: объект binding новый, но логика та же.
    await wrapper.setProps({
      binding: {
        onFiles,
        onStateChange,
      },
    })

    await zone.trigger('dragleave', { dataTransfer: {} })

    expect(onStateChange).toHaveBeenLastCalledWith({ isOver: false })
    expect(zone.classes()).not.toContain('ds-dropzone--over')
    expect((zone.element as HTMLElement).dataset.dsDropzoneOver).toBeUndefined()
  })
})
