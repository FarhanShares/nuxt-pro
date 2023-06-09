<script lang="ts" setup>
import { useLayout } from './useLayout'
const {
  mainSlotClass,
  appContainerClass,
  headerBgEnabled,
  footerEnabled,
  isAuthenticated,
} = useLayout()
</script>

<template>
  <div>
    <slot name="app-before" />
    <div id="app-before" />

    <div :class="['flex flex-col min-h-screen', appContainerClass]">
      <slot name="header">
        <LayoutNavbar
          :is-authenticated="isAuthenticated"
          :header-bg-enabled="headerBgEnabled"
        />
      </slot>

      <div class="flex-1 w-full flex flex-col">
        <div
          :class="[
            'relative flex-1 flex flex-col mx-auto max-full w-full h-full dark:bg-black',
            mainSlotClass,
          ]"
        >
          <slot />
        </div>
      </div>
      <slot name="footer">
        <LayoutFooter v-if="footerEnabled" />
      </slot>
    </div>
    <slot name="app-after" />
    <div id="app-after" />
  </div>
</template>
