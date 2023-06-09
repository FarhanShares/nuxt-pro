<script lang="ts" setup>
import NavbarMiddleMenu from './NavbarMiddleMenu.vue'
interface IProps {
  headerBgEnabled?: boolean
  isAuthenticated?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<IProps>(), {
  headerBgEnabled: false,
  isAuthenticated: false,
})

const onAuth = () => useAppModal().open({ screen: 'auth', animation: 'zoom' })
</script>

<template>
  <LayoutNavbarWrapper
    :is-authenticated="isAuthenticated"
    :header-bg-enabled="headerBgEnabled"
  >
    <template #right>
      <div class="flex items-center justify-center">
        <nav
          class="items-center justify-center hidden md:flex"
          role="navigation"
        >
          <el-button
            v-if="!isAuthenticated"
            type="primary"
            round
            plain
            @click="onAuth"
          >
            <AppSvg name="google-alt" />
            <span class="ml-2">লগইন</span>
          </el-button>
          <NuxtLink v-if="isAuthenticated" to="/dashboard">ড্যাশবোর্ড</NuxtLink>

          <div class="w-5"></div>
          <AppLanguageSwitcher />
          <div class="w-2"></div>
          <AppThemeSwitcher />
          <div class="w-2"></div>
        </nav>
      </div>
    </template>

    <template #middle>
      <NavbarMiddleMenu />
    </template>

    <template #mobile-menu="{ toggleOptions }">
      <button @click="toggleOptions(false)">x</button>
    </template>
  </LayoutNavbarWrapper>
</template>

<style lang="scss">
a.router-link-active.header-content__link {
  @apply hover:no-underline hover:dark:text-white font-semibold;

  font-size: 16px;
  line-height: 130%;
}
</style>
