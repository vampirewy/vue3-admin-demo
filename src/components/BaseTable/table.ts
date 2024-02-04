import { computed } from 'vue'
import type { Pagination, PaginationWithoutTotal } from '@/composables/searchList'

export interface TableProps {
  columns: TableItem[]
  data: any[]
  pagination: boolean | Pagination
  onChange: (pagination: PaginationWithoutTotal) => void
}

export interface TableItem {
  label: string
  prop?: string
  [key: string]: string | undefined
}

export function useTable(tableColumns: TableItem[]) {
  const mergeColumns = computed(() => {
    return tableColumns.map((item) => {
      return {
        ...item,
        showOverflowTooltip: true,
        align: 'center',
      }
    })
  })

  return {
    mergeColumns,
  }
}
