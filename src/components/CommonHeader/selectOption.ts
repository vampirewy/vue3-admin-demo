import { removeToken, removeUserInfo } from '@/utils/cookie'
import { useGoto } from '@/composables/goto'

export enum CommandType {
  LOGOUT = 'logout',
}

export function useSelectOption() {
  const { gotoLogin } = useGoto()

  function logout() {
    removeToken()
    removeUserInfo()
    gotoLogin()
  }

  const handleClick = (command: CommandType) => {
    if (command === CommandType.LOGOUT) {
      logout()
    }
  }

  return {
    handleClick,
  }
}
