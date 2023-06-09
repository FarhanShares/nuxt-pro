import { useToastStack, ToastPositions } from '~/plugins/toast-stack'

interface ResponseError {
  response?: {
    data?: { message?: string }
    status: number
  }
}

export const useResponseErrorToast =
  (title: string) => (error?: ResponseError) => {
    console.log(`${title} ::`, error?.response)
    useToastStack({
      title,
      message: error?.response?.data?.message || 'Please try again later',
      type: 'error',
      position: ToastPositions.TOP_CENTER,
    })
  }
