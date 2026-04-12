function splitClassTokens(value: string): string[] {
  return value.split(/\s+/).filter(Boolean)
}

const confirmDialogClasses = [
  'text-[14px] text-[var(--muted-foreground)]',
  'flex items-center justify-end gap-3',
]

export const dsConfirmDialogSafelist = [...new Set([
  ...confirmDialogClasses.flatMap(splitClassTokens),
])]