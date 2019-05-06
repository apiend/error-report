"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cache_1 = require("./cache");
cache_1.setItem("name", "thename");
console.log(cache_1.getItem('name'));
cache_1.removeItem("name");
cache_1.clear();
//# sourceMappingURL=index.js.map