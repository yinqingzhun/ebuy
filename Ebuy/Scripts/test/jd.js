M.define("index",
function (a) {
    var b = function (c) {
        this.init(c)
    };
    M.object.merge(b.prototype, {
        init: function (e) {
            this.threadTime = 500;
            this.thread = new (M.exports("thread").clazz)({
                time: this.threadTime
            });
            this.sliderTouchXY = {};
            this.sliderTime = 0;
            this.sliderImgIndex = 1;
            this.themeIdList = [];
            this.themeImgTimer = {};
            this.imgHigth = {
                all: 0,
                brand: {},
                discount: {}
            };
            if (M.object.isObject(e)) {
                this.sliderInit(e);
                this.themeImgInit(e);
                this.seckillInit(e);
                this.fireworksInit(e.fireworks);
                this.floatLayerInit(e.indexFloatLayer);
                this.recommendInit(e.recommend);
                this.hasAppBanner = e && e.appBanner ? true : false
            }
            this.computeImgHigth();
            var c = "";
            if (e.searchland.hotKeyword && e.searchland.hotKeyword.length > 0) {
                c = e.searchland.hotKeyword[Math.floor(Math.random() * e.searchland.hotKeyword.length + 1) - 1]
            }
            this.searchLand = new (M.exports("searchland").clazz)({
                showFuncObj: {
                    source: this,
                    func: function () {
                        $("#" + this.fireworksleafId).remove()
                    }
                },
                hideFuncObj: {
                    source: this,
                    func: function () {
                        $("#index_clear_keyword").hide()
                    }
                },
                claerKeywordBtnId: "index_clear_keyword",
                searchPanelId: "index_search_head",
                keyword: c,
                landSearchWordHide: true,
                hotKeyword: e.searchland.hotKeyword ? e.searchland.hotKeyword : null,
                submitId: "index_search_submit",
                formId: "index_searchForm",
                catelogyListId: "index_category",
                keywordId: "index_newkeyword",
                isHome: true,
                closeSearchLandBtnId: "index_search_bar_cancel"
            });
            this.imgLazyLad = new (M.exports("Imglazyload").clazz)();
            this.runtopId = "indexToTop"
        },
        computeImgHigth: function () {
            var c = this;
            var e = setInterval(function () {
                var l = $(".brand-floor");
                var k = $(".discount-floor");
                var j = l.length + k.length;
                if (c.imgHigth.all < j && j > 0) {
                    if (l.length > 0) {
                        for (var h = 0; h < l.length; h++) {
                            if (!c.imgHigth.brand[h] && $(l[h]).find(".brand").children().length == 3) {
                                if ($(l[h]).find("img").eq(0)[0].complete && $(l[h]).find("img").eq(2)[0].complete) {
                                    c.imgHigth.brand[h] = true;
                                    c.imgHigth.all++;
                                    var g = $(l[h]).find("img").eq(0).height();
                                    var f = $(l[h]).find("img").eq(2).height();
                                    if (g > 0 && f > 0) {
                                        $(l[h]).find("img").eq(1).attr("height", (g + f + 1) + "px")
                                    }
                                }
                            }
                        }
                    }
                    if (k.length > 0) {
                        for (var h = 0; h < k.length; h++) {
                            if (!c.imgHigth.discount[h] && $(k[h]).find(".discount").children().length == 3) {
                                if ($(k[h]).find("img").eq(1)[0].complete && $(k[h]).find("img").eq(2)[0].complete) {
                                    c.imgHigth.discount[h] = true;
                                    c.imgHigth.all++;
                                    var g = $(k[h]).find("img").eq(1).height();
                                    var f = $(k[h]).find("img").eq(2).height();
                                    if (g > 0 && f > 0) {
                                        $(k[h]).find("img").eq(0).attr("height", (g + f + 1) + "px")
                                    }
                                }
                            }
                        }
                    }
                } else {
                    clearInterval(e)
                }
            },
            1000)
        },
        computeHigthReSize: function () {
            var j = $(".brand-floor");
            var h = $(".discount-floor");
            var g = j.length + h.length;
            if (g > 0) {
                if (j.length > 0) {
                    for (var f = 0; f < j.length; f++) {
                        if ($(j[f]).find(".brand").children().length == 3) {
                            var e = $(j[f]).find("img").eq(0).height();
                            var c = $(j[f]).find("img").eq(2).height();
                            if (e > 0 && c > 0) {
                                $(j[f]).find("img").eq(1).attr("height", (e + c + 1) + "px")
                            }
                        }
                    }
                }
                if (h.length > 0) {
                    for (var f = 0; f < h.length; f++) {
                        if ($(h[f]).find(".discount").children().length == 3) {
                            var e = $(h[f]).find("img").eq(1).height();
                            var c = $(h[f]).find("img").eq(2).height();
                            if (e > 0 && c > 0) {
                                $(h[f]).find("img").eq(0).attr("height", (e + c + 1) + "px")
                            }
                        }
                    }
                }
            }
        },
        sliderInit: function (e) {
            var c = this;
            if (e.sliderImgList && M.object.isArray(e.sliderImgList)) {
                c.sliderImgList = e.sliderImgList
            } else {
                c.sliderImgList = []
            }
        },
        sliderSetUlWidth: function () {
            var c = this;
            if (c.sliderImgList.length > 1) {
                c.sliderWidth = $("#slider").width();
                $("#slider_touch").css("width", (c.sliderImgList.length + "00%"));
                $("#slider_touch").find("li").css("width", c.sliderWidth)
            }
        },
        sliderSetLiWidth: function () {
            var c = this;
            if (c.sliderImgList.length > 1) {
                $("#slider_touch").find("li").css("width", c.sliderWidth)
            }
        },
        sliderHTML: function () {
            var f = [];
            var g = this;
            for (var e = 0; e < g.sliderImgList.length; e++) {
                var c = g.sliderImgList[e];
                f.push('<li style="float:left;"><a class="J_ping" report-eventid="MHome_FocusPic" report-eventparam="' + c.sourceValue + '" page_name="index" href="' + c.url + '" ><img alt="' + c.title + '"  style="z-index:1;height:auto; max-width:640px; min-width:320px; width: 100%" src="' + c.img + '"  /></a></li>')
            }
            f = f.join("");
            $("#slider_touch").html("");
            $("#slider_touch").html(f)
        },
        sliderImg: function () {
            var c = this;
            if (c.sliderImgIndex < 0) {
                c.sliderImgIndex = c.sliderImgList.length - 1
            } else {
                if (c.sliderImgIndex >= c.sliderImgList.length) {
                    c.sliderImgIndex = 0
                }
            }
            $("#slider_touch").animate({
                left: ("-" + (c.sliderImgIndex * c.sliderWidth) + "px")
            },
            200, "ease-in");
            $("#serial-number").find("span").removeClass("selected");
            $("#serial-number").find("span").eq(c.sliderImgIndex).addClass("selected");
            c.sliderImgIndex++
        },
        sliderRun: function (e) {
            var c = this;
            if (c.sliderTime >= 4000) {
                c.sliderImg();
                c.sliderTime = 0
            } else {
                c.sliderTime = c.sliderTime + e
            }
        },
        sliderRender: function () {
            var c = this;
            c.sliderSetUlWidth();
            c.sliderHTML();
            c.sliderSetLiWidth();
            c.thread.addOne({
                name: "slider",
                event: c.sliderRun,
                source: c
            });
            $("#slider").on("touchstart",
            function (e) {
                c.sliderTouchXY.startX = e.touches[0].clientX;
                c.sliderTouchXY.startY = e.touches[0].clientY;
                c.sliderTouchXY.initX = c.sliderTouchXY.startX;
                c.sliderTouchXY.finishX = 0
            });
            $("#slider").on("touchmove",
            function (g) {
                var j = g.touches;
                var f = g.touches[0].clientX;
                var e = g.touches[0].clientY;
                if (Math.abs(e - c.sliderTouchXY.startY) > Math.abs(f - c.sliderTouchXY.startX)) {
                    return
                }
                g.preventDefault();
                c.thread.closeOne("slider");
                c.sliderTime = 0;
                c.sliderTouchXY.finishX = f;
                var i = Math.abs(f - c.sliderTouchXY.startX);
                var h = $("#slider_touch").css("left").replace("px", "");
                if (c.sliderTouchXY.startX > f) {
                    $("#slider_touch").css("left", (parseInt(h) - i) + "px")
                } else {
                    $("#slider_touch").css("left", (parseInt(h) + i) + "px")
                }
                c.sliderTouchXY.startX = f
            });
            $("#slider").on("touchend",
            function (f) {
                if (c.sliderTouchXY.finishX != 0) {
                    if (c.sliderTouchXY.initX > c.sliderTouchXY.finishX) {
                        c.sliderImg()
                    } else {
                        if (c.sliderTouchXY.initX < c.sliderTouchXY.finishX) {
                            c.sliderImgIndex = c.sliderImgIndex - 2;
                            c.sliderImg()
                        }
                    }
                    c.sliderTouchXY.initX = 0;
                    c.sliderTouchXY.finishX = 0;
                    c.thread.openOne("slider", true)
                }
            })
        },
        themeImgInit: function (l) {
            var h = this;
            if (l.themeIdList) {
                if (M.object.isArray(l.themeIdList)) {
                    h.themeIdList = l.themeIdList
                } else {
                    if (M.object.isString(l.themeIdList)) {
                        h.themeIdList.push(l.themeIdList)
                    }
                }
                if (h.themeIdList.length > 0) {
                    for (var g = 0; g < h.themeIdList.length; g++) {
                        h.themeImgTimer[h.themeIdList[g]] = {};
                        h.themeImgTimer[h.themeIdList[g]].time = h.threadTime * (g + 1);
                        h.themeImgTimer[h.themeIdList[g]].imgArray = [];
                        h.themeImgTimer[h.themeIdList[g]].imgrun = false;
                        h.themeImgTimer[h.themeIdList[g]].rush = 0;
                        var c = 0;
                        var f = $("#" + h.themeIdList[g]).find("li");
                        for (var e = 0; e < f.length; e++) {
                            var m = $(f[e]).find("a").find("div").find("img");
                            var k = {
                                index: 0,
                                num: 0
                            };
                            if (m && m.length >= 2) {
                                c++;
                                k.num = m.length
                            }
                            h.themeImgTimer[h.themeIdList[g]].imgArray.push(k);
                            if (c > 0) {
                                h.themeImgTimer[h.themeIdList[g]].imgrun = true
                            }
                        }
                    }
                }
            }
        },
        themeImgRun: function (f) {
            var c = this;
            for (var j = 0; j < c.themeIdList.length; j++) {
                var e = c.themeIdList[j];
                var h = c.themeImgTimer[e];
                if (h.imgrun) {
                    var o = $("#" + e).find("li");
                    h.time = h.time - f;
                    if (h.time <= 0 && h.imgArray.length > 0) {
                        var g = h.imgArray;
                        var k = g[h.rush];
                        if (h.runing) { }
                        if (k.num > 1) {
                            var m = k.index;
                            var l = k.index + 1;
                            if (l >= k.num) {
                                l = 0
                            }
                            k.index = l;
                            var n = $(o[h.rush]).find("div").find("img");
                            $(n).eq(m).hide();
                            $(n).eq(l).fadeIn(200)
                        }
                        h.rush++;
                        if (h.rush == g.length) {
                            h.time = 5000;
                            h.rush = 0
                        }
                    }
                }
            }
        },
        themeImgRender: function () {
            var c = this;
            c.thread.addOne({
                name: "theme",
                event: c.themeImgRun,
                source: c
            })
        },
        seckillInit: function (e) {
            var c = this;
            if (e.seckill) {
                if (e.seckill.seckillTime && e.seckill.timeRemain) {
                    c.endTime = e.seckill.seckillTime;
                    c.timeRemain = e.seckill.timeRemain;
                    c.seckillTime = 1000;
                    c.seckillTimer()
                }
            }
        },
        seckillTimer: function () {
            var c = this;
            var e = M.localstorage.get("index_seckill");
            var l = 0;
            if (e) {
                e = e.split("_");
                var k = e[0];
                var o = parseInt(e[1], 10);
                var n = M.date.toDate(e[2]);
                var p = parseInt(e[3], 10);
                if (c.endTime == k && c.timeRemain == o) {
                    var f = new Date();
                    var j = parseInt((f.getTime() - n.getTime()) / 1000, 10);
                    l = p - j;
                    M.localstorage.set("index_seckill", c.endTime + "_" + c.timeRemain + "_" + M.date.toString(f, "yyyy-MM-dd HH:mm:ss") + "_" + l)
                } else {
                    var f = new Date();
                    l = c.timeRemain;
                    M.localstorage.set("index_seckill", c.endTime + "_" + c.timeRemain + "_" + M.date.toString(f, "yyyy-MM-dd HH:mm:ss") + "_" + l)
                }
            } else {
                var f = new Date();
                l = c.timeRemain = c.timeRemain - 1;
                M.localstorage.set("index_seckill", c.endTime + "_" + c.timeRemain + "_" + M.date.toString(f, "yyyy-MM-dd HH:mm:ss") + "_" + l)
            }
            if (l > 0) {
                var q = l % 60;
                var g = parseInt(l / 60, 10);
                var i = g % 60;
                var h = parseInt(g / 60, 10);
                if (h <= 0) {
                    $("#seckill_time").find("span").eq(0).text("0");
                    $("#seckill_time").find("span").eq(1).text("0")
                } else {
                    if (h > 99) {
                        $("#seckill_time").find("span").eq(0).text("9");
                        $("#seckill_time").find("span").eq(1).text("9")
                    } else {
                        if (h > 9 && h < 99) {
                            var h = h + "";
                            $("#seckill_time").find("span").eq(0).text(h[0]);
                            $("#seckill_time").find("span").eq(1).text(h[1])
                        } else {
                            var h = h + "";
                            $("#seckill_time").find("span").eq(0).text("0");
                            $("#seckill_time").find("span").eq(1).text(h[0])
                        }
                    }
                }
                if (i <= 0) {
                    $("#seckill_time").find("span").eq(3).text("0");
                    $("#seckill_time").find("span").eq(4).text("0")
                } else {
                    if (i > 9) {
                        i = i + "";
                        $("#seckill_time").find("span").eq(3).text(i[0]);
                        $("#seckill_time").find("span").eq(4).text(i[1])
                    } else {
                        $("#seckill_time").find("span").eq(3).text(0);
                        $("#seckill_time").find("span").eq(4).text(i)
                    }
                }
                if (q <= 0) {
                    $("#seckill_time").find("span").eq(6).text("0");
                    $("#seckill_time").find("span").eq(7).text("0")
                } else {
                    if (q > 9) {
                        q = q + "";
                        $("#seckill_time").find("span").eq(6).text(q[0]);
                        $("#seckill_time").find("span").eq(7).text(q[1])
                    } else {
                        $("#seckill_time").find("span").eq(6).text(0);
                        $("#seckill_time").find("span").eq(7).text(q)
                    }
                }
            } else {
                $("#seckill_time").find("span").eq(0).text("0");
                $("#seckill_time").find("span").eq(1).text("0");
                $("#seckill_time").find("span").eq(3).text("0");
                $("#seckill_time").find("span").eq(4).text("0");
                $("#seckill_time").find("span").eq(6).text("0");
                $("#seckill_time").find("span").eq(7).text("0")
            }
        },
        seckillRun: function (e) {
            var c = this;
            c.seckillTime = c.seckillTime - e;
            if (c.seckillTime == 0) {
                c.seckillTime = 1000;
                c.seckillTimer()
            }
        },
        seckillRender: function () {
            var c = this;
            c.thread.addOne({
                name: "seckill",
                event: c.seckillRun,
                source: c
            })
        },
        appBannerBind: function () {
            var c = this;
            if (c.hasAppBanner) {
                $("#index_banner").on("touchmove",
                function (e) {
                    if (e && e.preventDefault) {
                        e.preventDefault()
                    } else {
                        window.event.returnValue = false;
                        return false
                    }
                });
                $("#index_openApp").on("touchmove",
                function (e) {
                    if (e && e.preventDefault) {
                        e.preventDefault()
                    } else {
                        window.event.returnValue = false;
                        return false
                    }
                });
                $("#index_openWeb").on("touchmove",
                function (e) {
                    if (e && e.preventDefault) {
                        e.preventDefault()
                    } else {
                        window.event.returnValue = false;
                        return false
                    }
                });
                $("#index_openWeb").downloadAppPlugInClose("index_banner",
                function () {
                    $("#index_banner").attr("search_land_searchTransformation_show", "true");
                    c.fireworksLaod();
                    c.indexFloatLayerRunOpen = true
                });
                if ($("#index_banner").css("display") != "none") {
                    M.require("http://h5.m.jd.com/active/track/mping.min.js",
                    function () {
                        try {
                            var g = new MPing.inputs.Click("MDownLoadFloat_Expose_Virtual");
                            g.event_param = "";
                            var f = new MPing();
                            f.send(g)
                        } catch (h) {
                            M.log(d, "error")
                        }
                    })
                }
                $("#index_openApp").downloadAppPlugIn()
            } else {
                c.fireworksLaod();
                c.floatLayerRight()
            }
        },
        fireworksInit: function (c) {
            var e = this;
            e.fireworksLocalStorageKey = "fireworks_Date";
            e.fireworksleafId = "leafContainer";
            if (c && c.open) {
                e.fireworksPicWidht = 216;
                e.fireworksPicHheight = 297;
                e.fadeAndDropDuration = "7s";
                e.fireworksBalloonPlayTime = 10;
                e.fireworksBalloonDelayTime = 0;
                e.colourBarNum = 9;
                e.fireworksDir = c.dir;
                e.countImg = 0;
                e.fireworksImgArr = [e.fireworksDir + "/images/index/floatBg.png", e.fireworksDir + "/images/index/618-lihua1.png"];
                e.fireworksOpen = c.open
            }
        },
        fireworksLaod: function () {
            var j = this;
            var c = M.date.today();
            var h = M.localstorage.get(j.fireworksLocalStorageKey);
            if (j.fireworksOpen && h != c) {
                var g = 0;
                for (var e = 0; e < j.fireworksImgArr.length; e++) {
                    var f = new Image();
                    f.onload = function () {
                        var i = j;
                        i.countImg++;
                        if (i.countImg == i.fireworksImgArr.length) {
                            i.fireworksRun();
                            M.localstorage.set(i.fireworksLocalStorageKey, M.date.today())
                        }
                    };
                    f.src = j.fireworksImgArr[e]
                }
            }
        },
        fireworksCtreteStyle: function () {
            var l = this;
            var j = [];
            var c = $(window).width();
            var i = $(window).height();
            var g = (c - l.fireworksPicWidht) + "px";
            var e = -(i + l.fireworksPicHheight) / 2 + "px";
            var k = 0 + "px";
            var f = -(i + l.fireworksPicHheight + 80) + "px";
            j.push("<style>");
            j.push("@-webkit-keyframes drop {");
            j.push("0%   { -webkit-transform: translate3d(0px, -50px,0)}");
            j.push("50%  { -webkit-transform: translate3d(0px," + ((i + 225) * 0.8 + "px") + ",0)}");
            j.push("100% { -webkit-transform: translate3d(0px," + ((i + 225) + "px") + ",0); }");
            j.push("}");
            j.push("@keyframes drop {");
            j.push("0%   { transform: translate3d(0px, -50px,0)}");
            j.push("50%  {transform: translate3d(0px," + ((i + 235) * 0.8 + "px") + ",0)}");
            j.push("100% { transform: translate3d(0px," + ((i + 235) + "px") + ",0); }");
            j.push("}");
            j.push("@-webkit-keyframes moveUp {");
            j.push("0%{-webkit-transform: translate3d(0,0,0);}");
            j.push("50%{-webkit-transform: translate3d(" + g + "," + e + ",0)}");
            j.push("100%{-webkit-transform: translate3d(" + k + "," + f + ",0)}");
            j.push("}");
            j.push("@keyframes moveUp {");
            j.push("0%{transform: translate3d(0,0,0)}");
            j.push("50%{transform: translate3d(" + g + "," + e + ",0)}");
            j.push("100%{transform: translate3d(" + k + "," + f + ",0)}");
            j.push("}");
            j.push("</style>");
            return j.join("")
        },
        fireworksCreatColourBarDivHtml: function () {
            var c = this;
            var h = [];
            var n = $(window).width();
            for (var g = 0; g < c.colourBarNum; g++) {
                var f = c.fireworksRnd(1, 15);
                var k = c.fireworksRandomFloat(0, 3) + "s";
                var j = c.fireworksRandomFloat(0, 1) + "s";
                var l = (Math.random() < 0.5) ? "clockwiseSpin" : "counterclockwiseSpinAndFlip";
                var m = "animation-name:" + l + ";-webkit-animation-name:" + l + ";animation-delay:" + j + ";-webkit-animation-delay:" + j + ";";
                var e = "top:" + (-c.fireworksRnd(100, 110) + "px;") + "left:" + (c.fireworksRnd(0, n) + "px;") + "z-index:30;-webkit-animation-name:fade,drop;animation-name:fade,drop;animation-timing-function:ease-in;-webkit-animation-timing-function:ease-in;animation-duration:" + c.fadeAndDropDuration + ";-webkit-animation-duration:" + c.fadeAndDropDuration + ";animation-delay:" + k + ";-webkit-animation-delay:" + k + ";";
                h.push('<div style="' + e + '">');
                h.push('<span class="float-bg' + f + '" style="' + m + '">');
                h.push("</span>");
                h.push("</div>")
            }
            return h.join("")
        },
        fireworksBalloonHtml: function () {
            var f = this;
            var c = [];
            var e = "bottom:" + (-f.fireworksPicHheight + "px;") + "left:0;position:fixed;z-index:30;width:" + f.fireworksPicWidht + "px;height:" + f.fireworksPicHheight + "px;animation:moveUp " + f.fireworksBalloonPlayTime + "s " + f.fireworksBalloonDelayTime + "s;-webkit-animation:moveUp " + f.fireworksBalloonPlayTime + "s " + f.fireworksBalloonDelayTime + "s;";
            c.push('<div style="' + e + '">');
            c.push('<img src="' + f.fireworksDir + '/images/index/618-lihua1.png"width="' + f.fireworksPicWidht + '" height="' + f.fireworksPicHheight + '">');
            c.push("</div>");
            return c.join("")
        },
        fireworksRun: function () {
            var c = this;
            $("body").append('<div id="' + c.fireworksleafId + '"><div>');
            $("#" + c.fireworksleafId).append(c.fireworksCtreteStyle());
            $("#" + c.fireworksleafId).append(c.fireworksCreatColourBarDivHtml());
            $("#" + c.fireworksleafId).append(c.fireworksBalloonHtml());
            var e = setInterval(function () {
                $("#" + c.fireworksleafId).append(c.fireworksCreatColourBarDivHtml())
            },
            350);
            setTimeout(function () {
                clearInterval(e);
                setTimeout(function () {
                    $("#" + c.fireworksleafId).remove()
                },
                7000)
            },
            7000)
        },
        fireworksRnd: function (e, c) {
            return parseInt(Math.random() * (c - e) + e)
        },
        fireworksRandomFloat: function (e, c) {
            return e + Math.random() * (c - e)
        },
        floatLayerInit: function (c) {
            var e = this;
            if (c && c.url && $.trim(c.url) != "0") {
                e.floatUrl = c.url;
                e.indexFloatLayerId = "indexFloatLayer";
                e.indexFloatLayerRunOpen = false;
                e.indexFloatLayerRunTimer = 0
            }
        },
        floatLayerRender: function () {
            var c = this;
            if (c.floatUrl) {
                c.thread.addOne({
                    name: "floatLayer",
                    event: function () {
                        var f = this;
                        if (f.indexFloatLayerRunOpen) {
                            if ($("#" + f.indexFloatLayerId).css("transform") == "none" || $("#" + f.indexFloatLayerId).css("-webkit-transform") == "none" || $("#" + f.indexFloatLayerId).css("transform") == "" || $("#" + f.indexFloatLayerId).css("-webkit-transform") == "" || $("#" + f.indexFloatLayerId).css("transform") == "translateX(0px)" || $("#" + f.indexFloatLayerId).css("-webkit-transform") == "translateX(0px)") {
                                if (f.indexFloatLayerRunTimer > 12) {
                                    f.indexFloatLayerRunTimer = 0
                                }
                                f.indexFloatLayerRunTimer++;
                                if (f.indexFloatLayerRunTimer == 12) {
                                    var e = {
                                        transform: "translateX(40px)",
                                        "-webkit-transform": "translateX(40px)",
                                        "-webkit-transition": "0.2s ease 0s",
                                        transition: "0.2s ease 0s"
                                    };
                                    $("#" + f.indexFloatLayerId).css(e);
                                    setTimeout(function () {
                                        var g = {
                                            transform: "translateX(40px)",
                                            "-webkit-transform": "translateX(40px)",
                                            "-webkit-transition": "",
                                            transition: ""
                                        };
                                        $("#" + f.indexFloatLayerId).css(g)
                                    },
                                    200)
                                }
                            } else {
                                f.indexFloatLayerRunTimer = 0
                            }
                        }
                    },
                    source: c
                });
                c.floatLayerBind();
                $("#" + c.indexFloatLayerId).css("display", "block")
            }
        },
        floatLayerBind: function () {
            var c = this;
            if (c.floatUrl) {
                $("#" + c.indexFloatLayerId).on("click",
                function () {
                    var e = {
                        transform: "translateX(0px)",
                        "-webkit-transform": "translateX(0px)",
                        "-webkit-transition": "0.2s ease 0s",
                        transition: "0.2s ease 0s"
                    };
                    $("#" + c.indexFloatLayerId).css(e);
                    setTimeout(function () {
                        location.href = c.floatUrl
                    },
                    200)
                })
            }
        },
        toTopBind: function () {
            var c = this;
            $("#" + c.runtopId).on("click",
            function () {
                window.scrollTo(0, 1)
            })
        },
        recommendInit: function (e) {
            var c = this;
            if (e) {
                c.recommendPin = e.pin;
                c.recommendUesCached = e.useCached;
                c.recommendOpen = e.open;
                c.recommendPage = 0;
                c.recommendPageCount = 1;
                c.recommendListId = "recommendList";
                c.recommendListLoadId = "recommendListload";
                c.recommendListloadImg = "recommendListloadImg";
                c.recommendListLoadMoreBtn = "recommendListLoadMoreBtn";
                c.recommendCanLoad = true;
                c.recommendloadHeight = 0
            }
        },
        recommendLoadData: function () {
            var i = this;
            if (i.recommendCanLoad && i.recommendPageCount >= (i.recommendPage + 1)) {
                i.recommendCanLoad = false;
                $("#" + i.recommendListLoadId).css("display", "block;");
                $("#" + i.recommendListloadImg).css("display", "block;");
                $("#" + i.recommendListLoadMoreBtn).css("display", "none;");
                var e = "indexRecommendData";
                var h = null;
                if (i.recommendUesCached) {
                    var f = M.localstorage.get(e);
                    f = JSON.parse(f);
                    if (f && f.length == 2) {
                        if (i.recommendPin) {
                            h = f[1];
                            if (h.length >= (i.recommendPage + 1)) {
                                h = h[i.recommendPage]
                            } else {
                                h = null
                            }
                        } else {
                            h = f[0];
                            if (h.length >= (i.recommendPage + 1)) {
                                h = h[i.recommendPage]
                            } else {
                                h = null
                            }
                        }
                        if (!h || (new Date().getTime() - h.updateTime) > (4 * 60 * 60 * 1000) || h.pin != i.recommendPin) {
                            h = null
                        }
                    } else {
                        var j = JSON.stringify([[], []]);
                        M.localstorage.set(e, j)
                    }
                } else {
                    M.localstorage.remove(e)
                }
                if (h == null) {
                    M.http.ajax({
                        url: "/index/recommend.action",
                        data: "_format_=json&page=" + (i.recommendPage + 1),
                        success: function (m) {
                            var n = false;
                            var p = false;
                            if (m && m.recommend) {
                                try {
                                    h = JSON.parse(m.recommend)
                                } catch (r) {
                                    M.log(r, "error");
                                    h = null
                                }
                                if (h && h.recommendList && h.recommendList.length > 0) {
                                    if (i.recommendPage == 0) {
                                        var l = i.recommendMainHtml(h);
                                        $("#" + i.runtopId).before(l);
                                        i.recommendBind()
                                    }
                                    var q = i.recommendListHtml(h);
                                    $("#" + i.recommendListId).append(q);
                                    i.calculationRecommendImg();
                                    if (i.recommendUesCached) {
                                        h.updateTime = new Date().getTime();
                                        h.pin = i.recommendPin;
                                        var o = M.localstorage.get(e);
                                        o = JSON.parse(o);
                                        if (o && M.object.isArray(o)) {
                                            if (i.recommendPin) {
                                                if (o[1].length >= (i.recommendPage + 1)) {
                                                    o[1][i.recommendPage] = h
                                                } else {
                                                    o[1].push(h)
                                                }
                                            } else {
                                                if (o[0].length >= (i.recommendPage + 1)) {
                                                    o[0][i.recommendPage] = h
                                                } else {
                                                    o[0].push(h)
                                                }
                                            }
                                        }
                                        M.localstorage.set(e, JSON.stringify(o))
                                    }
                                    i.recommendPageCount = h.totalPage;
                                    i.recommendPage++;
                                    var s = M.url.getParam("recommend");
                                    if (s == "1" && i.recommendPage == 1) {
                                        M.url.setHash("recommend");
                                        window.location = window.location
                                    }
                                    i.imgLazyLad.lazyLad();
                                    i.recommendloadHeight = $("body").height() - $("#" + i.recommendListId).find("li").eq(0).height() * 4;
                                    if (i.recommendPage % 3 == 0 && i.recommendPage < i.recommendPageCount) {
                                        n = true
                                    } else {
                                        n = false
                                    }
                                    p = true
                                }
                            }
                            if (p) {
                                if (n) {
                                    $("#" + i.recommendListLoadId).css("display", "block;");
                                    $("#" + i.recommendListloadImg).css("display", "none;");
                                    $("#" + i.recommendListLoadMoreBtn).css("display", "block;")
                                } else {
                                    $("#" + i.recommendListLoadId).css("display", "none;");
                                    $("#" + i.recommendListloadImg).css("display", "none;");
                                    $("#" + i.recommendListLoadMoreBtn).css("display", "none;");
                                    i.recommendCanLoad = true
                                }
                            } else {
                                i.recommendloadHeight = $("body").height() - $("#" + i.recommendListId).find("li").eq(0).height() * 4;
                                i.recommendCanLoad = false;
                                $("#" + i.recommendListLoadId).css("display", "none;");
                                $("#" + i.recommendListloadImg).css("display", "none;");
                                $("#" + i.recommendListLoadMoreBtn).css("display", "none;")
                            }
                        },
                        error: function () {
                            i.recommendloadHeight = $("body").height() - $("#" + i.recommendListId).find("li").eq(0).height() * 4;
                            i.recommendCanLoad = false;
                            $("#" + i.recommendListLoadId).css("display", "none;");
                            $("#" + i.recommendListloadImg).css("display", "none;");
                            $("#" + i.recommendListLoadMoreBtn).css("display", "none;")
                        }
                    })
                } else {
                    if (i.recommendPage == 0) {
                        var c = i.recommendMainHtml(h);
                        $("#" + i.runtopId).before(c);
                        i.recommendBind()
                    }
                    var g = i.recommendListHtml(h);
                    $("#" + i.recommendListId).append(g);
                    i.calculationRecommendImg();
                    var k = M.url.getParam("recommend");
                    i.recommendPageCount = h.totalPage;
                    i.recommendPage++;
                    i.recommendloadHeight = $("body").height() - $("#" + i.recommendListId).find("li").eq(0).height() * 4;
                    if (k == "1" && i.recommendPage == 1) {
                        M.url.setHash("recommend");
                        window.location = window.location
                    }
                    i.imgLazyLad.lazyLad();
                    if (i.recommendPage % 3 == 0 && i.recommendPage < i.recommendPageCount) {
                        $("#" + i.recommendListLoadId).css("display", "block;");
                        $("#" + i.recommendListloadImg).css("display", "none;");
                        $("#" + i.recommendListLoadMoreBtn).css("display", "block;")
                    } else {
                        $("#" + i.recommendListLoadId).css("display", "none;");
                        $("#" + i.recommendListloadImg).css("display", "none;");
                        $("#" + i.recommendListLoadMoreBtn).css("display", "none;");
                        i.recommendCanLoad = true
                    }
                }
            }
        },
        recommendMainHtml: function (k) {
            var j = this;
            var h = [];
            if (k && k.recommendList && k.recommendList.length > 0) {
                h.push('<div id="recommend" class="floor love-floor" id="love-floorID">');
                var f = j.recommendPin ? "login-succeed" : "login-before";
                var e = j.recommendPin ? "登录成功！为您推荐" : "登录后更懂你";
                var i = window.location.href + "?recommend=1";
                i = i.split("?")[0];
                i = i + "?recommend=1";
                var g = j.recommendPin ? "" : 'class="J_ping" report-eventid="MHomeGuessYouLike_Login"  page_name="index"';
                var c = j.recommendPin ? "javascript:void(0)" : "https://passport.m.jd.com/user/login.action?returnurl=" + i;
                h.push('<h2 style="padding-bottom: 0px;" class="love-floor-title ' + f + '">');
                h.push("猜你喜欢");
                h.push("<a " + g + ' href="' + c + '">');
                h.push('<i class="love-right-icon"></i>');
                h.push('<span id="love-login-info" class="love-login">' + e + "</span>");
                h.push('<i class="love-login-icon"></i>');
                h.push("</a>");
                h.push("</h2>");
                h.push('<ul class="love-list" id="' + j.recommendListId + '">');
                h.push("</ul>");
                h.push('<div style="clear: left;"></div>');
                h.push('<div style="display: none;" class="swipe-up love-loading" id="' + j.recommendListLoadId + '">');
                h.push('<div class="swipe-up-wrapper ">');
                h.push('<div style="display: none;" id="' + j.recommendListloadImg + '" class="loading-con">');
                h.push('<span class="pagenum" id="showPageID"></span>');
                h.push('<span class="loading"><i class="love-loading-icon">加载中...</i></span>');
                h.push('<div class="clear"></div>');
                h.push("</div>");
                h.push('<div style="display: none;" id="' + j.recommendListLoadMoreBtn + '" class="click-loading"><a href="javascript:void(0);">点击继续加载</a></div>');
                h.push("</div>");
                h.push("</div>");
                h.push("</div>")
            }
            return h.join("")
        },
        recommendListHtml: function (g) {
            var f = this;
            var e = [];
            if (g && g.recommendList && g.recommendList.length > 0) {
                for (var c = 0; c < g.recommendList.length; c++) {
                    e.push('<li class="love-item"><a class="J_ping" report-eventid="MHomeGuessYouLike_Products"  report-eventparam="' + (f.recommendPage * 20 + c + 1) + "_" + g.recommendList[c].wareId + '_1" page_name="index" href="http://item.m.jd.com/product/' + g.recommendList[c].wareId + '.html">');
                    e.push('<div class="love-item-pic"><img src="/images/index/m-home-pic.png" imgsrc="' + g.recommendList[c].imageurl + '" ></div>');
                    e.push('<div class="love-item-title"><span>' + g.recommendList[c].wname + "</span></div>");
                    e.push("</a>");
                    e.push('<div class="love-item-bottom">');
                    e.push('<span class="love-item-price">￥<i>' + g.recommendList[c].jdPrice + "</i></span>");
                    e.push('<a class="J_ping" report-eventid="MHomeGuessYouLike_Similarities"  report-eventparam="' + (f.recommendPage * 20 + c + 1) + "_" + g.recommendList[c].wareId + '_1" page_name="index" href="/index/lookSimilar.action?wid=' + g.recommendList[c].wareId + '"><span class="love-item-icon">看相似</span></a>');
                    e.push("</div>");
                    e.push("</li>")
                }
            }
            return e.join("")
        },
        recommendBind: function () {
            var c = this;
            if (c.recommendOpen) {
                $("#" + c.recommendListLoadMoreBtn).on("click",
                function () {
                    c.recommendCanLoad = true;
                    c.recommendLoadData()
                })
            }
        },
        recommendRender: function () {
            var c = this;
            if (c.recommendOpen) {
                c.recommendLoadData()
            }
        },
        calculationRecommendImg: function () {
            var e = this;
            var c = $("body").width();
            $("#" + e.recommendListId).find("img").forEach(function (g, f) {
                var h = $(g).parent().width();
                $(g).css({
                    width: h,
                    height: h
                })
            })
        },
        resizeFunction: function () {
            var f = this;
            var e = "onorientationchange" in window;
            var c = e ? "orientationchange" : "resize";
            $(window).on(c,
            function () {
                f.sliderSetUlWidth();
                f.sliderImg();
                f.sliderTime = 0;
                f.computeHigthReSize();
                if (f.recommendOpen && f.recommendCanLoad) {
                    f.recommendloadHeight = $("body").height() - $("#" + f.recommendListId).find("li").eq(0).height() * 4
                }
                f.calculationRecommendImg()
            })
        },
        scrollFunction: function () {
            var c = this;
            $(window).scroll(function () {
                if ($(window).scrollTop() >= $(window).height()) {
                    $("#" + c.runtopId).show()
                } else {
                    $("#" + c.runtopId).hide()
                }
                if (c.recommendOpen) {
                    if (c.recommendCanLoad && $(window).scrollTop() >= c.recommendloadHeight) {
                        c.recommendLoadData()
                    }
                }
                c.imgLazyLad.lazyLad()
            })
        },
        run: function () {
            var c = this;
            if (c.sliderImgList && c.sliderImgList.length > 1) {
                c.sliderRender()
            }
            if (c.themeIdList && c.themeIdList.length > 0) {
                c.themeImgRender()
            }
            if (c.endTime) {
                c.seckillRender()
            }
            c.appBannerBind();
            c.floatLayerRender();
            c.resizeFunction();
            c.scrollFunction();
            c.toTopBind();
            c.searchLand.render();
            c.recommendRender();
            c.thread.start();
            c.imgLazyLad.lazyLad()
        }
    });
    a.clazz = b
});
M.define("Imglazyload",
function (a) {
    var b = function (c) { };
    M.object.merge(b.prototype, {
        lazyLad: function () {
            var j = $(window).height();
            var h = $("img[imgsrc]");
            var g = $(window).scrollTop();
            for (var e = 0,
            c = h.size() ; e < c; e++) {
                currentObj = $(h[e]);
                var f = currentObj.offset().top - j - 200;
                if (parseInt(g) >= parseInt(f)) {
                    currentObj.attr("src", currentObj.attr("imgsrc"));
                    currentObj.removeAttr("imgsrc")
                }
            }
        }
    });
    a.clazz = b
});
M.define("thread",
function (a) {
    var b = function (c) {
        this.init(c)
    };
    M.object.merge(b.prototype, {
        init: function (e) {
            this.eventState = this.eventState || {};
            this.eventList = [];
            this.closeList = [];
            this.openList = [];
            this.time = 1000;
            if (M.object.isObject(e)) {
                if (e.time && M.object.isNumber(e.time)) {
                    this.time = e.time
                }
                this.isStart = false;
                if (e.eventList && M.object.isArray(e.eventList)) {
                    this.eventList = e.eventList
                }
                if (this.eventList.length > 0) {
                    for (var c = 0; c < this.eventList.length; c++) {
                        if (this.eventList[c].name) {
                            this.eventState[this.eventList[c].name] = true
                        } else {
                            throw new Error("one eventName is null")
                        }
                    }
                }
            }
        },
        call: function () {
            var e = this;
            if (e.eventList.length > 0) {
                for (var c = 0; c < e.eventList.length; c++) {
                    if (e.eventList[c] && e.eventList[c].event) {
                        if (e.eventState[e.eventList[c].name]) {
                            e.runFunction(e.eventList[c]);
                            e.runObject(e.eventList[c])
                        }
                    }
                }
                for (var c = 0; c < e.closeList.length; c++) {
                    e.eventState[e.closeList[c]] = false
                }
                for (var c = 0; c < e.openList.length; c++) {
                    e.eventState[e.openList[c]] = true
                }
                e.openList = [];
                e.closeList = []
            }
            if (!e.stopThread) {
                e.threadId = setTimeout(function () {
                    e.isStart = true;
                    e.call()
                },
                e.time)
            }
        },
        runFunction: function (f) {
            var e = this;
            if (M.object.isFunction(f.event)) {
                var c = null;
                if (f.source) {
                    c = f.source
                }
                if (f.name) {
                    e.eventState[f.name] = true
                }
                f.event.call(c, e.time)
            }
        },
        runObject: function (f) {
            var e = this;
            if (M.object.isObject(f.event)) {
                var c = null;
                if (f.source) {
                    c = f.source
                }
                if (M.object.isObject(f.event) && M.object.isFunction(f.event.go)) {
                    f.event.go.call(c, e.time)
                }
            }
        },
        start: function () {
            var c = this;
            if (!c.isStart) {
                c.threadId = setTimeout(function () {
                    c.isStart = true;
                    c.call()
                },
                c.time)
            }
        },
        openOne: function (c, f) {
            var g = this;
            if (!M.object.isDefined(g.eventState[c]) && !g.eventState[c]) {
                if (!f) {
                    g.eventState[c] = true
                } else {
                    if (g.getOpenListIndex(c) == -1) {
                        g.openList.push(c);
                        var e = g.getOpenListIndex(c);
                        if (e > 0) {
                            g.openList.splice(e, 1)
                        }
                    }
                }
            }
        },
        closeOne: function (c, f) {
            var g = this;
            if (!M.object.isDefined(g.eventState[c]) && g.eventState[c]) {
                if (!f) {
                    g.eventState[c] = false
                } else {
                    if (g.getCloseListIndex(c) != -1) {
                        g.closeList.push(c);
                        var e = g.getCloseListIndex(c);
                        if (e > 0) {
                            g.closeList.splice(e, 1)
                        }
                    }
                }
            }
        },
        addOne: function (e, c) {
            var f = this;
            if (M.object.isObject(e)) {
                if (M.object.isObject(e) && e.name) {
                    if (!c) {
                        f.eventState[e.name] = true
                    } else {
                        f.eventState[e.name] = false;
                        f.openList.push(e.name)
                    }
                    f.eventList.push(e)
                }
            }
        },
        getCloseListIndex: function (e) {
            var g = this;
            var c = -1;
            for (var f = 0; f < g.closeList.length; f++) {
                if (g.closeList[f] == e) {
                    c = f;
                    break
                }
            }
            return c
        },
        getOpenListIndex: function (e) {
            var g = this;
            var c = -1;
            for (var f = 0; f < g.openList.length; f++) {
                if (g.openList[f] == e) {
                    c = f;
                    break
                }
            }
            return c
        },
        stop: function () {
            var c = this;
            if (!c.isStart) {
                clearTimeout(c.threadId);
                c.stopThread = true
            }
        }
    });
    a.clazz = b
});
M.define("searchland",
function (a) {
    var b = function (c) {
        this.init(c)
    };
    M.object.merge(b.prototype, {
        init: function (e) {
            this.searchHistoryLocalStorageName = "searchhistory";
            this.formId = e.formId ? e.formId : "";
            this.submitId = e.submitId ? e.submitId : "";
            this.catelogyListId = e.catelogyListId ? e.catelogyListId : "";
            this.isHome = e.isHome ? e.isHome : false;
            this.closeSearchLandBtnId = e.closeSearchLandBtnId ? e.closeSearchLandBtnId : "";
            this.claerKeywordBtnId = e.claerKeywordBtnId ? e.claerKeywordBtnId : "";
            this.keywordId = e.keywordId ? e.keywordId : "";
            this.searchPanelId = e.searchPanelId ? e.searchPanelId : "";
            this.keyword = e.keyword ? e.keyword : "";
            this.keyword = M.string.decodeHtml(this.keyword);
            this.oldkeyword = null;
            var c = "searchhistory_";
            this.controlId = M.genId(c);
            this.hotKeyWordId = M.genId(c);
            this.changeHotKeyWordId = M.genId(c);
            this.hotKeyWordheadId = M.genId(c);
            this.hotKeyWordBtnIds = [];
            this.clearHistoryId = M.genId(c);
            this.hotKeyword = e.hotKeyword ? e.hotKeyword : null;
            this.landSearchWordHide = e.landSearchWordHide ? true : false;
            this.hotKeywordIndex = 0;
            this.openSearchLoad = false;
            this.searchliIdList = [];
            this.searchLoop = false;
            this.showFuncObj = e.showFuncObj ? e.showFuncObj : null;
            this.hideFuncObj = e.hideFuncObj ? e.hideFuncObj : null;
            if (this.keyword != "") {
                $("#" + this.keywordId).val(this.keyword);
                $("#" + this.keywordId).addClass("hilight1")
            }
        },
        searchLoadControl: function () {
            var e = this;
            var c = $("#" + e.keywordId).val().trim();
            if (c == "" && e.searchLoop) {
                e.searchLoadFromHistory();
                $("#" + e.claerKeywordBtnId).css({
                    display: "none"
                })
            } else {
                if (c != "" && e.oldkeyword != c && e.searchLoop) {
                    e.searchLoadFromKeyword(c);
                    $("#" + e.claerKeywordBtnId).css({
                        display: "block"
                    })
                }
            }
            setTimeout(function () {
                e.searchLoadControl()
            },
            500)
        },
        searchLoadFromHistory: function () {
            var f = this;
            f.searchLoop = false;
            if (!f.searchLocalStorage) {
                var c = M.localstorage.get(f.searchHistoryLocalStorageName);
                if (c && c.length > 0 && f.openSearchLoad) {
                    c = decodeURIComponent(c);
                    var e = c.split("|");
                    f.searchLandUnbind();
                    $("#" + f.controlId).html(f.searchLandLiHtml(e));
                    $("#" + f.clearHistoryId).parent().css({
                        display: "block;"
                    });
                    f.searchLandBind(true);
                    f.tipArray = e;
                    $("#" + f.controlId).removeClass("jd-auto-complete");
                    $("#" + f.controlId).children("li").css({
                        display: "block"
                    });
                    f.searchLoop = true
                } else {
                    $("#" + f.controlId).html("");
                    f.searchLoop = true
                }
                $("#" + f.hotKeyWordId).show();
                $("#" + f.hotKeyWordheadId).show()
            } else {
                if (f.openSearchLoad) {
                    f.searchLoop = true
                }
            }
            f.searchLocalStorage = true
        },
        searchLoadFromKeyword: function (c) {
            var e = this;
            e.searchLoop = false;
            e.oldkeyword = c;
            e.searchLocalStorage = false;
            M.http.ajax({
                url: "/ware/searchSuggestion.action",
                data: {
                    keyword: c,
                    _format_: "json"
                },
                success: function (g) {
                    if (g && g.searchTipList && e.openSearchLoad) {
                        var f = $.parseJSON(g.searchTipList);
                        if (f.length > 0) {
                            e.searchLandUnbind();
                            $("#" + e.hotKeyWordId).hide();
                            $("#" + e.hotKeyWordheadId).hide();
                            $("#" + e.controlId).html(e.searchLandLiHtml(f));
                            $("#" + e.controlId).addClass("jd-auto-complete");
                            e.searchLandBind(false);
                            e.tipArray = f;
                            $("#" + e.clearHistoryId).parent().css({
                                display: "none;"
                            });
                            $("#" + e.controlId).children("li").css({
                                display: "block"
                            })
                        }
                        e.searchLoop = true
                    } else {
                        if (e.openSearchLoad) {
                            e.searchLoop = true
                        }
                    }
                },
                error: function (f) {
                    if (e.openSearchLoad) {
                        e.searchLoop = true
                    }
                }
            })
        },
        searchLandLiHtml: function (f) {
            var g = this;
            g.searchliIdList = [];
            var j = [];
            for (var e = 0; e < f.length; e++) {
                var k = "searchland_li_" + e;
                g.searchliIdList.push(k);
                var h = "";
                var c = "&nbsp;";
                if (M.object.isObject(f[e])) {
                    h = f[e].text;
                    if (f[e].otherAttr.tipNumber) {
                        c = f[e].otherAttr.tipNumber
                    }
                } else {
                    h = f[e]
                }
                j.push('<li style="display:none;" id="' + k + '" searchland_index="' + e + '"><a href="javascript:void(0);"><span>' + h + "</span></a></li>")
            }
            return j.join("")
        },
        searchLandLiFade: function () {
            var e = this;
            var c = 0;
            e.searchLandLiRecursiveFade(c, e.searchliIdList.length)
        },
        searchLandLiRecursiveFade: function (c, e) {
            var f = this;
            if (c < e) {
                $("#" + f.searchliIdList[c]).fadeIn(10,
                function () {
                    var g = c + 1;
                    f.searchLandLiRecursiveFade(g, e)
                })
            } else {
                f.searchLoop = true
            }
        },
        searchLandUnbind: function () {
            var f = this;
            if (f.searchliIdList && f.searchliIdList.length > 0) {
                for (var e = 0,
                c = f.searchliIdList.length; e < c; e++) {
                    $("#" + f.searchliIdList[e]).off("click")
                }
            }
        },
        searchLandBind: function (c) {
            var g = this;
            if (g.searchliIdList.length > 0) {
                var f = c;
                for (var e = 0; e < g.searchliIdList.length; e++) {
                    $("#" + g.searchliIdList[e]).on("click",
                    function () {
                        var h = $(this).attr("searchland_index");
                        var i = g.tipArray[h];
                        g.sendMping((f ? "MSearch_HistoryRecords" : "MSearch_SearchDropDownAssociationalWords"));
                        g.searchLandSubmit(i)
                    })
                }
            }
        },
        searchLandSubmit: function (f) {
            var e = this;
            var c = null;
            if (M.object.isObject(f)) {
                c = $.parseJSON(f.value)
            } else {
                c = {};
                c.keyword = f
            }
            $("#" + e.keywordId).val(c.keyword);
            c.catelogyList && $("#" + e.catelogyListId).val(JSON.stringify(c.catelogyList));
            e.searchLandAddHistory(c.keyword);
            $("#" + e.formId).submit();
            e.searchLoop = false
        },
        searchLandAddHistory: function (m) {
            var l = this;
            if ($.trim(m).length > 0 && $.trim(m) != "") {
                m = $.trim(m);
                var k = "";
                var h = M.localstorage.get(l.searchHistoryLocalStorageName);
                var f = 0;
                if (h != null) {
                    m = l.makeSearchName(m);
                    var c = [m];
                    h = decodeURIComponent(h);
                    var j = h.split("|");
                    for (var e = 0; e < j.length; e++) {
                        if (f == 14) {
                            break
                        }
                        if (j[e] != m) {
                            c.push(j[e])
                        }
                        f++
                    }
                    k = c.join("|")
                } else {
                    var c = m;
                    k = c
                }
                M.localstorage.set(l.searchHistoryLocalStorageName, encodeURIComponent(k))
            }
        },
        makeSearchName: function (c) {
            if (c.length >= 30) {
                c = c.substring(0, 30)
            }
            return c
        },
        clearHistory: function () {
            var c = this;
            M.localstorage.remove(c.searchHistoryLocalStorageName)
        },
        searchTransformation: function () {
            var g = this;
            if (!g.openSearchLoad) {
                $("body").removeClass("hide-landing");
                $("body").addClass("show-landing");
                $("body").addClass("history-color");
                var c = $("body").children("div");
                for (var e = 0; e < c.length; e++) {
                    if ($(c[e]).attr("id") != "search_land_searchland" && !$(c[e]).attr("search_land_searchTransformation_show")) {
                        $(c[e]).css("display", "none")
                    }
                }
                $("body").children("footer").css("display", "none");
                if (g.showFuncObj && g.showFuncObj.func) {
                    var f = g.showFuncObj.source ? g.showFuncObj.source : null;
                    g.showFuncObj.func.call(f)
                }
                $("#" + g.searchPanelId).removeClass("on-blur");
                $("#" + g.searchPanelId).addClass("on-focus");
                window.scrollTo(0, 1);
                g.openSearchLoad = true;
                g.searchLoop = true
            } else {
                $("body").removeClass("show-landing");
                $("body").removeClass("history-color");
                $("body").addClass("hide-landing");
                var c = $("body").children("div");
                for (var e = 0; e < c.length; e++) {
                    if ($(c[e]).attr("id") != "search_land_searchland" && !$(c[e]).attr("search_land_searchTransformation_show")) {
                        $(c[e]).css("display", "block")
                    }
                }
                $("body").children("footer").css("display", "block");
                if (g.hideFuncObj && g.hideFuncObj.func) {
                    var f = g.hideFuncObj.source ? g.hideFuncObj.source : null;
                    g.hideFuncObj.func.call(f)
                }
                g.openSearchLoad = false;
                g.searchLoop = false;
                g.searchLocalStorage = false;
                g.oldkeyword = "";
                $("#" + g.controlId).html("");
                $("#" + g.searchPanelId).removeClass("on-focus");
                $("#" + g.searchPanelId).addClass("on-blur");
                $("#" + g.hotKeyWordId).show();
                $("#" + g.hotKeyWordheadId).show()
            }
        },
        searchLandHotKeywordRecursiveFade: function (c, h, e, g) {
            var j = this;
            if (e < g) {
                for (var f = e; f < g; f++) {
                    if (f <= 2) {
                        $(c[f]).parent().addClass("tab-item-1")
                    } else {
                        $(c[f]).parent().addClass("tab-item-2")
                    }
                }
                setTimeout(function () {
                    for (var k = e; k < g; k++) {
                        if (k <= 2) {
                            $(c[k]).text(h[k])
                        }
                    }
                },
                310);
                setTimeout(function () {
                    for (var k = e; k < g; k++) {
                        if (k <= 2) {
                            $(c[k]).parent().removeClass("tab-item-1")
                        }
                    }
                },
                500);
                setTimeout(function () {
                    for (var k = e; k < g; k++) {
                        if (k > 2) {
                            $(c[k]).text(h[k])
                        }
                    }
                },
                410);
                setTimeout(function () {
                    for (var k = e; k < g; k++) {
                        if (k > 2) {
                            $(c[k]).text(h[k]);
                            $(c[k]).parent().removeClass("tab-item-2")
                        }
                    }
                },
                750)
            }
        },
        mainHtml: function () {
            var f = this;
            var e = [];
            e.push('<div id="search_land_searchland" class="search-lading-area">');
            if (f.hotKeyword && f.hotKeyword.length > 0) {
                e.push('<div id="' + f.hotKeyWordheadId + '" class="hot-search-bar"><strong>热搜</strong><span id="' + f.changeHotKeyWordId + '"><i></i>换一批</span></div>');
                e.push('<div id="' + f.hotKeyWordId + '" class="landing-tags">');
                for (var c = 0; c < 6 && c < f.hotKeyword.length; c++) {
                    f.hotKeywordIndex = c;
                    var g = "hotKeyWordBtn_" + c;
                    f.hotKeyWordBtnIds.push(g);
                    e.push('<a id="' + g + '" href="javascript:void(0);"><span>' + f.hotKeyword[c] + "</span></a>")
                }
            }
            e.push("</div>");
            e.push('<ul id="' + f.controlId + '" class="landing-keywords">');
            e.push("</ul>");
            e.push('<div class="landing-clear" style="display:none;"><span id="' + f.clearHistoryId + '">清空历史搜索</span></div>');
            e.push("</div>");
            return e.join("")
        },
        sendMping: function (f) {
            try {
                var g = new MPing.inputs.Click(f);
                g.event_param = "";
                var c = new MPing();
                c.send(g)
            } catch (h) { }
        },
        render: function () {
            var e = this;
            var f = $("#footer").length > 0 ? $("#footer") : $("footer");
            $(f).before(e.mainHtml());
            $("body").addClass((e.isHome ? "mhome" : "mlist"));
            $("body").addClass("hide-landing");
            $("#" + e.keywordId).on("click",
            function (h) {
                var g = null;
                if (e.isHome) {
                    if (e.openSearchLoad) {
                        g = "MSearch_Search"
                    } else {
                        g = "MHome_Search"
                    }
                } else {
                    g = "MProductList_Search"
                }
                e.sendMping(g);
                if (!e.openSearchLoad) {
                    if (e.landSearchWordHide) {
                        $("#" + e.keywordId).val("")
                    } else {
                        $("#" + e.keywordId).val(e.keyword)
                    }
                    e.searchTransformation()
                }
            });
            $("#" + e.keywordId).on("keydown",
            function (h) {
                if (h.keyCode == "13") {
                    var g = $.trim($("#" + e.keywordId).val());
                    if (g != "") {
                        e.sendMping("MSearch_Searchthi");
                        e.searchLandSubmit(g)
                    }
                }
                return
            });
            $("#" + e.closeSearchLandBtnId).on("click",
            function () {
                if (e.openSearchLoad) {
                    e.searchTransformation();
                    $("#" + e.keywordId).val(e.keyword);
                    $("#" + this.keywordId).addClass("hilight1")
                }
            });
            $("#" + e.clearHistoryId).on("click",
            function () {
                e.sendMping("MSearch_ClearHistory");
                e.clearHistory();
                $("#" + e.controlId).html("");
                $("#" + e.clearHistoryId).parent().css({
                    display: "none;"
                })
            });
            $("#" + e.submitId).on("click",
            function () {
                var h = $.trim($("#" + e.keywordId).val());
                if (h != "") {
                    var g = null;
                    if (e.isHome) {
                        if (e.openSearchLoad) {
                            g = "MSearch_SearchButton"
                        } else {
                            g = "MHome_SearchButton"
                        }
                    } else {
                        g = "MSearch_SearchButton"
                    }
                    e.sendMping(g);
                    e.searchLandSubmit(h)
                }
            });
            $("#" + e.claerKeywordBtnId).on("click",
            function () {
                $("#" + e.keywordId).val("");
                $(this).css({
                    display: "none;"
                })
            });
            $("#" + e.keywordId).on("keyup",
            function () {
                if ($(this).val() != e.keyword) {
                    $(this).removeClass("hilight1");
                    $(this).addClass("hilight2")
                } else {
                    $(this).removeClass("hilight2");
                    $(this).addClass("hilight1")
                }
            });
            if (e.hotKeyWordBtnIds.length > 0) {
                for (var c = 0; c < e.hotKeyWordBtnIds.length; c++) {
                    $("#" + e.hotKeyWordBtnIds[c]).on("click",
                    function () {
                        var g = $.trim($(this).find("span").text());
                        if (g != "") {
                            e.sendMping("MSearch_HotWords");
                            e.searchLandSubmit(g)
                        }
                    })
                }
            }
            if (e.hotKeyword && e.hotKeyword.length > 0) {
                $("#" + e.changeHotKeyWordId).on("click",
                function () {
                    var h = 0;
                    var l = [];
                    for (var k = e.hotKeywordIndex + 1,
                    g = k + 6; k < g && k < e.hotKeyword.length; k++) {
                        h++;
                        e.hotKeywordIndex = k;
                        l.push(e.hotKeyword[k])
                    }
                    if (h < 6) {
                        for (var k = 0,
                        g = 6 - h; k < g && k < e.hotKeyword.length; k++) {
                            h++;
                            e.hotKeywordIndex = k;
                            l.push(e.hotKeyword[k])
                        }
                    }
                    var m = $("#" + e.hotKeyWordId).children().find("span");
                    $("#" + e.hotKeyWordheadId).addClass("rotate");
                    setTimeout(function () {
                        $("#" + e.hotKeyWordheadId).removeClass("rotate")
                    },
                    500);
                    e.sendMping("MSearch_ChangeKeyWords");
                    e.searchLandHotKeywordRecursiveFade(m, l, 0, h)
                })
            }
            e.searchLoadControl()
        }
    });
    a.clazz = b
});