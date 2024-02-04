<template>
  <el-form-item :label="item.label ? `${item.label}：` : ''" :prop="item.prop">
    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <component :is="`el-${item.component}`" v-model="value[item.prop]" v-bind="item">
      <template v-if="item.component === 'select'">
        <el-option v-for="(opt, index) in item.options" :key="index" :label="opt.label" :value="opt.value" />
      </template>
    </component>
  </el-form-item>
</template>

<script setup lang="ts">
import { FormItemProps } from './formItem'

defineProps<FormItemProps>()
</script>

<style lang="scss" scoped>
::v-deep(.el-select) {
  width: 200px;
}
</style>
