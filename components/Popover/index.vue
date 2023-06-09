<template>
  <div id="popover-reference" ref="reference" :class="`popover--${type}`">
    <div v-if="popper" ref="popoverWrap" class="popover-wrapper">
      <div
        :class="`popover-wrapper__slot popover-wrapper__slot-${placement}   `"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createPopper, type Instance } from '@popperjs/core'
// import { mousedown } from 'dom7';
type TProps = {
  placement?: 'top' | 'bottom' | 'left' | 'right'
  type?: 'warning' | 'default' | 'error'
  trigger?: 'click' | 'hover'
}

const props = withDefaults(defineProps<TProps>(), {
  placement: 'top',
  type: 'default',
  trigger: 'hover',
})

// Farhan: ugur, do we really need ref? I've added the popper Instance type
const popper = ref<Instance | null>(null)
const reference = ref<HTMLElement | null>(null)

onBeforeUnmount(() => {
  if (popper.value !== null) {
    popper.value.destroy()
  }
})

onMounted(() => {
  const targetEl = reference?.value?.parentElement
  if (!targetEl) return

  if (props.trigger === 'hover') {
    const showEvents = ['mouseenter', 'focus']
    const hideEvents = ['mouseleave', 'blur']
    showEvents.forEach((eventName) => {
      targetEl.addEventListener(eventName, (event) => {
        onTriggered(targetEl, event)
      })
    })
    hideEvents.forEach((eventName) => {
      targetEl.addEventListener(eventName, (event) => {
        onTriggered(targetEl, event)
      })
    })
  }

  if (props.trigger === 'hover') {
    targetEl.addEventListener('click', (event) => {
      onTriggered(targetEl, event)
    })
  }
})

function onTriggered(targetEl: HTMLElement, event: Event) {
  if (popper.value === null && targetEl && reference.value) {
    popper.value = createPopper(targetEl, reference.value, {
      placement: props.placement,
      modifiers: [
        {
          name: 'preventOverflow',
          options: {
            altBoundary: true,
            rootBoundary: 'viewport',
          },
        },
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top', 'bottom', 'left', 'right'],
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 8.84],
          },
        },
      ],
    })

    nextTick(() => {
      popper.value?.update()
    })
    return
  }

  const el = event?.target as HTMLElement
  const found = el
    ?.closest('.popover-wrapper__slot')
    ?.classList?.value?.includes('popover-wrapper__slot')
  if (found) return
  popper.value?.destroy()
  popper.value = null
}
</script>

<style lang="scss">
.popover--warning {
  --bg-color: theme('colors.warning.DEFAULT');
  color: theme('colors.white');
}

.popover--default {
  --bg-color: theme('colors.primary.DEFAULT');
  color: theme('colors.gray.800');
}

.popover--danger {
  --bg-color: theme('colors.danger.DEFAULT');
  color: theme('colors.white');
}

#popover-reference {
  z-index: 99;
}

.popover-wrapper {
  position: relative;
}

.popover-container {
  position: absolute;
  z-index: 99 !important;
}

[data-popper-placement^='bottom'] .popover-wrapper__slot {
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent var(--bg-color) transparent;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
[data-popper-placement^='top'] .popover-wrapper__slot {
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 10px 0 10px;
    border-color: var(--bg-color) transparent transparent transparent;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
[data-popper-placement^='right'] .popover-wrapper__slot {
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent var(--bg-color);
    left: -10px;
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
  }
}
[data-popper-placement^='left'] .popover-wrapper__slot {
  &::before {
    // add an arrow to right
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 10px 10px 0;
    border-color: transparent var(--bg-color) transparent transparent;
    right: -10px;
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
  }
}

.popover-wrapper__slot {
  position: relative;
  display: inline-block;
  min-height: 71px;
  min-width: 195px;
  border-radius: 20px;
  background: var(--bg-color);
  box-shadow: 0px 10px 50px rgba(6, 16, 88, 0.09);
  border-radius: 20px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  justify-content: center;
  & p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
  }
}
</style>
