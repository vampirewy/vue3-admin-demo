import { ref } from 'vue'
import { mapMerchantAccountList } from '@/controller/merchantAccount/accountControl'
import type { FormItem } from '@/components/BaseSearch/form'
import type { AccountListParams } from '@/controller/merchantAccount/accountControl'
import type { TableItem } from '@/components/BaseTable/table'

export function useHome() {
  const config = ref<FormItem[]>([
    { component: 'input', prop: 'account', placeholder: '请选择账户', label: '账户', value: '小王' },
    {
      component: 'select',
      label: '账户来源',
      prop: 'channelCode',
      placeholder: '请输入账户来源',
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
    },
  ])

  const column = ref<TableItem[]>([
    { type: 'index', label: '序号' },
    { label: '账户ID', prop: 'id' },
    { label: '账户', prop: 'account' },
    { label: '账户来源', prop: 'channelName' },
    { label: '账户状态', prop: 'enableStr' },
    { label: '创建时间', prop: 'registerTime' },
    {
      label: '操作',
      prop: 'action',
    },
  ])

  async function merchantAccountList(params: AccountListParams) {
    const { records, total } = await mapMerchantAccountList(params)
    return {
      records,
      total,
    }
  }
  return {
    config,
    column,
    merchantAccountList,
  }
}
