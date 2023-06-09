<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// composable
const { t } = useLang()

definePageMeta({
  layout: false,
})
useHead(() => ({
  title: capitalize(t('pages.404.title')),
}))
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <PageError :code="404" />
  </div>
</template>
