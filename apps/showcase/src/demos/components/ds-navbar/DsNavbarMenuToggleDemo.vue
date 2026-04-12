<script setup lang="ts">
import { ref } from 'vue'

import { DsBadge, DsButton, DsNavbar } from '@feugene/granularity'

const isMenuOpen = ref(false)
</script>

<template>
  <div class="grid gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
    <DsNavbar
      title="Mobile shell"
      show-menu-button
      menu-button-class="sm:hidden"
      @menu="isMenuOpen = !isMenuOpen"
    >
      <DsBadge size="sm" :variant="isMenuOpen ? 'primary' : 'secondary'">
        {{ isMenuOpen ? 'Drawer open' : 'Drawer closed' }}
      </DsBadge>
    </DsNavbar>

    <div class="flex flex-wrap gap-2 px-4 py-3">
      <DsButton size="sm" variant="outline" @click="isMenuOpen = false">
        Close manually
      </DsButton>
      <div class="text-sm text-[var(--muted-foreground)]">
        `menu` event can be wired to drawers, command panels or any other responsive navigation container.
      </div>
    </div>
  </div>
</template>