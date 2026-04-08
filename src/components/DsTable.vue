<template>
  <div class="overflow-x-auto rounded-[var(--ds-radius-lg)] border border-[var(--border)] bg-[var(--card)]">
    <table class="min-w-full text-sm">
      <thead class="bg-[var(--muted)] text-[var(--muted-foreground)]">
        <slot name="head" />
      </thead>
      <tbody class="text-[var(--foreground)]">
        <slot />
      </tbody>
    </table>
  </div>
</template>
