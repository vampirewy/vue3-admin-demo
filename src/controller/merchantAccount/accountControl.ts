import { fetchAccountList } from '@/api'

export interface AccountInfo {
  id: string
  account: string
  channelName: string
  enableStr: string
  registerTime: string
  enable: boolean
}

export interface AccountListParams extends CommonSearchListParams {
  account: string
  channelCode: string
  createTime: string[]
}

export type ParamsWithoutCreateTime = Omit<AccountListParams, 'createTime'> & { startTime: string; endTime: string }

export async function mapMerchantAccountList(params: AccountListParams): Promise<CommonSearchListDto<AccountInfo>> {
  const data: ParamsWithoutCreateTime = {
    account: params.account || '',
    channelCode: params.channelCode || '',
    size: params.size,
    current: params.current,
    startTime: params.createTime && params.createTime.length ? params.createTime[0] : '',
    endTime: params.createTime && params.createTime.length ? params.createTime[1] : '',
  }

  const { total, records } = await fetchAccountList(data)
  const lists = records.map((item) => {
    return {
      ...item,
      enableStr: item.enable ? '禁用' : '启用',
    }
  })

  return {
    records: lists,
    total,
  }
}
