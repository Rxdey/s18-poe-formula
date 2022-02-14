<template>
  <div class="page-wrap">
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
</style>
