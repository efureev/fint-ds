// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'

import App from '../../App.vue'
import ShowcaseLayout from '../../layouts/ShowcaseLayout.vue'
import { showcaseChildRoutes } from '../routeDefinitions'

function createStorageMock() {
  const store = new Map<string, string>()

  return {
    clear: () => store.clear(),
    getItem: (key: string) => store.get(key) ?? null,
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    removeItem: (key: string) => store.delete(key),
    setItem: (key: string, value: string) => store.set(key, value),
    get length() {
      return store.size
    },
  }
}

function createShowcaseRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        component: ShowcaseLayout,
        children: [...showcaseChildRoutes],
      },
    ],
  })
}

async function mountShowcaseAt(path: string) {
  const router = createShowcaseRouter()

  await router.push(path)
  await router.isReady()

  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  })

  await flushPromises()

  return {
    router,
    wrapper,
  }
}

function findButtonByText(wrapper: Awaited<ReturnType<typeof mountShowcaseAt>>['wrapper'], text: string) {
  return wrapper.findAll('button').find(button => button.text().includes(text))
}

function findButtonByAriaLabel(wrapper: Awaited<ReturnType<typeof mountShowcaseAt>>['wrapper'], label: string) {
  return wrapper.findAll('button').find(button => button.attributes('aria-label') === label)
}

describe('showcase layout integration', () => {
  beforeEach(() => {
    const storageMock = createStorageMock()

    vi.stubGlobal('localStorage', storageMock)
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: storageMock,
    })

    window.localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.removeAttribute('data-theme')

    vi.stubGlobal('matchMedia', vi.fn().mockImplementation(() => ({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })))
  })

  it('рендерит breadcrumbs и doc sections для component detail route', async () => {
    const { wrapper } = await mountShowcaseAt('/components/ds-button')

    expect(wrapper.text()).toContain('Components')
    expect(wrapper.text()).toContain('DsButton')
    expect(wrapper.text()).toContain('Actions')
    expect(wrapper.text()).toContain('Live examples')
    expect(wrapper.text()).toContain('API')
    expect(wrapper.text()).toContain('Usage')
  })

  it('рендерит package-level api, usage и breadcrumbs для composable detail route', async () => {
    const { wrapper } = await mountShowcaseAt('/composables/use-theme')

    expect(wrapper.text()).toContain('Composables')
    expect(wrapper.text()).toContain('useTheme')
    expect(wrapper.text()).toContain('Package overview')
    expect(wrapper.text()).toContain('Canonical usage')
    expect(wrapper.text()).toContain('API')
  })

  it('показывает fallback для отсутствующей package entity и сохраняет CTA возврата', async () => {
    const { wrapper } = await mountShowcaseAt('/utilities/missing-entity')

    expect(wrapper.text()).toContain('Package entity not found')
    expect(wrapper.text()).toContain('Перейти в directives')
    expect(wrapper.text()).toContain('Перейти в composables')
    expect(wrapper.text()).toContain('Перейти в utilities')
  })

  it('переключает тему через docs shell action', async () => {
    const { wrapper } = await mountShowcaseAt('/')
    const themeToggleButton = findButtonByAriaLabel(wrapper, 'Переключить тему')

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(themeToggleButton).toBeTruthy()

    await themeToggleButton?.trigger('click')
    await flushPromises()

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(window.localStorage.getItem('fint-ds-theme')).toBe('dark')
  })

  it('позволяет проверить theme-sensitive package demo без записи embedded state в localStorage', async () => {
    const { wrapper } = await mountShowcaseAt('/composables/use-theme')
    const runtimeThemeToggleButton = findButtonByText(wrapper, 'Toggle theme (light)')

    expect(wrapper.text()).toContain('Demo использует `persist: false`')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(window.localStorage.getItem('showcase-package-demo-theme')).toBeNull()
    expect(runtimeThemeToggleButton).toBeTruthy()

    await runtimeThemeToggleButton?.trigger('click')
    await flushPromises()

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(wrapper.text()).toContain('Toggle theme (dark)')
    expect(wrapper.text()).toContain('dark')
    expect(window.localStorage.getItem('showcase-package-demo-theme')).toBeNull()
  })

  it('открывает mobile drawer с внутристраничной навигацией и закрывает его при смене route', async () => {
    const { router, wrapper } = await mountShowcaseAt('/components/ds-button')
    const mobileMenuButton = findButtonByAriaLabel(wrapper, 'Открыть навигацию')

    expect(wrapper.find('[aria-label="Закрыть навигацию"]').exists()).toBe(false)
    expect(mobileMenuButton).toBeTruthy()

    await mobileMenuButton?.trigger('click')
    await flushPromises()

    expect(wrapper.text()).toContain('Навигация')
    expect(wrapper.text()).toContain('Контекстная навигация')
    expect(wrapper.find('[aria-label="Закрыть навигацию"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Actions')
    expect(wrapper.text()).toContain('DsButtonGroup')

    await router.push('/utilities')
    await flushPromises()

    expect(wrapper.find('[aria-label="Закрыть навигацию"]').exists()).toBe(false)
    expect(wrapper.text()).toContain('Utilities catalog')
  })
})