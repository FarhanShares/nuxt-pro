import { usePopStack } from './usePopStack'

export { default as PopStack } from './PopStack.vue'
export { usePopStack } from './usePopStack'

export default defineNuxtPlugin((_nuxtApp) => {
  /**
   * The component instead auto imported via unplugin
   * @see nuxt.config.js --> vite.plugins.UnpluginComponentVite resolvers
   * So the following line is not needed.
   * nuxtApp.vueApp.component('PopStack', PopStack)
   */
  return {
    provide: {
      popStack: usePopStack(),
    },
  }
})

// TODO: make a resover for UnpluginComponentVite
// export const PopStackComponentResolver = (componentName: string) => {
//   if (componentName === 'PopStack')
//     return {
//       name: 'default',
//       from: '~~/plugins/pop-stack/PopStack.vue',
//       as: 'PopStack',
//     }
// }
