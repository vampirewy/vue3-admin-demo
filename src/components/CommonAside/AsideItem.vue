<template>
  <component
    :is="compName"
    :index="compIndex"
    @click="handleRouterToPage(item.router)"
    :class="$route.path === item.router ? 'is-active' : ''"
  >
    <template #title v-if="compName === ComponentNames.EL_SUB_MENU">
      <img class="w-4 h-4 mr-3 ml-4" v-if="item.iconUrl" :src="iconRootUrl + item.iconUrl" alt="" />
      <span>{{ item.name }}</span>
    </template>

    <template v-if="compName === ComponentNames.EL_MENU_ITEM">
      <img class="w-4 h-4 mr-3 ml-4" v-if="item.iconUrl" :src="iconRootUrl + item.iconUrl" alt="" />
      <span>
        {{ item.name }}
      </span>
    </template>
    <AsideItem v-for="subItem in item.children" :key="subItem.code" :item="subItem" />
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGoto } from '@/composables/goto'
import { useMenu } from './menu'
import { ComponentNames } from './menu'
import type { MenuItem, AsideItemProps } from './menu'

const props = defineProps<AsideItemProps>()

const { gotoMenuPage } = useGoto()
const { matchComponentName, uniqueComponentIdentifier } = useMenu()

const iconRootUrl = ref(import.meta.env.VITE_APP_MENU_ICON_ROOT_URL)

const compName = computed(() => {
  const { children } = props.item
  return matchComponentName(children)
})

const compIndex = computed(() => {
  return uniqueComponentIdentifier(props.item)
})

const handleRouterToPage = (currentRouterPath: MenuItem['router']) => {
  gotoMenuPage(currentRouterPath)
}
</script>

<style scoped></style>
