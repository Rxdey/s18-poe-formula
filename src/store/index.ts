import { InjectionKey } from 'vue';
import { createStore, useStore as vuexStore, Store } from 'vuex';

const store = createStore<any>({
  state: {

  },
  mutations: {

  },
  actions: {
  },
  modules: {
  },
});

export const key: InjectionKey<Store<any>> = Symbol('');

export const useStore = () => vuexStore(key);

export default store;
