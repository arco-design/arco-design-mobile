(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.setRootPixel = mod.exports.default;
    }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {

    "use strict";

    _exports.__esModule = true;
    _exports.default = void 0;

    function setRootPixel(base, sketch, max) {
        var baseFontSize = base || 50;
        var sketchWidth = sketch || 375;
        var maxFontSize = max || 64;
        var defaultFontSize = 0;

        function getDefaultFontSize() {
            if (defaultFontSize) {
                return defaultFontSize;
            }

            document.documentElement.style.fontSize = '';
            var temp = document.createElement('div');
            temp.style.cssText = 'width:1rem;display:none';
            document.head.appendChild(temp);
            defaultFontSize = +window.getComputedStyle(temp, null).getPropertyValue('width').replace('px', '') || 16;
            document.head.removeChild(temp);
            return defaultFontSize;
        }

        function getQuery(name) {
            return (new RegExp("[?&]".concat(name, "=([^&#\\b]+)")).exec(location.search || '') || [])[1];
        }

        function setRootFontSize() {
            var widthQueryKey = '';
            var rem2px = baseFontSize;
            var clientWidth;

            if (widthQueryKey && +getQuery(widthQueryKey)) {
                clientWidth = +getQuery(widthQueryKey);
            } else {
                clientWidth = window.innerWidth && document.documentElement.clientWidth
                    ? Math.min(window.innerWidth, document.documentElement.clientWidth)
                    : window.innerWidth
                        || document.documentElement.clientWidth
                        || document.body && document.body.clientWidth
                        || sketchWidth;
            }
            var htmlFontSizePx = clientWidth / sketchWidth * rem2px;
            htmlFontSizePx = Math.min(htmlFontSizePx, maxFontSize);
            window.ROOT_FONT_SIZE = htmlFontSizePx;
            document.documentElement.style.fontSize = "".concat(htmlFontSizePx / getDefaultFontSize() * 100, "%");
        }

        function adjust(immediate) {
            if (immediate) {
                setRootFontSize();
                return;
            }

            setTimeout(setRootFontSize, 30);
        }

        function removeRootPixel() {
            document.documentElement.style.fontSize = '';
            window.removeEventListener('resize', adjust, false);
            if ('onorientationchange' in window) {
                window.removeEventListener('orientationchange', adjust, false);
            }
        }

        if (window.isResponsive === false) {
            document.documentElement.style.fontSize = "".concat(baseFontSize, "px");
            return function () {
                document.documentElement.style.fontSize = '';
            };
        }

        adjust(true);
        window.addEventListener('resize', adjust, false);

        if ('onorientationchange' in window) {
            window.addEventListener('orientationchange', adjust, false);
        }

        return removeRootPixel;
    }

    _exports.default = setRootPixel;

});
