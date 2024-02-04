<template>
  <div v-if="pagination">
    <el-pagination
      @size-change="(val: number) => handleChange(val, 'size')"
      @current-change="(val: number) => handleChange(val, 'page')"
      v-bind="options"
    />
  </div>
</template>

<script setup lang="ts">
import { useTablePagination } from './tablePagination'
import type { PaginationProps } from './tablePagination'

const props = defineProps<PaginationProps>()

const { options, handleChangePagination } = useTablePagination(props)

const emits = defineEmits(['change'])

const emitToFather = () => {
  emits('change', {
    pageNo: options.value.pageNo,
    pageSize: options.value.pageSize,
  })
}

const handleChange = (val: number, action: string) => {
  handleChangePagination(val, action)

  emitToFather()
}
</script>

<style lang="scss" scoped></style>
