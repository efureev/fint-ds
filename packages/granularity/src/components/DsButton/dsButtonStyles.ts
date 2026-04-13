export type DsButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'ghost-border' | 'destructive'
export type DsButtonSize = 'xs' | 'sm' | 'md' | 'lg'

type DsButtonClassOptions = {
    variant: DsButtonVariant
    size: DsButtonSize
    square: boolean
}

function splitClassTokens(value: string): string[] {
    return value.split(/\s+/).filter(Boolean)
}

const base =
    'inline-flex items-center justify-center gap-2 select-none whitespace-nowrap rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-50 disabled:cursor-not-allowed'

const sizes: Record<DsButtonSize, string> = {
    xs: 'h-7 text-xs px-2.5',
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-sm px-4',
    lg: 'h-11 text-base px-5',
}

const squareSizes: Record<DsButtonSize, string> = {
    xs: 'h-7 w-7 p-0',
    sm: 'h-8 w-8 p-0',
    md: 'h-10 w-10 p-0',
    lg: 'h-11 w-11 p-0',
}

const variants: Record<DsButtonVariant, string> = {
    primary: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)]',
    secondary:
        'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-hover)] active:bg-[var(--secondary-active)]',
    outline:
        'bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--muted)] active:bg-[var(--secondary)]',
    ghost: 'bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)] active:bg-[var(--secondary)]',
    'ghost-border':
        'bg-transparent text-[var(--foreground)] border border-transparent hover:border-[var(--border-hover,var(--border))] active:border-[var(--border-active,var(--border))]',
    destructive:
        'bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[var(--destructive-hover)] active:bg-[var(--destructive-active)]',
}

export const dsButtonClassTokens = {
    base: splitClassTokens(base),
    sizes: Object.values(sizes).flatMap(splitClassTokens),
    squareSizes: Object.values(squareSizes).flatMap(splitClassTokens),
    variants: Object.values(variants).flatMap(splitClassTokens),
    template: ['h-4', 'w-4', 'animate-spin'],
} as const

export const dsButtonSafelist = [...new Set([
    ...dsButtonClassTokens.base,
    ...dsButtonClassTokens.sizes,
    ...dsButtonClassTokens.squareSizes,
    ...dsButtonClassTokens.variants,
    ...dsButtonClassTokens.template,
])]

export function dsButtonClass(options: DsButtonClassOptions): string {
    return [
        base,
        options.square ? squareSizes[options.size] : sizes[options.size],
        variants[options.variant],
    ].join(' ')
}
