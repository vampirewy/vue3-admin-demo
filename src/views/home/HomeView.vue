<template>
  <div>
    <BaseSearch :searchConfig="config" v-bind="form" />
    <BaseTable :columns="column" v-bind="table">
      <template #action>
        <el-button type="primary" text>详情</el-button>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useList from '@/composables/searchList'
import BaseSearch from '@/components/BaseSearch/BaseForm.vue'
import BaseTable from '@/components/BaseTable/BaseTable.vue'
import { useHome } from '@/composables/home'
import type { AccountInfo, AccountListParams } from '@/controller/merchantAccount/accountControl'

const { config, column, merchantAccountList } = useHome()

const { form, table, getList } = useList<AccountListParams, AccountInfo>(config.value, merchantAccountList)

onMounted(() => {
  getList(merchantAccountList)
})
</script>

<style scoped></style>
