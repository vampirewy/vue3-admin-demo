import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useHome } from '../home'
import useList from '../searchList'
import { fetchAccountList } from '@/api/account'
import type { AccountInfo, ParamsWithoutCreateTime } from '@/controller/merchantAccount/accountControl'

const accountListParams: ParamsWithoutCreateTime = {
  account: '',
  channelCode: '1',
  startTime: '2021-01-01',
  endTime: '2021-01-02',
  size: 10,
  current: 1,
}

const formItemConfig = [
  { component: 'input', prop: 'account', label: '账户' },
  {
    component: 'select',
    label: '账户来源',
    prop: 'channelCode',
    placeholder: '请输入账户来源',
    value: '1',
    options: [
      { label: '账户1', value: '1' },
      { label: '账户2', value: '2' },
    ],
  },
  {
    component: 'date-picker',
    label: '创建时间',
    type: 'daterange',
    prop: 'createTime',
    value: ['2021-01-01', '2021-01-02'],
  },
]

const ACCOUNT_LIST = [
  {
    id: '1',
    account: '小王',
    channelName: '账户1',
    enableStr: '禁用',
    registerTime: '2021-01-01',
    enable: true,
  },
]
const total = 100

function createMerchantAccountListResponse() {
  return {
    total: total.toString(),
    records: ACCOUNT_LIST,
  } as CommonSearchListDto<AccountInfo>
}

vi.mock('@/api/account')
vi.mocked(fetchAccountList).mockImplementation(async () => createMerchantAccountListResponse())

describe('home', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should return account list data and total', async () => {
    const { merchantAccountList, config } = useHome()
    config.value = formItemConfig

    const { table, getList } = useList(config.value, merchantAccountList)

    await getList(merchantAccountList)

    expect(fetchAccountList).toBeCalledWith(accountListParams)

    expect(table.data).toEqual(ACCOUNT_LIST)
    expect(table.pagination.total).toBe(total)
  })
})
