<script setup lang="ts">
import {DsAvatar, DsCard} from "@feugene/granularity";
</script>
<template>
  <div class="grid gap-3">
    <DsCard class="grid gap-3 p-4">
      <div class="flex items-center gap-3">
        <DsAvatar :size="44">AD</DsAvatar>
        <div>
          <div class="text-sm font-semibold text-[var(--foreground)]">Alex Doe</div>
          <div class="text-sm text-[var(--muted-foreground)]">Engineering lead</div>
        </div>
      </div>
    </DsCard>

    <DsCard class="grid gap-3 p-4">
      <div class="flex items-center gap-3">
        <DsAvatar :size="44" shape="square">QA</DsAvatar>
        <div>
          <div class="text-sm font-semibold text-[var(--foreground)]">Quality squad</div>
          <div class="text-sm text-[var(--muted-foreground)]">Square avatars help differentiate team entities from
            people.
          </div>
        </div>
      </div>
    </DsCard>
  </div>
</template>
