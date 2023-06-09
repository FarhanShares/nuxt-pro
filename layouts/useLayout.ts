import { useAuthStore } from '~~/stores'

/**
 * This is basically the setup() hook composable for layout components.
 * Use it to define props, meta data & all other common shared data, logic & functions.
 */
export function useLayout() {
  const route = useRoute()
  const authStore = useAuthStore()

  /**
   * If you use page meta props for layouts, always document it in /docs/page-meta.md
   * Because these are not type-safe & has global access, therefore it's a good idea to centralize all of these.
   *
   * Nav meta props         : {type}[default]
   * ----------------------------------------------
   * mainSlotClass          : {string}['']
   * appContainerClass      : {string}['']
   *
   * headerEnabled          : {boolean}[true]
   * headerBgEnabled        : {boolean}[true]
   * headerBgSize           : {number}[280]
   * footerEnabled          : {boolean}[true]
   */
  const mainSlotClass = computed(() => route.meta?.mainSlotClass ?? '')
  const appContainerClass = computed(() => route.meta?.appContainerClass ?? '')

  const headerEnabled = computed(() =>
    typeof route.meta.headerEnabled === 'boolean'
      ? route.meta.headerEnabled
      : true
  )
  const headerBgSize = computed(
    () =>
      typeof route.meta.headerBgSize === 'number'
        ? route.meta.headerBgSize
        : 280 // default size (px)
  )
  const headerBgEnabled = computed(() =>
    typeof route.meta.headerBgEnabled === 'boolean'
      ? route.meta.headerBgEnabled
      : true
  )
  const footerEnabled = computed(() =>
    typeof route.meta.footerEnabled === 'boolean'
      ? route.meta.footerEnabled
      : true
  )

  // console.log('footer enabled', footerEnabled.value, headerBgEnabled.value)

  return {
    authStore,
    mainSlotClass,
    appContainerClass,

    headerEnabled,
    headerBgEnabled,
    headerBgSize,
    footerEnabled,

    isAuthenticated: computed(() => authStore.isAuthenticated),
  }
}
