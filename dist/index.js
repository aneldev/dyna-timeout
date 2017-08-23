(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("dyna-timeout", [], factory);
	else if(typeof exports === 'object')
		exports["dyna-timeout"] = factory();
	else
		root["dyna-timeout"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class DynaTimeout {
    constructor() {
        this._holder = {};
    }
    add(id, timeout, cb, ...args) {
        if (this._holder[id]) {
            this.update(id, timeout, cb, ...args);
            return;
        }
        let item = this._holder[id] = {
            id,
            cb, timeout, args, timer: setTimeout((...args) => {
                this.cancel(item.id);
                cb(...args);
            }, timeout, ...args)
        };
    }
    update(id, timeout, cb, ...args) {
        let currentItem = this._holder[id];
        if (!currentItem) {
            console.warn(`dyna-timeout: update: id [${id}] doesn't exist to update it`);
            return;
        }
        let cb_ = cb || (currentItem && currentItem.cb) || (() => { console.error('dyna-timeout: cb not defined using the update method'); });
        let timeout_ = timeout || (currentItem && currentItem.timeout);
        let args_ = (args.length && args || false) || (currentItem && currentItem.args) || [];
        this.cancel(id);
        this.add(id, timeout_, cb_, ...args_);
    }
    changeId(oldId, newId) {
        if (this._holder[oldId]) {
            this._holder[newId] = this._holder[oldId];
            this._holder[newId].id = newId;
            delete this._holder[oldId];
            return true;
        }
        return false;
    }
    cancel(id) {
        if (this._holder[id]) {
            clearTimeout(this._holder[id].timer);
            delete this._holder[id];
        }
    }
    cancelAll() {
        Object.keys(this._holder).forEach(this.cancel.bind(this));
    }
    get length() {
        return this.getIds().length;
    }
    getIds() {
        return Object.keys(this._holder);
    }
}
exports.DynaTimeout = DynaTimeout;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});