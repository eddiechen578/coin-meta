"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./components/DiceRoll/DiceRoll.tsx":
/*!******************************************!*\
  !*** ./components/DiceRoll/DiceRoll.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"../node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_animation_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/styles/animation.module.css */ \"./styles/animation.module.css\");\n/* harmony import */ var _styles_animation_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_animation_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nconst DiceRoll = (props)=>{\n    _s();\n    const { num , trigger  } = props;\n    const [count, setCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        let start = 0;\n        const end = 6;\n        if (num == 0) return;\n        if (start === end) return;\n        let recursive = false;\n        let timer = setInterval(()=>{\n            start += 1;\n            setCount(start);\n            if (recursive) {\n                if (start == num) clearTimeout(timer);\n            }\n            if (start === end) {\n                if (!recursive) {\n                    start = 0;\n                    recursive = true;\n                }\n            }\n        }, 50);\n    }, [\n        trigger\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_animation_module_css__WEBPACK_IMPORTED_MODULE_2___default().Count),\n        children: count\n    }, void 0, false, {\n        fileName: \"C:\\\\coin-meta\\\\client\\\\components\\\\DiceRoll\\\\DiceRoll.tsx\",\n        lineNumber: 43,\n        columnNumber: 9\n    }, undefined);\n};\n_s(DiceRoll, \"/xL7qdScToREtqzbt5GZ1kHtYjQ=\");\n_c = DiceRoll;\n/* harmony default export */ __webpack_exports__[\"default\"] = (/*#__PURE__*/_c1 = react__WEBPACK_IMPORTED_MODULE_1___default().memo(DiceRoll));\nvar _c, _c1;\n$RefreshReg$(_c, \"DiceRoll\");\n$RefreshReg$(_c1, \"%default%\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0RpY2VSb2xsL0RpY2VSb2xsLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBaUQ7QUFDRTtBQU1uRCxNQUFNSSxXQUFXLENBQUNDLFFBQWdCOztJQUU5QixNQUFNLEVBQUNDLElBQUcsRUFBRUMsUUFBTyxFQUFDLEdBQUdGO0lBRXZCLE1BQU0sQ0FBQ0csT0FBT0MsU0FBUyxHQUFHUiwrQ0FBUUEsQ0FBUztJQUUzQ0MsZ0RBQVNBLENBQUMsSUFBSTtRQUNWLElBQUlRLFFBQWdCO1FBRXBCLE1BQU1DLE1BQWM7UUFFcEIsSUFBR0wsT0FBTyxHQUFHO1FBQ2IsSUFBSUksVUFBVUMsS0FBSztRQUVuQixJQUFJQyxZQUFxQixLQUFLO1FBRTlCLElBQUlDLFFBQVFDLFlBQVksSUFBTTtZQUMxQkosU0FBUztZQUNURCxTQUFTQztZQUNULElBQUdFLFdBQVU7Z0JBQ1QsSUFBR0YsU0FBU0osS0FBS1MsYUFBYUY7WUFDbEMsQ0FBQztZQUVELElBQUlILFVBQVVDLEtBQUk7Z0JBQ2QsSUFBRyxDQUFDQyxXQUFVO29CQUNWRixRQUFRO29CQUNSRSxZQUFZLElBQUk7Z0JBQ3BCLENBQUM7WUFDTCxDQUFDO1FBQ0wsR0FBRztJQUVQLEdBQUc7UUFBQ0w7S0FBUTtJQUdaLHFCQUNJLDhEQUFDUztRQUFJQyxXQUFXZCwyRUFBWTtrQkFDdkJLOzs7Ozs7QUFJYjtHQXhDTUo7S0FBQUE7QUEwQ04sa0ZBQWVKLGlEQUFVLENBQUNJLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9EaWNlUm9sbC9EaWNlUm9sbC50c3g/YmZiOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZSwgdXNlRWZmZWN0fSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHN0eWxlcyBmcm9tICdAL3N0eWxlcy9hbmltYXRpb24ubW9kdWxlLmNzcyc7XHJcblxyXG5pbnRlcmZhY2UgSVByb3BzIHtcclxuICAgIG51bTogbnVtYmVyLFxyXG4gICAgdHJpZ2dlcjogYm9vbGVhblxyXG59XHJcbmNvbnN0IERpY2VSb2xsID0gKHByb3BzOiBJUHJvcHMpPT57XHJcblxyXG4gICAgY29uc3Qge251bSwgdHJpZ2dlcn0gPSBwcm9wcztcclxuICAgXHJcbiAgICBjb25zdCBbY291bnQsIHNldENvdW50XSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpPT57XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBjb25zdCBlbmQ6IG51bWJlciA9IDY7XHJcblxyXG4gICAgICAgIGlmKG51bSA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHN0YXJ0ID09PSBlbmQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHJlY3Vyc2l2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXJ0ICs9IDE7XHJcbiAgICAgICAgICAgIHNldENvdW50KHN0YXJ0KVxyXG4gICAgICAgICAgICBpZihyZWN1cnNpdmUpe1xyXG4gICAgICAgICAgICAgICAgaWYoc3RhcnQgPT0gbnVtKSBjbGVhclRpbWVvdXQodGltZXIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGFydCA9PT0gZW5kKXtcclxuICAgICAgICAgICAgICAgIGlmKCFyZWN1cnNpdmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICByZWN1cnNpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgNTApO1xyXG5cclxuICAgIH0sIFt0cmlnZ2VyXSlcclxuXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkNvdW50fT5cclxuICAgICAgICAgICAge2NvdW50fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QubWVtbyhEaWNlUm9sbCk7Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJzdHlsZXMiLCJEaWNlUm9sbCIsInByb3BzIiwibnVtIiwidHJpZ2dlciIsImNvdW50Iiwic2V0Q291bnQiLCJzdGFydCIsImVuZCIsInJlY3Vyc2l2ZSIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJjbGVhclRpbWVvdXQiLCJkaXYiLCJjbGFzc05hbWUiLCJDb3VudCIsIm1lbW8iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/DiceRoll/DiceRoll.tsx\n"));

/***/ })

});