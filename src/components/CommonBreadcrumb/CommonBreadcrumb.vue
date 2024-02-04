<template>
  <el-breadcrumb class="rounded-md mb-5 p-3 breadcrumb h-11 bg-white flex items-center" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in routerList" :key="item.path">
        <span class="breadcrumb__text" v-if="index === routerList.length - 1">{{ item.title }}</span>
        <router-link class="breadcrumb__text" :to="{ path: item.fullPath }" v-else>
          {{ item.title }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const routerList = ref([
  {
    path: '1',
    title: '首页',
    fullPath: '/',
  },
  {
    path: '2',
    title: '账户管理',
    fullPath: '/merchant/account-list',
  },
])
</script>

<style scoped lang="scss"></style>
