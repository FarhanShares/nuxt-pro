import { Mystery, useMystery } from './useMystery'

export { Mystery, useMystery } from './useMystery'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Mystery', Mystery)

  return {
    provide: {
      mystery: useMystery(),
    },
  }
})
