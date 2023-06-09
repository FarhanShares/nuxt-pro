<script setup lang="ts">
import { toFieldValidator } from '@vee-validate/zod'
import { useField } from 'vee-validate'

export interface IProps {
  name: string
  type?: string
  modelValue?: string
  variant?: 'primary' | 'secondary' | 'warning' | 'danger'
  isError?: boolean
  isWarning?: boolean
  rules: any
  labelText?: string
  textArea?: boolean
}

const emit = defineEmits<{
  (event: 'update:modelValue', data: string): void
}>()

// props
const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  modelValue: '',
  variant: 'primary',
  labelText: '',
})

const schema = toFieldValidator(props.rules)

const field = useField(props.name, schema)

const modelValueImage = ref(props.modelValue ?? '')

watch(
  () => props.modelValue,
  (updatedValue) => {
    modelValueImage.value = updatedValue
    field.value.value = updatedValue
  },
  { immediate: true }
)
const onUpdate = (e: Event) => {
  field.setTouched(true)
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const typeImage = ref(props.type ?? 'text')
watch(
  () => props.type,
  (val) => (typeImage.value = val),
  { immediate: true }
)
const onTogglePasswordField = () => {
  typeImage.value = typeImage.value === 'text' ? 'password' : 'text'
}

const shouldShowError = computed(
  () => field.meta.touched && field.meta.validated && field.errors.value.length
)
</script>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<template>
  <div>
    <label v-if="props.labelText" :for="props.name">
      {{ props.labelText }}
    </label>
    <div
      class="rt-input-wrap"
      :class="[shouldShowError && 'rt-input-wrap--error']"
    >
      <textarea
        v-if="textArea"
        v-bind="$attrs"
        v-model="modelValueImage"
        :class="[
          'rt-input rt-input-wrap__rt-input rt-input rt-input--textarea',
        ]"
        @input="onUpdate($event)"
      ></textarea>
      <input
        v-else
        v-bind="$attrs"
        v-model="modelValueImage"
        :type="typeImage"
        :class="['rt-input rt-input-wrap__rt-input']"
        @input="onUpdate($event)"
      />

      <FormButtonShowPass
        v-if="props.type === 'password'"
        class="rt-input-pass__toogle-pas-btn"
        :is-password="typeImage === 'password'"
        @click="onTogglePasswordField"
      />
      <span class="rt-input-wrap__error">
        {{
          shouldShowError
            ? field.errorMessage.value === 'Required'
              ? 'This field is required.'
              : field.errorMessage.value
            : ''
        }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
