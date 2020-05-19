const Util = {
  // 乱序
  shuffle: (arr) => {
    if (!Array.isArray(arr)) return false;
    for (let i = arr.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
    return arr;
  },
  // 递归 优内存优化维护执行上下文 用尾调用

  // 非尾调用 阶乘
  factorial: (n = 1) => {
    if (n < 0) return false;
    if (n === 1) return n;
    return Util.factorial(n - 1) * n;
  },

  // 尾调用
  factorialL: (n = 1, res = 1) => {
    if (n < 0) return false;
    if (n === 1) return res;
    return Util.factorialL(n - 1, res * n);
  },

  // JSON.stringfy
  jsonStringfy: (data) => {
    const typeData = typeof data;
    if (typeData !== 'object') {
      let result = null;
      if (typeData === 'string') {
        result = `"${data}"`;
      } else if (Number.isNaN(data) || data === Infinity) {
        result = 'null';
      } else if (typeData === 'undefined' || typeData === 'function' || typeData === 'symbol') {
        result = undefined;
      }
      return String(result);
    } else if (typeData === 'object') {
      if (data === null) {
        return 'null';
      } else if (data.toJSON && typeof data.toJSON === 'function') {
        return jsonStringfy(data.toJSON());
      } else if (data instanceof Array) {
        let result = [];
        data.forEach((item, index) => {
          if (
            typeof item === 'function' ||
            typeof item === 'undefined' ||
            typeof item === 'symbol'
          ) {
            result[index] = 'null';
          } else {
            result[index] = jsonStringfy(item);
          }
        });
        result = `[${result}]`;
        return result.replace(/'/g, '"');
      } else {
        let result = [];
        Object.keys(data).forEach((item) => {
          if (typeof item !== 'symbol') {
            if (
              typeof data[item] !== 'undefined' ||
              typeof data[item] !== 'symbol' ||
              typeof item[data] !== 'undefined'
            ) {
              result.push(`"${item}":${jsonStringfy(item[data])}`);
            }
          }
        });
        return `{${result}}`.replace(/'/, '"');
      }
    }
  }
};

export default Util;
