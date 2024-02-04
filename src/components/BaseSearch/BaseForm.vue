<script setup lang="ts">
import FormItem from './BaseFormItem.vue'
import useForm from './form'
import type { FormProps } from './form'

const props = defineProps<FormProps>()

const { config, values, formElementRef, submit, reset } = useForm(props)
</script>

<template>
  <el-form :model="values" ref="formElementRef" inline>
    <template v-for="item in config" :key="item.prop">
      <FormItem :item="item" :value="values" />
    </template>
    <slot name="footer">
      <el-form-item>
        <el-button type="primary" @click="submit()">查询</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>

<style scoped></style>
