/*!
 * dtit.js v1.0.0
 * (c) 2017 Terry.lu
 * Released under the MIT License.
 */

//noinspection JSAnnotator
(function (window) {

    var dtit = function () {
        return {
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
                                if (fn && fn(key, array[key]) == false)break;
                            }
                        }
                    }
                }
            }
        }
    }
    //支持cmd and amd
    if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
        module.exports = dtit;
    } else if (typeof define === 'function' && define.amd) { //支持amd
        define(function () {
            return dtit;
        });
    } else {
        this.dtit = dtit;
		//绑定全局使用
		window._d = window.dtit = this.dtit();
    }
})(window);