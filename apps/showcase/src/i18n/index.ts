import type {App} from 'vue'

import {createFintI18n} from '@feugene/fint-i18n/core'
import {installI18n} from '@feugene/fint-i18n/vue'
import {DS_I18N_BLOCK, dsLocaleLoaders} from '@feugene/granularity/i18n'

import {SHOWCASE_I18N_BLOCK, showcaseLocaleLoaders} from './messages'

export async function setupShowcaseI18n() {
    const i18n = createFintI18n({
        locale: 'en',
        fallbackLocale: 'en',
        loaders: [showcaseLocaleLoaders, dsLocaleLoaders],
    })

    i18n.registerBlocks([SHOWCASE_I18N_BLOCK, DS_I18N_BLOCK])
    await i18n.loadUsedBlocks('en')

    return {
        install(app: App) {
            installI18n(app, i18n)
        },
    }
}
