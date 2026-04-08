<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { vClickOutside } from '@/directives/clickOutside'

const props = withDefaults(
  defineProps<{
    align?: 'left' | 'right' | 'center'
    width?: 'auto' | '20' | '48' | '60' | '64' | '80'
    closeOnContentClick?: boolean
    contentClass?: string
  }>(),
  {
    align: 'right',
    width: '48',
    closeOnContentClick: true,
    contentClass: '',
  },
)

const open = ref(false)

function toggle(): void {
  open.value = !open.value
}

function close(): void {
  open.value = false
}

function closeOnEscape(e: KeyboardEvent): void {
  if (e.key === 'Escape') close()
}

watch(
  open,
  (isOpen) => {
    if (typeof document === 'undefined') return
    document.removeEventListener('keydown', closeOnEscape)
    if (isOpen) document.addEventListener('keydown', closeOnEscape)
  },
  { immediate: true },
)

onUnmounted(() => {
  if (typeof document === 'undefined') return
  document.removeEventListener('keydown', closeOnEscape)
})

const widthClass = computed(() => {
  return {
    auto: '',
    20: 'w-20',
    48: 'w-48',
    60: 'w-60',
    64: 'w-64',
    80: 'w-80',
  }[props.width]
})

const alignmentClasses = computed(() => {
  if (props.align === 'left') {
    return 'origin-top-left left-0'
  }

  if (props.align === 'right') {
    return 'origin-top-right right-0'
  }

  return 'origin-top left-1/2 -translate-x-1/2'
})

const contentClasses = computed(() => {
  return [
    'rounded-[var(--ds-radius-xl)]',
    'border border-[var(--border)]',
    'bg-[var(--card)] text-[var(--card-foreground)]',
    'shadow-[var(--ds-shadow-2)]',
    'p-1',
    props.contentClass,
  ].filter(Boolean).join(' ')
})

function onContentClick(): void {
  if (props.closeOnContentClick) {
    close()
  }
}
</script>

<template>
  <div
      v-click-outside="{ handler: close, enabled: open }"
      class="relative inline-block"
  >
    <div @click="toggle">
      <slot name="trigger" :open="open" :toggle="toggle" :close="close" />
    </div>

    <transition
        enter-active-class="transition ease-out duration-150"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
    >
      <div
          v-show="open"
          class="absolute z-50 mt-2"
          :class="[widthClass, alignmentClasses]"
          @click="onContentClick"
      >
        <div :class="contentClasses">
          <slot name="content" :close="close" />
        </div>
      </div>
    </transition>
  </div>
</template>
