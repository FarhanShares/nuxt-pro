import { Ref } from 'vue'
import { CookieRef } from '#app'
import { TUser } from '~~/api'

// todo: do we really need this user default object?
// todo: can use just use defaults: { } as TUser
export const userDefaults: TUser = {
  id: '',
  username: '',
  email: '',
  active: false,
  email_verified_at: '' as string | null,
  created_at: '',
  updated_at: '' as string | null,
}

export const UserDataServiceKey = 'user.data'
export type UserDataService = {
  get: () => TUser
  set: (val: TUser) => void
  reset: () => void
  _state: Ref<TUser>
  _cookie: CookieRef<TUser>
}

/**
 * UserData service is meant to hold the current authenticated user data
 * that may be required to be persisted until logged out.
 *
 * @related UserToken service
 * @returns UserDataService
 */

export function UserData() {
  // composables
  const _state = useState<TUser>(UserDataServiceKey, () => userDefaults)
  const _cookie = useCookie<TUser>(UserDataServiceKey, {
    expires: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
  })

  // methods
  const get = (): TUser => _cookie.value || userDefaults
  const set = (val: TUser) => _onChange(val)
  const reset = (): void => _onChange(userDefaults)

  const _onChange = (val: TUser) => {
    _state.value = val
    _cookie.value = val
  }

  // init
  const _init = () => (_state.value = get())
  _onChange(get())
  onBeforeMount(() => _init())
  watch(_state, (val) => _onChange(val))

  return {
    // preferred public methods
    get,
    set,
    reset,
    // internals, for edge cases direct access
    _state,
    _cookie,
  }
}
