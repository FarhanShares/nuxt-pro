import { Http } from './Http'

export * from './Http'
export * from './UserData'
export * from './UserToken'
export * from './UserRegistration'
// export * from './AppStorage.ts.x'

export const httpServiceHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
})

export const httpService = new Http({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: httpServiceHeaders(),
})
