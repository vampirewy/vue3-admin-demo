export interface MenuItem {
  code: string
  parentCode: string | null
  children: MenuItem[] | null
  name: string
  type: number
  sort: number
  subType: number
  iconUrl: string
  router: string
  enable: boolean
  description: string | null
  accessCode: string | null
}

export enum ComponentNames {
  EL_SUB_MENU = 'el-sub-menu',
  EL_MENU_ITEM = 'el-menu-item',
}
export interface AsideItemProps {
  item: MenuItem
}

export function useMenu() {
  function matchComponentName(children: MenuItem['children']) {
    return children && children.length > 0 ? ComponentNames.EL_SUB_MENU : ComponentNames.EL_MENU_ITEM
  }

  function uniqueComponentIdentifier({ router, children, code }: MenuItem) {
    return children && children.length > 0 ? code : router
  }

  return {
    matchComponentName,
    uniqueComponentIdentifier,
  }
}
