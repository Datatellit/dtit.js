/*!
 * dtit.js v1.0.0
 * (c) 2017 Terry.lu
 * Released under the MIT License.
 */

//noinspection JSAnnotator
(function (window) {
    var dtit = function () {
        var xhr = function () {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else {
                return new ActiveObject('Micrsorf.XMLHttp');
            }
        };
        var report = function () {
            var newXhr = xhr();
            newXhr.open("get", "", true);
            newXhr.send(null);
        }
        var dtit_console = 'unKnown';

        return {
            CONST: {
                DATE_F: "yyyy-MM-dd",
                TIME_F: "hh:mm:ss",
                TIME_H_M_F: "hh:mm",
                DATE_TIME_F: "yyyy-MM-dd hh:mm:ss"
            },
            /**
             *
             * @param key {string}
             * @returns {返回key对应的value没有找到为null}
             */
            query: function (key) {
                if (key) {
                    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    return r != null && unescape(r[2]) || null;
                } else {
                    var u, sear, p = {};
                    if (location.search)
                        u = location.search
                    else
                        u = location.href
                    u = u.slice(0, u.indexOf("#"))
                    if (-1 != u.indexOf("?"))
                        sear = u.slice(u.indexOf("?") + 1).split("&")
                    for (var item in sear) {
                        var s = sear[item].split("=")
                        p[s[0]] = s[1]
                    }
                    return p;
                }
            },
            /**
             *
             * @param template {string}
             * @param args{string}
             * @returns {返回格式化后的字符串}
             */
            format: function (template, args) {
                var result = template;
                if (arguments.length > 0) {
                    if (arguments.length == 1 && typeof (args) == "object") {
                        for (var key in args) {
                            if (args[key] != undefined) {
                                var reg = new RegExp("({" + key + "})", "g");
                                result = result.replace(reg, args[key]);
                            }
                        }
                    }
                    else {
                        for (var i = 1; i < arguments.length; i++) {
                            if (arguments[i] != undefined) {
                                var reg = new RegExp("({)" + (i - 1) + "(})", "g");
                                result = result.replace(reg, arguments[i]);
                            }
                        }
                    }
                }
                return result;
            },
            /**
             *
             * @param date {Date}
             * @param format {string}
             * @return {返回指定格式的时间}
             */
            dateFormat: function (date, format) {
                var myDate = new Date(date);
                var o = {
                    "M+": myDate.getMonth() + 1, //月份
                    "d+": myDate.getDate(), //日
                    "h+": myDate.getHours(), //小时
                    "m+": myDate.getMinutes(), //分
                    "s+": myDate.getSeconds(), //秒
                    "q+": Math.floor((myDate.getMonth() + 3) / 3), //季度
                    "S": myDate.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (myDate.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return format;
            },
            /**
             * @returns {生成的guid}
             */
            guid: function () {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                }).toUpperCase();
            },
            /**
             *
             * @param x{范围起始值int}
             * @param y{范围结束值int}
             * @returns {只传x则为长度}
             */
            random: function (x, y) {
                if (arguments.length > 1) {
                    return Math.floor(x + Math.random() * (y - x));
                } else {
                    //生成指定长度
                    var min = 1, max = 9;
                    for (var i = 1; i < x; i++) {
                        min += "0";
                        max += "9";
                    }
                    return this.random(parseInt(min), parseInt(max));
                }
            },
            /**
             *
             * @param str {替换对象str}
             * @param old {替换掉的字符串str}
             * @param upt {新的字符串str}
             */
            replaceAll: function (str, old, upt) {
                return str.replace(new RegExp(old, "gm"), upt);
            },
            /**
             *
             * @param key {string}
             * @param data{stringORobject}
             * @param exp {有效时间不传为SessionCookie}
             * @returns {void}
             */
            setCookie: function (key, data, exp) {
                var expdate = new Date();   //初始化时间
                expdate.setTime(expdate.getTime() + exp * 60 * 60 * 24);
                var value = encodeURIComponent((typeof data == "object" ? JSON.stringify(data) : data));
                if (exp)
                    document.cookie = key + "=" + value + ";expires=" + expdate.toGMTString() + ";path=/";
                else
                    document.cookie = key + "=" + value + ";path=/";
            },
            /**
             *
             * @param key{string}
             * @returns {取得cookie中的值}
             */
            getCookie: function (key) {
                var data;
                var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
                if (arr != null) {
                    data = decodeURIComponent(unescape(arr[2]));
                } else {
                    data = null;
                }
                if (data && typeof data == "object")
                    return JSON.parse(data);
                else
                    return data;
            },
            /**
             *
             * @param key {要删除的cookie名称}
             * @returns {void}
             */
            clearCookie: function (key) {
                this.setCookie(key, "", -1);
            },
            /**
             *
             * @param array{stringORobject}
             * @param fn{callback}
             * @returns {void}
             */
            each: function (array, fn) {
                //确定array的类型
                if (typeof array == "string") {
                    this.each(array.split(""), fn);
                } else if (typeof array == "object") {
                    for (var key in array) {
                        if (typeof array[key] == "object") {
                            if (fn && fn(array[key], parseInt(key)) == false)break;
                        }
                        else {
                            if (!isNaN(key)) {
                                if (fn && fn(array[key], key) == false)break;
                            }
                            else {
                                if (fn && fn(array[key], key) == false)break;
                            }
                        }
                    }
                }
            },
            /**
             *
             * @param color{colorValue}
             * @returns {object}
             */
            tinycolor: function (color) {
                function isOnePointZero(n) {
                    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
                }

                function isPercentage(n) {
                    return typeof n === "string" && n.indexOf('%') != -1;
                }

                function pad2(c) {
                    return c.length == 1 ? '0' + c : '' + c;
                }

                function getColor(i) {
                    //获取主值
                    var v = color.substring(4, color.length - 1);
                    return v.split(',')[i];
                }

                function bound01(n, max) {
                    if (isOnePointZero(n)) {
                        n = "100%";
                    }
                    var processPercent = isPercentage(n);
                    n = Math.min(max, Math.max(0, parseFloat(n)));

                    // Automatically convert percentage into number
                    if (processPercent) {
                        n = parseInt(n * max, 10) / 100;
                    }
                    // Handle floating point rounding errors
                    if ((Math.abs(n - max) < 0.000001)) {
                        return 1;
                    }
                    // Convert into [0, 1] range if it isn't already
                    return (n % max) / parseFloat(max);
                }

                function rgbToHsl() {
                    var r = getPostion(color.r, 0), g = getPostion(color.g, 1), b = getPostion(color.b, 2);
                    r = bound01(r, 255);
                    g = bound01(g, 255);
                    b = bound01(b, 255);
                    var max = Math.max(r, g, b), min = Math.min(r, g, b);
                    var h, s, l = (max + min) / 2;
                    if (max == min) {
                        h = s = 0; // achromatic
                    }
                    else {
                        var d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch (max) {
                            case r:
                                h = (g - b) / d + (g < b ? 6 : 0);
                                break;
                            case g:
                                h = (b - r) / d + 2;
                                break;
                            case b:
                                h = (r - g) / d + 4;
                                break;
                        }
                        h /= 6;
                    }
                    return {h: h, s: s, l: l};
                }

                function getPostion(v, i) {
                    if (v || v == 0) return v;
                    return getColor(i);
                }

                function hslToRgb() {
                    var h = getPostion(color.h, 0), s = getPostion(color.s, 1), l = getPostion(color.l, 2);
                    var r, g, b;

                    h = bound01(h, 360);
                    s = bound01(s, 100);
                    l = bound01(l, 100);

                    function hue2rgb(p, q, t) {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                    }

                    if (s === 0) {
                        r = g = b = l; // achromatic
                    }
                    else {
                        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                        var p = 2 * l - q;
                        r = hue2rgb(p, q, h + 1 / 3);
                        g = hue2rgb(p, q, h);
                        b = hue2rgb(p, q, h - 1 / 3);
                    }

                    return {r: parseInt(r * 255), g: parseInt(g * 255), b: parseInt(b * 255)};
                }

                function rgbToHex() {
                    var r = getPostion(color.r, 0), g = getPostion(color.g, 1), b = getPostion(color.b, 2), allow3Char;
                    var hex = [
                        pad2(Math.round(r).toString(16)),
                        pad2(Math.round(g).toString(16)),
                        pad2(Math.round(b).toString(16))
                    ];

                    // Return a 3 character hex if possible
                    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
                        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
                    }
                    return "#" + hex.join("");
                }

                function hexToRgb() {
                    var sColor = color.toLowerCase();
                    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                    if (sColor && reg.test(sColor)) {
                        if (sColor.length === 4) {
                            var sColorNew = "#";
                            for (var i = 1; i < 4; i += 1) {
                                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                            }
                            sColor = sColorNew;
                        }
                        //处理六位的颜色值
                        var sColorChange = [];
                        for (var i = 1; i < 7; i += 2) {
                            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                        }
                        return {
                            r: parseInt(sColorChange[0]),
                            g: parseInt(sColorChange[1]),
                            b: parseInt(sColorChange[2])
                        };
                    } else {
                        return sColor;
                    }
                };

                function rgbToRgb() {
                    var r = getPostion(color.r, 0), g = getPostion(color.g, 1), b = getPostion(color.b, 2);
                    return {
                        r: bound01(r, 255) * 255,
                        g: bound01(g, 255) * 255,
                        b: bound01(b, 255) * 255
                    };
                }

                function hslToHsl() {
                    if (typeof color == "object")
                        return color;
                    else
                        return {h: getColor(0), s: getColor(1), l: getColor(2)}
                }

                //确定当前color类型
                var type = "rgb";
                //如果颜色值是对象，并且存在r属性，或者是string型以rgb开关的
                if ((typeof color == "object" && (color.r || color.r == 0)) || ( typeof color == "string" && color.indexOf("rgb") == 0)) {
                    type = "rgb";
                } else if ((typeof color == "object" && (color.h || color.h == 0)) || ( typeof color == "string" && color.indexOf("hsl") == 0)) {
                    type = "hsl";
                } else if (typeof color == "string" && color.indexOf("#") == 0) {
                    type = "hex";
                }
                return {
                    toRgb: function () {
                        var value;
                        switch (type) {
                            case "rgb":
                                value = rgbToRgb();
                                break;
                            case "hsl":
                                value = hslToRgb();
                                break;
                            case  "hex":
                                value = hexToRgb();
                                break;
                        }
                        return value;
                    },
                    toHsl: function () {
                        var value;
                        switch (type) {
                            case "rgb":
                                value = rgbToHsl();
                                break;
                            case "hsl":
                                value = hslToHsl();
                                break;
                            case  "hex":
                                color = hexToRgb();
                                value = rgbToHsl();
                                type = "rgb";
                                break;
                        }
                        return value;
                    },
                    toHex: function () {
                        var value;
                        switch (type) {
                            case "rgb":
                                value = rgbToHex();
                                break;
                            case "hsl":
                                color = hslToRgb();
                                value = rgbToHex();
                                type = "rgb";
                                break;
                            case  "hex":
                                value = color;
                                break;
                        }
                        return value;
                    }
                }
            },
            /**
             *
             * @param status{bool启用或禁用}
             * @returns {object}
             */
            setConsole: function (status) {
                dtit_console = status;
                this.setCookie("dtit_console", status);
            },
            _isEnable: function () {
                if (dtit_console != "unKnown")
                    return dtit_console;
                else {
                    var ck = this.getCookie("dtit_console");
                    if (ck != null) {
                        dtit_console = ck == "true" ? true : false;
                        return dtit_console;
                    } else {
                        return true;
                    }
                }
            }
        }
    }
    //支持cmd and amd
    if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
        module.exports = dtit();
    } else if (typeof define === 'function' && define.amd) { //支持amd
        define(function () {
            return dtit();
        });
    } else {
        this.dtit = dtit;
        //绑定全局使用
        window._d = window.dtit = this.dtit();
    }

    //增强console，支持一键启用和禁用
    (function (cl) {
        var log = cl.log, info = cl.info, warn = cl.warn, error = cl.error, debug = cl.debug;
        cl.log = function () {
            if (dtit()._isEnable())
                return log.apply(this, arguments);
            else
                return null;
        };
        cl.info = function () {
            if (dtit()._isEnable())
                return info.apply(this, arguments);
            else
                return null;
        };
        cl.warn = function () {
            if (dtit()._isEnable())
                return warn.apply(this, arguments);
            else
                return null;
        };
        cl.error = function () {
            if (dtit()._isEnable())
                return error.apply(this, arguments);
            else
                return null;
        };
        cl.debug = function () {
            if (dtit()._isEnable())
                return debug.apply(this, arguments);
            else
                return null;
        };
    })(window.console);
})(window);