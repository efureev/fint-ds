export type DsButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'ghost-border'
export type DsButtonLegacyVariant = DsButtonVariant | 'destructive'
export type DsButtonTone = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'
export type DsButtonSize = 'xs' | 'sm' | 'md' | 'lg'

type DsButtonClassOptions = {
  variant: DsButtonVariant
  tone: DsButtonTone
  size: DsButtonSize
  square: boolean
}

type DsButtonToneTokens = {
  solidBackground: string
  solidBackgroundHover: string
  solidBackgroundActive: string
  solidForeground: string
  accentText: string
  softBackground: string
  softBackgroundHover: string
  softBackgroundActive: string
  softForeground: string
  border: string
  borderHover: string
  borderActive: string
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

const tones: Record<DsButtonTone, DsButtonToneTokens> = {
  primary: {
    solidBackground: 'var(--ds-button-primary-background,var(--primary))',
    solidBackgroundHover: 'var(--ds-button-primary-background-hover,var(--primary-hover))',
    solidBackgroundActive: 'var(--ds-button-primary-background-active,var(--primary-active))',
    solidForeground: 'var(--ds-button-primary-foreground,var(--primary-foreground))',
    accentText: 'var(--accent-foreground)',
    softBackground: 'color-mix(in srgb, var(--primary) 14%, var(--background))',
    softBackgroundHover: 'color-mix(in srgb, var(--primary) 18%, var(--background))',
    softBackgroundActive: 'color-mix(in srgb, var(--primary) 24%, var(--background))',
    softForeground: 'var(--accent-foreground)',
    border: 'var(--primary)',
    borderHover: 'var(--primary-hover)',
    borderActive: 'var(--primary-active)',
  },
  neutral: {
    solidBackground: 'var(--secondary)',
    solidBackgroundHover: 'var(--secondary-hover)',
    solidBackgroundActive: 'var(--secondary-active)',
    solidForeground: 'var(--secondary-foreground)',
    accentText: 'var(--foreground)',
    softBackground: 'var(--secondary)',
    softBackgroundHover: 'var(--secondary-hover)',
    softBackgroundActive: 'var(--secondary-active)',
    softForeground: 'var(--secondary-foreground)',
    border: 'var(--border)',
    borderHover: 'var(--border-hover,var(--border))',
    borderActive: 'var(--border-active,var(--border))',
  },
  success: {
    solidBackground: 'var(--ds-button-success-background,var(--ds-success))',
    solidBackgroundHover: 'var(--ds-button-success-background-hover,var(--ds-success-hover))',
    solidBackgroundActive: 'var(--ds-button-success-background-active,var(--ds-success-active))',
    solidForeground: 'var(--ds-button-success-foreground,var(--ds-success-foreground,var(--foreground)))',
    accentText: 'var(--ds-success-text,var(--ds-success))',
    softBackground: 'var(--ds-success-light)',
    softBackgroundHover: 'color-mix(in srgb, var(--ds-success) 20%, var(--background))',
    softBackgroundActive: 'color-mix(in srgb, var(--ds-success) 26%, var(--background))',
    softForeground: 'var(--ds-success-text,var(--ds-success))',
    border: 'var(--ds-success)',
    borderHover: 'var(--ds-success-hover)',
    borderActive: 'var(--ds-success-active)',
  },
  warning: {
    solidBackground: 'var(--ds-button-warning-background,var(--ds-warning))',
    solidBackgroundHover: 'var(--ds-button-warning-background-hover,var(--ds-warning-hover))',
    solidBackgroundActive: 'var(--ds-button-warning-background-active,var(--ds-warning-active))',
    solidForeground: 'var(--ds-button-warning-foreground,var(--ds-warning-foreground,var(--foreground)))',
    accentText: 'var(--ds-warning-text,var(--ds-warning))',
    softBackground: 'var(--ds-warning-light)',
    softBackgroundHover: 'color-mix(in srgb, var(--ds-warning) 20%, var(--background))',
    softBackgroundActive: 'color-mix(in srgb, var(--ds-warning) 26%, var(--background))',
    softForeground: 'var(--ds-warning-text,var(--ds-warning))',
    border: 'var(--ds-warning)',
    borderHover: 'var(--ds-warning-hover)',
    borderActive: 'var(--ds-warning-active)',
  },
  danger: {
    solidBackground: 'var(--ds-button-danger-background,var(--ds-danger))',
    solidBackgroundHover: 'var(--ds-button-danger-background-hover,var(--ds-danger-hover))',
    solidBackgroundActive: 'var(--ds-button-danger-background-active,var(--ds-danger-active))',
    solidForeground: 'var(--ds-button-danger-foreground,var(--ds-danger-foreground,var(--foreground)))',
    accentText: 'var(--ds-danger-text,var(--ds-danger))',
    softBackground: 'var(--ds-danger-light)',
    softBackgroundHover: 'color-mix(in srgb, var(--ds-danger) 20%, var(--background))',
    softBackgroundActive: 'color-mix(in srgb, var(--ds-danger) 26%, var(--background))',
    softForeground: 'var(--ds-danger-text,var(--ds-danger))',
    border: 'var(--ds-danger)',
    borderHover: 'var(--ds-danger-hover)',
    borderActive: 'var(--ds-danger-active)',
  },
  info: {
    solidBackground: 'var(--ds-button-info-background,var(--ds-info))',
    solidBackgroundHover: 'var(--ds-button-info-background-hover,var(--ds-info-hover))',
    solidBackgroundActive: 'var(--ds-button-info-background-active,var(--ds-info-active))',
    solidForeground: 'var(--ds-button-info-foreground,var(--ds-info-foreground,var(--foreground)))',
    accentText: 'var(--ds-info-text,var(--ds-info))',
    softBackground: 'var(--ds-info-light)',
    softBackgroundHover: 'color-mix(in srgb, var(--ds-info) 20%, var(--background))',
    softBackgroundActive: 'color-mix(in srgb, var(--ds-info) 26%, var(--background))',
    softForeground: 'var(--ds-info-text,var(--ds-info))',
    border: 'var(--ds-info)',
    borderHover: 'var(--ds-info-hover)',
    borderActive: 'var(--ds-info-active)',
  },
}

function withVar(token: string): string {
  return `[${token}]`
}

function variantClass(variant: DsButtonVariant, tone: DsButtonTone): string {
  const tokens = tones[tone]

  if (variant === 'primary') {
    return [
      `bg-${withVar(tokens.solidBackground)}`,
      `text-${withVar(tokens.solidForeground)}`,
      `border border-${withVar(tokens.solidBackground)}`,
      `hover:bg-${withVar(tokens.solidBackgroundHover)}`,
      `hover:border-${withVar(tokens.solidBackgroundHover)}`,
      `active:bg-${withVar(tokens.solidBackgroundActive)}`,
      `active:border-${withVar(tokens.solidBackgroundActive)}`,
    ].join(' ')
  }

  if (variant === 'secondary') {
    return [
      `bg-${withVar(tokens.softBackground)}`,
      `text-${withVar(tokens.softForeground)}`,
      `border border-${withVar(tokens.border)}`,
      `hover:bg-${withVar(tokens.softBackgroundHover)}`,
      `hover:border-${withVar(tokens.borderHover)}`,
      `active:bg-${withVar(tokens.softBackgroundActive)}`,
      `active:border-${withVar(tokens.borderActive)}`,
    ].join(' ')
  }

  if (variant === 'outline') {
    return [
      'bg-transparent',
      `text-${withVar(tokens.accentText)}`,
      `border border-${withVar(tokens.border)}`,
      `hover:bg-${withVar(tokens.softBackground)}`,
      `hover:border-${withVar(tokens.borderHover)}`,
      `active:bg-${withVar(tokens.softBackgroundHover)}`,
      `active:border-${withVar(tokens.borderActive)}`,
    ].join(' ')
  }

  if (variant === 'ghost') {
    return [
      'bg-transparent',
      `text-${withVar(tokens.accentText)}`,
      `hover:bg-${withVar(tokens.softBackground)}`,
      `active:bg-${withVar(tokens.softBackgroundHover)}`,
    ].join(' ')
  }

  return [
    'bg-transparent',
    `text-${withVar(tokens.accentText)}`,
    'border border-transparent',
    `hover:bg-${withVar(tokens.softBackground)}`,
    `hover:border-${withVar(tokens.borderHover)}`,
    `active:bg-${withVar(tokens.softBackgroundHover)}`,
    `active:border-${withVar(tokens.borderActive)}`,
  ].join(' ')
}

export function resolveDsButtonVariant(options: {
  variant: DsButtonLegacyVariant
  tone: DsButtonTone
}): { variant: DsButtonVariant, tone: DsButtonTone } {
  if (options.variant === 'destructive') {
    return {
      variant: 'primary',
      tone: 'danger',
    }
  }

  return {
    variant: options.variant,
    tone: options.tone,
  }
}

const variantTokens = (Object.keys(tones) as DsButtonTone[]).flatMap(tone =>
  (['primary', 'secondary', 'outline', 'ghost', 'ghost-border'] as DsButtonVariant[])
    .flatMap(variant => splitClassTokens(variantClass(variant, tone))),
)

export const dsButtonClassTokens = {
  base: splitClassTokens(base),
  sizes: Object.values(sizes).flatMap(splitClassTokens),
  squareSizes: Object.values(squareSizes).flatMap(splitClassTokens),
  variants: variantTokens,
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
    variantClass(options.variant, options.tone),
  ].join(' ')
}
