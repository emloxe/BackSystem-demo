<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :default-active="activeMenu"
    :collapse="!$store.getters.sidebarOpened"
    :unique-opened="true"
    :background-color="$store.getters.cssVar.sidebarBg"
    :text-color="$store.getters.cssVar.sidebarText"
    :active-text-color="$store.getters.cssVar.sidebarActiveText"
    router
  >
    <sidebar-item v-for="item in routes" :key="item.path" :route="item"></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue';
import SidebarItem from './SidebarItem';
import { useRouter, useRoute } from 'vue-router';
import { filterRouters, generateMenus } from '@/utils/route';

// 计算路由表结构
const router = useRouter();
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes());
  return generateMenus(filterRoutes);
});

// 计算高亮 menu 的方法
const route = useRoute();
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

::v-deep .is-active {
  background-color: rgba(0, 0, 0, 0.1);
}

// ::v-deep .el-menu {
//   background-color: $sidebarBg;

//   .el-menu-item {
//     // background-color: $sidebarBg;
//     color: $sidebarText;

//     &:hover {
//       background-color: rgba(0, 0, 0, 0.1);
//     }
//   }

//   &.el-menu--inline {
//     background-color: $subMenuBg;
//   }
// }
</style>
