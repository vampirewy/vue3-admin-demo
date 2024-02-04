import { vi, beforeEach, it, describe, expect } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { http } from '../http'
import * as cookie from '@/utils/cookie'
import { setToken, removeToken, removeUserInfo } from '@/utils/cookie'
import { messageError } from '@/composables/message'
import { goToLogin } from '@/composables/goto'

interface ResponseData {
  code?: string
  message?: string
  data?: any
}

vi.mock('@/composables/message')
vi.mock('@/composables/goto')

const axiosMock = new MockAdapter(http)

function mockReply(statusCode: number): void
function mockReply(statusCode: number, responseData: ResponseData): void
function mockReply(statusCode: number, responseData?: ResponseData) {
  if (responseData) {
    axiosMock.onGet('/test').reply(statusCode, responseData)
  } else {
    axiosMock.onGet('/test').reply(statusCode)
  }
}

describe('http', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    axiosMock.reset()
  })

  it('should set headers Authorization when token exist', async () => {
    const token = 'token'
    // 如果 mock 整个 cookie ，会导致 getToken 拿不到值， 所以在最后 case 中单独 mock
    setToken(token)
    mockReply(200, { code: '200' })

    await http.get('/test')

    expect(axiosMock.history.get[0].headers?.Authorization).toBe(`Bearer ${token}`)
  })

  it('should return data when code is 200', async () => {
    const responseData = {
      name: '你好',
    }
    mockReply(200, { code: '200', data: responseData })
    const data = await http.get('/test')

    expect(data).toEqual(responseData)
  })

  it('should show error message and throw error message when code is not 200', async () => {
    const errorMessage = '对不起，请求出错'

    mockReply(200, { code: '500', message: errorMessage })

    await expect(http.get('/test')).rejects.toThrow(errorMessage)

    expect(messageError).toBeCalledWith(errorMessage)
  })

  it('should redirect to login page when status is 401', async () => {
    vi.spyOn(cookie, 'removeToken')
    vi.spyOn(cookie, 'removeUserInfo')

    mockReply(401)

    await expect(http.get('/test')).rejects.toThrow()

    expect(goToLogin).toBeCalled()
    expect(removeToken).toBeCalled()
    expect(removeUserInfo).toBeCalled()
  })
})
