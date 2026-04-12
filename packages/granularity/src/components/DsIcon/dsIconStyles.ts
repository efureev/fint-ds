export type DsIconSize = 'sm' | 'md' | 'lg'

function splitClassTokens(value: string): string[] {
  return value.split(/\s+/).filter(Boolean)
}

const base = 'inline-flex items-center justify-center align-middle'

export const dsIconClass = `:uno: ${base}`

export const dsIconClassTokens = {
  base: splitClassTokens(base),
} as const

export const dsIconSafelist = [...new Set([
  ...dsIconClassTokens.base,
])]

export function resolveDsIconSizePx(size: DsIconSize | number): number {
  if (typeof size === 'number') return size

  const map: Record<DsIconSize, number> = {
    sm: 16,
    md: 18,
    lg: 20,
  }

  return map[size]
}