(function (modules) {
    var cache = {}

    function __webpack_require__(moduleId) {
        if (cache[moduleId]) {
            return cache[moduleId].exports
        }

        var currentModule = {
            i: moduleId,
            l: false,
            exports: {}
        }

        modules[moduleId].call(currentModule,
            currentModule,
            currentModule.exports,
            __webpack_require__
        )
        currentModule.l = true;
        cache[moduleId] = currentModule;

        return currentModule.exports;
    }

    return __webpack_require__(0)

})([
    (function () {
        // 入口文件


    }),
    (function (currentModule, __webpack_exports__, __webpack_require__) {
        // 后续都是依赖的模块
        // 模块输出写入到 __webpack_exports__ 中

    }),
])


    (function (modules) {

        var installedModules = {};

        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }

            var currentModule = {
                i: moduleId,
                l: false,
                exports: {}
            }

            modules[moduleId](currentModule, currentModule.exports, __webpack_require__);
            currentModule.l = true;
            installedModules[moduleId] = currentModule;

            return currentModule.exports


        }



    })([
        (function () {
            // 入口文件
        }
            ())
        ,
        (function (module, exports, __webpack_require__) {

            // 模块输出写入到 exports 当中
        }
            ())
    ])