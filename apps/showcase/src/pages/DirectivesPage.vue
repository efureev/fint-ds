<script setup lang="ts">
import PackageEntitiesCatalogPage from '../components/package/PackageEntitiesCatalogPage.vue'
import { showcaseDirectiveEntities, showcasePageRecord } from '../app/showcase'
</script>

<template>
  <PackageEntitiesCatalogPage
    kind="directive"
    :page="showcasePageRecord.directives"
    :entities="showcaseDirectiveEntities"
  />
</template>