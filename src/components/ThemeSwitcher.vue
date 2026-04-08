<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import DsButton from '@/components/DsButton.vue'

import IconMoon from '~icons/lucide/moon'
import IconSun from '~icons/lucide/sun'

const props = withDefaults(
  defineProps<{
    /**
     * Ключ для хранения выбранной темы в localStorage.
     * По умолчанию: `fint-ds-theme`.
     */
    storageKey?: string
  }>(),
  {
    storageKey: undefined,
  },
)

const { isDark, toggleTheme } = useTheme({ storageKey: props.storageKey })
</script>

<template>
  <DsButton
    variant="ghost"
    size="sm"
    square
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <IconMoon v-if="isDark" class="h-4 w-4" aria-hidden="true" />
    <IconSun v-else class="h-4 w-4" aria-hidden="true" />
  </DsButton>
</template>
