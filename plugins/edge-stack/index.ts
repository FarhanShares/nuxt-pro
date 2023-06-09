import { useEdgeStack, edgeStackEmitter } from './useEdgeStack'

export { default as EdgeStack } from './EdgeStack.vue'
export { useEdgeStack, edgeStackEmitter } from './useEdgeStack'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('edgeStack', useEdgeStack)
  nuxtApp.provide('edgeStackBus', edgeStackEmitter)
})
