import Toast, {
  POSITION as ToastPositions,
  useToast as useToastPlugin,
} from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import ToastComponent from './Toast.vue'
export type ToastTypes = 'success' | 'warning' | 'error' | 'thumbs'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: ToastPositions.TOP_RIGHT,
  })
  nuxtApp.provide('toast', useToastStack)
})

type ToastStack = {
  title: string
  message?: string
  //
  type?: ToastTypes
  timeout?: number
  position?: ToastPositions
  progressBar?: boolean
  //
  primaryAction?: string
  secondaryAction?: string
  onPrimaryAction?: VoidFunction
  onSecondaryAction?: VoidFunction
  //
  icon?: boolean
  closeButton?: boolean
  closeOnClick?: boolean
  pauseOnHover?: boolean
  pauseOnFocusLoss?: boolean
}

export { ToastPositions }
export const useToastStack = (opt: ToastStack) => {
  if (!opt.title) return

  const toast = useToastPlugin()

  const toastId: string | number = toast(
    {
      component: ToastComponent,
      props: {
        type: opt.type ?? 'success',
        title: opt.title,
        message: opt.message,
        icon: opt.icon ?? true,
        closeButton: opt.closeButton ?? true,
        primaryAction: opt.primaryAction,
        secondaryAction: opt.secondaryAction,
      },
      listeners: {
        onPrimaryAction: () => {
          if (opt.primaryAction && typeof opt.onPrimaryAction === 'function') {
            opt.onPrimaryAction()
          }
        },
        onSecondaryAction: () => {
          if (
            opt.secondaryAction &&
            typeof opt.onSecondaryAction === 'function'
          ) {
            opt.onSecondaryAction()
          }
        },
      },
    },
    {
      timeout: opt.timeout ?? 3500,
      position: opt.position ?? ToastPositions.TOP_RIGHT,
      closeOnClick: opt.closeOnClick ?? false,
      pauseOnHover: opt.pauseOnHover ?? true,
      pauseOnFocusLoss: opt.pauseOnFocusLoss ?? true,
      hideProgressBar: !opt.progressBar ?? true,
      // thsese will effect the main component (not the custom component)
      // thus it's better to keep it constant based on the expected behaviour
      rtl: false,
      icon: false,
      draggable: true,
      closeButton: false,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
    }
  )

  return toastId
}
