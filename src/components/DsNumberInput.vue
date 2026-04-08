<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'
import { computed, nextTick, onBeforeUnmount, onMounted, onUpdated, ref, useSlots } from 'vue'

type DsNumberInputState = 'default' | 'success' | 'warning' | 'danger'

export type DsNumberInputSize = 'xs' | 'sm' | 'md' | 'lg'
export type DsNumberInputControlsDirection = 'vertical' | 'horizontal'
export type DsNumberInputTextAlign = 'left' | 'center' | 'right'

// Backward-compatible type aliases.
export type NumberInputSize = DsNumberInputSize
export type NumberInputControlsDirection = DsNumberInputControlsDirection

const ADDON_PX_BY_SIZE: Record<DsNumberInputSize, number> = {
  xs: 32, // 2rem
  sm: 36, // 2.25rem
  md: 40, // 2.5rem
  lg: 48, // 3rem
}

// Must mirror `sizeClass` horizontal padding (px-*) because inline paddings override class paddings.
const BASE_PADDING_X_LEN_BY_SIZE: Record<DsNumberInputSize, string> = {
  xs: '10px', // px-2.5
  sm: '12px', // px-3
  md: '12px', // px-3
  lg: '16px', // px-4
}

const SIZE_CLASS_BY_SIZE: Record<DsNumberInputSize, string> = {
  xs: 'h-7 px-2.5 text-[12px]',
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-10 px-3 text-[14px]',
  lg: 'h-11 px-4 text-[16px]',
}

const TEXT_ALIGN_CLASS_BY_ALIGN: Record<DsNumberInputTextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const BORDER_CLASS_BY_STATE: Record<DsNumberInputState, string> = {
  default: 'border-[var(--border)]',
  success: 'border-[var(--ds-success)] focus-within:ring-[var(--ds-success)]',
  warning: 'border-[var(--ds-warning)] focus-within:ring-[var(--ds-warning)]',
  danger: 'border-[var(--ds-danger)] focus-within:ring-[var(--ds-danger)]',
}

function px(n: number): string {
  return `${n}px`
}

const props = withDefaults(
  defineProps<{
    modelValue: string

    placeholder?: string
    autocomplete?: string
    inputmode?: InputHTMLAttributes['inputmode']
    disabled?: boolean
    invalid?: boolean
    state?: DsNumberInputState
    name?: string
    id?: string
    size?: DsNumberInputSize

    textAlign?: DsNumberInputTextAlign

    decimalSeparator?: string
    step?: number
    min?: number
    max?: number
    precision?: number

    controls?: boolean
    controlsDirection?: DsNumberInputControlsDirection

    prefixMinWidth?: string
    prefixMaxWidth?: string
    suffixMinWidth?: string
    suffixMaxWidth?: string
  }>(),
  {
    placeholder: undefined,
    autocomplete: undefined,
    inputmode: 'decimal',
    disabled: false,
    invalid: false,
    state: 'default',
    name: undefined,
    id: undefined,
    size: 'md',

    textAlign: 'left',

    decimalSeparator: '.',
    step: 1,
    min: undefined,
    max: undefined,
    precision: undefined,

    controls: false,
    controlsDirection: 'vertical',

    prefixMinWidth: undefined,
    prefixMaxWidth: undefined,
    suffixMinWidth: undefined,
    suffixMaxWidth: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const inputEl = ref<HTMLInputElement | null>(null)

function focus(): void {
  inputEl.value?.focus()
}

defineExpose({
  focus,
})

const slots = useSlots()

const hasPrefix = computed(() => Boolean(slots.prefix))
const hasSuffix = computed(() => Boolean(slots.suffix))

const hasHorizontalControls = computed(() => props.controls && props.controlsDirection === 'horizontal')
const hasVerticalControls = computed(() => props.controls && props.controlsDirection === 'vertical')

const addonPx = computed(() => ADDON_PX_BY_SIZE[props.size])
const addonLen = computed(() => px(addonPx.value))
const basePaddingXLen = computed(() => BASE_PADDING_X_LEN_BY_SIZE[props.size])

const defaultAddonMinWidth = computed(() => addonLen.value)
const prefixMinWidth = computed(() => props.prefixMinWidth ?? defaultAddonMinWidth.value)
const suffixMinWidth = computed(() => props.suffixMinWidth ?? defaultAddonMinWidth.value)

const prefixEl = ref<HTMLElement | null>(null)
const suffixEl = ref<HTMLElement | null>(null)

const measuredPrefixWidth = ref<string | undefined>(undefined)
const measuredSuffixWidth = ref<string | undefined>(undefined)

let ro: ResizeObserver | null = null
let scheduled = false

function readWidthPx(el: HTMLElement | null): string | undefined {
  if (!el) return undefined

  const width = Math.ceil(el.getBoundingClientRect().width || 0)
  // jsdom often reports 0; don't overwrite fallback minWidth in that case.
  if (width <= 0) return undefined

  return `${width}px`
}

function measure(): void {
  measuredPrefixWidth.value = hasPrefix.value ? readWidthPx(prefixEl.value) : undefined
  measuredSuffixWidth.value = hasSuffix.value ? readWidthPx(suffixEl.value) : undefined
}

function refreshObserver(): void {
  if (typeof ResizeObserver === 'undefined') return
  if (!ro) ro = new ResizeObserver(() => measure())

  ro.disconnect()
  if (prefixEl.value) ro.observe(prefixEl.value)
  if (suffixEl.value) ro.observe(suffixEl.value)
}

function scheduleMeasure(): void {
  if (scheduled) return
  scheduled = true

  void nextTick(() => {
    scheduled = false
    measure()
    refreshObserver()
  })
}

onMounted(() => scheduleMeasure())
onUpdated(() => scheduleMeasure())
onBeforeUnmount(() => ro?.disconnect())

function addLen(a: string, b: string): string {
  if (a === '0px') return b
  if (b === '0px') return a

  const apx = a.endsWith('px') ? Number(a.slice(0, -2)) : null
  const bpx = b.endsWith('px') ? Number(b.slice(0, -2)) : null

  if (apx !== null && Number.isFinite(apx) && bpx !== null && Number.isFinite(bpx)) {
    return `${apx + bpx}px`
  }

  return `calc(${a} + ${b})`
}

const prefixLen = computed(() => (hasPrefix.value ? measuredPrefixWidth.value ?? prefixMinWidth.value : '0px'))
const suffixLen = computed(() => (hasSuffix.value ? measuredSuffixWidth.value ?? suffixMinWidth.value : '0px'))

function addonStyle(side: 'left' | 'right', offset: string): Record<string, string> {
  return {
    width: addonLen.value,
    [side]: offset,
  }
}

const inputStyle = computed(() => {
  const leftControls = hasHorizontalControls.value ? addonLen.value : '0px'
  const rightControlsCount = (hasHorizontalControls.value ? 1 : 0) + (hasVerticalControls.value ? 1 : 0)
  const rightControls = rightControlsCount > 0 ? px(addonPx.value * rightControlsCount) : '0px'

  const leftReserved = addLen(prefixLen.value, leftControls)
  const rightReserved = addLen(suffixLen.value, rightControls)

  // Keep the same visual text padding as without addons (px-*), but add it on top of reserved space.
  const left = hasPrefix.value || hasHorizontalControls.value ? addLen(leftReserved, basePaddingXLen.value) : undefined
  const right = hasSuffix.value || rightControlsCount > 0 ? addLen(rightReserved, basePaddingXLen.value) : undefined

  return {
    paddingLeft: left,
    paddingRight: right,
  } as Record<string, string | undefined>
})

const suffixStyle = computed(() => {
  return {
    right: '0px',
    minWidth: suffixMinWidth.value,
    maxWidth: props.suffixMaxWidth,
  }
})

const prefixStyle = computed(() => {
  return {
    minWidth: prefixMinWidth.value,
    maxWidth: props.prefixMaxWidth,
  }
})

const verticalControlsStyle = computed(() => {
  return addonStyle('right', suffixLen.value)
})

const horizontalLeftControlsStyle = computed(() => {
  return addonStyle('left', prefixLen.value)
})

const horizontalRightControlsStyle = computed(() => {
  return addonStyle('right', suffixLen.value)
})

const sizeClass = computed(() => {
  return SIZE_CLASS_BY_SIZE[props.size]
})

const textAlignClass = computed(() => {
  return TEXT_ALIGN_CLASS_BY_ALIGN[props.textAlign]
})

const shellBase =
  'relative w-full overflow-hidden rounded-md border bg-[var(--background)] transition-colors duration-150 focus-within:ring-2 focus-within:ring-[var(--ring)]'

const shellClassName = computed(() => {
  const state: DsNumberInputState = props.state

  return [
    shellBase,
    props.disabled ? 'opacity-50 cursor-not-allowed' : undefined,
    props.invalid ? BORDER_CLASS_BY_STATE.danger : BORDER_CLASS_BY_STATE[state],
  ]
    .filter(Boolean)
    .join(' ')
})

const inputBase =
  'w-full bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:placeholder:text-transparent focus:outline-none disabled:cursor-not-allowed'

const inputClassName = computed(() => {
  return [inputBase, sizeClass.value, textAlignClass.value].join(' ')
})

function isDigit(ch: string): boolean {
  return ch >= '0' && ch <= '9'
}

function sanitize(raw: string): string {
  const sep = props.decimalSeparator || '.'

  let out = ''
  let hasSepLocal = false

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i]
    if (isDigit(ch)) {
      out += ch
      continue
    }

    if ((ch === sep || ch === '.' || ch === ',') && !hasSepLocal) {
      out += sep
      hasSepLocal = true
    }
  }

  return out
}

function toNumber(value: string): number | null {
  if (value.trim() === '') return null
  const sep = props.decimalSeparator || '.'
  const normalized = sep === '.' ? value : value.replace(sep, '.')
  const n = Number(normalized)
  if (!Number.isFinite(n)) return null
  return n
}

function clamp(v: number): number {
  if (props.min !== undefined) v = Math.max(props.min, v)
  if (props.max !== undefined) v = Math.min(props.max, v)
  return v
}

function normalize(v: number): number {
  if (props.precision === undefined) return v
  const p = Math.max(0, props.precision)
  return Number(v.toFixed(p))
}

function format(n: number): string {
  const sep = props.decimalSeparator || '.'
  const p = props.precision

  let s = p === undefined ? String(n) : n.toFixed(Math.max(0, p))
  if (sep !== '.') s = s.replace('.', sep)
  return s
}

function onInput(e: Event): void {
  const el = e.target as HTMLInputElement
  const next = sanitize(el.value)
  if (el.value !== next) el.value = next
  emit('update:modelValue', next)
}

function onChange(e: Event): void {
  const el = e.target as HTMLInputElement
  const next = sanitize(el.value)
  if (el.value !== next) el.value = next
  emit('change', next)
}

function stepBy(dir: 1 | -1): void {
  if (props.disabled) return

  const current = toNumber(props.modelValue) ?? 0
  const next = clamp(normalize(current + (props.step ?? 1) * dir))
  const nextStr = format(next)

  emit('update:modelValue', nextStr)
  emit('change', nextStr)
  focus()
}

const controlsButtonBase =
  'h-4 w-7 inline-flex items-center justify-center rounded text-[10px] text-[var(--muted-foreground)] hover:bg-[var(--muted)] active:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed'

const horizontalControlsButtonBase =
  'h-full w-full inline-flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--muted)] active:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]'
</script>

<template>
  <div :class="shellClassName">
    <div
        v-if="$slots.prefix"
        ref="prefixEl"
        data-testid="number-input-prefix"
        class="absolute inset-y-0 left-0 flex items-center justify-center border-r border-[var(--border)] px-2 text-[var(--muted-foreground)] pointer-events-none select-none truncate"
        :style="prefixStyle"
        aria-hidden="true"
    >
      <slot name="prefix" />
    </div>

    <input
        :id="props.id"
        ref="inputEl"
        v-bind="$attrs"
        :name="props.name"
        type="text"
        :inputmode="props.inputmode"
        :autocomplete="props.autocomplete"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :value="props.modelValue"
        :aria-invalid="props.invalid ? 'true' : undefined"
        :class="inputClassName"
        :style="inputStyle"
        @input="onInput"
        @change="onChange"
    >

    <div
        v-if="$slots.suffix"
        ref="suffixEl"
        data-testid="number-input-suffix"
        class="absolute inset-y-0 flex items-center justify-center border-l border-[var(--border)] px-2 text-[var(--muted-foreground)] pointer-events-none select-none truncate"
        :style="suffixStyle"
        aria-hidden="true"
    >
      <slot name="suffix" />
    </div>

    <div
        v-if="hasVerticalControls"
        data-testid="number-input-controls-vertical"
        class="absolute inset-y-0 flex items-center justify-center border-l border-[var(--border)]"
        :style="verticalControlsStyle"
    >
      <div class="flex flex-col justify-center gap-1">
        <button
            type="button"
            :class="controlsButtonBase"
            :disabled="props.disabled"
            aria-label="Increase"
            @mousedown.prevent
            @click="stepBy(1)"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7 14l5-5 5 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
            type="button"
            :class="controlsButtonBase"
            :disabled="props.disabled"
            aria-label="Decrease"
            @mousedown.prevent
            @click="stepBy(-1)"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
        v-if="hasHorizontalControls"
        data-testid="number-input-controls-horizontal-left"
        class="absolute inset-y-0 flex items-stretch justify-center border-r border-[var(--border)]"
        :style="horizontalLeftControlsStyle"
    >
      <button
          type="button"
          :class="horizontalControlsButtonBase"
          :disabled="props.disabled"
          aria-label="Decrease"
          @mousedown.prevent
          @click="stepBy(-1)"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M14 7l-5 5 5 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div
        v-if="hasHorizontalControls"
        data-testid="number-input-controls-horizontal-right"
        class="absolute inset-y-0 flex items-stretch justify-center border-l border-[var(--border)]"
        :style="horizontalRightControlsStyle"
    >
      <button
          type="button"
          :class="horizontalControlsButtonBase"
          :disabled="props.disabled"
          aria-label="Increase"
          @mousedown.prevent
          @click="stepBy(1)"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M10 7l5 5-5 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
