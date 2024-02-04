<template>
  <el-dropdown @command="handleCommand">
    <img src="https://avatars.githubusercontent.com/u/21263805?v=4" alt="avatar" class="w-8 h-8" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :command="CommandType.LOGOUT">
          {{ ITEM_NAMES[CommandType.LOGOUT] }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useSelectOption } from './selectOption'
import { CommandType } from './selectOption'

const { handleClick } = useSelectOption()

const ITEM_NAMES = {
  [CommandType.LOGOUT]: '退出登录',
}

const handleCommand = (command: CommandType) => {
  handleClick(command)
}
</script>

<style scoped lang="scss"></style>
