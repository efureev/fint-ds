function splitClassTokens(value: string): string[] {
  return value.split(/\s+/).filter(Boolean)
}

const shellBase =
  'relative w-full overflow-hidden rounded-md border bg-[var(--background)] transition-colors duration-150 focus-within:ring-2 focus-within:ring-[var(--ring)]'

const inputBase =
  'w-full bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:placeholder:text-transparent focus:outline-none disabled:cursor-not-allowed'

const sizes = {
  xs: 'h-7 px-2.5 text-[12px]',
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-10 px-3 text-[14px]',
  lg: 'h-11 px-4 text-[16px]',
} as const

const textAlign = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const

const states = {
  default: 'border-[var(--border)]',
  success: 'border-[var(--ds-success)] focus-within:ring-[var(--ds-success)]',
  warning: 'border-[var(--ds-warning)] focus-within:ring-[var(--ds-warning)]',
  danger: 'border-[var(--ds-danger)] focus-within:ring-[var(--ds-danger)]',
} as const

const template = [
  'absolute inset-y-0 left-0 flex items-center justify-center border-r border-[var(--border)] px-2 text-[var(--muted-foreground)] pointer-events-none select-none truncate',
  'absolute inset-y-0 flex items-center justify-center border-l border-[var(--border)] px-2 text-[var(--muted-foreground)] pointer-events-none select-none truncate',
  'absolute inset-y-0 flex items-center justify-center border-l border-[var(--border)]',
  'flex flex-col justify-center gap-1',
  'h-4 w-7 inline-flex items-center justify-center rounded text-[10px] text-[var(--muted-foreground)] hover:bg-[var(--muted)] active:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed',
  'absolute inset-y-0 flex items-stretch justify-center border-r border-[var(--border)]',
  'h-full w-full inline-flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--muted)] active:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
  'absolute inset-y-0 flex items-stretch justify-center border-l border-[var(--border)]',
  'opacity-50 cursor-not-allowed',
  'Add',
  'Decrease',
  'Increase',
]

export const dsNumberInputSafelist = [...new Set([
  ...splitClassTokens(shellBase),
  ...splitClassTokens(inputBase),
  ...Object.values(sizes).flatMap(splitClassTokens),
  ...Object.values(textAlign).flatMap(splitClassTokens),
  ...Object.values(states).flatMap(splitClassTokens),
  ...template.flatMap(splitClassTokens),
])]