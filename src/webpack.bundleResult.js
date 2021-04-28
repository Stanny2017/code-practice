(function (modules) {
    var installedModules = {}; //缓存加载过的模块

    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }

        var currentLoadmodule = {
            i: moduleId,
            l: false, // if module has loaded
            exports: {}
        }

        // excute the module function
        modules[moduleId].call(currentLoadmodule.exports,
            currentLoadmodule, currentLoadmodule.exports, __webpack_require__);

        currentLoadmodule.l = true;
        installedModules[moduleId] = currentLoadmodule;

        return currentLoadmodule.exports;
    }

    // .m  .d  .p
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    //...

    return __webpack_require__(__webpack_require__.s = 0)
})([
    (function (module, __webpack_exports__, __webpack_require__) {
        // 入口函数
        // import 了其他模块就会改成用 __webpack_require__ 加载后面的模块得到返回值
       

    })
    ,
    (function (module, __webpack_exports__, __webpack_require__) {
        //  模块依赖
        // 往 __webpack_exports__ 写入模块输出结果

    })
])