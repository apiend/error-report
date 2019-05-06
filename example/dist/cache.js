"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 错误缓存
 */
var KEY = "FE_TIMING"; // key
var TIMES = 6; // 缓存条数
var EXPIRATION_TIME = 1000 * 60 * 24; // 过期时间
var storeStorage;
/**
 * 缓存方法
 */
function store() {
    try {
        if (!storeStorage) {
            storeStorage = JSON.parse(localStorage.getItem(KEY) || '{}');
        }
        else {
            localStorage.setItem(KEY, JSON.stringify(storeStorage));
        }
    }
    catch (e) {
        console.log(e);
    }
}
/**
 * 判断是否有缓存
 */
function has(key) {
    return Object.hasOwnProperty.call(storeStorage, key);
}
exports.has = has;
/**
 * get value
 */
function getItem(key) {
    if (!has(key)) {
        return false;
    }
    var _a = storeStorage[key] || {}, value = _a.value, time = _a.time;
    return value;
}
exports.getItem = getItem;
function setItem(key, repeat) {
    if (Object.keys(storeStorage).length >= TIMES) {
        clear();
    }
    if (has(key)) {
        var value = getItem(key);
        if (value >= repeat) {
            return true;
        }
        storeStorage[key] = {
            value: value + 1,
            time: Date.now()
        };
    }
    else {
        storeStorage[key] = {
            value: 1,
            time: Date.now()
        };
    }
    store();
    return false;
}
exports.setItem = setItem;
function removeItem(key) {
    if (has(key)) {
        delete storeStorage[key];
        store();
    }
}
exports.removeItem = removeItem;
function clear() {
    var expiration = false;
    var current = null;
    var times = Number.MAX_SAFE_INTEGER;
    for (var item in storeStorage) {
        var _a = storeStorage[item] || {}, value = _a.value, time = _a.time;
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
exports.clear = clear;
//# sourceMappingURL=cache.js.map