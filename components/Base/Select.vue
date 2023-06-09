<script lang="ts" setup>
import { ref } from 'vue'
// import IconArrowDown from '@/assets/img/icons/icon-arrow-down.svg?component'
// compose your sfc
export interface IProps {
  options?: []
  name: string
}

const props = withDefaults(defineProps<IProps>(), {
  options: () => [],
  name: 'default name',
})
const selectName = ref(props.name)
const selectedValue = ref('')
// const options = ['TV & Movies', 'People', 'Companies'];
const onOptionClick = (opt: string) => {
  selectName.value = ''
  return (selectedValue.value = opt)
}
</script>

<template>
  <div class="custom-select tp-inputs-wrap__select">
    <div class="custom-select__value-wrap custom-select-triger">
      <span class="custom-select__selected-value">
        {{ selectName || selectedValue }}
      </span>
      <!-- <IconArrowDown class="custom-select__icon" /> -->
    </div>
    <div class="custom-select__dropdown">
      <span
        v-for="(opt, i) in options"
        :key="i"
        class="custom-select__dropdown-item"
        href="#"
        @click="onOptionClick(opt)"
        >{{ opt }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-select {
  -webkit-tap-highlight-color: transparent;
  position: relative;
  cursor: pointer;
}

.custom-select__value-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  border: 1px solid theme('colors.gray.200');
  border-radius: 10px;
  padding: 14px 15px;
  padding-right: 19px;

  &:hover {
    border-color: theme('colors.primary.DEFAULT');
  }
}

.custom-select--open,
.custom-select:hover {
  .custom-select__dropdown {
    opacity: 1;
    visibility: visible;
  }

  .custom-select__icon {
    transform-origin: center;
    transform: rotate(180deg);
  }

  // hover helper
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    width: 100%;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    background: transparent;
    height: 20px;
    bottom: 50%;
  }
}

.custom-select__selected-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  color: theme('colors.primary-text.DEFAULT');
}

.custom-select__dropdown {
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 10px 50px rgba(0, 33, 63, 0.09);
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  position: absolute;
  top: calc(100% + 5px);
  transition: all 0.3s ease 0s;
  opacity: 0;
  visibility: hidden;
  width: 100%;
  z-index: 50;
}

.custom-select__dropdown-item {
  border-radius: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 130%;
  color: theme('colors.secondary-text.DEFAULT');
  padding: 10px;

  &:not(:last-child) {
    margin-bottom: -5px;
  }

  &:hover {
    color: theme('colors.primary-text.DEFAULT');
    background: rgba($color: #d5dde7, $alpha: 0.3);
  }

  @screen lg {
    font-size: 16px;
  }
}

.custom-select__dropdown-item--active {
  color: theme('colors.primary-text.DEFAULT');
  background: rgba($color: #d5dde7, $alpha: 0.3);
}
</style>
