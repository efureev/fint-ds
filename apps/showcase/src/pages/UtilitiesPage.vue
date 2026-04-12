<script setup lang="ts">
import PackageEntitiesCatalogPage from '../components/package/PackageEntitiesCatalogPage.vue'
import { showcasePageRecord, showcaseUtilityEntities } from '../app/showcase'
</script>

<template>
  <PackageEntitiesCatalogPage
    kind="utility"
    :page="showcasePageRecord.utilities"
    :entities="showcaseUtilityEntities"
  />
</template>