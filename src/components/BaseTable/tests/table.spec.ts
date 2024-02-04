import { describe, expect, it } from 'vitest'
import { useTable } from '../table'
import { useTablePagination } from '../tablePagination'
import type { TableItem } from '../table'
import type { PaginationProps } from '../tablePagination'
import type { Pagination } from '@/composables/searchList'

const columns: TableItem[] = [
  {
    label: '姓名',
    prop: 'name',
  },
]

const paginationMap: PaginationProps = {
  pagination: {
    pageNo: 1,
    pageSize: 10,
    total: 100,
  },
}

function mockInitialColumns(columnsItem: TableItem) {
  return [
    {
      ...columnsItem,
      showOverflowTooltip: true,
      align: 'center',
    },
  ]
}

function mockPaginationOptions(pagination: Pagination) {
  return {
    ...pagination,
    pageSizes: [10, 20, 50],
    layout: 'prev,pager,next,sizes,total,jumper',
    currentPage: pagination.pageNo,
  }
}
describe('table', () => {
  it('should initial finally columns', () => {
    const { mergeColumns } = useTable(columns)

    expect(mergeColumns.value).toEqual(mockInitialColumns(columns[0]))
  })

  it('should initial options of pagination', () => {
    const { options } = useTablePagination(paginationMap)

    expect(options.value).toEqual(mockPaginationOptions(paginationMap.pagination as Pagination))
  })

  it('should set correct pageNo when handle is called', () => {
    const { options, handleChangePagination } = useTablePagination(paginationMap)

    handleChangePagination(2, 'page')

    expect(options.value.pageNo).toBe(2)
  })

  it('should reset pageNo when pageSize is changed', () => {
    const { options, handleChangePagination } = useTablePagination(paginationMap)

    handleChangePagination(2, 'page')

    handleChangePagination(20, 'size')
    expect(options.value.pageNo).toBe(1)
    expect(options.value.pageSize).toBe(20)
  })
})
