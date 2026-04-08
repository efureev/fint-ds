<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@ds/composables/useToast'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const openConfirm = ref(false)
const openNarrowConfirm = ref(false)
const openDestructiveConfirm = ref(false)
const openPrompt = ref(false)
const openDestructivePrompt = ref(false)
const promptValue = ref('')
const destructivePromptValue = ref('')

const openModal = ref(false)
const openDialog = ref(false)
const openDialogWithoutHeader = ref(false)
const openDialogWithCustomHeader = ref(false)
const openDialogWithCompactSections = ref(false)

const compactHeaderConfig = {
  paddingX: 'px-3',
  paddingY: 'py-2',
  bordered: false,
} as const

const compactFooterConfig = {
  paddingX: 'px-3',
  paddingY: 'py-2',
  bordered: false,
} as const

const modalPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'boolean',
    description: 'Открытие/закрытие базового модального контейнера.',
  },
  {
    name: 'closeOnBackdrop',
    type: 'boolean',
    default: 'true',
    description: 'Закрывать при клике по фону (ESC закрывает всегда).',
  },
  {
    name: 'size',
    type: '\'sm\' | \'md\' | \'lg\' | \'xl\' | \'full\'',
    default: '\'md\'',
    description: 'Размер модального окна.',
  },
] as const

const modalSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Произвольный контент базового окна без header/footer.',
  },
] as const

const dialogPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'boolean',
    description: 'Открытие/закрытие диалога.',
  },
  {
    name: 'title',
    type: 'string | undefined',
    description: 'Заголовок диалога. Используется в дефолтном header и для доступности.',
  },
  {
    name: 'showHeader',
    type: 'boolean',
    default: 'true',
    description: 'Полностью скрывает визуальный header.',
  },
  {
    name: 'showCloseButton',
    type: 'boolean',
    default: 'true',
    description: 'Показывает/скрывает отдельную кнопку закрытия в header.',
  },
  {
    name: 'headerConfig',
    type: 'DsDialogSectionConfig | undefined',
    description: 'Настраивает `paddingX`, `paddingY` и `bordered` для дефолтного header.',
  },
  {
    name: 'footerConfig',
    type: 'DsDialogSectionConfig | undefined',
    description: 'Настраивает `paddingX`, `paddingY` и `bordered` для дефолтного footer.',
  },
  {
    name: 'closeOnBackdrop',
    type: 'boolean',
    default: 'true',
    description: 'Закрывать при клике по фону (ESC закрывает всегда).',
  },
  {
    name: 'size',
    type: '\'sm\' | \'md\' | \'lg\' | \'xl\' | \'full\'',
    default: '\'md\'',
    description: 'Размер окна.',
  },
] as const

const dialogSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Контент тела диалога.',
  },
  {
    name: 'slot (header)',
    type: 'slot',
    description: 'Кастомный header. Если слот не передан — рендерится дефолтный header.',
  },
  {
    name: 'slot (footer)',
    type: 'slot',
    description: 'Контент футера.',
  },
] as const

const toast = useToast()

function onConfirmed() {
  toast.push({ title: 'Confirmed', variant: 'success' })
}

function onDestructiveConfirmed() {
  toast.push({ title: 'Deleted', message: 'Destructive action confirmed.', variant: 'warning' })
}

function onPrompted(value: string) {
  toast.push({ title: 'Prompt result', message: `Value: ${value}`, variant: 'info' })
}

function onDestructivePrompted(value: string) {
  toast.push({ title: 'Destructive prompt', message: `Deleted: ${value}`, variant: 'warning' })
}

const confirmDialogPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'boolean',
    description: 'Открытие/закрытие диалога (управляемый компонент).',
  },
  {
    name: 'title',
    type: 'string | undefined',
    description: 'Заголовок. Если не задан — используется локализованный дефолт (Confirm).',
  },
  {
    name: 'description',
    type: 'string | undefined',
    description: 'Текст в теле диалога (короткое объяснение действия).',
  },
  {
    name: 'closeOnBackdrop',
    type: 'boolean',
    default: 'true',
    description: 'Закрывать при клике по фону (ESC закрывает всегда).',
  },
  {
    name: 'size',
    type: '\'sm\' | \'md\' | \'lg\' | \'xl\' | \'full\'',
    default: '\'md\'',
    description: 'Размер модального окна.',
  },
  {
    name: 'confirmText',
    type: 'string | undefined',
    description: 'Текст кнопки подтверждения. Если не задан — берётся локализованный дефолт.',
  },
  {
    name: 'cancelText',
    type: 'string | undefined',
    description: 'Текст кнопки отмены. Если не задан — берётся локализованный дефолт.',
  },
  {
    name: 'confirmVariant',
    type: '\'primary\' | \'secondary\' | \'outline\' | \'ghost\' | \'destructive\'',
    default: '\'primary\'',
    description: 'Variant кнопки подтверждения.',
  },
] as const

const confirmDialogSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Кастомный контент тела диалога (вместо description).',
  },
  {
    name: 'slot (footer)',
    type: 'slot',
    description: 'Кастомный футер (если нужен нестандартный набор кнопок).',
  },
] as const

const confirmDialogEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: boolean) => void',
    description: 'Эмитится при открытии/закрытии.',
  },
  {
    name: '@confirm',
    type: '() => void',
    description: 'Срабатывает при подтверждении (после чего диалог закрывается).',
  },
  {
    name: '@cancel',
    type: '() => void',
    description: 'Срабатывает при отмене (после чего диалог закрывается).',
  },
] as const

const promptDialogPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'boolean',
    description: 'Открытие/закрытие диалога (управляемый компонент).',
  },
  {
    name: 'v-model:value / value',
    type: 'string',
    description: 'Текущее значение инпута внутри prompt-диалога (двусторонняя связь).',
  },
  {
    name: 'title',
    type: 'string | undefined',
    description: 'Заголовок. Если не задан — используется локализованный дефолт (Prompt).',
  },
  {
    name: 'description',
    type: 'string | undefined',
    description: 'Текст/описание над полем ввода.',
  },
  {
    name: 'label',
    type: 'string | undefined',
    description: 'Лейбл поля. Если не задан — локализованный дефолт (Value).',
  },
  {
    name: 'placeholder',
    type: 'string | undefined',
    description: 'Плейсхолдер поля.',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'true',
    description: 'Если true — запрещает confirm при пустом значении и показывает ошибку.',
  },
  {
    name: 'closeOnBackdrop',
    type: 'boolean',
    default: 'true',
    description: 'Закрывать при клике по фону (ESC закрывает всегда).',
  },
  {
    name: 'size',
    type: '\'sm\' | \'md\' | \'lg\' | \'xl\' | \'full\'',
    default: '\'md\'',
    description: 'Размер модального окна.',
  },
  {
    name: 'confirmText',
    type: 'string | undefined',
    description: 'Текст кнопки подтверждения. Если не задан — берётся локализованный дефолт.',
  },
  {
    name: 'cancelText',
    type: 'string | undefined',
    description: 'Текст кнопки отмены. Если не задан — берётся локализованный дефолт.',
  },
  {
    name: 'confirmVariant',
    type: '\'primary\' | \'secondary\' | \'outline\' | \'ghost\' | \'destructive\'',
    default: '\'primary\'',
    description: 'Variant кнопки подтверждения.',
  },
] as const

const promptDialogSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Кастомный контент над полем (вместо description).',
  },
  {
    name: 'slot (footer)',
    type: 'slot',
    description: 'Кастомный футер (если нужен нестандартный набор кнопок).',
  },
] as const

const promptDialogEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: boolean) => void',
    description: 'Эмитится при открытии/закрытии.',
  },
  {
    name: '@update:value',
    type: '(value: string) => void',
    description: 'Эмитится при вводе в поле.',
  },
  {
    name: '@confirm',
    type: '(value: string) => void',
    description: 'Срабатывает при подтверждении (после чего диалог закрывается).',
  },
  {
    name: '@cancel',
    type: '() => void',
    description: 'Срабатывает при отмене (после чего диалог закрывается).',
  },
] as const

const toasterInfo = [
  {
    name: 'DsToaster',
    type: 'component',
    description: 'Хост для toast-уведомлений (рендерит список через teleport в body).',
  },
] as const

const toastApiInfo = [
  {
    name: 'useToast().list',
    type: 'ComputedRef<Toast[]>',
    description: 'Реактивный список текущих toast-ов.',
  },
  {
    name: 'useToast().push(input)',
    type: '(input: { title: string; message?: string; variant?: \'info\'|\'success\'|\'warning\'|\'danger\'; timeoutMs?: number }) => string',
    description: 'Показать toast. Возвращает id. timeoutMs по умолчанию 3500; если timeoutMs<=0 — не автоскрывать.',
  },
  {
    name: 'useToast().dismiss(id)',
    type: '(id: string) => void',
    description: 'Скрыть toast по id.',
  },
  {
    name: 'useToast().clear()',
    type: '() => void',
    description: 'Очистить все toast-уведомления.',
  },
] as const

const usageCode = [
  '<script setup lang="ts">',
  'import { ref } from \'vue\'',
  'import { useToast } from \'@ds/composables/useToast\'',
  '',
  'const openConfirm = ref(false)',
  'const openDestructiveConfirm = ref(false)',
  'const openPrompt = ref(false)',
  'const openDestructivePrompt = ref(false)',
  'const promptValue = ref(\'\')',
  'const destructivePromptValue = ref(\'\')',
  '',
  'const openModal = ref(false)',
  'const openDialog = ref(false)',
  'const openDialogWithoutHeader = ref(false)',
  'const openDialogWithCustomHeader = ref(false)',
  'const openDialogWithCompactSections = ref(false)',
  '',
  'const compactHeaderConfig = {',
  '  paddingX: \'px-3\',',
  '  paddingY: \'py-2\',',
  '  bordered: false,',
  '} as const',
  '',
  'const compactFooterConfig = {',
  '  paddingX: \'px-3\',',
  '  paddingY: \'py-2\',',
  '  bordered: false,',
  '} as const',
  '',
  'const toast = useToast()',
  '</scr' + 'ipt>',
  '',
  '<template>',
  '  <DsModal v-model="openModal" size="sm">',
  '    <div class="grid gap-3">',
  '      <div class="text-[14px] font-600">Bare modal</div>',
  '      <div class="text-[14px] text-[var(--muted-foreground)]">Это только базовый контейнер с минимальным внутренним padding.</div>',
  '      <DsButton @click="openModal = false">Close</DsButton>',
  '    </div>',
  '  </DsModal>',
  '',
  '  <DsDialog v-model="openDialog" title="Dialog title">',
  '    <div class="grid gap-3">',
  '      <div class="text-[14px]">Стандартный диалог поверх <code>DsModal</code> с дефолтным header и footer.</div>',
  '    </div>',
  '',
  '    <template #footer>',
  '      <div class="flex justify-end gap-3">',
  '        <DsButton variant="outline" @click="openDialog = false">Cancel</DsButton>',
  '        <DsButton @click="openDialog = false">Save</DsButton>',
  '      </div>',
  '    </template>',
  '  </DsDialog>',
  '',
  '  <DsDialog v-model="openDialogWithoutHeader" title="No header" :show-header="false">',
  '    <div class="grid gap-3">',
  '      <div class="text-[14px]">Визуальный header полностью скрыт, остаётся только тело.</div>',
  '      <DsButton class="justify-self-start" @click="openDialogWithoutHeader = false">Close</DsButton>',
  '    </div>',
  '  </DsDialog>',
  '',
  '  <DsDialog v-model="openDialogWithCustomHeader" title="Custom header">',
  '    <template #header="{ title }">',
  '      <div class="flex items-center gap-2">',
  '        <div class="text-[14px] font-700">{{ title }}</div>',
  '        <div class="text-[12px] text-[var(--muted-foreground)]">(custom)</div>',
  '      </div>',
  '    </template>',
  '',
  '    <div class="grid gap-3">',
  '      <div class="text-[14px]">Хедер переопределён через слот <code>#header</code>, кнопка закрытия вынесена в отдельный под-компонент.</div>',
  '      <DsButton @click="openDialogWithCustomHeader = false">Close</DsButton>',
  '    </div>',
  '',
  '    <template #footer>',
  '      <div class="flex justify-end gap-3">',
  '        <DsButton variant="outline" @click="openDialogWithCustomHeader = false">Cancel</DsButton>',
  '      </div>',
  '    </template>',
  '  </DsDialog>',
  '',
  '  <DsDialog',
  '    v-model="openDialogWithCompactSections"',
  '    title="Compact sections"',
  '    :header-config="compactHeaderConfig"',
  '    :footer-config="compactFooterConfig"',
  '  >',
  '    <div class="grid gap-3">',
  '      <div class="text-[14px]">Пример с уменьшенными отступами у header/footer и отключёнными border-разделителями.</div>',
  '    </div>',
  '',
  '    <template #footer>',
  '      <div class="flex justify-end gap-2">',
  '        <DsButton variant="outline" @click="openDialogWithCompactSections = false">Later</DsButton>',
  '        <DsButton @click="openDialogWithCompactSections = false">Apply</DsButton>',
  '      </div>',
  '    </template>',
  '  </DsDialog>',
  '',
  '  <DsConfirmDialog v-model="openConfirm" description="Are you sure?" @confirm="toast.push({ title: \'Confirmed\', variant: \'success\' })" />',
  '',
  '  <DsConfirmDialog',
  '    v-model="openDestructiveConfirm"',
  '    title="Delete item"',
  '    description="This action cannot be undone."',
  '    confirm-text="Delete"',
  '    confirm-variant="destructive"',
  '    @confirm="toast.push({ title: \'Deleted\', variant: \'warning\' })"',
  '  />',
  '',
  '  <DsPromptDialog',
  '    v-model="openPrompt"',
  '    v-model:value="promptValue"',
  '    description="Enter something"',
  '    @confirm="(v) => toast.push({ title: \'Prompt result\', message: \'Value: \' + v, variant: \'info\' })"',
  '  />',
  '',
  '  <DsPromptDialog',
  '    v-model="openDestructivePrompt"',
  '    v-model:value="destructivePromptValue"',
  '    title="Delete project"',
  '    label="Project name"',
  '    placeholder="Type project name"',
  '    description="Confirm deletion by entering the project name."',
  '    confirm-text="Delete"',
  '    confirm-variant="destructive"',
  '    @confirm="(v) => toast.push({ title: \'Deleted\', message: \'Project: \' + v, variant: \'warning\' })"',
  '  />',
  '',
  '  <DsToaster />',
  '</template>',
].join('\n')
</script>

<template>
  <PlaygroundPage title="Dialogs">
    <template #ui>
      <div class="grid gap-4">
        <DsCard class="p-5 grid gap-4">
          <div class="grid gap-1">
            <div class="text-[18px] font-600">От базового контейнера к готовым сценариям</div>
            <div class="text-[14px] text-[var(--muted-foreground)]">
              Примеры сгруппированы по уровню абстракции: сначала чистый `DsModal`, затем `DsDialog`, после —
              специализированные confirm/prompt-диалоги.
            </div>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="grid gap-1">
            <div class="text-[16px] font-600">1. DsModal</div>
            <div class="text-[14px] text-[var(--muted-foreground)]">Базовое модальное окно без встроенных визуальных
              элементов — только контейнер и ваш контент.
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <DsButton @click="openModal = true">Open modal</DsButton>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="grid gap-1">
            <div class="text-[16px] font-600">2. DsDialog</div>
            <div class="text-[14px] text-[var(--muted-foreground)]">Надстройка над `DsModal` с header/footer и
              вариантами кастомизации.
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <DsButton variant="outline" @click="openDialog = true">Open dialog</DsButton>
            <DsButton variant="outline" @click="openDialogWithoutHeader = true">Open dialog (no header)</DsButton>
            <DsButton variant="outline" @click="openDialogWithCustomHeader = true">Open dialog (custom header)
            </DsButton>
            <DsButton variant="outline" @click="openDialogWithCompactSections = true">Open dialog (compact sections)
            </DsButton>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="grid gap-1">
            <div class="text-[16px] font-600">3. DsConfirmDialog</div>
            <div class="text-[14px] text-[var(--muted-foreground)]">Готовый confirm-сценарий поверх `DsDialog` с
              подтверждением действия.
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <DsButton variant="outline" @click="openConfirm = true">Open confirm</DsButton>
            <DsButton variant="outline" @click="openNarrowConfirm = true">Open narrow confirm</DsButton>
            <DsButton variant="outline" @click="openDestructiveConfirm = true">Open destructive confirm</DsButton>
          </div>
        </DsCard>

        <DsCard class="p-5 grid gap-4">
          <div class="grid gap-1">
            <div class="text-[16px] font-600">4. DsPromptDialog</div>
            <div class="text-[14px] text-[var(--muted-foreground)]">Самый функциональный пример: подтверждение действия
              вместе со вводом значения.
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <DsButton variant="outline" @click="openPrompt = true">Open prompt</DsButton>
            <DsButton variant="outline" @click="openDestructivePrompt = true">Open destructive prompt</DsButton>
          </div>
        </DsCard>

        <DsModal v-model="openModal" size="sm">
          <div class="grid gap-3">
            <div class="text-[14px] font-600">Bare modal</div>
            <div class="text-[14px] text-[var(--muted-foreground)]">Это только базовый контейнер с минимальным
              внутренним padding.
            </div>
            <DsButton @click="openModal = false">Close</DsButton>
          </div>
        </DsModal>

        <DsDialog v-model="openDialog" title="Dialog title">
          <div class="grid gap-3">
            <div class="text-[14px]">Стандартный диалог поверх <code>DsModal</code> с дефолтным header и footer.</div>
          </div>

          <template #footer>
            <div class="flex justify-end gap-3">
              <DsButton variant="outline" @click="openDialog = false">Cancel</DsButton>
              <DsButton @click="openDialog = false">Save</DsButton>
            </div>
          </template>
        </DsDialog>

        <DsDialog v-model="openDialogWithoutHeader" title="No header" :show-header="false">
          <div class="grid gap-3">
            <div class="text-[14px]">Визуальный header полностью скрыт, остаётся только тело.</div>
            <DsButton class="justify-self-start" @click="openDialogWithoutHeader = false">Close</DsButton>
          </div>
        </DsDialog>

        <DsDialog v-model="openDialogWithCustomHeader" title="Custom header">
          <template #header="{ title }">
            <div class="flex items-center gap-2">
              <div class="text-[14px] font-700">{{ title }}</div>
              <div class="text-[12px] text-[var(--muted-foreground)]">(custom)</div>
            </div>
          </template>

          <div class="grid gap-3">
            <div class="text-[14px]">Хедер переопределён через слот <code>#header</code>, кнопка закрытия вынесена в
              отдельный под-компонент.
            </div>
            <DsButton @click="openDialogWithCustomHeader = false">Close</DsButton>
          </div>

          <template #footer>
            <div class="flex justify-end gap-3">
              <DsButton variant="outline" @click="openDialogWithCustomHeader = false">Cancel</DsButton>
            </div>
          </template>
        </DsDialog>

        <DsDialog
            v-model="openDialogWithCompactSections"
            title="Compact sections"
            :header-config="compactHeaderConfig"
            :footer-config="compactFooterConfig"
        >
          <div class="grid gap-3">
            <div class="text-[14px]">Пример с уменьшенными отступами у header/footer и отключёнными
              border-разделителями.
            </div>
          </div>

          <template #footer>
            <div class="flex justify-end gap-2">
              <DsButton variant="outline" @click="openDialogWithCompactSections = false">Later</DsButton>
              <DsButton @click="openDialogWithCompactSections = false">Apply</DsButton>
            </div>
          </template>
        </DsDialog>

        <DsConfirmDialog v-model="openConfirm" description="Are you sure?" @confirm="onConfirmed" />
        <DsConfirmDialog
            v-model="openNarrowConfirm"
            description="Are you sure?"
            button-size="xs"
            :header-config="{paddingX: 'px-3', paddingY: 'py-1'}"
            :footer-config="{paddingX: 'px-2', paddingY: 'py-2'}"
            @confirm="onConfirmed"
        />
        <DsConfirmDialog
            v-model="openDestructiveConfirm"
            title="Delete item"
            description="This action cannot be undone."
            confirm-text="Delete"
            confirm-variant="destructive"
            @confirm="onDestructiveConfirmed"
        />

        <DsPromptDialog
            v-model="openPrompt"
            v-model:value="promptValue"
            description="Enter something"
            @confirm="onPrompted"
        />
        <DsPromptDialog
            v-model="openDestructivePrompt"
            v-model:value="destructivePromptValue"
            title="Delete project"
            label="Project name"
            placeholder="Type project name"
            description="Confirm deletion by entering the project name."
            confirm-text="Delete"
            confirm-variant="destructive"
            @confirm="onDestructivePrompted"
        />

        <DsToaster />
      </div>
    </template>

    <template #usage>
      <pre
          class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code
          class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsModal — Props" :items="modalPropsInfo" />
      <PlaygroundProps title="DsModal — Slots" :items="modalSlotsInfo" />
      <PlaygroundProps title="DsDialog — Props" :items="dialogPropsInfo" />
      <PlaygroundProps title="DsDialog — Slots" :items="dialogSlotsInfo" />
      <PlaygroundProps title="DsConfirmDialog — Props" :items="confirmDialogPropsInfo" />
      <PlaygroundProps title="DsConfirmDialog — Slots" :items="confirmDialogSlotsInfo" />
      <PlaygroundProps title="DsConfirmDialog — Events" :items="confirmDialogEventsInfo" />
      <PlaygroundProps title="DsPromptDialog — Props" :items="promptDialogPropsInfo" />
      <PlaygroundProps title="DsPromptDialog — Slots" :items="promptDialogSlotsInfo" />
      <PlaygroundProps title="DsPromptDialog — Events" :items="promptDialogEventsInfo" />
      <PlaygroundProps title="DsToaster" :items="toasterInfo" />
      <PlaygroundProps title="useToast()" :items="toastApiInfo" />
    </template>
  </PlaygroundPage>
</template>
