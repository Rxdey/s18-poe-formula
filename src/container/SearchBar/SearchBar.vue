<template>
  <div class="SearchBar">
    <div class="search-bar">
      <div class="search-bar__icon">
        <!-- <rx-icon name="icon-bianji" size=".507rem" /> -->
        <van-icon name="edit" size=".507rem"/>
      </div>
      <div class="search-bar__content">
        <input
          type="search"
          v-model="searchValue"
          autocomplete="off"
          name="search"
          class="custom-input"
          placeholder="开始吧✨✨~"
          @blur="onBlur"
          @focus="onFocus"
          @input="onInput"
        />
      </div>
      <div class="search-bar__clear" @click="clearSearchValue">
        <!-- <rx-icon name="icon-31guanbi" size=".507rem" v-show="showClear" /> -->
        <van-icon name="cross" size=".507rem" v-show="showClear"/>
      </div>
    </div>
    <div class="search-drop">
      <ul class="search-list">
        <li
          class="search-list__item"
          v-for="(item, i) in searchList"
          :key="i"
          @click="handleSearch(item)"
        >{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, Ref } from 'vue';
import { throttle } from 'lodash-es';
import { baidu } from '@/service/model';

const searchValue = ref('');
// 上次搜索文本，防止多余搜索
const lastValue = ref('');
const showClear = ref(false);
const searchList: Ref<Array<string>> = ref([]);

// 获取百度候选词
const getWaitData = async () => {
  if (!searchValue.value || lastValue.value === searchValue.value) return;
  const res = await baidu.request({ wd: searchValue.value, p: 2, t: new Date().getTime() });
  lastValue.value = searchValue.value;
  if (!res.s || !res.s.length) return;
  searchList.value = res.s;
};
const setClear = () => {
  showClear.value = Boolean(searchValue.value);
  searchList.value = [];
};
const onBlur = () => {
  setClear();
};
const onFocus = () => {
  setClear();
};
const onInput = () => {
  setClear();
  getWaitData();
};

const clearSearchValue = () => {
  searchValue.value = '';
  setClear();
};
const handleSearch = (item: string) => {
  searchValue.value = item;
};
</script>

<style lang="less">
.SearchBar {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 88%;
  max-width: 980px;
  // margin: 0 auto;
}
.search-bar {
  display: flex;
  flex-flow: row nowrap;
  padding: 0 28px;
  border-radius: 50px;
  overflow: hidden;
  align-items: center;
  background-color: #fff;
  position: relative;
  &__icon {
  }
  &__content {
    flex: 1;
    min-width: 1px;
    padding: 0 16px;
    .custom-input {
      appearance: none;
      width: 100%;
      height: var(--input-height);
      font-size: var(--font-s);
      background: transparent;
      border: none;
      outline: none;
      -webkit-appearance: textfield;
      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button {
        display: none;
      }
    }
  }
  &__clear {
    cursor: pointer;
  }
}
.search-drop {
  position: relative;
  background-color: #fff;
  border-radius: calc(var(--input-height) / 2);
  margin-top: 8px;
  overflow: hidden;
  .search-list {
    max-height: 400px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    &__item {
      padding: 0 28px;
      min-height: var(--input-height);
      font-size: var(--font-s);
      line-height: var(--input-height);
      &:active {
        background-color: #e5e5e5;
      }
    }
  }
}
</style>
