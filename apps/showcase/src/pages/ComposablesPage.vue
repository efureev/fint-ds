<script setup lang="ts">
import PackageEntitiesCatalogPage from '../components/package/PackageEntitiesCatalogPage.vue'
import { showcaseComposableEntities, showcasePageRecord } from '../app/showcase'
</script>

<template>
  <PackageEntitiesCatalogPage
    kind="composable"
    :page="showcasePageRecord.composables"
    :entities="showcaseComposableEntities"
  />
</template>