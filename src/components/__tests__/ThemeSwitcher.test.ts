import { mount } from '@vue/test-utils'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const isDarkRef = ref(false)
const toggleTheme = vi.fn()
const useThemeMock = vi.fn()

vi.mock('@/composables/useTheme', () => {
  return {
    useTheme: (options?: any) => {
      useThemeMock(options)
      return {
        isDark: computed(() => isDarkRef.value),
        toggleTheme,
      }
    },
  }
})

vi.mock('~icons/lucide/moon', () => {
  return {
    default: defineComponent({
      name: 'IconMoon',
      template: '<svg data-icon="moon" />',
    }),
  }
})

vi.mock('~icons/lucide/sun', () => {
  return {
    default: defineComponent({
      name: 'IconSun',
      template: '<svg data-icon="sun" />',
    }),
  }
})

import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    isDarkRef.value = false
    toggleTheme.mockClear()
    useThemeMock.mockClear()
  })

  it('не инициализирует тему при монтировании и переключает тему по клику', async () => {
    const wrapper = mount(ThemeSwitcher)

    // ThemeSwitcher должен только переключать, без init на mount.
    await wrapper.find('button').trigger('click')
    expect(toggleTheme).toHaveBeenCalledTimes(1)
  })

  it('прокидывает storageKey в useTheme', () => {
    mount(ThemeSwitcher, {
      props: {
        storageKey: 'my-app-theme',
      },
    })

    expect(useThemeMock).toHaveBeenCalledWith({ storageKey: 'my-app-theme' })
  })

  it('показывает правильную иконку в зависимости от isDark', async () => {
    const wrapper = mount(ThemeSwitcher)

    expect(wrapper.find('[data-icon="sun"]').exists()).toBe(true)
    expect(wrapper.find('[data-icon="moon"]').exists()).toBe(false)

    isDarkRef.value = true
    await nextTick()

    expect(wrapper.find('[data-icon="sun"]').exists()).toBe(false)
    expect(wrapper.find('[data-icon="moon"]').exists()).toBe(true)
  })
})
