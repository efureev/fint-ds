<template>
  <DsCard class="grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
    <div class="grid gap-2">
      <div class="flex flex-wrap items-center gap-2">
        <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">Release checklist</div>
        <DsBadge size="sm" variant="info" radius="semi">2 blockers</DsBadge>
      </div>

      <div class="text-sm text-[var(--muted-foreground)]">
        Cards are often the shell for richer compositions: lists, actions, helper badges and any spacing utilities passed via `class`.
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <DsButton size="sm" variant="outline">Open runbook</DsButton>
      <DsButton size="sm">Resolve blockers</DsButton>
    </div>
  </DsCard>
</template>
