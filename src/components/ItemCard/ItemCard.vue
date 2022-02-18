<template>
  <div class="item-card" :key="props.data.id">
    <div class="item-card__header">
      <div class="align-center">
        <ItemIcon :id="props.data.id"></ItemIcon>
        <div
          class="item-includes"
          v-if="includesList.length"
          @mouseover="onMouseOver"
          @mouseleave="onMouseLeave"
        >
          <span @click.stop="onClick">可合成</span>
          <div class="item-formula pop-box" v-show="showIncludes">
            <div class="formula-list">
              <template v-for="(includesData) in includesList" :key="includesData.id">
                <ItemIcon :id="includesData.id" name hover></ItemIcon>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="item-detail">
        <p class="name" :class="props.data.level">{{ props.data.name }}</p>
        <p class="magic">{{ props.data.explicitMod }}</p>
        <p class="currency">
          <span v-for="(currency, i) in props.data.currencyList" :key="i">{{ currency }}</span>
        </p>
        <p class="common">{{ props.data.spe }}</p>
      </div>
    </div>

    <div class="item-formula" v-show="!!props.data.formula?.length">
      <p style="margin-bottom: 8px;padding-left: 20px;">配方:</p>
      <div class="formula-list">
        <template v-for="(formula, i) in props.data.formula" :key="formula">
          <div v-if="!!i">+</div>
          <ItemIcon :id="formula" size="small" name hover></ItemIcon>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineProps, PropType, Ref } from 'vue';
import { ItemData, data as allData } from '@/data/data';
import ItemIcon from './ItemIcon.vue';

const props = defineProps({
  data: {
    type: Object as PropType<ItemData>,
    required: true,
  },
});
const includesList: Ref<ItemData[]> = ref([]);
const showIncludes = ref(false);
const clickLock = ref(false);

const onMouseOver = () => {
  if (clickLock.value) return;
  showIncludes.value = true;
};
const onMouseLeave = () => {
  if (clickLock.value) return;
  showIncludes.value = false;
};
const onClick = () => {
  if (showIncludes.value && !clickLock.value) {
    showIncludes.value = true;
    clickLock.value = true;
    return;
  }
  showIncludes.value = !showIncludes.value;
  clickLock.value = showIncludes.value;
  // showIncludes.value = !showIncludes.value;
};
onMounted(() => {
  const { id } = props.data;
  if (!id) return;
  includesList.value = allData.filter((item) => item.formula?.includes(id));
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
  // background-color: var(--color-cardbg);
  background-color: rgba(10, 10, 10, 0.8);
  border-radius: var(--border-radius);
  width: 100%;
  font-size: var(--font-s);
  &__header {
    display: flex;
    flex-flow: row nowrap;
  }
}
.item-includes {
  position: relative;
  display: inline-block;
  border: 1px solid #333;
  padding: 2px 4px;
  cursor: pointer;
  border-radius: 4px;
  font-size: var(--font-xs);
}
.item-detail {
  flex: 1;
  height: 100px;
  margin-bottom: 8px;
  .name {
    font-size: var(--font-m);
    font-weight: bold;
  }
  p {
    margin-bottom: 4px;
    &:last-child {
      margin: 0;
    }
  }
  span {
    margin-right: 4px;
  }
}
.item-formula {
  .formula-list {
    display: flex;
    flex-flow: row;
    align-items: center;
  }
  &.pop-box {
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    left: 150%;
    background-color: rgba(10, 10, 10, 0.8);
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #aaa;
    z-index: 100;
  }
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
