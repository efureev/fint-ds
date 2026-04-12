import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetMini,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

import {presetGranularity} from '@feugene/granularity/uno'

export const showcaseContentIncludes = [
    /apps\/showcase\/src\/.*\.(vue|ts)($|\?)/,
]

export default defineConfig({
    content: {
        pipeline: {
            include: showcaseContentIncludes,
        },
    },
    presets: [
        presetMini(),
        presetGranularity({
            components: 'all',
        }),
        presetAttributify(),
        presetIcons({
            scale: 1.05,
            extraProperties: {
                display: 'inline-block',
            },
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})