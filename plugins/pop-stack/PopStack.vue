<template>
  <transition name="app-modal-fade">
    <div
      v-show="modelValueImage"
      :tabindex="-1"
      :style="customStyle"
      :class="['app-modal', customClass]"
      @keyup.esc="onPressEsc"
    >
      <div
        v-if="mask"
        role="button"
        :class="['app-modal-mask']"
        :style="customMaskStyle"
        @click="onClickMask"
      />
      <transition :name="`app-modal-${animation}`">
        <div
          v-show="modelValueImage"
          :class="[customBodyClass ? customBodyClass : 'app-modal-body']"
          :style="getBodyStyle"
        >
          <slot
            name="closeButton"
            v-bind="{
              closeButtonEnabled: closeButton,
              className: 'app-modal-close',
              onClose,
            }"
          >
            <button
              v-if="closeButton"
              class="app-modal-close"
              type="button"
              aria-label="close modal"
              @click="onClose"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15.2895 15.2895L5.33301 5.33301"
                  stroke="currentColor"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.33643 15.2895L15.2929 5.33301"
                  stroke="currentColor"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </slot>
          <!-- <span v-if="closeButton" class="app-modal-close" @click="onClose" /> -->
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { usePopStack } from './usePopStack'

interface IProps {
  id: string
  modelValue?: boolean
  debug?: boolean
  width?: number | 'auto'
  height?: number | 'auto'
  sizeUnit?: 'px' | 'pt' | 'em' | 'rem'
  animation?:
    | false
    | 'door'
    | 'fade'
    | 'flip'
    | 'rotate'
    | 'shake'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'slideUp'
    | 'zoom'
  animationDuration?: number
  mask?: boolean // overlay
  closeButton?: boolean
  closeOnPressEsc?: boolean
  closeOnClickMask?: boolean
  customClass?: string
  customStyle?: CSSProperties
  customMaskClass?: string
  customMaskStyle?: CSSProperties
  customBodyClass?: string
  customBodyStyle?: CSSProperties
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: true,
  debug: false,
  width: undefined,
  height: undefined,
  sizeUnit: 'rem',
  animation: 'zoom',
  animationDuration: 300,
  mask: true,
  closeButton: true,
  closeOnPressEsc: true,
  closeOnClickMask: true,
  customClass: '',
  customStyle: () => ({}),
  customMaskClass: '',
  customMaskStyle: () => ({}),
  customBodyClass: '',
  customBodyStyle: () => ({ margin: 'auto' }),
})

const emit = defineEmits<{
  (event: 'update:modelValue', data: boolean): boolean
  (event: 'close'): void // on click close button
}>()

const getBodyStyle = computed<CSSProperties>(() => ({
  width: !props.width
    ? undefined
    : props.width === 'auto'
    ? 'auto'
    : props.width + props.sizeUnit,
  height: !props.height
    ? undefined
    : props.height === 'auto'
    ? 'auto'
    : props.height + props.sizeUnit,
  animationDuration: `${props.animationDuration}ms`,
  zIndex: 101,
  ...props.customBodyStyle,
}))

const popStack = usePopStack()
const modelValueImage = ref(props.modelValue ?? false) // local state
type TControl = { action: 'open' | 'close' | 'toggle'; force?: boolean }
const control = ({ action = 'toggle', force = false } = {} as TControl) => {
  const bufferTimes = {
    opening: 0, // starting with zero delay
    open: 50, // usually should be little
    opened: 300, // usually should match with the opening animation
    closing: 0, // starting with zero delay
    close: 50, // usually should be little
    closed: 150, // usually should match with the closing animation
    toggling: 0, // starting with zero delay
    toggle: 10, // should be minimum but not zero, since this action also emits opening & closing events, it needs a small delay to emit events sequentially & quickly
    toggled: 200, // this needs to be the maximum buffer so that it always get emitted at last
  }

  if (action === 'open') {
    popStack.bus.emit(popStack.getEventName('opening', props.id))
    // breathing time from opening:$id event
    setTimeout(() => {
      emit('update:modelValue', true)
      force && (modelValueImage.value = true)
    }, bufferTimes.open)
    // wait for the closing animation to finish
    setTimeout(() => {
      popStack.bus.emit(popStack.getEventName('opened', props.id))
    }, bufferTimes.opened)

    return
  }

  if (action === 'close') {
    popStack.bus.emit(popStack.getEventName('opening', props.id))
    // breathing time from opening:$id event
    setTimeout(() => {
      emit('update:modelValue', false)
      force && (modelValueImage.value = false)
    }, bufferTimes.closing)
    // wait for the closing animation to finish
    setTimeout(() => {
      popStack.bus.emit(popStack.getEventName('opened', props.id))
    }, bufferTimes.closed)

    return
  }

  if (action === 'toggle') {
    const beforeToggled = modelValueImage.value
    popStack.bus.emit(
      popStack.getEventName('toggling', props.id),
      beforeToggled
    )
    // add a small buffer time for the opening or closing events
    // so that they are emitted sequentially (because usually they are instantly fired)
    setTimeout(
      () => control({ action: beforeToggled ? 'close' : 'open', force }),
      bufferTimes.toggle
    )
    setTimeout(() => {
      popStack.bus.emit(popStack.getEventName('toggled', props.id), {
        to: modelValueImage.value,
        from: beforeToggled,
        isForced: force,
      })
    }, bufferTimes.toggled)
  }
}
watch(
  () => props.modelValue,
  (val: boolean) => {
    if (typeof val !== 'boolean') return

    modelValueImage.value = val
    if (val) {
      // prevent scrolling (Improvements: add props for it?)
      document.body.style.overflow = 'hidden'
    } else {
      // allow scrolling but wait for the closing animation to finish
      setTimeout(() => (document.body.style.overflow = 'auto'), 100)
    }
  },
  { immediate: true }
)
// improvements: remove force flag from events api?
const registrableEvents = () => {
  popStack.bus.on(popStack.getEventName('open', props.id), () => {
    control({ action: 'open', force: true })
  })
  popStack.bus.on(popStack.getEventName('close', props.id), () =>
    control({ action: 'close', force: true })
  )
  popStack.bus.on(popStack.getEventName('toggle', props.id), () =>
    control({ action: 'toggle', force: true })
  )
  props.debug &&
    // eslint-disable-next-line no-console
    console.log({
      PopStackComponents: { id: props.id, events: popStack.bus.all },
    })
}
const unregistrableEvents = () => {
  popStack.bus.off(popStack.getEventName('open', props.id), () => {
    control({ action: 'open', force: true })
  })
  popStack.bus.off(popStack.getEventName('close', props.id), () =>
    control({ action: 'close', force: true })
  )
  popStack.bus.off(popStack.getEventName('toggle', props.id), () =>
    control({ action: 'toggle', force: true })
  )
}
onMounted(() => registrableEvents())
onUnmounted(() => unregistrableEvents())

// TODO: focus trap
// TODO: autofocus
/*
show(isShow) {
      isShow &&
        this.$nextTick(() => {
          this.$el.focus()
        })
    },
*/

const onClose = () => emit('close') // ?
const onPressEsc = () => {
  if (!props.closeOnPressEsc) return
  control({ action: 'close', force: true })
  emit('close')
}
const onClickMask = () => {
  if (!props.closeOnClickMask) return
  control({ action: 'close', force: true })
  emit('close')
}
</script>

<style lang="scss" scoped>
@import './animations/index.scss';

.app-modal,
.app-modal-mask {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.app-modal {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-modal-mask {
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
}

/* fallback default body class */
.app-modal-body {
  position: relative;
  margin: auto;
  padding: 2.5rem;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  // width: 100%;
  @media screen and (min-width: 768px) {
    min-width: 28rem;
  }
}

.app-modal-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid theme('colors.secondary-text.200');
  color: theme('colors.secondary-text.300');
  background: theme('colors.white');
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 20px;

  @screen lg {
    top: 30px;
    right: 30px;
  }
  &:hover {
    color: theme('colors.secondary-text.DEFAULT');
  }
}
.app-modal-close-css-icon {
  position: absolute;
  cursor: pointer;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  z-index: 9999;
}

.app-modal-close-css-icon:before,
.app-modal-close-css-icon:after {
  position: absolute;
  content: '';
  height: 2px;
  width: 100%;
  top: 50%;
  left: 0;
  margin-top: -1px;
  background: #999;
  border-radius: 100%;
  -webkit-transition: background 0.2s;
  transition: background 0.2s;
}

.app-modal-close-css-icon:before {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.app-modal-close-css-icon:after {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.app-modal-close-css-icon:hover:before,
.app-modal-close-css-icon:hover:after {
  background: #333;
}
</style>
