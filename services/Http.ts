/* eslint-disable no-console */
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ReadUserToken } from './UserToken'

export class Http {
  protected axios: AxiosInstance

  /**
   * @param  {{}} axiosConfig
   */
  public constructor(axiosConfig: {}) {
    this.axios = axios.create(axiosConfig)
  }

  /**
   * @returns any
   */
  public interceptors(): void {
    // request
    this.axios.interceptors.request.use(
      (config) => {
        const { hash: accessToken, type: accessTokenType } = ReadUserToken()

        // print only on local / dev env
        if (!import.meta.env.PROD) {
          console.log(
            `-> Hooking access token! The Token length is: ${accessToken?.length}`
          )
          !accessToken && console.log('-> No token found! Skipping..')
        }

        if (config?.headers && accessToken && accessTokenType) {
          config.headers.Authorization = `${accessTokenType} ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // response
    this.axios.interceptors.response.use(
      (response) => {
        // console.log('on-http-ok', response)
        // todo: transform snake_case to camelCase here
        return response
      },
      (error) => {
        console.log('on-http-error', error)
        // const originalRequest = error.config
        // todo: show toast?
        // if (error?.response?.status === 401 && !originalRequest?._retry) {
        // console.log('refreshing token')
        // await refreshToken()
        //   .then(() => {
        //     console.log('Token refreshed successfully')
        //   })
        // useRouter().push({ name: 'auth-login' })
        // return this.axios(originalRequest)
        // }

        // return Promise.reject(error);
        throw error
      }
    )
  }

  public instance(): AxiosInstance {
    this.interceptors()
    return this.axios
  }

  /**
   * @param  {string} url
   * @param  {{}} params?
   * @param  {{}} config?
   * @returns Promise
   */
  public get(
    url: string,
    params?: {},
    config?: {}
  ): Promise<AxiosResponse<any>> {
    this.interceptors()

    return this.axios.request({
      method: 'get',
      url,
      params,
      ...config,
    })
  }

  /**
   * @param  {string} url
   * @param  {{}} data
   * @param  {{}} config?
   * @returns Promise
   */
  public post(url: string, data: {}, config?: {}): Promise<AxiosResponse<any>> {
    this.interceptors()

    return this.axios.request({
      method: 'post',
      url,
      data,
      ...config,
    })
  }

  /**
   * @param  {string} url
   * @param  {{}} data
   * @param  {{}} config?
   * @returns Promise
   */
  public put(url: string, data: {}, config?: {}): Promise<AxiosResponse<any>> {
    this.interceptors()

    return this.axios.request({
      method: 'put',
      url,
      data,
      ...config,
    })
  }

  /**
   * @param  {string} url
   * @param  {{}} data
   * @param  {{}} config?
   * @returns Promise
   */
  public patch(
    url: string,
    data: {},
    config?: {}
  ): Promise<AxiosResponse<any>> {
    this.interceptors()

    return this.axios.request({
      method: 'patch',
      url,
      data,
      ...config,
    })
  }

  /**
   * @param  {string} url
   * @param  {{}} config?
   * @returns Promise
   */
  public delete(url: string, config?: {}): Promise<AxiosResponse<any>> {
    this.interceptors()

    return this.axios.request({
      method: 'delete',
      url,
      ...config,
    })
  }
}
