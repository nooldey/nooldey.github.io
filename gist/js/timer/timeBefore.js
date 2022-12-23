/*
 * @Author: zws <nooldey@gmail.com> 
 * @Date:   2018-01-10 09:06:09
 * @Last Modified by: zws
 * @Last Modified time: 2021-04-29 17:02:56
 * @Description: 获取历史日期的各种格式和计算
 */

/*1. 获取去年的今天*/

function zws_last() {
    /*获取去年今日*/
    let t = new Date();
    let nt = new Date();
    if (t.getMonth() + 1 == 2 && t.getDate() == 29) {
        nt.setMonth(t.getMonth() + 1)
        nt.setDate(1)
    }
    nt.setFullYear(t.getFullYear() - 1)
    return formatDate(nt, 'y-M-d');
}

/*2. 获取前N天的日期*/

function zws_before(n) {
    /*获取几天前*/
    return zeroTime = Math.round(Date.now() - 1000 * 3600 * 24 * n);
}

/*3. 将时间戳转为文字-N久前*/

function zws_along(t) {
    // 计算距离当前日期为：X天前
    //设置基准参数
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let month = day * 30;
    //获取当前时间，计算区间
    let n = new Date().getTime();
    let dif = n - t;
    if (dif < 0) return;
    let m = dif / month;
    let w = dif / (7 * day);
    let d = dif / day;
    let h = dif / hour;
    let min = dif / minute;
    let txt = '';
    // FROM: ZHUWEISHENG.COM.CN
    if (m >= 1) {
        txt = parseInt(m) + '月前';
    } else if (w >= 1) {
        txt = parseInt(w) + '周前';
    } else if (d >= 1) {
        txt = parseInt(d) + '天前';
    } else if (h >= 1) {
        txt = parseInt(h) + '小时前';
    } else if (min >= 1) {
        txt = parseInt(min) + '分钟前';
    } else {
        txt = '刚刚'
    }
    return txt;
}