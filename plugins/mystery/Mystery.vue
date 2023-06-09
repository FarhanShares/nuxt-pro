<script lang="ts" setup>
import {
  ref,
  watch,
  computed,
  onMounted,
  onUnmounted,
  CSSProperties,
} from 'vue-demi'
import type { Component } from 'vue-demi'
import { Bars, Dots, Spinner } from './fractions'

type TLoaders = 'spinner' | 'bars' | 'dots'
interface IProps {
  active: boolean
  loader?: TLoaders
  fullscreen?: boolean
  programmatic?: boolean
  trapFocus?: boolean
  lockScroll?: boolean
  transition?: 'fade'
  cancellable?: boolean
  onCancel?: Function
  color?: string
  bgColor?: string
  blur?: string
  width?: number
  height?: number
  zIndex?: number
  opacity?: number
  container?: Object | Function
}

const props = withDefaults(defineProps<IProps>(), {
  active: false,
  loader: 'spinner',
  fullscreen: false,
  programmatic: true,
  trapFocus: false,
  cancellable: true,
  onCancel: () => {},
  transition: 'fade',
  color: '#000',
  bgColor: 'transparent',
  blur: '2px',
  opacity: 0.7,
  width: 40,
  height: 40,
  zIndex: 100,
  container: () => {},
})

const components: Record<TLoaders, Component> = {
  spinner: Spinner,
  dots: Dots,
  bars: Bars,
}
const getLoaderComponent = computed(() => components[props.loader] ?? Spinner)

const rootRef = ref<any | null>(null)
const isActive = ref<boolean>(props.active)

const bgStyle = computed<Partial<CSSProperties>>(() => ({
  opacity: props.opacity,
  background: props.bgColor,
  backdropFilter: `blur(${props.blur})`,
}))

const hide = () => {
  // Timeout for the animation complete before destroying
  if (props.programmatic) {
    isActive.value = false
    setTimeout(() => {}, 150)
  }
}
const cancel = () => {
  if (!props.cancellable || !isActive.value) return
  hide()
  props.onCancel()
}
const keyUp = (event: KeyboardEvent) => {
  if (event.keyCode === 27) {
    cancel()
  }
}
const disableScroll = () => {
  if (props.fullscreen && props.lockScroll) {
    document.body.classList.add('mystery-shown')
  }
}
const enableScroll = () => {
  if (props.fullscreen && props.lockScroll) {
    document.body.classList.remove('mystery-shown')
  }
}

/**
 * Trap focus
 *
 * @param event
 */
function onFocusIn(event: FocusEvent) {
  // Ignore when loading is not active
  if (!isActive.value) return

  if (
    // Event target is the loading div element itself
    event.target === rootRef.value ||
    // Event target is inside the loading div
    rootRef.value?.contains(event.target as HTMLElement)
  )
    return

  // Use container as parent when available otherwise use parent element when props.fullscreen is false
  const parent = props.container
    ? props.container
    : props.fullscreen
    ? null
    : rootRef.value?.parentElement

  if (
    // Always prevent when loading is full screen
    props.fullscreen ||
    // When a parent exist means loader is running inside a container
    // When loading is NOT full screen and event target is inside the given container
    (parent && parent.contains(event.target))
  ) {
    event.preventDefault()
    rootRef.value?.focus()
  }
}
onMounted(() => {
  if (props.programmatic) {
    isActive.value = true
    // document.addEventListener('keyup', keyUp)
  }
  if (props.trapFocus) {
    document.addEventListener('focusin', onFocusIn)
  }
})
onUnmounted(() => {
  document.removeEventListener('keyup', keyUp)
  // document.removeEventListener('focusin', onFocusIn)
})
watch(
  () => props.active,
  () => {
    isActive.value = props.active
  }
)
watch(isActive, () => {
  if (isActive.value) {
    disableScroll()
  } else {
    enableScroll()
  }
})
</script>

<template>
  <div>
    <Transition ref="rootRef" :name="transition">
      <div
        v-show="isActive"
        :tabindex="0"
        :style="{ zIndex }"
        :class="['mystery-overlay is-active', fullscreen && 'is-full-screen']"
        :aria-busy="isActive"
        :aria-label="'Loading'"
      >
        <div
          :class="'mystery-background'"
          :style="bgStyle"
          @click.prevent="cancel"
        ></div>
        <div class="mystery-icon">
          <slot name="before" />
          <slot name="default">
            <Component
              :is="getLoaderComponent"
              :color="color"
              :width="width"
              :height="height"
            />
          </slot>
          <slot name="after" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.mystery-shown {
  overflow: hidden;
}

.mystery-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  overflow: hidden;
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.mystery-overlay.is-active {
  display: flex;
}

.mystery-overlay.is-full-screen {
  z-index: 9999;
  position: fixed;
}

.mystery-overlay .mystery-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  opacity: 0.5;
}

.mystery-overlay .mystery-icon,
.mystery-parent {
  position: relative;
}
</style>
