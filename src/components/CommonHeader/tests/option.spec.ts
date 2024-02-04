import { describe, it, expect, vi, afterEach } from 'vitest'
import { CommandType, useSelectOption } from '../selectOption'
import { removeToken, removeUserInfo } from '@/utils/cookie'

const gotoLogin = vi.fn()

vi.mock('@/utils/cookie')
vi.mock('@/composables/goto', () => {
  return {
    useGoto: () => {
      return {
        gotoLogin,
      }
    },
  }
})

describe('common-header-menu-select', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should trigger logout', () => {
    const { handleClick } = useSelectOption()
    handleClick(CommandType.LOGOUT)

    expect(removeToken).toBeCalled()
    expect(removeUserInfo).toBeCalled()
    expect(gotoLogin).toBeCalled()
  })
})
