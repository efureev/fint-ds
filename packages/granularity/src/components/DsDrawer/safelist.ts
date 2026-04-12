function splitClassTokens(value: string): string[] {
  return value.split(/\s+/).filter(Boolean)
}

const drawerClasses = [
  'fixed inset-0 inset-y-0 z-50',
  'duration-200 ease-out duration-150 ease-in',
  'opacity-0 opacity-100 translate-x-0 -translate-x-full translate-x-full',
  'bg-black/40',
  'left-0 border-r right-0 border-l',
  'w-[360px] max-w-[90vw] w-[420px] max-w-[92vw] w-[560px] max-w-[94vw] w-[100vw]',
  'border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-[var(--ds-shadow-2)] outline-none',
  'flex flex-col flex-1 items-center justify-between gap-4',
  'px-5 py-4 border-b border-t p-5 overflow-y-auto',
  'text-[14px] font-700 min-w-0 truncate',
  'h-4 w-4',
]

export const dsDrawerSafelist = [...new Set([
  ...drawerClasses.flatMap(splitClassTokens),
])]