<script setup lang="ts">
import { computed, ref } from 'vue'

import IconClose from '~icons/lucide/x'

import DsBadge from '@/components/DsBadge.vue'
import type { DsBadgeRadius, DsBadgeSize, DsBadgeVariant } from '@/components/DsBadge.vue'
import type { DsInputSize } from '@/components/DsInput.vue'

export type DsInputTagSize = DsInputSize
export type DsInputTagState = 'default' | 'success' | 'warning' | 'danger'

const REGEX_SPECIAL_CHAR_RE = /[.*+?^${}()|[\]\\]/g

const props = withDefaults(
  defineProps<{
    modelValue: string[]
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    invalid?: boolean
    state?: DsInputTagState
    size?: DsInputTagSize

    /**
     * Keys/characters that should commit current input as a tag.
     * `Enter` is always supported.
     */
    separators?: string[]

    /** When `true`, allows duplicate tags. By default duplicates are ignored. */
    allowDuplicates?: boolean

    /** Trim input values before adding tags. */
    trim?: boolean

    /** Max number of tags. When reached, new tags are ignored. */
    max?: number

    /** When `true`, commits current input on blur. */
    addOnBlur?: boolean

    /** When `true`, clears input after committing tags. */
    clearInputOnAdd?: boolean

    /** Tag (badge) styling. */
    tagVariant?: DsBadgeVariant
    tagDark?: boolean
    tagSize?: DsBadgeSize
    tagRadius?: DsBadgeRadius
    tagClosable?: boolean
  }>(),
  {
    placeholder: undefined,
    disabled: false,
    readonly: false,
    invalid: false,
    state: 'default',
    size: 'md',

    separators: () => [','],
    allowDuplicates: false,
    trim: true,
    max: undefined,
    addOnBlur: false,
    clearInputOnAdd: true,

    tagVariant: 'neutral',
    tagDark: false,
    tagSize: 'md',
    tagRadius: 'round',
    tagClosable: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'add', value: string): void
  (e: 'remove', value: string, index: number): void
}>()

const inputValue = ref('')
const inputEl = ref<HTMLInputElement | null>(null)

function focus(): void {
  inputEl.value?.focus()
}

defineExpose({
  focus,
})

const isMaxed = computed(() => props.max !== undefined && props.modelValue.length >= props.max)
const canEdit = computed(() => !props.disabled && !props.readonly)
const showRemove = computed(() => props.tagClosable && canEdit.value)

function escapeRegexChar(ch: string): string {
  return ch.replace(REGEX_SPECIAL_CHAR_RE, '\\$&')
}

const splitRegex = computed(() => {
  const seps = (props.separators ?? []).filter(Boolean).map((s) => s[0]!)
  const uniq = [...new Set([...seps, '\n', '\r', '\t'])]
  const body = uniq.map(escapeRegexChar).join('')
  return new RegExp(`[${body}]+`, 'g')
})

function normalizeTag(raw: string): string {
  const v = props.trim ? raw.trim() : raw
  return v
}

function splitToTags(raw: string): string[] {
  return raw
    .split(splitRegex.value)
    .map((v) => normalizeTag(v))
    .filter(Boolean)
}

function addMany(rawTags: string[]): boolean {
  if (!canEdit.value || isMaxed.value) return false

  const next = props.modelValue.slice()
  let changed = false

  for (const raw of rawTags) {
    const tag = normalizeTag(raw)
    if (!tag) continue

    if (!props.allowDuplicates && next.includes(tag)) continue
    if (props.max !== undefined && next.length >= props.max) break

    next.push(tag)
    changed = true
    emit('add', tag)
  }

  if (!changed) return false

  emit('update:modelValue', next)
  return true
}

function commitInput(): void {
  if (!canEdit.value || isMaxed.value) return
  if (!inputValue.value) return

  const tags = splitToTags(inputValue.value)
  if (!tags.length) return

  const changed = addMany(tags)
  if (changed && props.clearInputOnAdd) {
    inputValue.value = ''
  }
}

function removeAt(index: number): void {
  if (!canEdit.value) return

  const next = props.modelValue.slice()
  const removed = next[index]
  if (removed === undefined) return

  next.splice(index, 1)
  emit('update:modelValue', next)
  emit('remove', removed, index)
}

function onInput(e: Event): void {
  inputValue.value = (e.target as HTMLInputElement).value
}

function onKeydown(e: KeyboardEvent): void {
  if (!canEdit.value) return

  if (e.key === 'Enter') {
    e.preventDefault()
    commitInput()
    return
  }

  if ((props.separators ?? []).includes(e.key)) {
    e.preventDefault()
    commitInput()
    return
  }

  if (e.key === 'Backspace' && inputValue.value.length === 0 && props.modelValue.length > 0) {
    e.preventDefault()
    removeAt(props.modelValue.length - 1)
  }
}

function onBlur(): void {
  if (!props.addOnBlur) return
  commitInput()
}

function onPaste(e: ClipboardEvent): void {
  if (!canEdit.value || isMaxed.value) return

  const pasted = e.clipboardData?.getData('text')
  if (!pasted) return

  const tags = splitToTags(pasted)
  if (tags.length <= 1) return

  e.preventDefault()
  addMany(tags)
}

const wrapperBase =
  'w-full flex flex-wrap items-center rounded-md border bg-[var(--background)] text-[var(--foreground)] transition-colors duration-150 focus-within:ring-2 focus-within:ring-[var(--ring)]'

const wrapperSizeClass = computed(() => {
  const map: Record<DsInputTagSize, string> = {
    xs: 'min-h-7 px-2.5 py-1 gap-1.5',
    sm: 'min-h-8 px-3 py-1 gap-1.5',
    md: 'min-h-10 px-3 py-1.5 gap-2',
    lg: 'min-h-11 px-4 py-2 gap-2',
  }

  return map[props.size]
})

const inputSizeClass = computed(() => {
  const map: Record<DsInputTagSize, string> = {
    xs: 'text-[12px]',
    sm: 'text-[13px]',
    md: 'text-[14px]',
    lg: 'text-[16px]',
  }

  return map[props.size]
})

const wrapperClassName = computed(() => {
  const state = props.state
  const borderByState: Record<typeof state, string> = {
    default: 'border-[var(--border)]',
    success: 'border-[var(--ds-success)] focus-within:ring-[var(--ds-success)]',
    warning: 'border-[var(--ds-warning)] focus-within:ring-[var(--ds-warning)]',
    danger: 'border-[var(--ds-danger)] focus-within:ring-[var(--ds-danger)]',
  }

  return [
    wrapperBase,
    wrapperSizeClass.value,
    props.invalid ? borderByState.danger : borderByState[state],
    props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text',
  ].join(' ')
})

const inputClassName = computed(() => {
  return [
    'flex-1 min-w-[120px] bg-transparent border-none outline-none placeholder:text-[var(--muted-foreground)]',
    inputSizeClass.value,
  ].join(' ')
})

const placeholderText = computed(() => {
  if (props.modelValue.length > 0) return undefined
  return props.placeholder
})
</script>

<template>
  <div data-testid="ds-input-tag" :class="wrapperClassName" @click="focus">
    <DsBadge
      v-for="(tag, i) in props.modelValue"
      :key="`${tag}-${i}`"
      :variant="props.tagVariant"
      :dark="props.tagDark"
      :size="props.tagSize"
      :radius="props.tagRadius"
      class="gap-1"
      data-testid="ds-input-tag-item"
      :data-index="i"
    >
      <slot name="tag" :tag="tag" :index="i" :remove="() => removeAt(i)">
        <span class="truncate max-w-[18rem]">{{ tag }}</span>
      </slot>

      <button
        v-if="showRemove"
        type="button"
        class="-mr-0.5 inline-flex items-center justify-center rounded-[6px] p-0.5 opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        aria-label="Remove tag"
        data-testid="ds-input-tag-remove"
        :data-index="i"
        @mousedown.prevent.stop
        @click.stop="removeAt(i)"
      >
        <IconClose class="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </DsBadge>

    <input
      ref="inputEl"
      data-testid="ds-input-tag-input"
      :value="inputValue"
      :disabled="props.disabled || isMaxed"
      :readonly="props.readonly"
      :placeholder="placeholderText"
      :aria-invalid="props.invalid ? 'true' : undefined"
      :class="inputClassName"
      @input="onInput"
      @keydown="onKeydown"
      @blur="onBlur"
      @paste="onPaste"
    >
  </div>
</template>
