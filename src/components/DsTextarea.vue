<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    autocomplete?: string
    disabled?: boolean
    invalid?: boolean
    state?: 'default' | 'success' | 'warning' | 'danger'
    name?: string
    id?: string
    rows?: number
  }>(),
  {
    placeholder: undefined,
    autocomplete: undefined,
    disabled: false,
    invalid: false,
    state: 'default',
    name: undefined,
    id: undefined,
    rows: 4,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const base =
  'w-full rounded-md border bg-[var(--background)] px-3 py-2 text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-50 disabled:cursor-not-allowed'

const className = computed(() => {
  const state = props.state

  const borderByState: Record<typeof state, string> = {
    default: 'border-[var(--border)]',
    success: 'border-[var(--ds-success)] focus-visible:ring-[var(--ds-success)]',
    warning: 'border-[var(--ds-warning)] focus-visible:ring-[var(--ds-warning)]',
    danger: 'border-[var(--ds-danger)] focus-visible:ring-[var(--ds-danger)]',
  }

  return [
    base,
    props.invalid ? borderByState.danger : borderByState[state],
  ].join(' ')
})

function onInput(e: Event): void {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}
</script>

<template>
  <textarea
    :id="props.id"
    :name="props.name"
    :rows="props.rows"
    :autocomplete="props.autocomplete"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :value="props.modelValue"
    :aria-invalid="props.invalid ? 'true' : undefined"
    :class="className"
    @input="onInput"
  />
</template>
