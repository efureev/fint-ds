function splitClassTokens(value: string): string[] {
  return value.split(/\s+/).filter(Boolean)
}

const sidebarClasses = [
  'border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)]',
  'border-b border-[var(--sidebar-border)] px-4 py-4',
  'text-[14px] ds-muted',
  'text-[18px] font-700',
  'p-3',
]

export const dsSidebarSafelist = [...new Set([
  ...sidebarClasses.flatMap(splitClassTokens),
])]