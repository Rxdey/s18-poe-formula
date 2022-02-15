<template>
  <div class="item-icon" :class="props.size">
    <img :src="`data/icon/${current.localIcon}`" />
    <div class="item-name">
      <p :class="current.level">{{ current.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineProps, Ref, PropType } from 'vue';
import { data, ItemData } from '@/data/data';

export type SizeDic = | 'large' | 'small' | 'mini';

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  size: {
    type: String as PropType<SizeDic>,
    default: 'large',
  },
});
const current: Ref<ItemData> = ref({});
onMounted(() => {
  const temp = data.find((item) => item.id === props.id);
  if (!temp) return;
  current.value = temp;
});
</script>

<style lang="less">
.item-icon {
  width: 100px;
  cursor: pointer;
  margin-bottom: 8px;
  font-size: var(--font-xs);
  .item-name {
    text-align: center;
  }
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin: 0 auto 0 auto;
    display: block;
  }
  &.small {
    width: 50px;
    font-size: var(--font-xxs);
    img {
      width: 40px;
      height: 40px;
    }
  }
  &.mini {
    width: 30px;
    font-size: var(--font-xxs);
    img {
      width: 25px;
      height: 25px;
    }
    .item-name {
      // transform: scale(0.6);
      display: none;
    }
  }
}
</style>
