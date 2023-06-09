// import useAspidaSWRV from '@aspida/swrv'
import aspida from '@aspida/axios'
import axios from 'axios'
// import { useHttp } from './useHttp'
import api from '~/api/$api'

// export const useApi = () => {
//   return api(aspida(useHttp().instance()))
// }

const axiosConfig = {
  baseURL: 'https://ark.deenibondhon.com',
}
export const useApi = () => {
  return api(aspida(axios, axiosConfig))
}
