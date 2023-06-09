import { ComponentInternalInstance, h, render } from 'vue'
import Mystery from './Mystery.vue'

function createComponent(component: any, props: any, parentContainer: Element) {
  const vnode = h(component, props)
  const container = document.createElement('div')
  parentContainer.appendChild(container)
  render(vnode, container)

  return vnode.component
}

function removeElement(el: Element) {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else {
    el.parentNode?.removeChild(el)
  }
}

export { default as Mystery } from './Mystery.vue'

export function useMystery(globalProps: any = {}, globalSlots: any = {}) {
  let instance: ComponentInternalInstance | any = null

  const loading = {
    show(props: any = globalProps, slots: any = globalSlots) {
      const forceProps = {
        programmatic: true,
        lockScroll: true,
        isFullPage: false,
      }
      const propsData = Object.assign({}, globalProps, props, forceProps)
      let container = propsData.container

      if (!propsData.container) {
        container = document.body
        propsData.isFullPage = true
      }

      instance = createComponent(Mystery, propsData, container)
      const mergedSlots = Object.assign({}, globalSlots, slots)
      // eslint-disable-next-line array-callback-return
      Object.keys(mergedSlots).map((name) => {
        if (instance != null) {
          instance.slots[name] = mergedSlots[name]
        }
      })
    },
    hide() {
      if (instance != null) {
        instance.ctx.hide()
        const root = instance.vnode.el
        removeElement(root.parentElement)
      }
    },
  }
  return loading
}
