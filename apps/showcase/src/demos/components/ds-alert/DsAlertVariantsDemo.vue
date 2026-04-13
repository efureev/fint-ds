<script setup lang="ts">
import {DsAlert} from "@feugene/granularity";
</script>
<template>
  <div class="grid gap-3">
    <DsAlert title="Info" variant="info">
      Deploy preview URL is ready for the QA handoff.
    </DsAlert>
    <DsAlert title="Success" variant="success">
      Billing sync finished and no manual retries are required.
    </DsAlert>
    <DsAlert title="Warning" variant="warning">
      API quota is at 78%; consider moving heavy jobs to the night window.
    </DsAlert>
    <DsAlert title="Danger" variant="danger">
      Background worker lost connection to Redis and needs operator attention.
    </DsAlert>
  </div>
</template>
