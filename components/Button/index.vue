<script setup lang="ts">
export interface IProps {
  variant?: 'primary' | 'ghost' | 'text'
  loading?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  variant: 'primary',
  loading: false,
})
</script>

<template>
  <button :class="['button', `button--${props.variant}`]">
    <!-- class="button button-primary" -->
    <span :class="{ 'opacity-0': loading }">
      <slot />
    </span>
    <Mystery v-if="loading" :active="loading" blur="0px" :cancellable="false" />
  </button>
</template>

<style lang="scss">
.button {
  @apply text-base font-semibold hover:no-underline;
  cursor: pointer;
  line-height: 1;
  border-radius: 10px;
  color: theme('colors.primary.DEFAULT');
  border: 0;
  background: transparent;
  padding: 10px 20px;
  position: relative;

  &--ghost {
    border: 1px solid theme('colors.primary.DEFAULT');
    &:hover:not(:disabled) {
      background: theme('colors.primary.DEFAULT');
      color: theme('colors.white');
    }
    &:active:not(:disabled) {
      background: theme('colors.primary.500');
      border: 1px solid theme('colors.primary.500');
    }
  }
  &--primary {
    @apply text-white;
    background: theme('colors.primary.500');
    &:hover:not(:disabled) {
      background: theme('colors.primary.500');
    }
    &:active:not(:disabled) {
      background: theme('colors.primary.500');
    }
  }
  &--text {
    background: transparent;
    color: theme('colors.secondary-text.500');
  }

  @screen md {
    border-radius: 14px;
    padding: 10px 20px;
  }
  @screen lg {
    padding: 13px 24px 14px;
  }
  @screen 2xl {
    padding: 13px 24px 14px 25px;
  }
}
</style>
