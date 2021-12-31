<template>
  <div class="icon-wrap">
    <svg-icon :icon="icon"></svg-icon>
  </div>
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { generateTitle } from '@/utils/i18n';
import { defineProps } from 'vue';
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.icon-wrap {
  width: 30px;

  ::v-deep .svg-icon {
    width: 1.2em;
    height: 1.2em;
  }
}
</style>
