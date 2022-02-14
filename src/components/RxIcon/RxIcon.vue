<template>
  <i
    class="rx-icon iconfont"
    :class="props.name"
    :style="{ fontSize: props.size, color: props.color }"
  ></i>
</template>

<script setup lang="ts">
import {
  ref, onMounted, computed, defineProps,
} from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '32px',
  },
  color: {
    type: String,
    default: '#333',
  },
});

</script>

<style lang="less">
// .rx-icon.iconfont {
//   font-size: 32px;
// }
</style>
