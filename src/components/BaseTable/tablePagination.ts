import { computed } from 'vue'
import type { Pagination } from '@/composables/searchList'

export interface PaginationProps {
  pagination: Pagination | boolean
}

const defaultOption = {
  pageSizes: [10, 20, 50],
  layout: 'prev,pager,next,sizes,total,jumper',
}

const actionMap = {
  page: 'page',
  size: 'size',
}

export const useTablePagination = (props: PaginationProps) => {
  const options = computed(() => {
    return {
      ...defaultOption,
      ...(props.pagination as Pagination),
      currentPage: (props.pagination as Pagination).pageNo,
    }
  })

  const handleChangePage = (page: number) => {
    options.value.pageNo = page
  }

  const handleChangePageSize = (pageSize: number) => {
    options.value.pageSize = pageSize
  }

  const handleChangePagination = (val: number, action: string) => {
    if (action === actionMap.page) {
      handleChangePage(val)
    }

    if (action === actionMap.size) {
      handleChangePageSize(val)
      handleChangePage(1)
    }
  }

  return {
    options,
    handleChangePagination,
  }
}
