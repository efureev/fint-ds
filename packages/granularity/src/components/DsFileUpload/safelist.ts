function splitClassTokens(value: string): string[] {
  return value.split(/\s+/).filter(Boolean)
}

const fileUploadClasses = [
  'inline-block',
  'relative w-full rounded-[var(--ds-radius-lg)] border border-dashed border-[var(--border)] bg-[var(--card)] px-5 py-6 outline-none transition',
  'opacity-60 cursor-not-allowed',
  'cursor-pointer hover:bg-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
  'border-[var(--ring)] bg-[var(--muted)]',
  'flex items-start gap-4',
  'h-12 w-12 shrink-0 rounded-[12px] bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center',
  'h-6 w-6 text-[var(--muted-foreground)]',
  'min-w-0',
  'text-[14px] font-700',
  'mt-1 text-[13px] ds-muted',
  'mt-3 space-y-1',
  'font-600',
]

export const dsFileUploadSafelist = [...new Set([
  ...fileUploadClasses.flatMap(splitClassTokens),
])]