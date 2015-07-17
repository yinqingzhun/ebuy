M.define("html5_2015",
function (a) {
    var b = function (c) {
        this.init(c)
    };
    M.object.merge(b.prototype, {
        init: function (c) {
            if (M.object.isObject(c)) {
                if (c && c.head) {
                    this.head = true
                } else {
                    this.head = false
                }
                if (c && c.footer) {
                    this.footer = true;
                    this.footerInit(c.footer)
                }
                if (c && c.appDown) {
                    this.appdownInit(c.appDown)
                }
            }
        },
        headRender: function () {
            var c = this;
            $("#layout_jdKey").on("click",
            function () {
                if ($("#layout_jdBar").css("display") == "none") {
                    $("#layout_jdBar").show()
                } else {
                    $("#layout_jdBar").hide()
                }
            });
            $("#layout_urlblack").on("click",
            function () {
                c.pageBack()
            })
        },
        pageBack: function () {
            var c = window.location.href;
            if (/#top/.test(c)) {
                window.history.go(-2);
                window.location.load(window.location.href)
            } else {
                window.history.back()
            }
        },
        footerInit: function (d) {
            var c = this;
            if (d) {
                if (M.object.isObject(d)) {
                    c.toPcHomeUrl = d.toPcHomeUrl ? d.toPcHomeUrl : "http://www.jd.com/#m"
                } else {
                    c.toPcHomeUrl = "http://www.jd.com/#m"
                }
            }
        },
        footerRender: function () {
            var c = this;
            $("#layout_toPcHome").on("click",
            function () {
                c.toPcHome()
            })
        },
        toPcHome: function () {
            var c = this;
            M.cookie.setCookie("pcm", "1", 1, "", ".jd.com");
            window.location.href = c.toPcHomeUrl
        },
        appdownInit: function (d) {
            var c = this;
            if (d) {
                if (M.object.isObject(d)) {
                    if (d.withScreen) {
                        c.appDownWithScreen = true
                    } else {
                        c.appDownWithScreen = false
                    }
                } else {
                    c.appDownWithScreen = false
                }
                c.appdownShow = true;
                c.hasAppDown = true;
                c.downloadHideTime = 1;
                if (d.downloadHideTime) {
                    c.downloadHideTime = argObj.downloadHideTime
                }
            } else {
                c.hasAppDown = false
            }
        },
        appdownHtml: function () {
            var d = this;
            var c = [];
            c.push('<div id="layout_appdown" class="tryme' + (d.appDownWithScreen ? " onfoot" : "") + '">');
            c.push("<div>");
            c.push('<div id="layout_close_appdown" class="later"></div>');
            c.push('<a id="layout_open_app" class="trynow" href="javascript:void(0);"></a>');
            c.push("<span>客户端首单<br>满79元送79元</span>");
            c.push("</div>");
            c.push("</div>");
            return c.join("")
        },
        appdownBind: function () {
            var c = this;
            $("#layout_close_appdown").downloadAppPlugInClose("layout_appdown",
            function () {
                $("#layout_appdown").attr("search_land_searchTransformation_show", "true")
            });
            $("#layout_open_app").downloadAppPlugIn()
        },
        appdownRender: function () {
            var d = this;
            var c = d.appdownHtml();
            $("#layout_top").after(c);
            d.appdownBind()
        },
        run: function () {
            if (this.footer) {
                this.footerRender()
            }
            if (this.head) {
                this.headRender()
            }
            if (this.hasAppDown) {
                this.appdownRender()
            }
        }
    });
    a.clazz = b
}); (function () {
    var l = {
        DOWN_APP_URL: "http://h5.m.jd.com/active/download/download.html?channel=jd-m",
        DOWN_APP_IOS: "http://union.m.jd.com/download/go.action?to=http%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fid414245413&client=apple&unionId=12532&subunionId=m-top&key=e4dd45c0f480d8a08c4621b4fff5de74",
        DOWN_APP_ANDROID: "http://h5.m.jd.com/active/download/download.html?channel=jd-m",
        DOWN_WEIXIN: "http://a.app.qq.com/o/simple.jsp?pkgname=com.jingdong.app.mall&g_f=991850",
        DOWN_IPAD: "https://itunes.apple.com/cn/app/jing-dong-hd/id434374726?mt=8",
        INTENT_URL: "openApp.jdMobile://360buy?type=1&params=",
        Chrome_Intent: "intent://m.jd.com/#Intent;scheme=openApp.jdMobile;package=com.jingdong.app.mall;end"
    };
    var y = navigator.userAgent;
    var c = window.localStorage ? true : false;
    var d = (y.match(/Chrome\/([\d.]+)/) || y.match(/CriOS\/([\d.]+)/)) ? true : false;
    var A = (y.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false;
    var q = (y.match(/(iPad).*OS\s([\d_]+)/)) ? true : false;
    var u = (!q && y.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false;
    var f = navigator.userAgent.indexOf("MicroMessenger") >= 0;
    var r = false;
    var s = "plugIn_downloadAppPlugIn_loadIframe";
    var k = false;
    var b = 0;
    var a = {};
    var h = {};
    var o = {};
    function B(e, F) {
        var D = document.getElementsByTagName("script");
        for (i = 0; i < D.length; i++) {
            if (D[i].src && D[i].src.indexOf("/active/track/mping.min.js") != -1) {
                F();
                return
            }
        }
        var E = document.createElement("script");
        E.type = "text/javascript";
        E.src = e;
        E.onload = E.onreadystatechange = function () {
            if (this.readyState && this.readyState == "loading") {
                return
            }
            F()
        };
        E.onerror = function () {
            C.removeChild(E);
            F()
        };
        var C = document.getElementsByTagName("head")[0];
        C.appendChild(E)
    }
    function j(F) {
        var E = [];
        var H = {
            category: "jump",
            des: "productDetail",
            sourceType: "JSHOP_SOURCE_TYPE",
            sourceValue: "JSHOP_SOURCE_VALUE"
        };
        if (F) {
            for (var D in F) {
                if (D && F[D]) {
                    E.push('"' + D + '":"' + F[D] + '"')
                }
            }
        }
        for (var D in H) {
            if (D && H[D]) {
                E.push('"' + D + '":"' + H[D] + '"')
            }
        }
        try {
            E.push('"m_param":' + MPing.EventSeries.getSeries())
        } catch (G) {
            E.push('"m_param":null')
        }
        var C = "{" + E.join(",") + "}";
        return l.INTENT_URL + C
    }
    function v(e) {
        return "intent://m.jd.com/#Intent;scheme=" + e + ";package=com.jingdong.app.mall;end"
    }
    function x() {
        WeixinJSBridge.invoke("getInstallState", {
            packageName: "com.jingdong.app.mall",
            packageUrl: "openApp.jdMobile://"
        },
        function (D) {
            var E = D.err_msg,
            C = 0;
            if (E.indexOf("get_install_state:yes") > -1) {
                r = true
            }
        })
    }
    function t(C, D) {
        if (f) {
            if (r) {
                var e = D && D.DOWN_APP_URL ? D.DOWN_APP_URL : j(C);
                location.href = e
            } else {
                var e = D && D.DOWN_WEIXIN ? D.DOWN_WEIXIN : l.DOWN_WEIXIN;
                location.href = e
            }
            return
        }
        p(C, D)
    }
    function p(C, F) {
        var e = null;
        var E = null;
        if (q) {
            e = F && F.DOWN_IPAD ? F.DOWN_IPAD : l.DOWN_IPAD
        } else {
            if (u) {
                e = F && F.DOWN_APP_IOS ? F.DOWN_APP_IOS : l.DOWN_APP_IOS
            } else {
                e = F && F.DOWN_APP_URL ? F.DOWN_APP_URL : l.DOWN_APP_URL
            }
        }
        if (d) {
            if (A) {
                var D = F && F.INTENT_URL ? F.INTENT_URL : j(C);
                E = v(D)
            } else {
                E = F && F.INTENT_URL ? F.INTENT_URL : j(C)
            }
        } else {
            E = F && F.INTENT_URL ? F.INTENT_URL : j(C)
        }
        document.querySelector("#" + s).src = E;
        setTimeout(function () {
            location.href = e
        },
        100)
    }
    function w(D) {
        try {
            var E = new MPing.inputs.Click(D);
            E.event_param = "";
            var C = new MPing();
            C.send(E)
        } catch (F) { }
    }
    function g(e) {
        var C = (e || "mGen") + (++b);
        return C
    }
    function n(C, e) {
        (typeof console !== "undefined" && console !== null) && (console[e || (e = "log")]) && console[e](C)
    }
    if (f) {
        if (window.WeixinJSBridge && WeixinJSBridge.invoke) {
            x()
        } else {
            document.addEventListener("WeixinJSBridgeReady", x, !1)
        }
    }
    if (window.$LAB) {
        $LAB.setOptions({
            AlwaysPreserveOrder: true
        }).script("http://h5.m.jd.com/active/track/mping.min.js")
    } else {
        B("http://h5.m.jd.com/active/track/mping.min.js",
        function () { })
    }
    if (c) {
        try {
            window.localStorage.setItem("M_test", 1)
        } catch (z) {
            c = false
        }
        try {
            window.localStorage.getItem("M_test")
        } catch (z) {
            c = false
        }
        try {
            window.localStorage.removeItem("M_test")
        } catch (z) {
            c = false
        }
    }
    if (window.Zepto || window.jQuery) {
        var m = null;
        if (window.Zepto) {
            m = window.Zepto
        } else {
            m = window.jQuery
        }
        m.fn.downloadAppPlugIn = function (C, e) {
            var D = this;
            var E = $(this).attr("id");
            if (!E) {
                E = g("downloadAppPlugIn");
                $(this).attr("id", E)
            }
            a[E] = C;
            if (e) {
                h[E] = e
            }
            $(D).bind("click",
            function (F) {
                if (!k) {
                    $("body").append('<iframe id="' + s + '" style="display:none;width:0px;height:0px;"></iframe>');
                    k = true
                }
                w("MDownLoadFloat_OpenNow");
                if (c) {
                    localStorage.downCloseDate = Date.now() + "_2592000000"
                }
                t(a[$(this).attr("id")], h[$(this).attr("id")])
            })
        };
        m.fn.downloadAppPlugInClose = function (C, F, E) {
            if (!C) {
                n("closeId is null", "error");
                return
            }
            var H = $(this).attr("id");
            if (!H) {
                H = g("downloadAppPlugInClose");
                $(this).attr("id", H)
            }
            o[H] = C;
            var e = Date.now();
            if (c) {
                var G = null;
                if (localStorage.downCloseDate) {
                    G = localStorage.downCloseDate.split("_");
                    if (G.length == 2) {
                        G[0] = parseInt(G[0], 10);
                        G[1] = parseInt(G[1], 10)
                    } else {
                        G = null
                    }
                }
                if (G && G.length == 2 && (e - G[0]) < G[1]) {
                    $("#" + C).css("display", "none");
                    if (F) {
                        var D = E ? E : null;
                        F.call(D)
                    }
                    return false
                } else {
                    $("#" + C).css("display", "block")
                }
            } else {
                document.querySelector("#" + C).style.display = "block"
            }
            m(this).bind("click",
            function (J) {
                w("MDownLoadFloat_Close");
                m("#" + o[this.getAttribute("id")]).hide();
                if (c) {
                    localStorage.downCloseDate = Date.now() + "_259200000"
                }
                if (F) {
                    var I = E ? E : null;
                    F.call(I)
                }
            })
        }
    } else {
        window.$ = function (e) {
            if (typeof e == "object") {
                return e
            }
            var C = document.querySelector(e);
            C.downloadAppPlugIn = function (E, D) {
                var F = C.getAttribute("id");
                if (!F) {
                    F = g("downloadAppPlugIn");
                    C.setAttribute("id", F)
                }
                a[F] = E;
                if (D) {
                    h[F] = D
                }
                C.addEventListener("click",
                function () {
                    if (!k) {
                        var G = document.createElement("iframe");
                        G.id = s;
                        G.style = "display:none;width:0px;height:0px;";
                        document.body.appendChild(G);
                        k = true
                    }
                    if (c) {
                        localStorage.downCloseDate = Date.now() + "_2592000000"
                    }
                    w("MDownLoadFloat_OpenNow");
                    t(a[this.getAttribute("id")], h[this.getAttribute("id")])
                },
                !1)
            };
            C.downloadAppPlugInClose = function (E, H, G) {
                if (!E) {
                    n("closeId is null", "error");
                    return
                }
                var J = C.getAttribute("id");
                if (!J) {
                    J = g("downloadAppPlugInClose");
                    C.setAttribute("id", J)
                }
                o[J] = E;
                var D = Date.now();
                if (c) {
                    var I = null;
                    if (localStorage.downCloseDate) {
                        I = localStorage.downCloseDate.split("_");
                        if (I.length == 2) {
                            I[0] = parseInt(I[0], 10);
                            I[1] = parseInt(I[1], 10)
                        } else {
                            I = null
                        }
                    }
                    if (I && I.length == 2 && (D - I[0]) < I[1]) {
                        document.querySelector("#" + E).style.display = "none";
                        if (H) {
                            var F = G ? G : null;
                            H.call(F)
                        }
                        return false
                    } else {
                        document.querySelector("#" + E).style.display = "block"
                    }
                } else {
                    document.querySelector("#" + E).style.display = "block"
                }
                C.addEventListener("click",
                function () {
                    w("MDownLoadFloat_Close");
                    document.querySelector("#" + o[this.getAttribute("id")]).style.display = "none";
                    if (c) {
                        localStorage.downCloseDate = Date.now() + "_259200000"
                    }
                    if (H) {
                        var K = G ? G : null;
                        H.call(K)
                    }
                },
                !1)
            };
            return C
        }
    }
})();