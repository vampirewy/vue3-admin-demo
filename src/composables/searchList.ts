import { reactive, computed } from 'vue'
import type { FormItem } from '@/components/BaseSearch/form'

export interface Pagination {
  pageSize: number
  pageNo: number
  total: number
}

export type PaginationWithoutTotal = Omit<Pagination, 'total'>

export interface TableType {
  data: any[]
  pagination: Pagination
  onChange: (pagination: PaginationWithoutTotal) => void
}

export interface FormType {
  value: { [key: string]: any }
  handlerSubmit: (values: { [key: string]: any }) => void
}

type CallbackType<T, U> = (params: T) => Promise<CommonSearchListDto<U>>

const useList = <T extends CommonSearchListParams, U>(searchConfig: FormItem[], callback: CallbackType<T, U>) => {
  let fn: CallbackType<T, U> = callback

  const form = reactive<FormType>({
    value: {},
    handlerSubmit: (values: { [key: string]: any }) => {
      Object.assign(form.value, values)
      table.pagination.pageNo = 1
      getList()
    },
  })

  const table = reactive<TableType>({
    data: [],
    pagination: {
      pageSize: 10,
      pageNo: 1,
      total: 0,
    },
    onChange: (pagination: PaginationWithoutTotal) => {
      Object.assign(table.pagination, pagination)
      getList()
    },
  })

  const getDefaultFormItemValues = () => {
    return searchConfig.reduce((value: { [key: string]: any }, item: FormItem) => {
      value[item.prop] = item.value
      return value
    }, {})
  }
  form.value = getDefaultFormItemValues()

  const params = computed(() => {
    return {
      ...form.value,
      current: table.pagination.pageNo,
      size: table.pagination.pageSize,
    }
  })

  const getList = async (callback?: typeof fn) => {
    if (callback) fn = callback

    const { total = '0', records = [] } = await fn(params.value as T)

    table.data = records
    table.pagination.total = Number(total)
  }

  return {
    form,
    table,
    getList,
  }
}

export default useList
