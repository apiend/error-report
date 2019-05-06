/**
 * 错误缓存
 */
const KEY = "FE_TIMING"; // key
const TIMES = 6; // 缓存条数
const EXPIRATION_TIME = 1000 * 60 * 24; // 过期时间
let storeStorage:any;


/**
 * 缓存方法
 */
function store(){
    try {
        if (!storeStorage) {
            storeStorage = JSON.parse(localStorage.getItem(KEY) || '{}')
        } else {
            localStorage.setItem(KEY, JSON.stringify(storeStorage))
        }
    } catch (e) {
        console.log(e)
    }
}  

/**
 * 判断是否有缓存
 */
export function has(key:string) {
  return Object.hasOwnProperty.call(storeStorage, key);
}

/**
 * get value
 */
export function getItem(key:string) {
  if (!has(key)) {
    return false;
  }
  const {value,time}  = storeStorage[key] || {};
  return value;
}

export function setItem(key:string, repeat:any) {
    if (Object.keys(storeStorage).length >= TIMES) {
        clear();
    }
    if (has(key)) {
        const value = getItem(key);

        if (value >= repeat) {
            return true;
        }
        storeStorage[key] = {
            value: value + 1,
            time: Date.now()
        }
    } else {
        storeStorage[key] = {
            value: 1,
            time: Date.now()
        }
    }
    store()
    return false;
}

export function removeItem(key:string) {
    if (has(key)) {
        delete storeStorage[key]
        store()
    }
}

export function clear() {
    let expiration = false;
    let current = null;
    let times = Number.MAX_SAFE_INTEGER;
    for (let item in storeStorage) {
        const { value, time } = storeStorage[item] || {};
        if (new Date() - time > EXPIRATION_TIME) {
            removeItem(item);
            expiration = true;
        }
        if (+time < times) {
            times = value;
            current = item;
        }
    }
    // 如果已经清理了过期时间，则有空位，不需要再次清理
    if (expiration) {
        return;
    }
    removeItem(current);
}