const colorsDynamicClasses = [
  'text-emerald-500'
]

const dialogPanelDynamicClasses = [
  'max-w-[420px]',
  'max-w-[560px]',
  'max-w-[720px]',
  'max-w-[920px]',
  'max-w-none',
  'rounded-[var(--ds-radius-xl)]',
  'rounded-none',
  'sm:rounded-[var(--ds-radius-xl)]',
  'h-[100svh]',
  'sm:h-auto',
]

const buttonVariantDynamicClasses = [
  'bg-[var(--primary)]',
  'text-[var(--primary-foreground)]',
  'hover:bg-[var(--primary-hover)]',
  'active:bg-[var(--primary-active)]',
  'bg-[var(--secondary)]',
  'text-[var(--secondary-foreground)]',
  'hover:bg-[var(--secondary-hover)]',
  'active:bg-[var(--secondary-active)]',
  'text-[var(--foreground)]',
  'border-[var(--border)]',
  'hover:bg-[var(--muted)]',
  'active:bg-[var(--secondary)]',
  'bg-[var(--destructive)]',
  'text-[var(--destructive-foreground)]',
  'hover:bg-[var(--destructive-hover)]',
  'active:bg-[var(--destructive-active)]',
]

export const fintDsUnoSafelist = [
  ...colorsDynamicClasses,
  ...dialogPanelDynamicClasses,
  ...buttonVariantDynamicClasses,
]