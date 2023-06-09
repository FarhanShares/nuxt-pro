<script lang="ts">
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
export interface IProps {
  modelValue?: string
  variant?: 'primary' | 'secondary' | 'warning' | 'danger'
  isError?: boolean
  isWarning?: boolean
  rules?: string
  labelText?: string
  errorMessage?: string
}

const emit = defineEmits<{
  (event: 'update:modelValue', data: string): void
}>()

// props
const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  variant: 'primary',
  rules: '',
  labelText: '',
  errorMessage: '',
})
const modelValueImage = ref(props.modelValue ?? '')

watch(
  () => props.modelValue,
  (val) => (modelValueImage.value = val),
  { immediate: true }
)

const onUpdate = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <label>
    <span class="">{{ props.labelText }}</span>
    <div
      class="rt-input-wrap"
      :class="[props.isError && 'rt-input-wrap--error']"
    >
      <input
        v-bind="$attrs"
        :value="modelValueImage"
        class="rt-input rt-input-wrap__rt-input"
        @input="onUpdate($event)"
      />
      <span class="rt-input-wrap__error">{{ props.errorMessage }}</span>
      <span class="absolute right-1 top-0 bottom-0 grid place-content-center"
        ><slot></slot
      ></span>
    </div>
  </label>
</template>

<style lang="scss" scoped>
.rt-input-label {
  font-weight: 600;
  font-size: 14px;
  line-height: 130%;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;

  @screen lg {
    font-size: 16px;
  }
}
.rt-input {
  -webkit-appearance: none;
  border: 0;
  outline: 0;
  box-shadow: 0 0 0 1px theme('colors.muted.200');
  border-radius: 10px;
  padding: 15px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  width: 100%;
  box-sizing: border-box;
  background: theme('colors.white');
  color: theme('colors.black');

  &::placeholder {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    font-weight: 400;
    color: theme('colors.muted.300');
  }

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:hover,
  &:focus,
  &:focus-within,
  &:focus-visible {
    box-shadow: 0 0 0 1px theme('colors.primary.DEFAULT');
  }

  @screen lg {
    border-radius: 14px;
    font-size: 16px;
    line-height: 21px;
  }
}

.rt-input--textarea {
  height: 100%;
  resize: none;
}

.rt-input-wrap {
  position: relative;
}
.rt-input-wrap--error {
  & > {
    .rt-input-wrap__rt-input {
      box-shadow: 0 0 0 1px theme('colors.danger.DEFAULT');
    }
    .rt-input-wrap__error {
      display: inline-block;
    }
  }
}
.rt-input-wrap__error {
  position: absolute;
  right: 0;
  bottom: -19px;
  font-weight: 400;
  font-size: 11px;
  line-height: 130%;
  display: none;
  color: theme('colors.danger.DEFAULT');
}
</style>
