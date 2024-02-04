import axios from 'axios'
import { checkHaveToken, getToken, removeToken, removeUserInfo } from '@/utils/cookie'
import { goToLogin } from '@/composables/goto'
import { messageError } from '@/composables/message'
import { showFullScreenLoading, hiddenFullScreenLoading } from '@/utils/loading'
import type { AxiosInstance, AxiosResponse } from 'axios'

export interface ResponseData<T> {
  code: string
  message: string | null
  data?: T
}

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ROOT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((config) => {
  showFullScreenLoading()
  if (checkHaveToken()) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
})

http.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>, ResponseData<any>>) => {
    const { code, data, message } = response.data
    hiddenFullScreenLoading()
    if (code === '200') {
      return data
    }

    if (code === '300') {
      goToLogin()
      removeToken()
      removeUserInfo()
    } else {
      messageError(message as string)
      return Promise.reject(new Error(message as string))
    }
  },
  (error) => {
    hiddenFullScreenLoading()
    if (error.response.status) {
      // TODO: 到时这边改成 301，拿飞渝项目测试一下
      switch (error.response.status) {
        case 401:
          goToLogin()
          removeToken()
          removeUserInfo()
          break
      }
    }

    return Promise.reject(error)
  },
)
