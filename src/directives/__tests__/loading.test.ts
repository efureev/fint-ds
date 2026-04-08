import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { installI18n, useFintI18n } from '@feugene/fint-i18n'

vi.mock('~icons/lucide/loader-circle', async () => {
  const { defineComponent } = await import('vue')

  return {
    default: defineComponent({
      name: 'IconLoader',
      template: '<svg data-icon="loader" />',
    }),
  }
})

import { createLoading, vLoading } from '@/directives/loading'
import { createFintDsTestI18n } from '@/test/createFintDsTestI18n'

describe('vLoading / createLoading (unit)', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('вставляет/убирает оверлей в контейнер и управляет aria-busy + position', async () => {
    const Harness = defineComponent({
      name: 'Harness',
      setup() {
        const loading = ref(false)
        return { loading }
      },
      template: '<div data-testid="box" v-loading="loading">X</div>',
    })

    const wrapper = mount(Harness, {
      global: {
        directives: {
          loading: vLoading,
        },
      },
    })

    const box = wrapper.get('[data-testid="box"]').element as HTMLElement
    expect(box.querySelector('[data-ds-loading]')).toBeNull()
    expect(box.getAttribute('aria-busy')).toBeNull()

    ;(wrapper.vm as any).loading = true
    await nextTick()

    expect(box.querySelector('[data-ds-loading]')).not.toBeNull()
    expect(box.getAttribute('aria-busy')).toBe('true')
    expect(box.style.position).toBe('relative')
    expect(box.textContent).toContain('Loading...')

    ;(wrapper.vm as any).loading = false
    await nextTick()

    expect(box.querySelector('[data-ds-loading]')).toBeNull()
    expect(box.getAttribute('aria-busy')).toBeNull()
    expect(box.style.position).toBe('')

    wrapper.unmount()
  })

  it('позволяет динамически обновлять `text` через реактивный binding и fint-i18n', async () => {
    const i18n = await createFintDsTestI18n('en')

    const Harness = defineComponent({
      name: 'Harness',
      setup() {
        const { t } = useFintI18n()
        const loadingValue = ref({
          loading: true,
          text: t('fintDs.loading.defaultText'),
        })

        function syncTranslatedText() {
          loadingValue.value = {
            ...loadingValue.value,
            text: t('fintDs.loading.defaultText'),
          }
        }

        return { loadingValue, syncTranslatedText }
      },
      template: '<div data-testid="box" v-loading="loadingValue">X</div>',
    })

    const wrapper = mount(Harness, {
      global: {
        directives: {
          loading: vLoading,
        },
        plugins: [[{ install: (app: any) => installI18n(app, i18n) }]],
      },
    })

    let box = wrapper.get('[data-testid="box"]').element as HTMLElement

    expect(box.textContent).toContain('Loading...')

    await i18n.setLocale('ru')
    ;(wrapper.vm as any).syncTranslatedText()
    await nextTick()
    box = wrapper.get('[data-testid="box"]').element as HTMLElement
    expect(box.textContent).toContain('Загрузка...')

    await i18n.setLocale('en')
    ;(wrapper.vm as any).syncTranslatedText()
    await nextTick()
    box = wrapper.get('[data-testid="box"]').element as HTMLElement
    expect(box.textContent).toContain('Loading...')

    wrapper.unmount()
  })

  it('умеет вставлять оверлей в указанный target (string selector)', async () => {
    const Harness = defineComponent({
      name: 'Harness',
      setup() {
        const loading = ref(true)
        return { loading }
      },
      template: `
        <div>
          <div id="target" data-testid="target">T</div>
          <div data-testid="source" v-loading="{ loading, target: '#target', text: 'Loading target...' }">S</div>
        </div>
      `,
    })

    const wrapper = mount(Harness, {
      global: {
        directives: {
          loading: vLoading,
        },
      },
    })

    const target = wrapper.get('[data-testid="target"]').element as HTMLElement
    const source = wrapper.get('[data-testid="source"]').element as HTMLElement

    expect(target.querySelector('[data-ds-loading]')).not.toBeNull()
    expect(source.querySelector('[data-ds-loading]')).toBeNull()
    expect(target.textContent).toContain('Loading target...')

    wrapper.unmount()
  })

  it('createLoading: позволяет показать и закрыть лоадер из TS, а также обновить текст', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)

    const controller = createLoading({
      target,
      text: 'Please wait',
      background: 'rgba(0, 0, 0, 0.2)',
    })

    expect(target.querySelector('[data-ds-loading]')).not.toBeNull()
    expect(target.textContent).toContain('Please wait')

    controller.setText('Next')
    expect(target.textContent).toContain('Next')

    controller.close()
    expect(target.querySelector('[data-ds-loading]')).toBeNull()
  })

  it('createLoading: использует дефолтный текст, если текст не задан', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)

    const controller = createLoading({ target })

    expect(target.textContent).toContain('Loading...')

    controller.close()
  })

  it('createLoading: поддерживает `animated=false` (спиннер без анимации вращения)', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)

    const controller = createLoading({
      target,
      animated: false,
    })

    const icon = target.querySelector('svg[data-icon="loader"]')
    expect(icon).not.toBeNull()
    if (!icon) throw new Error('Loader icon not found')
    expect(icon.classList.contains('ds-loading__spinner--animated')).toBe(false)

    controller.setOptions({ animated: true })
    expect(icon.classList.contains('ds-loading__spinner--animated')).toBe(true)

    controller.close()
  })
})
