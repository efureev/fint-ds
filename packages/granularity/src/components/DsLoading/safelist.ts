function splitClassTokens(value: string): string[] {
  return value.split(/\s+/).filter(Boolean)
}

const loadingClasses = [
  'fixed inset-0 absolute z-50 z-10',
  'flex flex-col items-center justify-center gap-2 px-4 text-center',
  'cursor-wait select-none pointer-events-auto',
  'bg-black/25',
  'h-7 w-7',
  'text-[var(--muted-fg)] text-sm ds-muted',
]

export const dsLoadingSafelist = [...new Set([
  ...loadingClasses.flatMap(splitClassTokens),
])]