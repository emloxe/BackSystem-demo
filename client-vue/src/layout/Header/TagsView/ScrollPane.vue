<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script setup>
/* eslint-disable no-unused-vars */

const tagAndTagSpacing = 0; // tagAndTagSpacing
import { ref, computed, onMounted, onBeforeUnmount, defineEmits, watch } from 'vue';
import { useRoute } from 'vue-router';
const left = ref(0);

const route = useRoute();
const scrollContainer = ref();

import { isTags } from '@/utils/tags';

const emit = defineEmits(['scroll']);

const scrollWrapper = computed(() => {
  return scrollContainer.value.$refs.wrap$;
});

onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true);
});

onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll);
});

const handleScroll = (e) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40;
  const $scrollWrapper = scrollWrapper.value;
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
};

const emitScroll = () => {
  emit('scroll');
};

const moveToTarget = (currentTag) => {
  const $container = scrollContainer.value.$el;
  const $containerWidth = $container.offsetWidth;
  const $scrollWrapper = scrollWrapper.value;
  const tagList = this.$parent.$refs.tag;
  let firstTag = null;
  let lastTag = null;
  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0];
    lastTag = tagList[tagList.length - 1];
  }
  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0;
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
  } else {
    // find preTag and nextTag
    const currentIndex = tagList.findIndex((item) => item === currentTag);
    const prevTag = tagList[currentIndex - 1];
    const nextTag = tagList[currentIndex + 1];
    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft =
      nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;
    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;
    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
    }
  }
};

const moveToCurrentTag = (to) => {
  if (!isTags(to.path)) return;
  const { fullPath, meta, name, params, path, query } = to;
  console.log(scrollContainer);
  // moveToTarget();
  //   store.commit('app/addTagsViewList', {
  //     fullPath,
  //     meta,
  //     name,
  //     params,
  //     path,
  //     query,
  //     title: getTitle(to),
  //   });
};

//
watch(
  route,
  (to) => {
    moveToCurrentTag(to);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
