import { defineStore } from 'pinia'
import { TokenRes } from '~~/api'
import { UserToken } from '~~/services'

export interface AuthState {
  isBusy: boolean
  user: null | any
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isBusy: false,
    user: null,
  }),
  getters: {
    isAuthenticated(): boolean {
      const userToken = useState<TokenRes>('user.token')
      return userToken.value?.access_token?.length > 32
    },
    currentUser() {
      return useState('user.data')
    },
  },
  actions: {
    simulateAuthenticated() {
      UserToken().set({
        hash: 'Fake_Token__' + Math.random() + '__' + Math.random(),
        type: 'Bearer',
      })
    },
    simulateUnauthenticated() {
      UserToken().reset()
    },
  },
})
