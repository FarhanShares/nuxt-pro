import Cookie from 'js-cookie'
import { Ref } from 'vue'
import { CookieRef } from '#app'
export interface IUserToken {
  hash: string
  type: 'Bearer'
}

export const tokenDefaults: IUserToken = {
  hash: '',
  type: 'Bearer',
}

export const UserTokenServiceKey = 'user.token'

type UserTokenService = {
  get: () => IUserToken
  set: (val: IUserToken) => void
  reset: () => void
  _state: Ref<IUserToken>
  _cookie: CookieRef<IUserToken>
}

/**
 * UserToken Service
 *
 * @returns UserTokenService
 */
export function UserToken(): UserTokenService {
  // composables
  const _state = useState<IUserToken>(UserTokenServiceKey, () => tokenDefaults)
  const _cookie = useCookie<IUserToken>(UserTokenServiceKey, {
    expires: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
  })

  // methods
  const get = (): IUserToken => _cookie.value || tokenDefaults
  const set = (val: IUserToken) => _onChange(val)
  const reset = () => _onChange(tokenDefaults)

  const _onChange = (val: IUserToken) => {
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

// We might need to access the token in places where nuxtApp() hasn't yet initialized
// in that case, we can use ReadUserToken(). E.g. Http.ts needs it.
export function ReadUserToken(): IUserToken {
  let token: IUserToken = tokenDefaults
  try {
    // todo: make the names type safe (e.g. user.token, user.data)
    token = JSON.parse(
      Cookie.get(UserTokenServiceKey) ?? JSON.stringify(tokenDefaults)
    )
  } catch (e) {
    console.error('Failed to read token!', e)
  }
  return token
}
