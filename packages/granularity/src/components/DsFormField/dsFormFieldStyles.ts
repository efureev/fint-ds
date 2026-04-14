function splitClassTokens(value: string): string[] {
  return value.split(/\s+/).filter(Boolean)
}

export const dsFormFieldSafelist = [...new Set([
  ...splitClassTokens('flex flex-col gap-2'),
  ...splitClassTokens('text-sm text-[var(--muted-fg)]'),
  ...splitClassTokens('text-sm text-[var(--ds-danger)]'),
])]