<script setup lang="ts">
import { AuthDialog, AuthExampleDialog } from '~~/features/auth'

type Screen = 'auth' | 'example'
const props = defineProps<{ screen: Screen }>()

const modalAuth = markRaw(AuthDialog)
const modalExample = markRaw(AuthExampleDialog)

const activeComponent = shallowRef<any>(modalAuth)
const changeScreen = (to: Screen) => {
  switch (to) {
    case 'auth':
      activeComponent.value = modalAuth
      break
    case 'example':
      activeComponent.value = modalExample
      break
    default:
      activeComponent.value = modalAuth
      break
  }
}

watch(() => props.screen, changeScreen)
</script>

<template>
  <component :is="activeComponent" />
</template>
