function splitClassTokens(value: string): string[] {
  return value.split(/\s+/).filter(Boolean)
}

const selectBase = [
  'inline-block w-auto align-baseline',
  'cursor-pointer',
  'appearance-none bg-transparent border border-transparent px-0 py-0 rounded-[6px]',
  'transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
  'disabled:opacity-60 disabled:cursor-not-allowed disabled:text-[var(--muted-fg)] disabled:no-underline',
  'w-full rounded-md border border-[var(--brd)] bg-[var(--bg)] text-[var(--fg)]',
  'disabled:opacity-50 disabled:cursor-not-allowed',
  'inline-flex items-center gap-1 text-left',
  'flex items-center justify-between text-left',
  'relative inline-block align-baseline',
  'relative w-full',
  'absolute top-1/2 -translate-y-1/2 right-3 text-[var(--muted-fg)] pointer-events-none',
  'min-w-0 flex-1',
  'block truncate',
  'shrink-0 h-4 w-4',
  'shrink-0 text-[var(--muted-fg)] pointer-events-none',
  'absolute top-1/2 -translate-y-1/2 right-3 h-6 w-6 inline-flex items-center justify-center rounded-md text-[var(--muted-fg)] hover:text-[var(--fg)] hover:bg-[color-mix(in_srgb,var(--muted)_25%,transparent)] disabled:opacity-50',
  'absolute z-50 mt-2 w-full',
  'p-2 border-b border-[var(--brd)]',
  'p-1 overflow-auto',
  'w-full rounded-[10px] px-3 py-2 text-left text-[13px] hover:bg-[color-mix(in_srgb,var(--muted)_30%,transparent)]',
  'flex items-center gap-2 min-w-0',
  'h-4 w-4 shrink-0',
  'truncate',
]

const selectVariants = [
  'h-7 px-2.5 text-[12px]',
  'h-8 px-3 text-[13px]',
  'h-10 px-3 text-[14px]',
  'h-11 px-4 text-[16px]',
  'text-[12px]',
  'text-[13px]',
  'text-[14px]',
  'text-[16px]',
  'no-underline',
  'underline underline-offset-4',
  'hover:underline hover:underline-offset-4',
  'text-[var(--primary)] hover:text-[var(--primary-hover)] active:text-[var(--primary-active)]',
  'text-[var(--fg)] hover:text-[var(--primary)] active:text-[var(--primary-active)]',
  'text-[var(--muted-fg)] hover:text-[var(--fg)] active:text-[var(--fg)]',
  'text-[var(--ds-danger)] hover:text-[var(--ds-danger-hover)] active:text-[var(--ds-danger-active)]',
  'appearance-none pr-9',
  'i-lucide-chevron-down',
  'i-lucide-x',
  'transition ease-out duration-150',
  'transform opacity-0 scale-95',
  'transform opacity-100 scale-100',
  'transition ease-in duration-100',
  'Add',
  'i-lucide-check',
]

export const dsSelectSafelist = [...new Set([
  ...selectBase.flatMap(splitClassTokens),
  ...selectVariants.flatMap(splitClassTokens),
])]