<template>
  <div class="layout">
    <el-container>
      <!-- 左侧 menu -->
      <el-aside><Sidebar /></el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px"><Navbar /></el-header>
        <el-main><AppMain /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar/Index';
import AppMain from './components/AppMain';
</script>

<style lang="less">
.layout,
.el-container {
  height: 100%;
  background: #f0f2f5;
}
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}
</style>
