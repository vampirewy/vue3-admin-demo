import { beforeEach, vi } from 'vitest'
import { createRouterMock, VueRouterMock, injectRouterMock } from 'vue-router-mock'
import { config } from '@vue/test-utils'

export function setup() {
  const router = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockClear(),
    },
  })

  config.plugins.VueWrapper.install(VueRouterMock)

  beforeEach(() => {
    router.reset()
    injectRouterMock(router)
  })

  return {
    router,
  }
}

setup()
