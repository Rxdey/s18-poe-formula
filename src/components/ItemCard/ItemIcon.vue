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

export type SizeDic = | 'large' | 'small';

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
  margin-bottom: 8px;
  &.small {
    width: 50px;
    font-size: var(--font-xxs);
    img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
