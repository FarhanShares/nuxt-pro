<template>
  <div>
    <transition name="es-fade">
      <button
        v-show="visibility"
        class="es-overlay"
        tabindex="-1"
        @click="close(false)"
      />
    </transition>

    <transition :name="getEdgeStackTransitionName">
      <div
        v-show="visibility"
        :class="getEdgeStackClassName"
        :style="getEdgeStackStyles.container"
      >
        <section v-if="busy" class="py-4">
          <div class="flex flex-col items-center justify-center h-screen">
            <Mystery />
            <br />
            <p>Loading..</p>
            <Button
              :variant="getCloseButtonVariant"
              :class="'!px-8 mt-5'"
              :is-loading="false"
              :width="'50px'"
              :text="'Cancel'"
              @click="close(true)"
            />
          </div>
          <!-- <TheSuspense v-for="n in 3" :key="`es-skeletons-${n}`" rounded>
                      <SuspenseHeading img />
                      <SuspenseText :lines="5" />
                  </TheSuspense>-->
        </section>

        <template v-else>
          <header :class="headerClassName">
            <slot name="header" v-bind="{ close, confirmFirst, exitButton }" />
          </header>

          <div class="pb-4 overflow-x-hidden overflow-y-auto sb-farhan">
            <slot v-bind="{ close, confirmFirst, exitButton }" />
          </div>

          <div v-if="hasFooterSlot" class="w-full">
            <footer
              :class="`${footerClass.fixed} ${footerClass.append} ${
                exitButton.hidden ? '' : 'justify-between'
              } `"
            >
              <div v-if="exitButton.hidden === false">
                <Button
                  :variant="getCloseButtonVariant"
                  :class="``"
                  :is-loading="false"
                  @click="close(!confirmFirst)"
                  >Cancel</Button
                >
              </div>
              <div>
                <slot name="footer" v-bind="{ close, confirmFirst, exitButton }"
                  >Footer Slot</slot
                >
              </div>
            </footer>
          </div>
        </template>
      </div>
    </transition>

    <!-- confirmFirst -->
    <div
      v-if="confirmFirstVisibility"
      class="fixed inset-0 w-full h-full transition-all duration-100 ease-in-out bg-gray-900 bg-opacity-50"
      style="z-index: 1105"
    >
      <section
        class="relative max-w-lg mx-auto my-0 mt-20 overflow-y-auto transition-all duration-300 ease-in-out"
        style="z-index: 1110"
      >
        <div
          class="relative overflow-hidden bg-white border border-gray-600 rounded-md shadow-lg"
        >
          <section
            class="flex items-center justify-center mt-8 mb-2 text-gray-500"
          >
            <i class="text-4xl fas fa-exclamation-circle" />
          </section>

          <section class="px-4 text-2xl font-extrabold text-center">
            {{ confirmQuestion }}
          </section>

          <section class="px-4 font-bold text-center">
            All changes will be discarded
          </section>

          <section
            class="flex items-center px-4 py-4 mt-6 space-x-5 bg-gray-100"
          >
            <Button
              :variant="'ghost'"
              :class="`w-1/2`"
              :is-loading="false"
              @click="close(true)"
              >Exit</Button
            >

            <Button
              :variant="'primary'"
              :class="`w-1/2`"
              :is-loading="false"
              @click="closeConfirmFirst"
              >Cancel</Button
            >
          </section>
        </div>
      </section>
    </div>
    <!-- /confirmFirst -->
  </div>
</template>

<script lang="ts">
// import {
//   defineComponent,
//   ref,
//   computed,
//   watch,
//   onMounted,
//   onUnmounted,
// } from 'vue'
import { useEdgeStack, edgeStackEmitter } from '~/plugins/edge-stack'

export default defineComponent({
  name: 'EdgeStack',
  props: {
    // unique id
    id: {
      type: String,
      required: true,
    },
    // weather to confirm before closing
    confirm: {
      type: Boolean,
      default: false,
    },
    confirmQuestion: {
      type: String,
      default: 'Are you sure you want to exit?',
    },
    // size
    fullScreen: {
      type: Boolean,
      default: false,
    },
    containerClassName: {
      type: String,
      default: '',
    },
    useOnlyContainerClassName: {
      type: Boolean,
      default: false,
    },
    headerClassName: {
      type: String,
      default: 'px-1 mb-2',
    },
    position: {
      type: String,
      default: 'right',
      validator(value: string) {
        return ['left', 'right', 'top', 'bottom'].includes(value)
      },
    },
    // state
    value: {
      type: Boolean,
      default: false,
    },

    busy: {
      type: Boolean,
      default: false,
    },

    //
    exitButton: {
      type: Object,
      default: () => ({
        text: 'Cancel',
        hidden: false,
      }),
    },

    footerClass: {
      type: Object,
      default: () => ({
        fixed: 'flex items-center px-6 pt-2 pb-5 w-full h-auto',
        append: '',
      }),
    },

    // toggle debug mode
    debug: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    props.debug && console.log('edgeStack', slots)
    const hasFooterSlot = computed(() => {
      const hasFooter = !!(
        typeof slots?.footer !== 'undefined' && slots?.footer()
      )
      props.debug && console.log('hasFooterSlot, slots: ', !!hasFooter, slots)
      return !!hasFooter
    })

    // Edge stack manager
    const edgeStackManager = useEdgeStack()

    const visibility = ref(props.value)

    watch(visibility, (updatedState) => {
      if (updatedState === true) {
        // prevent scrolling
        document.body.style.overflow = 'hidden'
        // Adding margin-right due to scrollbar flickering issue
        // document.body.style.marginRight = '11px'
      } else {
        // wait for the animation to finish
        setTimeout(function () {
          document.body.style.overflow = 'auto'
          // document.body.style.marginRight = ''
        }, 200)
      }
    })

    // Should confirm first before quitting? Can be managed via events
    const confirmFirst = ref(false)
    // State of visibility of confirm first dialog. Managed internally based on confirmFirst
    const confirmFirstVisibility = ref(false)

    // Computed
    const getCloseButtonVariant = computed(() => {
      return confirmFirst.value === true ? 'ghost' : 'text'
    })

    const getEdgeStackClassName = computed(() => {
      if (props.useOnlyContainerClassName) return props.containerClassName

      let className = 'es-container '

      if (props.position === 'left' || props.position === 'right') {
        className += props.fullScreen
          ? 'h-full w-full '
          : 'h-full w-full md:w-5/6 lg:w-3/6 2xl:w-2/5 '
      } else {
        className += props.fullScreen
          ? 'h-full w-full '
          : props.position === 'top'
          ? 'h-3/6 rounded-b '
          : 'h-3/4 rounded-t '
      }

      if (props.containerClassName) {
        className += props.containerClassName + ' '
      }

      return className
    })

    const getEdgeStackTransitionName = computed(
      () => `es-slideFromEdge-${props.position}`
    )

    const getEdgeStackStyles = computed(() => {
      function getOppositeDirection(position: string) {
        if (position === 'top') {
          return 'bottom'
        } else if (position === 'bottom') {
          return 'top'
        } else if (position === 'left') {
          return 'right'
        } else if (position === 'right') {
          return 'left'
        }
      }
      function getAdjacentDirection(position: string) {
        if (position === 'top' || position === 'bottom') {
          return 'left: 0; right: 0;'
        }
        if (position === 'left' || position === 'right') {
          return 'bottom: 0; top:0;'
        }
        return ''
      }
      return {
        container: `
              ${props.position}: 0;
              ${getAdjacentDirection(props.position)}
              border-${getOppositeDirection(props.position)}: 2px;
              `,
      }
    })

    // Methods
    const open = () => {
      // emit opening event
      edgeStackEmitter.emit(edgeStackManager.getEventName('opening', props.id))

      // breathing time from opening event
      setTimeout(() => {
        visibility.value = true
      }, 250)

      // wait for the animation to finish
      setTimeout(() => {
        edgeStackEmitter.emit(edgeStackManager.getEventName('opened', props.id))
      }, 350)
    }

    const close = (confirmed = false) => {
      props.debug &&
        console.log({
          onClose_ConfirmFirst: confirmFirst.value,
          onClose_Confirmed: confirmed,
        })

      if (confirmFirst.value === true && confirmed === false) {
        confirmFirstVisibility.value = true
        return
      }

      confirmFirstVisibility.value = false
      confirmFirst.value = false

      // emit closing event
      edgeStackEmitter.emit(edgeStackManager.getEventName('closing', props.id))

      // breathing time from closing event
      setTimeout(() => {
        visibility.value = false
      }, 250)

      // wait for the animation to finish
      setTimeout(() => {
        edgeStackEmitter.emit(edgeStackManager.getEventName('closed', props.id))
      }, 350)
    }

    const toggle = () => {
      const beforeToggled = visibility.value
      if (beforeToggled === true) {
        close()
      } else {
        open()
      }

      edgeStackEmitter.emit(
        edgeStackManager.getEventName('toggled', props.id),
        {
          from: beforeToggled,
          to: visibility.value,
        }
      )
    }

    const closeConfirmFirst = () => {
      confirmFirstVisibility.value = false
    }

    const registerEvents = () => {
      edgeStackEmitter.on(
        edgeStackManager.getEventName('open', props.id),
        () => {
          open()
        }
      )

      edgeStackEmitter.on(
        edgeStackManager.getEventName('close', props.id),
        () => {
          close()
        }
      )

      edgeStackEmitter.on(
        edgeStackManager.getEventName('toggle', props.id),
        () => {
          toggle()
        }
      )

      // e.confirmFirst has to be a boolean
      edgeStackEmitter.on(
        edgeStackManager.getEventName('confirmFirst', props.id),
        // todo: set type definition
        (e: any) => {
          confirmFirst.value = e.confirmFirst
        }
      )

      props.debug &&
        console.log({
          EdgeStackComponents: { id: props.id, events: edgeStackEmitter.all },
        })
    }

    // todo: confirm first
    const unregisterEvents = () => {
      edgeStackEmitter.off(
        edgeStackManager.getEventName('open', props.id),
        () => {
          open()
        }
      )

      edgeStackEmitter.off(
        edgeStackManager.getEventName('close', props.id),
        () => {
          close()
        }
      )

      edgeStackEmitter.off(
        edgeStackManager.getEventName('toggle', props.id),
        () => {
          toggle()
        }
      )

      edgeStackEmitter.off(
        edgeStackManager.getEventName('confirmFirst', props.id)
      )

      props.debug &&
        console.log({
          EdgeStackComponents: { id: props.id, events: edgeStackEmitter.all },
        })
    }

    onMounted(registerEvents)

    onUnmounted(unregisterEvents)

    return {
      open,
      close,
      toggle,
      visibility,
      confirmFirst,
      confirmFirstVisibility,
      getEdgeStackClassName,
      closeConfirmFirst,
      getCloseButtonVariant,
      hasFooterSlot,
      getEdgeStackStyles,
      getEdgeStackTransitionName,
    }
  },
})
</script>

<style lang="scss">
.es-overlay {
  @apply fixed inset-0 w-full h-full opacity-50 cursor-default bg-black;
  z-index: 1050;
}
// getEdgeStackStyles.container -> will set the top, right, bottom, left & other essential styles
.es-container {
  @apply fixed px-4 bg-white border-gray-400 border-opacity-50 shadow-lg;
  display: grid;
  grid-template-rows: auto 1fr auto;
  z-index: 1100;
}

// fade animation
.es-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

@mixin es-slideFromEdge(
  $eanter-leave-active--transform,
  $enter-from--leave-to--transform,
  $leave-from--enter-to--transform
) {
  &-leave-active,
  &-enter-active {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); // ease-in-out
    transition-duration: 250ms;
    transform: $eanter-leave-active--transform;
  }

  &-enter-from,
  &-leave-to {
    transform: $enter-from--leave-to--transform;
  }
  &-leave-from,
  &-enter-to {
    transform: $leave-from--enter-to--transform;
  }
}

.es-slideFromEdge {
  &-right {
    @include es-slideFromEdge(
      $eanter-leave-active--transform: translateX(0),
      $enter-from--leave-to--transform: translateX(100%),
      $leave-from--enter-to--transform: translateX(0)
    );
  }
  &-left {
    @include es-slideFromEdge(
      $eanter-leave-active--transform: translateX(0),
      $enter-from--leave-to--transform: translateX(-100%),
      $leave-from--enter-to--transform: translateX(0)
    );
  }
  &-top {
    @include es-slideFromEdge(
      $eanter-leave-active--transform: translateY(0),
      $enter-from--leave-to--transform: translateY(-100%),
      $leave-from--enter-to--transform: translateY(0)
    );
  }
  &-bottom {
    @include es-slideFromEdge(
      $eanter-leave-active--transform: translateY(0),
      $enter-from--leave-to--transform: translateY(100%),
      $leave-from--enter-to--transform: translateY(0)
    );
  }
}
</style>
