import { useRoute, useRouter } from 'vue-router'
import { RouterNames } from '@/router/const'
import { getRouterInstance } from '@/router'
import type { MenuItem } from '@/components/CommonAside/menu'

export function useGoto() {
  const router = useRouter()
  const route = useRoute()

  function gotoLogin() {
    router.push({
      name: RouterNames.LOGIN,
    })
  }

  function gotoMenuPage(routerPath: MenuItem['router']) {
    if (routerPath === route.path) return

    router.push({
      path: routerPath,
    })
  }

  return { gotoLogin, gotoMenuPage }
}

export function goToLogin() {
  return getRouterInstance().replace({ name: RouterNames.LOGIN })
}
