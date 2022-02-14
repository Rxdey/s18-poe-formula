import { PropType } from './types';
/**
 * localStorage 同域名增加pathname前缀
 */
const PREFIX = 'NAVIGATE';
export const rxLocalStorage = {
  removeItemList(array = []) {
    const tag = `__${PREFIX}__`;
    array.forEach((item) => {
      localStorage.removeItem(tag + item);
    });
  },
  clear() {
    const { length } = localStorage;
    const tag = `__${PREFIX}__`;
    const REG = new RegExp(`\\${tag}`);
    const temp = [];
    for (let i = 0; i < length; i++) {
      const localkey = localStorage.key(i) || '';
      if (REG.test(localkey)) {
        temp.push(localStorage.key(i));
      }
    }
    temp.forEach((item) => {
      if (item) localStorage.removeItem(item);
    });
  },
  getItem(name: string) {
    const tag = `__${PREFIX}__`;
    return localStorage.getItem(tag + name);
  },
  setItem(name: string, data: string) {
    const tag = `__${PREFIX}__`;
    localStorage.setItem(tag + name, data);
  },
  removeItem(name: string) {
    const tag = `__${PREFIX}__`;
    localStorage.removeItem(tag + name);
  },
};

/**
 * sessionStorage 同域名增加pathname前缀
 */
export const rxSessionStorage = {
  removeItemList(array = []) {
    const tag = `__${PREFIX}__`;
    array.forEach((item) => {
      sessionStorage.removeItem(tag + item);
    });
  },
  clear() {
    const { length } = sessionStorage;
    const tag = `__${PREFIX}__`;
    const REG = new RegExp(`\\${tag}`);
    const temp = [];
    for (let i = 0; i < length; i++) {
      if (REG.test(sessionStorage.key(i) || '')) {
        temp.push(sessionStorage.key(i));
      }
    }
    temp.forEach((item) => {
      if (item) sessionStorage.removeItem(item);
    });
  },
  getItem(name: string) {
    const tag = `__${PREFIX}__`;
    return sessionStorage.getItem(tag + name);
  },
  setItem(name: string, data: string) {
    const tag = `__${PREFIX}__`;
    sessionStorage.setItem(tag + name, data);
  },
  removeItem(name: string) {
    const tag = `__${PREFIX}__`;
    sessionStorage.removeItem(tag + name);
  },
};

// eslint-disable-next-line arrow-body-style
export const getPath = () => {
  // const a = window.location.href.split('/');
  // a.splice(a.length - 1, 1);
  // return a.join('/');
  return window.location.href.split('#')[0];
};
// 微信浏览器
export const isWechat = () => /MicroMessenger/i.test(window.navigator.userAgent.toLowerCase());

export const sleep = (timeout = 1000): Promise<boolean> => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, timeout);
});

export const changeTitle = (title: string) => {
  document.title = title;
  if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    const i = document.createElement('iframe');
    i.src = '';
    i.style.display = 'none';
    i.onload = () => {
      setTimeout(() => {
        i.remove();
      }, 10);
    };
    document.body.appendChild(i);
  }
};

/**
 * 合并对象
 * @param {Object} target 目标对象
 * @param {Object} origin 源对象
 */
export const mergeObj = (target: PropType, origin: PropType) => {
  if (!target) target = {};
  Object.keys(origin).forEach((key) => {
    if (target[key]) {
      if (Object.prototype.toString.call(origin[key] === '[object Object]') && Object.prototype.toString.call(target[key] === '[object Object]')) {
        target[key] = mergeObj(target[key], origin[key]);
      }
    } else {
      target[key] = origin[key];
    }
  });
  return target;
};
