<script setup lang="ts">
const props = defineProps<{ text?: string; outlined?: boolean }>()
</script>

<template>
  <button>
    <span v-if="props.text">
      {{ props.text }}
    </span>
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
}

button[primary] {
  background: theme('colors.primary.DEFAULT');
  color: theme('colors.white');

  &:hover {
    background-image: theme('colors.primary.500');
    ~ .rt-input-search-home__input {
      outline-color: theme('colors.primary.DEFAULT');
      box-shadow: 0 0 0 1px theme('colors.primary.DEFAULT');
    }
  }
}

button[outline] {
  border: 1px solid theme('colors.primary.DEFAULT');
  color: theme('colors.primary.DEFAULT');

  &:hover,
  &.focused {
    background-image: theme('colors.primary.500');
    color: theme('colors.white');
    ~ .rt-input-search-home__input {
      outline-color: transparent;
      box-shadow: 0 0 0 1px theme('colors.primary.500');
    }
  }
}

button[rounded] {
  padding: 1rem;
  font-size: 1rem;
  border-radius: 100%;
}
</style>
