import { describe, it, expect, beforeEach } from 'vitest'
import useList from '../searchList'
import { formItemConfig } from '@/tests/fixture'
import type { TableType, FormType } from '../searchList'

const callback = (): Promise<CommonSearchListDto<string>> => {
  return new Promise((resolve) => {
    resolve({ total: '200', records: ['你好'] })
  })
}

let formHook: FormType
let tableHook: TableType

describe('search list', () => {
  beforeEach(() => {
    const { form, table } = useList(formItemConfig(), callback)
    formHook = form
    tableHook = table
  })

  it('should return correct pageNo | total | data when the handlerSubmit is called ', async () => {
    await formHook.handlerSubmit(formHook.value)

    expect(tableHook.pagination.pageNo).toBe(1)
    expect(tableHook.pagination.total).toBe(200)
    expect(tableHook.data.length).toBe(1)
  })

  it('should return initial form values map', () => {
    const { form } = useList(formItemConfig({ value: '小李' }), callback)

    expect(form.value).toEqual({ name: '小李' })
  })

  it('should return form values is undefined', () => {
    expect(formHook.value).toEqual({ name: undefined })
  })

  it('should return correct table obj', async () => {
    await tableHook.onChange({ pageSize: 10, pageNo: 2 })

    expect(tableHook.pagination.pageNo).toBe(2)
    expect(tableHook.pagination.pageSize).toBe(10)
    expect(tableHook.pagination.total).toBe(200)
    expect(tableHook.data.length).toBe(1)
  })
})
