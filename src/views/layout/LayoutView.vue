<template>
  <el-container class="layout">
    <el-aside>
      <CommonAside />
    </el-aside>
    <el-container class="layout-container">
      <el-header>
        <CommonHeader />
      </el-header>
      <el-main class="rounded-md">
        <CommonBreadcrumb />
        <main class="bg-white rounded-md p-3">
          <RouterView />
        </main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader/HeaderItem.vue'
import CommonAside from '@/components/CommonAside/AsideComponent.vue'
import CommonBreadcrumb from '@/components/CommonBreadcrumb/CommonBreadcrumb.vue'
</script>

<style scoped lang="scss">
.layout {
  height: 100%;
  flex-direction: row !important;

  // &-container {
  //   margin-top: 60px;
  // }
}

::v-deep(.el-header) {
  --el-header-padding: 0;
  height: 56px;
}
::v-deep(.el-aside) {
  height: 100vh;
  background: #fff;
  width: 240px;
}

::v-deep(.el-menu) {
  border-right: none;
}
</style>
