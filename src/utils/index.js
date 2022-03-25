
// 邮箱、手机、18位密码正则
export const phoneRegExp = /^((0\d{2,3}-\d{6,8})|(1[3456789]\d{9}))$/;
export const emailRegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

/**
 * 检测类型
 * @param {any} target 检测的目标
 * @returns {'string'|'number'|'array'|'boolean'|'object'|'function'|'null'|'undefined'|'regexp'|'promise'} 只枚举一些常用的类型
 */
export function checkType(target) {
  /** @type {string} */
  const value = Object.prototype.toString.call(target);
  const result = value.match(/\[object (\S*)\]/)[1];
  return result.toLocaleLowerCase();
}

/**
 * 修改属性值-只修改之前存在的值
 * @param {object} target 修改的目标
 * @param {object} value 修改的内容
 */
export function modifyData(target, value) {
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      // target[key] = value[key];
      // 需要的话，深层逐个赋值
      if (checkType(target[key]) === 'object') {
        modifyData(target[key], value[key]);
      } else {
        target[key] = value[key];
      }
    }
  }
}

/**
 * 判断是否外部链接
 * @param {string} path 路径
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 格式化日期
 * @param {string | number | Date} value 指定日期
 * @param {string} format 格式化的规则
 * @example
 * ```js
 * formatDate();
 * formatDate(1603264465956);
 * formatDate(1603264465956, 'h:m:s');
 * formatDate(1603264465956, 'Y-M-D');
 * formatDate(1603264465956, 'Y年-M月-D日');
 * ```
 */
export function formatDate(value = Date.now(), format = 'Y-M-D h:m:s') {
  if (['null', null, 'undefined', undefined, ''].includes(value)) return '';
  // ios 和 mac 系统中，带横杆的字符串日期是格式不了的，这里做一下判断处理  
  if (typeof value === 'string' && new Date(value).toString() === 'Invalid Date') {
    value = value.replace(/-/g, '/');
  }
  const formatNumber = n => `0${n}`.slice(-2);
  const date = new Date(value);
  const formatList = ['Y', 'M', 'D', 'h', 'm', 's'];
  const resultList = [];
  resultList.push(date.getFullYear().toString());
  resultList.push(formatNumber(date.getMonth() + 1));
  resultList.push(formatNumber(date.getDate()));
  resultList.push(formatNumber(date.getHours()));
  resultList.push(formatNumber(date.getMinutes()));
  resultList.push(formatNumber(date.getSeconds()));
  for (let i = 0; i < resultList.length; i++) {
    format = format.replace(formatList[i], resultList[i]);
  }
  return format;
}

/**
 * `JSON`转`FormData`
 * @param {{ [key: string]: number | string | boolean }} params `JSON`对象
 * @example
 * ```js
 * const info = { name: 'hjs', id: 123 };
 * const val = jsonToFormData(info);
 * console.log(val); // 'name=hjs&id=123'
 * ```
 */
export function jsonToFormData(params) {
  let result = '';
  for (const key in params) {
    result += `&${key}=${params[key]}`;
  }
  return result.slice(1);
}

/**
 * 复制文本
 * @param {string} text 复制的内容
 * @param {() => void} success 成功回调
 * @param {(tip: string) => void} fail 出错回调
 * @example
 * ```js
 * copyText(value, () => this.$message.success('复制成功'), tip => this.$message.warning(tip));
 * ```
 */
export function copyText(text, success = null, fail = null) {
  text = text ? text.replace(/(^\s*)|(\s*$)/g, '') : '';
  if (!text) {
    typeof fail === 'function' && fail('复制的内容不能为空！');
    return;
  }
  const id = 'the-clipboard';
  /**
   * 粘贴板节点
   * @type {HTMLTextAreaElement}
   */
  let clipboard = document.getElementById(id);
  if (!clipboard) {
    clipboard = document.createElement('textarea');
    clipboard.id = id;
    clipboard.readOnly = true
    clipboard.style.cssText = 'font-size: 15px; position: fixed; top: -1000%; left: -1000%;';
    document.body.appendChild(clipboard);
  }
  clipboard.value = text;
  clipboard.select();
  clipboard.setSelectionRange(0, text.length);
  const state = document.execCommand('copy');
  if (state) {
    typeof success === 'function' && success();
  } else {
    typeof fail === 'function' && fail('复制失败');
  }
}

/**
 * 插入脚本
 * @param {string} link 脚本路径
 * @param {Function} callback 脚本加载完成回调
 */
export function insertScript(link, callback) {
  const label = document.createElement('script');
  label.src = link;
  label.onload = function () {
    if (label.parentNode) label.parentNode.removeChild(label);
    if (typeof callback === 'function') callback();
  }
  document.body.appendChild(label);
}

/**
 * 获取一些深层`key`的对象值
 * @param {object} target 目标对象
 * @param {string} key `key`字段
 * @example
 * ```js
 * const info = {
 *     list: [
 *         { value: 'hjs' }
 *     ]
 * }
 * getDeepLevelValue(info, 'list.0.value'); // => 'hjs'
 * ```
 */
export function getDeepLevelValue(target, key) {
  const keys = key.split('.');
  let result;
  for (let i = 0; i < keys.length; i++) {
    const prop = keys[i];
    result = target[prop];
    const type = checkType(result);
    if (type !== 'object' && type !== 'array') {
      break;
    } else {
      target = target[prop];
    }
  }
  return result;
}

/**
 * ES5 兼容 ES6 `Array.findIndex`
 * @param {Array<T>} array
 * @param {(value: T, index: number) => boolean} compare 对比函数
 */
export function findIndex(array, compare) {
  var result = -1;
  for (var i = 0; i < array.length; i++) {
    if (compare(array[i], i)) {
      result = i;
      break;
    }
  }
  return result;
}

/**
 * 自定义对象数组去重
 * @param {Array<T>} array
 * @param {(a: T, b: T) => void} compare 对比函数
 * @example
 * ```js
 * const list = [{ id: 10, code: 'abc' }, {id: 12, code: 'abc'}, {id: 12, code: 'abc'}];
 * filterRepeat(list, (a, b) => a.id == b.id)
 * ```
 */
export function filterRepeat(array, compare) {
  return array.filter((element, index, self) => {
    return findIndex(self, el => compare(el, element)) === index;
  })
}

/**
 * 打开链接
 * @param {string} link
 * @param {'_blank'|'_self'|'_parent'|'_top'} target
 */
export function openLink(link, target = '_blank') {
  const label = document.createElement('a');
  label.href = link;
  label.target = target;
  document.body.appendChild(label);
  label.click();
  document.body.removeChild(label);
}

/**
 * 通过`Blob`对象信息将图片保存到本地
 * @param {object} params
 * @param {Blob} params.blob new Blob([xxx])
 * @param {string} params.filename 图片文件名
 * @param {() => void} params.success 保存成功回调
 * @param {(tip: string) => void} params.fail 保存失败回调
 */
export function saveImageByBlob(params) {
  const URL = window.URL || window.webkitURL;
  if ('download' in document.createElement('a')) {
    const label = document.createElement('a');
    label.download = params.filename;
    label.style.display = 'none';
    label.href = URL.createObjectURL(params.blob);
    document.body.appendChild(label);
    label.click();
    URL.revokeObjectURL(label.href);
    document.body.removeChild(label);
    checkType(params.success) === 'function' && params.success();
  } else if (navigator.msSaveBlob) {
    navigator.msSaveBlob(params.blob, params.filename);
    checkType(params.success) === 'function' && params.success();
  } else {
    checkType(params.fail) === 'function' && params.fail();
  }
}

/**
 * 通过图片地址将图片保存到本地
 * @param {object} params
 * @param {string} params.url 图片地址（前提是这个图片允许跨域请求）
 * @param {string} params.filename 图片文件名
 * @param {() => void} params.success 加载成功回调
 * @param {(tip: string) => void} params.fail 加载失败回调
 */
export function saveImageByLink(params) {
  const XHR = new XMLHttpRequest();
  XHR.open('get', params.url, true);
  XHR.responseType = 'blob';
  XHR.setRequestHeader("Cache-Control", "no-cache");
  XHR.onreadystatechange = function () {
    if (XHR.readyState !== 4) return;
    if (XHR.status === 200 || XHR.status === 304) {
      const data = XHR.response;
      const blob = new Blob([data]);
      saveImageByBlob({
        blob,
        ...params
      })
    } else {
      checkType(params.fail) === 'function' && params.fail('图片加载失败');
    }
  }
  XHR.send();
}

/**
 * `Blod`对象转`url`
 * @param {Blod} blod 
 */
export function blodToUrl(blod) {
  let url = '';
  if (window.createObjectURL) {
    url = window.createObjectURL(blod);
  } else if (window.URL) {
    url = window.URL.createObjectURL(blod);
  } else if (window.webkitURL) {
    url = window.webkitURL.createObjectURL(blod);
  }
  return url;
}

/**
 * 将秒数换成时分秒格式
 * @param {number} value 秒数
 * @param {boolean} withDay 是否带天数倒计
 * @param {boolean} isFormatSecond 是否格式化
 * @returns {{day: string, hour: string, minute: string, second: string}}
 */
export function formatSecond(value, withDay = false, isFormatSecond = false) {
  let day = Math.floor(value / (24 * 3600));
  let hour = Math.floor(value / 3600) - day * 24;
  let minute = Math.floor(value / 60) - (day * 24 * 60) - (hour * 60);
  let second = Math.floor(value) - (day * 24 * 3600) - (hour * 3600) - (minute * 60);
  if (!withDay) {
    hour = hour + day * 24;
  }
  // 格式化
  if (isFormatSecond) {
    day = day < 10 ? ('0' + day).slice(-2) : day.toString();
    hour = hour < 10 ? ('0' + hour).slice(-2) : hour.toString();
    minute = ('0' + minute).slice(-2);
    second = ('0' + second).slice(-2);
  }
  return { day, hour, minute, second }
}

/**
 * 输入只能是数字
 * @param {string | number} value 输入的值
 * @param {boolean} decimal 是否要保留小数
 * @param {boolean} negative 是否可以为负数
 */
export function inputOnlyNumber(value, decimal, negative) {
  let result = value.toString().trim();
  if (result.length === 0) return '';
  const minus = (negative && result[0] == '-') ? '-' : '';
  if (decimal) {
    result = result.replace(/[^0-9.]+/ig, '');
    let array = result.split('.');
    if (array.length > 1) {
      result = array[0] + '.' + array[1];
    }
  } else {
    result = result.replace(/[^0-9]+/ig, '');
  }
  return minus + result;
}

/** 是否移动端 */
export function isMobile() {
  const pattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i;
  return pattern.test(navigator.userAgent); //  ? "Mobile" : "Desktop";
}

// /**
//  * 数值转换
//  * @param {string|number} num
//  */
// export function formatterNumber(num) {
//   if (!num) return '0';
//   const value = Number(num)
//   let result = '';
//   const k = 10000;
//   const sizes = ['', '万', '亿', '万亿'];
//   if (value < k) {
//     result = value
//   } else {
//     const i = Math.floor(Math.log(value) / Math.log(k));
//     result = ((value / Math.pow(k, i))).toFixed(2) + sizes[i]
//   }
//   return result
// }

/**
 * 深拷贝
 * @param {object} obj
 */
export function deepCopy(obj) {
  if (obj === null) return null;
  if (typeof obj !== 'object') return obj;
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key]);   //递归拷贝
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

/**
 * 获取`url?`后面参数（JSON对象）
 * @param {string} name 获取指定参数名
 * @param {string} target 目标字段，默认`location.search`
 * @example
 * ```js
 * // 当前网址为 www.https://hjs.com?id=99&age=123&key=sdasfdfr
 * const targetAge = getQueryParam('age', 'id=12&age=14&name=hjs');
 * const params = getQueryParam();
 * const age = getQueryParam('age');
 * // 非IE浏览器下简便方法
 * new URLSearchParams(location.search).get('age');
 * ```
 * @returns {object|string}
 */
export function getQueryParam(name = null, target = null) {
  // const code = target || location.search.slice(1); // location.search 在 http://192.168.89.53:1080/#/page?id=10 这种情况下获取不到
  const code = target || location.href.split('?')[1] || '';
  const list = code.split('&');
  const params = {};
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const items = item.split('=');
    if (items.length > 1) {
      params[items[0]] = item.replace(`${items[0]}=`, '');
    }
  }
  if (name) {
    return params[name] || '';
  } else {
    return params;
  }
}

/**
 * `html`标签过滤器，只过滤标签，保留内容
 * @param {string} val 要过滤的内容
 * @param {string} label 是否过滤指定标签，不指定时则过滤掉所有`html`标签、空格、换行符
 */
export function htmlFilter(val, label) {
  let result = '';
  if (!val) return result;
  if (label) {
    const start = new RegExp(`<(${label})[^>]*>`, 'gi');
    const end = new RegExp(`</(${label})[^>]*>`, 'gi');
    result = val.replace(start, '').replace(end, '');
  } else {
    result = val.replace(/<[^>]+>|&[^>]+;/g, '');
    result = result.replace(/[|]*\n/g, '');
    result = result.replace(/\s+/g, '');
    result = result.replace(/&npsp;/ig, '');
  }
  return result;
}

/**
 * 数字运算（主要用于小数点精度问题）
 * [see](https://juejin.im/post/6844904066418491406#heading-12)
 * @param {number} a 前面的值
 * @param {'+' | '-' | '*' | '/'} type 计算方式
 * @param {number} b 后面的值
 * @example
 * ```js
 * // 可链式调用
 * const res = computeNumber(1.3, '-', 1.2).next('+', 1.5).next('*', 2.3).next('/', 0.2).result;
 * console.log(res);
 * ```
 */
export function computeNumber(a, type, b) {
  /**
   * 获取数字小数点的长度
   * @param {number} n 数字
   */
  function getDecimalLength(n) {
    const decimal = n.toString().split('.')[1];
    return decimal ? decimal.length : 0;
  }
  /**
   * 修正小数点
   * @description 防止出现 `33.33333*100000 = 3333332.9999999995` && `33.33*10 = 333.29999999999995` 这类情况做的处理
   * @param {number} n 数字
   */
  const amend = (n, precision = 15) => parseFloat(Number(n).toPrecision(precision));
  const power = Math.pow(10, Math.max(getDecimalLength(a), getDecimalLength(b)));
  let result = 0;

  a = amend(a * power);
  b = amend(b * power);

  switch (type) {
    case '+':
      result = (a + b) / power;
      break;
    case '-':
      result = (a - b) / power;
      break;
    case '*':
      result = (a * b) / (power * power);
      break;
    case '/':
      result = a / b;
      break;
  }

  result = amend(result);

  return {
    /** 计算结果 */
    result,
    /**
     * 继续计算
     * @param {'+' | '-' | '*' | '/'} nextType 继续计算方式
     * @param {number} nextValue 继续计算的值
     */
    next(nextType, nextValue) {
      return computeNumber(result, nextType, nextValue);
    },
    /**
     * 小数点进位
     * @param {number} n 小数点后的位数
    */
    toHex(n) {
      const strings = result.toString().split('.');
      if (n > 0 && strings[1] && strings[1].length > n) {
        const decimal = strings[1].slice(0, n);
        const value = Number(`${strings[0]}.${decimal}`);
        const difference = 1 / Math.pow(10, decimal.length);
        result = computeNumber(value, '+', difference).result;
      }
      return result;
    }
  }
}

/**
 * 过滤处理`null`和`undefined`的对象为空字符串
 * @param {object} info
 */
export function filterObjectEmpty(info) {
  for (const key in info) {
    if ([null, undefined, 'null', 'undefined'].includes(info[key])) {
      info[key] = '';
    }
  }
}

/**
 * 随机生成中文
 * @param {number} min 最小数
 * @param {number} max 最大数
 */
export function randomText(min = 1, max = 1) {
  const len = Math.floor(Math.random() * max) + min;
  const base = 20000;
  const range = 1000;
  let str = '';
  let i = 0;
  while (i < len) {
    i++;
    const lower = Math.floor(Math.random() * range);
    str += String.fromCharCode(base + lower);
  }
  return str;
}

/**
 * `new ResizeObserver`监听节点变动
 * @param {ElementResizeOptions} option 配置项
 */
export function onElementResize(option) {
  const resize = new ResizeObserver(entries => {
    option.callback(entries);
  });

  resize.observe(option.el);

  option.vue.$once("hook:beforeDestroy", function () {
    option.destroy && option.destroy();
    resize.disconnect();
  });
}

/**
 * 导出pdf文件
 * @param {Blob} blob 
 */
export function exportFile(blob, filename) {
  const url = blodToUrl(new Blob([blob], {
    type: blob.type
  }));
  const pdf = document.createElement('a');
  pdf.href = url;
  pdf.download = filename;
  document.body.appendChild(pdf);
  pdf.click();
  pdf.remove();
}

/**
 * 年份选项
 * @param {number} len 当前年份往前的长度 默认5年
 */
export function useYearOptions(len = 5) {
  const nowYear = new Date().getFullYear()
  const options = [];
  for (let i = nowYear; i > nowYear - len; i--) {
    options.push({
      label: i,
      value: i.toString()
    })
  }
  return options
}

/**
 * 字符串裁剪
 */
export function sliceStr(str, start, end) {
  if( !str) return ''
  return str.slice(start, end) || ''
}
