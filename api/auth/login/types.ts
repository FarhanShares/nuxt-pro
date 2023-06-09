export type LoginReq = {
  username: string
  password: string
}

export type TokenRes = {
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
}

export type LoginRes = TokenRes
