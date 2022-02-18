<template>
  <div class="page-wrap">
    <p style="margin-bottom: 16px;">鼠标点击可以让悬浮窗停留,可合成的物品再点击可以一直查看最细类（随便用着吧）</p>
    <section class="items-wrap">
      <div class="items-list">
        <!-- <div class="items-card" v-for="(item, i) in items" :key="i">
          <div class="items-icon"></div>
        </div> -->
        <ItemCardVue v-for="(item, i) in items" :key="i" :data="item"></ItemCardVue>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { data } from '@/data/data';
import ItemCardVue from '@/components/ItemCard/ItemCard.vue';

const items = ref(data);

</script>

<style lang="less">
@import './App.less';
.items-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  justify-items: center;
}
</style>
