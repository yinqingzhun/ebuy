/*
功能：加载图片插件
开发：王亮
QQ：173666330
时间：2015-06-09
*/

/*默认值*/
Object.extend = function (destination, source) {
    if (!destination) return source;
    for (var property in source) {
        if (!destination[property]) {
            destination[property] = source[property];
        }
    }
    return destination;
};

//去重复
Array.prototype.distinct = function (options) {
    var setting = {
        contrast: function (json, i) { //判断表达式
            return !json[this[i]];
        },
        add: function (json, i) {
            json[this[i]] = 1;
        }
    }

    options = Object.extend(options, setting);

    var res = [];
    var json = {};

    for (var i = 0; i < this.length; i++) {
        if (this[i] && options.contrast.call(this, json, i)) {
            res.push(this[i]);
            options.add && options.add.call(this, json, i);
        }
    }
    return res;
}

//样式查找
document.deepCss = function (who, css) {
    if (!who || !who.style) return '';
    var sty = css.replace(/\-([a-z])/g, function (a, b) {
        return b.toUpperCase();
    });
    if (who.currentStyle) {
        return who.style[sty] || who.currentStyle[sty] || '';
    }
    var dv = document.defaultView || window;
    return who.style[sty] ||
    dv.getComputedStyle(who, "").getPropertyValue(css) || '';
};


//图片预加载
window.preload = function (options) {
    var setting = {
        progress: null,
        complete: null,
        fliterImg: function () {
            return $('img');
        }
    };
    options = Object.extend(options, setting);

    function getallBgimages() {
        var url, B = [], A = document.getElementsByTagName('*');
        A = B.slice.call(A, 0, A.length);
        while (A.length) {
            url = document.deepCss(A.shift(), 'background-image');
            if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
            url = url[1];
            if (url && B.indexOf(url) == -1) B[B.length] = url;
        }
        return B;
    }
    var arr = [], currentIdx = 0;

    //图片查找
    var imgs = options.fliterImg();
    for (var i = 0; i < imgs.length; i++) {
        arr.push({ src: imgs[i].src, type: 'img' });
    }

    var cssImages = getallBgimages();
    for (var i = 0; i < cssImages.length; i++) {
        arr.push({ src: cssImages[i], type: 'img' });
    }

    var exists = {};
    var arr1 = arr.distinct({
        contrast: function (exists, i) {
            return !exists[this[i].src];
        },
        add: function (exists, i) {
            exists[this[i].src] = 1;
        }
    });



    ////视频 / 音频
    $('video,audio').each(function (index, curr) {
        arr1.push({ o: curr, type: 'media' });
    })

    //成功回调
    function callback() {
        options.progress && options.progress.call(this, currentIdx, arr1.length);
        if (currentIdx == arr1.length - 1) {
            options.progress && options.progress.call(this, arr1.length, arr1.length);
            options.complete && options.complete();
        }
        currentIdx++;
    }

    for (var i = 0; i < arr1.length; i++) {
        var curr = arr1[i];
        switch (curr.type) {
            case 'img':
                $('<img>').attr('src', arr1[i].src).onload(function () {
                    callback();
                });
                break;
            case 'media':
                (function (o) {
                    o.addEventListener("canplay", function () {
                        callback();
                        clearTimeout(o.timeout);
                    }, false);
                    clearTimeout(o.timeout);
                    o.timeout = setTimeout(function () {
                        callback();
                    }, 5000);
                })(curr.o);
                break;
        }
    }
};

(function ($) {
    $.fn.onload = function (fnEnd) {
        var obj = this[0];
        obj.onload = function () {
            fnEnd && fnEnd.call(obj);
            obj.onreadystatechange = null;
        }
        obj.onreadystatechange = function (ev) {
            if (obj.readyState == 'complete') {
                fnEnd && fnEnd.call(obj);
                obj.onload = null;
            }
        }
        obj.onerror = function () {
            fnEnd && fnEnd.call(obj);
            obj.onreadystatechange = null;
            obj.onload = null;
        }
    }
})(jQuery);