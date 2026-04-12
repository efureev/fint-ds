import type { ShowcaseApiSectionMeta } from './model.ts'

export type ShowcaseComponentApiFallback = Partial<Record<'props' | 'slots' | 'events' | 'methods', ShowcaseApiSectionMeta>>

export const showcaseComponentApiFallbacks: Record<string, ShowcaseComponentApiFallback> = {
  DsButton: {
    slots: {
      key: 'slots',
      title: 'Slots',
      origin: 'manual',
      items: [
        {
          name: 'default',
          description: 'Текст кнопки, иконка или произвольный контент внутри `DsButton`.',
          type: '() => VNode[]',
        },
      ],
    },
  },
  DsCard: {
    slots: {
      key: 'slots',
      title: 'Slots',
      origin: 'manual',
      items: [
        {
          name: 'default',
          description: 'Основное содержимое карточки.',
          type: '() => VNode[]',
        },
      ],
    },
  },
}