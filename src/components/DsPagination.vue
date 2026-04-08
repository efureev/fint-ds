<script setup lang="ts">
import { computed } from 'vue'

import { useFintDsTranslations } from '@/internal/fintI18n'
import DsButton from '@/components/DsButton.vue'
import DsSelect from '@/components/DsSelect.vue'

const { t } = useFintDsTranslations()

const props = withDefaults(
  defineProps<{
    page: number
    pageSize: number
    total: number
    pageSizes?: number[]
  }>(),
  {
    pageSizes: () => [10, 20, 50],
  },
)

const emit = defineEmits<{
  (e: 'update:page', value: number): void
  (e: 'update:pageSize', value: number): void
}>()

const pageCount = computed(() => {
  return Math.max(1, Math.ceil(props.total / props.pageSize))
})

const pageModel = computed({
  get: () => props.page,
  set: (v: number) => emit('update:page', v),
})

const pageSizeModel = computed({
  get: () => String(props.pageSize),
  set: (v: string) => emit('update:pageSize', Number(v)),
})

const pageSizeOptions = computed(() => {
  return props.pageSizes.map((n) => ({ value: String(n), label: String(n) }))
})

const pages = computed(() => {
  const max = pageCount.value
  const current = props.page
  const windowSize = 5
  const half = Math.floor(windowSize / 2)

  let start = Math.max(1, current - half)
  const end = Math.min(max, start + windowSize - 1)
  start = Math.max(1, end - windowSize + 1)

  const list: number[] = []
  for (let i = start; i <= end; i += 1) list.push(i)
  return list
})

function prev(): void {
  emit('update:page', Math.max(1, props.page - 1))
}

function next(): void {
  emit('update:page', Math.min(pageCount.value, props.page + 1))
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-end gap-3">
    <div class="min-w-[100px]">
      <DsSelect
        v-model="pageSizeModel"
        :options="pageSizeOptions"
        :aria-label="t('fintDs.pagination.pageSize', 'Page size')"
      />
    </div>

    <DsButton variant="ghost" size="sm" :disabled="props.page <= 1" @click="prev">
      {{ t('fintDs.pagination.prev', 'Prev') }}
    </DsButton>

    <div class="flex items-center gap-1">
      <button
        v-for="p in pages"
        :key="p"
        type="button"
        class="h-8 min-w-8 px-2 rounded-md text-sm font-600 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        :class="p === props.page ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'"
        @click="pageModel = p"
      >
        {{ p }}
      </button>
    </div>

    <DsButton variant="ghost" size="sm" :disabled="props.page >= pageCount" @click="next">
      {{ t('fintDs.pagination.next', 'Next') }}
    </DsButton>
  </div>
</template>
