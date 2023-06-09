<script lang="ts" setup>
import { useLayout } from './useLayout'
const {
  // mainSlotClass,
  appContainerClass,
  // headerBgEnabled,
  // footerEnabled,
  // isAuthenticated,
} = useLayout()
</script>

<template>
  <div>
    <slot name="app-before" />
    <div id="app-before" />
    <div :class="[appContainerClass]">
      <slot />
    </div>
    <slot name="app-after" />
    <div id="app-after" />
  </div>
</template>
