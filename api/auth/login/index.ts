import { DefineMethods } from 'aspida'
import { LoginReq, LoginRes } from './types'
export * from './types'

export type Methods = DefineMethods<{
  post: {
    reqBody: LoginReq
    resBody: LoginRes
  }
}>
