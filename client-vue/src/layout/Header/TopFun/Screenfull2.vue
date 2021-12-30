<template>
  <div>
    <svg-icon
      id="guide-full"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="onToggle"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 是否全屏
const isFullscreen = ref(false);

// 设置侦听器
onMounted(() => {
  screenfull.on('change', change);
});

// 删除侦听器
onUnmounted(() => {
  screenfull.off('change', change);
});
</script>

<style lang="scss" scoped></style>
