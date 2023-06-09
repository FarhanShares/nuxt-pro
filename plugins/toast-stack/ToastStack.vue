<script lang="ts" setup>
import { useToastStack, ToastTypes } from '~/plugins/toast-stack'
function onToast(type = 'success' as ToastTypes) {
  useToastStack({
    title: 'Test message',
    message: 'Hello there! I am a toast! ',
    type,
  })
}
</script>

<template>
  <button @click.stop="onToast('success')">Success Toast</button>
  <button @click.stop="onToast('warning')">Warnign Toast</button>
  <button @click.stop="onToast('error')">Error Toast</button>
  <button @click.stop="onToast('thumbs')">Mixed Thumbs Toast</button>
</template>

<style lang="scss" scoped></style>
