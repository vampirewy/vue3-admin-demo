import { expect, describe, it } from 'vitest'
import { useSetup } from '@/tests/helper'
import { setup } from '../../../vitest.setup'
import { useGoto } from '../goto'
import { RouterNames } from '@/router/const'

const HOME_PATH = '/home'

describe('goto', () => {
  it('should go to login page', () => {
    const { wrapperRouter } = useSetup(() => {
      const { gotoLogin } = useGoto()
      gotoLogin()
    })

    expect(wrapperRouter.push).toBeCalledWith({ name: RouterNames.LOGIN })
  })

  it("should render home page when home's/ menu is clicked", () => {
    const { wrapperRouter } = useSetup(() => {
      const { gotoMenuPage } = useGoto()
      gotoMenuPage(HOME_PATH)
    })

    expect(wrapperRouter.push).toBeCalledWith({ path: HOME_PATH })
  })

  it('should not render home page when the url is already /home', () => {
    const { router } = setup()
    router.currentRoute.value.path = HOME_PATH

    const { wrapperRouter } = useSetup(() => {
      const { gotoMenuPage } = useGoto()
      gotoMenuPage(HOME_PATH)
    })

    expect(wrapperRouter.push).not.toBeCalled()
  })
})
