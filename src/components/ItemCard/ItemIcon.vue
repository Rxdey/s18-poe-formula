<template>
  <div class="item-icon-wrap" :class="[props.size, hover && 'hover']">
    <div class="item-icon">
      <img :src="`data/icon/${current.localIcon}`" />
    </div>
    <div class="item-name" v-if="name">
      <p :class="current.level">{{ current.name }}</p>
    </div>
    <div class="item-formula icon-pop-box" v-if="current.formula?.length && props.hover">
      <div class="formula-list">
        <template v-for="(formula) in current.formula" :key="formula">
          <ItemIcon :id="formula" name size="small"></ItemIcon>
        </template>
      </div>
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
  name: {
    type: Boolean,
    default: false,
  },
  hover: {
    type: Boolean,
    default: false,
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
.item-icon-wrap {
  margin-bottom: 8px;
  width: 80px;
  // position: relative;
  // z-index: 10;
  .item-formula.icon-pop-box {
    position: absolute;
    left: 0;
    transform: translateY(50%);
    top: 30px;
    background-color: rgba(10, 10, 10, 0.8);
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #aaa;
    display: none;
    z-index: 10;
  }
  &.hover {
    &:hover {
      .icon-pop-box {
        display: block;
      }
    }
  }
  .item-icon {
    cursor: pointer;
    font-size: var(--font-xs);
  }
  .item-name {
    text-align: center;
  }
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin: 0 auto;
    display: block;
  }
  &.small {
    width: 80px;
    font-size: var(--font-xxs);
    .item-name {
      transform: scale(0.8);
    }
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
    // .item-name {
    //   display: none;
    // }
  }
}
</style>
