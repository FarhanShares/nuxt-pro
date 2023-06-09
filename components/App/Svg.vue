<script lang="ts" setup>
import { IconType } from '~~/.nuxt/svg-transformer'

withDefaults(
  defineProps<{
    name: IconType
    width?: string
    height?: string
  }>(),
  { width: '20', height: '20' }
)
</script>

<template>
  <SvgIcon :name="name" :style="`width: ${width}px; height: ${height}px`" />
</template>
