function splitClassTokens(value: string): string[] {
  return value.split(/\s+/).filter(Boolean)
}

const promptClasses = [
  'grid gap-4',
  'text-[14px] text-[var(--muted-foreground)]',
  'flex items-center justify-end gap-3',
]

export const dsPromptDialogSafelist = [...new Set([
  ...promptClasses.flatMap(splitClassTokens),
])]