<template>
  <section class="AddPane">
    <van-cell-group title="自定义导航">
      <van-field label="网站地址" v-model="form.sitUrl" placeholder="请输入网站地址" @blur="onBlur"></van-field>
      <van-field label="网站名称" v-model="form.sitName" placeholder="请输入网站名称"></van-field>
    </van-cell-group>
    <van-cell-group title="选择图标">
      <div class="logo-wrap">
        <div class="logo-prefix">
          <div class="image-inner border-radius16">
            <div class="logo-inner" :style="{ backgroundColor: form.logoColor }"></div>
          </div>
        </div>
        <div class="logo-list">
          <div class="logo-inner image-inner">
            <div class="logo-img" :style="{'background-image': tempIco ? `url(${tempIco})` : ''}"></div>
          </div>
        </div>
        <div class="logo-after">
          <div class="logo-inner upload">
            <van-icon name="plus" size=".65rem" color="#C3C3C3" />
          </div>
        </div>
      </div>
      <!-- <div class="logo-tool">
        <div class="slider">
          <p class="slider-label">字体大小</p>
          <div class="slider-wrap">
            <div class="slider-content">
              <van-slider v-model="form.sitNameSize" :step="1" :max="60" :min="22" />
            </div>
            <div>{{ form.sitNameSize }}</div>
          </div>
        </div>
      </div>-->
      <div class="logo-color">
        <p class="label">颜色</p>
        <div class="color-list">
          <div class="color-item" v-for="(color, i) in colorList" :key="i">
            <div class="color-box image-inner">
              <span
                class="color-inner"
                :style="{ backgroundColor: color }"
                @click="setColorActive(i)"
              >
                <van-icon v-show="colorActive === i" class="color-checked" name="success" />
              </span>
            </div>
          </div>
          <div class="color-item">
            <div
              class="color-box image-inner picker"
              @click.stop="showColorPicker = !showColorPicker"
            >
              <span class="color-inner">
                <van-icon v-show="tempActive" class="color-checked" name="success" />
              </span>
            </div>
          </div>
        </div>
        <div class="color-picker" v-show="showColorPicker" @click.stop>
          <Chrome v-model="tempColor" />
        </div>
      </div>
    </van-cell-group>
    <div class="button-wrap">
      <van-button block round type="danger">添加</van-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, Ref } from 'vue';
import { Field as VanField, Slider as VanSlider } from 'vant';
import { Chrome } from '@ckpack/vue-color';

interface TempColor {
  rgba?: { r: number, g: number, b: number, a: number }
}

const form = ref({
  sitUrl: '',
  sitName: '',
  sitNameSize: 28,
  logoColor: '',
});
const colorList = ref([
  'rgba(0,0,0,0)',
  'rgba(240,105,91,1)',
  'rgba(91,242,210,1)',
  'rgba(246,82,172,1)',
  'rgba(238,216,78,1)',
  'rgba(86,214,234,1)',
]); // 快速选择色盘
const colorActive = ref(0);
const showColorPicker = ref(false);
const tempActive = ref(false);
const tempColor: Ref<string | TempColor> = ref({});

const tempIco = ref('');

onMounted(() => {
  document.body.addEventListener('click', () => {
    showColorPicker.value = false;
  });
});

watch(tempColor, (val) => {
  let color;
  if (typeof val === 'object') {
    const { rgba } = val;
    if (!rgba) return;
    const { r, g, b, a } = rgba;
    color = `rgba(${r}, ${g}, ${b}, ${a})`;
  } else {
    color = val;
  }
  form.value.logoColor = color;
  if (showColorPicker.value) {
    colorActive.value = -1;
    tempActive.value = true;
  }
});

// 选择颜色
const setColorActive = (active: number) => {
  colorActive.value = active;
  const color = colorList.value[colorActive.value];
  if (!color) return;
  form.value.logoColor = color;
  tempColor.value = color;
  if (tempActive.value) tempActive.value = false;
};

const onBlur = () => {
  if (!form.value.sitUrl) return;
  let url = form.value.sitUrl;
  if (!/[http|https]:\/\//.test(form.value.sitUrl)) {
    url = `http://${form.value.sitUrl}`;
  }
  tempIco.value = `${url}/favicon.ico`;
};

</script>

<style lang="less">
:root {
  --logo-size: 90px;
}
.line {
  content: "";
  position: absolute;
  height: 100%;
  top: 0;
  background: rgb(236, 238, 238);
  width: 1px;
  transform: scale(0.8);
}
.logo-wrap {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  padding: 16px var(--box-padding);
  .logo-inner {
    width: var(--logo-size);
    height: var(--logo-size);
    border-radius: 16px;
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    // border: 1px solid #c3c3c3;
    .logo-img {
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
    }
    &.upload {
      border-style: dashed;
      border: 1px dashed transparent;
      background: linear-gradient(white, white) padding-box,
        repeating-linear-gradient(
          -45deg,
          #ccc 0,
          #ccc 0.3em,
          white 0,
          white 0.52em
        );
    }
  }

  .logo-prefix {
    padding-right: 16px;
    position: relative;
    &::after {
      right: 0;
      .line;
    }
  }
  .logo-after {
    padding-left: 16px;
    position: relative;
    &::before {
      left: 0;
      .line;
    }
  }
  .logo-list {
    flex: 1;
    min-width: 1px;
    padding: 0 16px;
  }
}
.slider {
  margin-bottom: 32px;
  padding: 0 var(--box-padding);
  font-size: var(--font-s);
  .slider-label {
    margin-bottom: 32px;
    color: var(--van-field-label-color);
  }
  .slider-wrap {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
  .slider-content {
    flex: 1;
    width: 1px;
    padding: 0 50px 0 16px;
  }
}
.logo-color {
  padding: 16px var(--box-padding);
  color: var(--van-field-label-color);
  font-size: var(--font-s);
  position: relative;
  .label {
    margin-bottom: 16px;
  }
  .color-list {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    .color-item {
      flex: 1;
      &:first-child {
        .color-checked {
          color: #333;
        }
      }
    }
    .color-box {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      overflow: hidden;
      &.picker .color-inner {
        background: url(image/color.png) no-repeat center;
        background-size: contain;
      }
    }
    .color-inner {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background-color: #dddddd;
      cursor: pointer;
    }
    .color-checked {
      position: absolute;
      top: 50%;
      left: 50%;
      color: #fff;
      transform: translate(-50%, -50%);
      font-size: 40px;
    }
  }
  .color-picker {
    position: absolute;
    bottom: 80%;
    right: var(--box-padding);
    z-index: 1;
  }
}

.button-wrap {
  padding: var(--box-padding);
}
</style>
