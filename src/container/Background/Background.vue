<template>
  <div class="Background" :style="{backgroundImage: `url(${url})`}"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineProps } from 'vue';

const props = defineProps({
  url: {
    type: String,
    default: 'https://w.wallhaven.cc/full/gj/wallhaven-gjyoq7.png',
  },
});

</script>

<style lang="less">
.Background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #333;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
