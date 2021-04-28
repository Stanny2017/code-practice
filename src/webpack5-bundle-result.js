(() => {
    var modules = [
        ,
        ((__unused__, __webpack_exports__, __webpack_require__) => {
            // 在 __webpack_exports__ 里写入模块导出内容

        }),
        ((__unused__, __webpack_exports__, __webpack_require__) => {
            // 在 __webpack_exports__ 里写入模块导出内容

        }),
    ];

    var moduleCache = {};

    function __webpack_require__(moduleId) {
        if (moduleCache[moduleId]) {
            return moduleCache[moduleId].exports;
        }

        var module = {
            i: moduleId,
            l: false,
            exports: {}
        }

        modules[moduleId](module, modules.exports, __webpack_require__);
        module.l = true;

        moduleCache[moduleId] = module;

        return module.exports;
    }

    // *********************************************************************
    // 入口函数放到末尾直接执行
    (() => {
        // 使用 __webpack_require__ 来加载其他模块
    })

})()