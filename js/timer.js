/*
* @Author: nooldey
* @Date:   2017-11-27 13:44:07
 * @Last Modified by: nooldey
 * @Last Modified time: 2018-03-03 15:36:33
*/

/* 自动补0 */
function numformat(n) {
    return n<10 ? '0'+n : n;
}
/* 计时器 */
var count = {
    itimer: null,
    start: function(t) {
        t = t || "11/11/2011 23:11:11";
        var $count = document.body.querySelector('.love-time') || document.body.getElementsByClassName('love-time')[0];
        if (!$count) { return; }
        /* 初始化 */
        var $co = $count.querySelector('.love-time-count') || document.body.getElementsByClassName('love-time-count')[0];
        var $as = $count.querySelector('.love-time-asume') || document.body.getElementsByClassName('love-time-asume')[0];
        var start = new Date(t);
        var now = new Date();
        /* 计算天数倒计时 */
        var nms = now.getTime() - start.getTime();
        var c = {
            d: Math.floor(nms / (1000 * 60 * 60 * 24)) + 2,
            h: Math.floor(nms / (1000 * 60 * 60)) % 24,
            m: Math.floor(nms / (1000 * 60)) % 60,
            s: Math.floor(nms / 1000) % 60
        }

        /* 计算累计时间 */
        var s = {
            y: start.getFullYear(),
            m: start.getMonth() + 1,
            d: start.getDate()
        }
        var n = {
            y: now.getFullYear(),
            m: now.getMonth() + 1,
            d: now.getDate()
        }
        var nY = n.y - s.y,
            nM;
        if (n.m < s.m) {
            nY--;
            nM = n.m + (12 - s.m) + (nY * 12);
        } else {
            nM = n.m - s.m + (nY * 12);
        }
        if (n.d < s.d) {
            nM--;
        }
        /* 判断并赋值 */
        if (c.d >= 0) {
            var cT = numformat(c.d) + '天' + numformat(c.h) + '时' + numformat(c.m) + '分' + numformat(c.s) + '秒';
            var aT = '今天是第' + nM + '个月，第' + nY + '年';
            $co.innerText = cT;
            $as.innerText = aT;
            count.itimer = setTimeout("count.start()", 500);
        } else {
            $count.innerHTML = "亲，你穿越了吗？";
        }
    },
    stop: function() {
        clearTimeout(count.itimer);
    }
}

/* 开启计时器 */
count.start();