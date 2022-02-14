<template>
  <div class="page-wrap">
    <section class="items-wrap">
      <div class="items-list">
        <div class="items-card" v-for="(item, i) in items" :key="i">

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { data } from '@/data/data';

const items = ref(data);

</script>

<style lang="less">
@import './App.less';
</style>
