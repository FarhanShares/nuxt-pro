// import { Screen } from '~~/features/auth'

// is it open or closed?
export const useAuthModalState = () =>
  useState<boolean>('auth.modal.state', () => false)

// the active screen name
// export const useAuthModalScreen = () =>
//   useState<Screen>('auth.modal.screen', () => 'login')
