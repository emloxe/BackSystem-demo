<template>
  <div class="header">
    <div class="top clearfix" :style="{ backgroundColor: $store.getters.cssVar.headerTopBg }">
      <TopRightMenu />
    </div>
    <TagsView />
    <div>
      <Hamburger class="hamburger-container" />
      <breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
    </div>
  </div>
</template>

<script setup>
import Hamburger from './Hamburger';
import TopRightMenu from './TopRightMenu.vue';
import Breadcrumb from './Breadcrumb';
import TagsView from './TagsView/Index.vue';

import {} from 'vue';
</script>

<style lang="scss" scoped>
.header {
  height: 150px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .top {
    padding: 6px 0;
    border-bottom: 1px solid rgb(238, 238, 238);
  }
}
</style>
