<script lang="ts" setup>
import { AppGuidelines } from '~~/features/home'

definePageMeta({
  layout: 'default',
  headerBgEnabled: false,
  appContainerClass: 'overflow-x-hidden',
})

useHead({ title: 'Farhan Israq' })
</script>

<template>
  <main>
    <AppGuidelines />
    <el-row class="my-2 mx-auto flex items-center justify-center">
      <el-button @click="$router.push('/forms/shipping')">Forms</el-button>
    </el-row>
  </main>
</template>

<style lang="scss" scoped></style>
