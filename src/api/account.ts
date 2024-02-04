import { http } from './http'
import type { ParamsWithoutCreateTime, AccountInfo } from '@/controller/merchantAccount/accountControl'

export async function fetchAccountList(params: ParamsWithoutCreateTime) {
  return await http.post<CommonSearchListDto<AccountInfo>, CommonSearchListDto<AccountInfo>>(
    '/admin/user/accountList',
    params,
  )
}
