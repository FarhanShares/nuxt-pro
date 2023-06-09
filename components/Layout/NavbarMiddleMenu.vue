<script lang="ts" setup>
//
</script>
<template>
  <nav class="topNav-tab-container">
    <NuxtLink to="/" class="topNav-tab-item" type="primary">
      <Icon name="carbon:home" class="mr-2" />
      হোম
    </NuxtLink>
    <NuxtLink to="/profiles" class="topNav-tab-item" type="primary">
      <Icon name="carbon:user-profile" class="mr-2" /> প্রোফাইলসমূহ
    </NuxtLink>
    <NuxtLink to="/faq" class="topNav-tab-item" type="primary">
      <Icon name="carbon:chat" class="mr-2" />
      প্রশ্ন ও উত্তর
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
.topNav-tab-container {
  @apply hidden lg:inline-flex lg:items-center lg:gap-1;
  @apply w-auto bg-gray-200 text-gray-700 rounded-md p-1;
  // @apply dark:bg-gray-700 dark:text-gray-200;
}
.topNav-tab-item {
  @apply rounded px-3 py-1 min-w-[6rem] flex items-center justify-center text-base font-medium cursor-pointer gap-2 transition duration-200 ease-in;
  &:hover,
  &.router-link-active,
  &.router-link-exact-active {
    @apply bg-blue-500 text-white;
  }
}
</style>
