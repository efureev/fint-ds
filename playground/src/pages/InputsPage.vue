<script setup lang="ts">
import { ref } from 'vue'

import PlaygroundPage from '../components/PlaygroundPage.vue'
import PlaygroundProps from '../components/PlaygroundProps.vue'

const text = ref('')
const area = ref('')
const email = ref('')
const invalid = ref(true)

const amount = ref('')
const amountComma = ref('')

const sizeXs = ref('')
const sizeSm = ref('')
const sizeMd = ref('')
const sizeLg = ref('')

const textAlign = ref<'left' | 'center' | 'right'>('left')
const textAlignOptions = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
] as const

const formFieldPropsInfo = [
  {
    name: 'label',
    type: 'string | undefined',
    description: 'Текст лейбла над полем (используйте, когда нужен заголовок/контекст ввода).',
  },
  {
    name: 'forId',
    type: 'string | undefined',
    description: 'Связывает <label> с конкретным input по id (атрибут for).',
  },
  {
    name: 'error',
    type: 'string | undefined',
    description: 'Сообщение об ошибке под контролом.',
  },
] as const

const formFieldSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Содержимое поля (обычно `DsInput`/`DsTextarea` и т.п.).',
  },
] as const

const formSectionPropsInfo = [
  {
    name: 'title',
    type: 'string',
    description: 'Заголовок секции формы.',
  },
  {
    name: 'description',
    type: 'string | undefined',
    description: 'Дополнительное описание под заголовком секции.',
  },
] as const

const formSectionSlotsInfo = [
  {
    name: 'slot (default)',
    type: 'slot',
    description: 'Содержимое секции: поля, группы контролов и любые layout-обёртки.',
  },
] as const

const inputPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'string',
    description: 'Текущее значение input (двусторонняя связь).',
  },
  {
    name: 'type',
    type: '\'text\' | \'email\' | \'password\' | \'number\' | \'search\'',
    default: '\'text\'',
    description: 'Тип native input.',
  },
  {
    name: 'placeholder',
    type: 'string | undefined',
    description: 'Плейсхолдер.',
  },
  {
    name: 'autocomplete',
    type: 'string | undefined',
    description: 'Атрибут autocomplete.',
  },
  {
    name: 'inputmode',
    type: 'InputHTMLAttributes[\'inputmode\'] | undefined',
    description: 'Подсказка для виртуальной клавиатуры (mobile).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Отключает ввод.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Форсирует состояние ошибки (aria-invalid + danger border).',
  },
  {
    name: 'state',
    type: '\'default\' | \'success\' | \'warning\' | \'danger\'',
    default: '\'default\'',
    description: 'Семантическое состояние (цвет рамки/фокуса), если invalid=false.',
  },
  {
    name: 'name',
    type: 'string | undefined',
    description: 'Атрибут name (участие в форме).',
  },
  {
    name: 'id',
    type: 'string | undefined',
    description: 'Атрибут id (для связки с label).',
  },
  {
    name: 'size',
    type: '\'xs\' | \'sm\' | \'md\' | \'lg\'',
    default: '\'md\'',
    description: 'Размер input.',
  },
  {
    name: 'textAlign',
    type: '\'left\' | \'center\' | \'right\'',
    default: '\'left\'',
    description: 'Выравнивание текста внутри поля.',
  },
  {
    name: 'prefixMinWidth',
    type: 'string | undefined',
    description: 'Минимальная ширина prefix-аддона (CSS length). По умолчанию зависит от `size`.',
  },
  {
    name: 'prefixMaxWidth',
    type: 'string | undefined',
    description: 'Максимальная ширина prefix-аддона (CSS length). При переполнении включается truncation.',
  },
  {
    name: 'suffixMinWidth',
    type: 'string | undefined',
    description: 'Минимальная ширина suffix-аддона (CSS length). По умолчанию зависит от `size`.',
  },
  {
    name: 'suffixMaxWidth',
    type: 'string | undefined',
    description: 'Максимальная ширина suffix-аддона (CSS length). При переполнении включается truncation.',
  },
] as const

const inputEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: 'Эмитится при вводе.',
  },
] as const

const inputSlotsInfo = [
  {
    name: 'prefix',
    type: 'slot',
    description: 'Readonly-префикс внутри инпута (не влияет на внешний размер, резервирует место внутри).',
  },
  {
    name: 'suffix',
    type: 'slot',
    description: 'Readonly-постфикс внутри инпута (не влияет на внешний размер, резервирует место внутри).',
  },
] as const

const numberInputPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'string',
    description: 'Текущее значение (строка). Компонент санитизирует ввод: цифры + один дробный разделитель.',
  },
  {
    name: 'decimalSeparator',
    type: 'string | undefined',
    default: '\'.\'',
    description: 'Дробный разделитель (например `.` или `,`).',
  },
  {
    name: 'controls',
    type: 'boolean',
    default: 'false',
    description: 'Показывает кнопки изменения значения (step).',
  },
  {
    name: 'controlsDirection',
    type: '\'vertical\' | \'horizontal\'',
    default: '\'vertical\'',
    description: 'Ориентация контролов: вверх/вниз или влево/вправо.',
  },
  {
    name: 'step',
    type: 'number | undefined',
    default: '1',
    description: 'Шаг изменения значения для controls.',
  },
  {
    name: 'min / max',
    type: 'number | undefined',
    description: 'Ограничение диапазона (опционально).',
  },
  {
    name: 'precision',
    type: 'number | undefined',
    description: 'Точность при изменении через controls (опционально).',
  },
  {
    name: 'size',
    type: '\'xs\' | \'sm\' | \'md\' | \'lg\'',
    default: '\'md\'',
    description: 'Размер.',
  },
  {
    name: 'textAlign',
    type: '\'left\' | \'center\' | \'right\'',
    default: '\'left\'',
    description: 'Выравнивание текста внутри поля.',
  },
  {
    name: 'prefixMinWidth / prefixMaxWidth',
    type: 'string | undefined',
    description: 'Ограничение ширины prefix-аддона (CSS length). По умолчанию minWidth зависит от `size`.',
  },
  {
    name: 'suffixMinWidth / suffixMaxWidth',
    type: 'string | undefined',
    description: 'Ограничение ширины suffix-аддона (CSS length). По умолчанию minWidth зависит от `size`.',
  },
] as const

const numberInputEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: 'Эмитится при вводе (санитизированное значение).',
  },
  {
    name: '@change',
    type: '(value: string) => void',
    description: 'Эмитится при change (санитизированное значение).',
  },
] as const

const textareaPropsInfo = [
  {
    name: 'v-model / modelValue',
    type: 'string',
    description: 'Текущее значение textarea (двусторонняя связь).',
  },
  {
    name: 'rows',
    type: 'number',
    default: '4',
    description: 'Количество строк (высота по умолчанию).',
  },
  {
    name: 'placeholder',
    type: 'string | undefined',
    description: 'Плейсхолдер.',
  },
  {
    name: 'autocomplete',
    type: 'string | undefined',
    description: 'Атрибут autocomplete.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Отключает ввод.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Форсирует состояние ошибки (aria-invalid + danger border).',
  },
  {
    name: 'state',
    type: '\'default\' | \'success\' | \'warning\' | \'danger\'',
    default: '\'default\'',
    description: 'Семантическое состояние (цвет рамки/фокуса), если invalid=false.',
  },
  {
    name: 'name',
    type: 'string | undefined',
    description: 'Атрибут name (участие в форме).',
  },
  {
    name: 'id',
    type: 'string | undefined',
    description: 'Атрибут id (для связки с label).',
  },
] as const

const textareaEventsInfo = [
  {
    name: '@update:modelValue',
    type: '(value: string) => void',
    description: 'Эмитится при вводе.',
  },
] as const

const usageCode = `<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
</scr${'ipt'}>

<template>
  <DsFormField label="Email">
    <DsInput v-model="email" type="email" placeholder="email@example.com" />
  </DsFormField>
</template>
`
</script>

<template>
  <PlaygroundPage title="Inputs">
    <template #ui>
      <DsCard class="p-5 grid gap-4">
        <DsFormSection
            title="Profile settings"
            description="Используйте DsFormSection, чтобы группировать связанные поля и добавлять короткое описание блока."
        >
          <div class="grid gap-3 sm:grid-cols-2">
            <DsFormField label="Display name">
              <DsInput v-model="text" placeholder="Alex Doe" />
            </DsFormField>

            <DsFormField label="Work email">
              <DsInput v-model="email" type="email" placeholder="alex@example.com" />
            </DsFormField>
          </div>
        </DsFormSection>
      </DsCard>
      <DsCard class="p-5 grid gap-4">
        <DsFormField label="TextAlign" :hint="'Пример переключения textAlign через DsRadioGroup (variant=button)'">
          <div class="grid gap-2">
            <DsRadioGroup v-model="textAlign" variant="button" size="sm" :options="textAlignOptions" />
            <DsInput v-model="text" :text-align="textAlign" placeholder="Type..." />
          </div>
        </DsFormField>

        <DsFormField label="Text" :hint="'Обычный DsInput'">
          <DsInput v-model="text" placeholder="Type..." />
        </DsFormField>

        <DsFormField label="Text (prefix / suffix)" :hint="'Префикс/постфикс через slots (readonly) внутри инпута'">
          <DsInput v-model="text" placeholder="0.00">
            <template #prefix>₽</template>
            <template #suffix>RUB</template>
          </DsInput>
        </DsFormField>

        <DsFormField
            label="Text (prefix / suffix min/max)"
            :hint="'Аддоны растягиваются под контент; можно ограничить min/max ширину (появится ellipsis)'"
        >
          <DsInput
              v-model="text"
              placeholder="0.00"
              prefix-min-width="2.5rem"
              prefix-max-width="7rem"
              suffix-min-width="2.5rem"
              suffix-max-width="6rem"
          >
            <template #prefix>Very long currency name</template>
            <template #suffix>International standard code</template>
          </DsInput>
        </DsFormField>

        <DsFormField label="Email" :error="invalid ? 'Invalid email' : undefined">
          <DsInput v-model="email" type="email" placeholder="email@example.com" :invalid="invalid" />
        </DsFormField>
      </DsCard>
      <DsCard class="p-5 grid gap-4">
        <div class="grid gap-3">
          <div class="text-sm font-600">Sizes</div>
          <div class="grid sm:grid-cols-2 gap-3">
            <div class="grid gap-2">
              <div class="text-xs ds-muted">xs</div>
              <DsInput v-model="sizeXs" size="xs" placeholder="Extra small" />
            </div>
            <div class="grid gap-2">
              <div class="text-xs ds-muted">sm</div>
              <DsInput v-model="sizeSm" size="sm" placeholder="Small" />
            </div>
            <div class="grid gap-2">
              <div class="text-xs ds-muted">md</div>
              <DsInput v-model="sizeMd" size="md" placeholder="Medium" />
            </div>
            <div class="grid gap-2">
              <div class="text-xs ds-muted">lg</div>
              <DsInput v-model="sizeLg" size="lg" placeholder="Large" />
            </div>
          </div>
        </div>
      </DsCard>
      <DsCard class="p-5 grid gap-4">
        <DsFormField label="Textarea">
          <DsTextarea v-model="area" placeholder="Multiline..." />
        </DsFormField>
      </DsCard>
      <DsCard class="p-5 grid gap-4">
        <div class="grid gap-3">
          <div class="text-sm font-600">DsNumberInput</div>
          <div class="grid sm:grid-cols-2 gap-3">
            <DsFormField label="Decimal (.)" :hint="'Только цифры + один разделитель, controls vertical'">
              <DsNumberInput v-model="amount" controls placeholder="0.00">
                <template #prefix>$</template>
              </DsNumberInput>
            </DsFormField>

            <DsFormField label="Decimal (,)" :hint="'Разделитель запятая, controls horizontal'">
              <DsNumberInput
                  v-model="amountComma"
                  decimal-separator=","
                  controls
                  controls-direction="horizontal"
                  placeholder="0,00"
              >
                <template #suffix>kg</template>
              </DsNumberInput>
            </DsFormField>

            <DsFormField label="Decimal (suffix min/max)" :hint="'Длинный suffix ограничен maxWidth + ellipsis'">
              <DsNumberInput
                  v-model="amount"
                  controls
                  placeholder="0.00"
                  suffix-min-width="2.5rem"
                  suffix-max-width="6rem"
              >
                <template #suffix>Some very long unit name that should be truncated</template>
              </DsNumberInput>
            </DsFormField>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <DsSwitch v-model="invalid" size="sm" />
          <span class="text-sm ds-muted">invalid</span>
        </div>
      </DsCard>
    </template>

    <template #usage>
      <pre
          class="m-0 rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--muted)] p-4 overflow-auto"><code
          class="text-[12px]">{{ usageCode }}</code></pre>
    </template>

    <template #api>
      <PlaygroundProps title="DsFormField — Props" :items="formFieldPropsInfo" />
      <PlaygroundProps title="DsFormField — Slots" :items="formFieldSlotsInfo" />
      <PlaygroundProps title="DsFormSection — Props" :items="formSectionPropsInfo" />
      <PlaygroundProps title="DsFormSection — Slots" :items="formSectionSlotsInfo" />
      <PlaygroundProps title="DsInput — Props" :items="inputPropsInfo" />
      <PlaygroundProps title="DsInput — Events" :items="inputEventsInfo" />
      <PlaygroundProps title="DsInput — Slots" :items="inputSlotsInfo" />
      <PlaygroundProps title="DsNumberInput — Props" :items="numberInputPropsInfo" />
      <PlaygroundProps title="DsNumberInput — Events" :items="numberInputEventsInfo" />
      <PlaygroundProps title="DsNumberInput — Slots" :items="inputSlotsInfo" />
      <PlaygroundProps title="DsTextarea — Props" :items="textareaPropsInfo" />
      <PlaygroundProps title="DsTextarea — Events" :items="textareaEventsInfo" />
    </template>
  </PlaygroundPage>
</template>
