<template>
  <el-table :data="data" @selection-change="handleSelectionChange">
    <template v-for="column in mergeColumns" :key="column.prop">
      <el-table-column v-bind="column" v-if="column.prop && $slots[column.prop]">
        <template #default="scope">
          <slot :name="column.prop" :v-bind="scope" />
        </template>
      </el-table-column>

      <el-table-column v-else v-bind="column" />
    </template>
  </el-table>

  <TablePagination :pagination="pagination" @change="handleChange" />
</template>

<script setup lang="ts">
import TablePagination from './TablePagination.vue'
import { useTable } from './table'
import type { TableProps } from './table'

const props = defineProps<TableProps>()

const { mergeColumns } = useTable(props.columns)

const emits = defineEmits(['selectionChange'])

const handleSelectionChange = (selection: any[]) => {
  emits('selectionChange', selection)
}

const handleChange = (pagination: { pageSize: number; pageNo: number }) => {
  if (props.onChange) {
    props.onChange(pagination)
  }
}
</script>

<style lang="scss" scoped></style>
