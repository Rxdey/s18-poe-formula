import { createApp } from 'vue';
import RxIcon from '@/components/RxIcon/RxIcon.vue';
// import router from './router';
import App from './App.vue';
import './assets/css/reset.less';
import './assets/css/common.less';
import './assets/css/public.less';

const app = createApp(App);
// router.beforeEach((to) => {
// });
app.component('RxIcon', RxIcon);
app.mount('#app');
