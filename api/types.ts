// Common Types should be placed here

export type TPaginationMeta = {
  current_page: number
  from: number
  last_page: number
  next_page_url: string | null
  prev_page_url: string | null
  links: { url: string | null; label: string; active: boolean }[]
  path: string
  per_page: number
  to: number
  total: number
}

export type TListResponse<T> = {
  data: Array<T>
  // links: Array<any> // not needed for now
  // meta data
  meta: TPaginationMeta
}

// TODO: define TSoleResponse, TErrorResponse, TValidationErrorResponse, TAuthErrorResponse
