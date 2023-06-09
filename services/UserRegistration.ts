/* eslint-disable import/order */
import Cookie from 'js-cookie'
import { Ref } from 'vue'
import { CookieRef } from '#app'
import { IUserToken } from './UserToken'

export interface IUserRegistration {
  email: string
  token: IUserToken
  timestamp: number
}

export const registrationDefaults: IUserRegistration = {
  email: '',
  token: {
    hash: '',
    type: 'Bearer',
  } as IUserToken,
  timestamp: -1,
}
export const UserRegistrationServiceKey = 'user.registration'
export type UserRegistrationService = {
  get: () => IUserRegistration
  set: (val: IUserRegistration) => void
  reset: () => void
  setEmail: (val: string) => string
  setToken: (val: IUserToken) => IUserToken
  setTimestamp: (val: number) => number
  _state: Ref<IUserRegistration>
  _cookie: CookieRef<IUserRegistration>
}
/**
 * UserRegistration service is meant to hold necessary data
 * that may be required to be persisted in times of registration
 *
 * @returns UserRegistrationService
 */
export function UserRegistration(): UserRegistrationService {
  // composable
  const _state = useState<IUserRegistration>(
    UserRegistrationServiceKey,
    () => registrationDefaults
  )
  const _cookie = useCookie<IUserRegistration>(UserRegistrationServiceKey, {
    expires: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
  })

  // methods
  const get = (): IUserRegistration => _cookie.value || registrationDefaults
  const set = (val: IUserRegistration) => _onChange(val)
  const reset = () => _onChange(registrationDefaults)

  const setEmail = (val: string) => (_state.value.email = val)
  const setToken = (val: IUserToken) => (_state.value.token = val)
  const setTimestamp = (val: number) => (_state.value.timestamp = val)

  const _onChange = (val: IUserRegistration) => {
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
    setEmail,
    setToken,
    setTimestamp,
    // internals, for edge cases direct access
    _state,
    _cookie,
  }
}

// We might need to access the token in places where nuxtApp() hasn't yet initialized
// in that case, we can use ReadRegistration(). E.g. Http.ts needs it.
export function ReadRegistration(): IUserRegistration {
  let registrationData: IUserRegistration = registrationDefaults
  try {
    registrationData = JSON.parse(
      Cookie.get(UserRegistrationServiceKey) ??
        JSON.stringify(registrationDefaults)
    )
  } catch (e) {
    console.error('Failed to read user.registration!', e)
  }
  return registrationData
}
