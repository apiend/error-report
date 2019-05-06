define("cache", ["require", "exports"], function (require, exports) {
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
});
define("index", ["require", "exports", "cache"], function (require, exports, cache_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    cache_1.setItem("name", "thename");
    console.log(cache_1.getItem('name'));
    cache_1.removeItem("name");
    cache_1.clear();
});
define("is", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Checks whether given value's type is one of a few Error or Error-like
     * {@link isError}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isError(wat) {
        switch (Object.prototype.toString.call(wat)) {
            case '[object Error]':
                return true;
            case '[object Exception]':
                return true;
            case '[object DOMException]':
                return true;
            default:
                return wat instanceof Error;
        }
    }
    exports.isError = isError;
    /**
     * Checks whether given value's type is ErrorEvent
     * {@link isErrorEvent}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isErrorEvent(wat) {
        return Object.prototype.toString.call(wat) === '[object ErrorEvent]';
    }
    exports.isErrorEvent = isErrorEvent;
    /**
     * Checks whether given value's type is DOMError
     * {@link isDOMError}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isDOMError(wat) {
        return Object.prototype.toString.call(wat) === '[object DOMError]';
    }
    exports.isDOMError = isDOMError;
    /**
     * Checks whether given value's type is DOMException
     * {@link isDOMException}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isDOMException(wat) {
        return Object.prototype.toString.call(wat) === '[object DOMException]';
    }
    exports.isDOMException = isDOMException;
    /**
     * Checks whether given value's type is an undefined
     * {@link isUndefined}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isUndefined(wat) {
        return wat === void 0;
    }
    exports.isUndefined = isUndefined;
    /**
     * Checks whether given value's type is a function
     * {@link isFunction}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isFunction(wat) {
        return typeof wat === 'function';
    }
    exports.isFunction = isFunction;
    /**
     * Checks whether given value's type is a string
     * {@link isString}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isString(wat) {
        return Object.prototype.toString.call(wat) === '[object String]';
    }
    exports.isString = isString;
    /**
     * Checks whether given value's type is an array
     * {@link isArray}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isArray(wat) {
        return Object.prototype.toString.call(wat) === '[object Array]';
    }
    exports.isArray = isArray;
    /**
     * Checks whether given value's type is an object literal
     * {@link isPlainObject}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isPlainObject(wat) {
        return Object.prototype.toString.call(wat) === '[object Object]';
    }
    exports.isPlainObject = isPlainObject;
    /**
     * Checks whether given value's type is an regexp
     * {@link isRegExp}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isRegExp(wat) {
        return Object.prototype.toString.call(wat) === '[object RegExp]';
    }
    exports.isRegExp = isRegExp;
    /**
     * Checks whether given value's type is a NaN
     * {@link isNaN}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isNaN(wat) {
        return wat !== wat;
    }
    exports.isNaN = isNaN;
});
define("util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=report.js.map