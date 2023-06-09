<script lang="ts" setup>
import {
  IconClose,
  IconError,
  IconSuccess,
  IconWarning,
  IconThumbs,
} from './icons'

// NOTE: We need a default variant with icon
export type ToastTypes = 'success' | 'warning' | 'error' | 'thumbs'

// props
interface Props {
  title: string
  message?: string
  icon?: boolean
  type?: ToastTypes
  toastId?: string | number
  closeButton?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  icon: true,
  type: 'success',
  message: '',
  toastId: Math.random(),
  closeButton: false,
})

const emit = defineEmits(['close-toast'])
const close = () => {
  emit('close-toast')
}
</script>

<template>
  <div class="rt-notif" :class="[`rt-notif--${props.type}`]">
    <div class="rt-notif__body">
      <button
        v-if="props.closeButton"
        type="button"
        class="rt-notif__btn-close"
        @click="close"
      >
        <IconClose class="rt-notif__icon__btn-close-icon" />
      </button>

      <slot v-if="props.icon" name="icon">
        <IconSuccess v-if="props.type === 'success'" class="rt-notif__icon" />
        <IconError v-if="props.type === 'error'" class="rt-notif__icon" />
        <IconWarning v-if="props.type === 'warning'" class="rt-notif__icon" />
        <IconThumbs v-if="props.type === 'thumbs'" class="rt-notif__icon" />
      </slot>

      <h5 class="rt-notif__title">{{ props.title }}</h5>
      <p class="rt-notif__text">{{ props.message }}</p>
    </div>
  </div>
</template>

<style>
.Vue-Toastification__container .Vue-Toastification__toast {
  padding: 0 !important;
  border-radius: 30px !important;
}
</style>

<style lang="scss" scoped>
.rt-notif {
  --text-color: #fff;
  --border-radius: 20px;
  --bg-color: rgba(16, 169, 160, 0.9);
  --shadow-color: rgba(9, 134, 127, 0.4);
  max-width: 600px;
  min-width: 326px;
  width: 100%;

  // @screen md {
  //   max-width: 00px;
  // }

  @screen lg {
    --border-radius: 30px;
  }
}
.rt-notif--warning {
  --shadow-color: rgba(229, 120, 58, 0.4);
  --bg-color: rgba(229, 120, 58, 0.9);
}

.rt-notif--error {
  --shadow-color: rgba(229, 58, 79, 0.4);
  --bg-color: rgba(229, 58, 79, 0.9);
}

.rt-notif__body {
  box-shadow: 0px 16px 40px var(--shadow-color);
  position: relative;
  color: var(--text-color);
  background-color: var(--bg-color);
  border-radius: var(--border-radius);

  padding: 15px;
  padding-right: 29px;
  display: grid;
  column-gap: 10px;
  align-items: start;
  grid-template-columns: auto 1fr;
  justify-content: start;

  @screen lg {
    padding: 20px;
    padding-right: 29px;
    column-gap: 15px;
    padding-right: 60px;
  }
}

.rt-notif__btn-close {
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #fff;

  &:hover {
    background-color: rgba($color: #fff, $alpha: 0.1);
  }
  @screen lg {
    width: 30px;
    height: 30px;
  }
}
.rt-notif__btn-close-icon {
  @screen lg {
    width: 14px;
    height: 14px;
  }
}

.rt-notif__icon {
  grid-column: 1/2;
  grid-row: 1/3;

  @screen lg {
    width: 50px;
    height: 50px;
  }
}

.rt-notif__title {
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;

  @screen lg {
    font-size: 20px;
  }
}

.rt-notif__text {
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;

  @screen lg {
    font-size: 16px;
  }
}
</style>
