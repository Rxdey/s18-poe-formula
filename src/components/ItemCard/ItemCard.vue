<template>
  <div class="item-card" :key="props.data.id">
    <ItemIcon :id="props.data.id"></ItemIcon>
    <div class="item-detail">
      <p class="magic">{{ props.data.explicitMod }}</p>
      <p class="currency">
        <span v-for="(currency, i) in props.data.currencyList" :key="i">{{ currency }}</span>
      </p>
      <p class="common">{{ props.data.spe }}</p>
    </div>
    <div class="item-formula">
      <ItemIcon v-for="(formula) in props.data.formula" :key="formula" :id="formula" size="small"></ItemIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineProps, PropType } from 'vue';
import { ItemData } from '@/data/data';
import ItemIcon from './ItemIcon.vue';

const props = defineProps({
  data: {
    type: Object as PropType<ItemData>,
    required: true,
  },
});
</script>

<style lang="less">
:root {
  --color-common: #c8c8c8;
  --color-magic: #8888ff;
  --color-rare: #ffff77;
  --color-unique: #af6025;
  --color-currency: #aa9e82;
}
.item-card {
  padding: var(--box-padding);
  margin-bottom: 16px;
  background-color: var(--color-cardbg);
  border-radius: var(--border-radius);
  // min-height: 200px;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  font-size: var(--font-s);
  align-items: center;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin: 0 auto 0 auto;
    display: block;
  }
  .item-icon {
    width: 100px;
    cursor: pointer;
  }
  .item-name {
    text-align: center;
  }
}
.item-detail {
  flex: 1;
  min-width: 50%;
  max-width: 50%;
  width: 50%;
  p {
    margin-bottom: 4px;
  }
  span {
    margin-right: 4px;
  }
}
.item-formula {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  width: 300px;
}
p.common {
  color: var(--color-common);
}
p.magic {
  color: var(--color-magic);
}
p.rare {
  color: var(--color-rare);
}
p.unique {
  color: var(--color-unique);
}
p.currency {
  color: var(--color-currency);
}
</style>
