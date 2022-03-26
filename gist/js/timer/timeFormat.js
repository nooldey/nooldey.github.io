/*
 * @Author: nooldey
 * @Date:   2018-01-06 16:57:15
 * @Last Modified by: zws
 * @Last Modified time: 2021-05-07 15:26:11
 * @Description: 针对时间的各种格式化
 */

/* 时间格式化 */
const formatDate = (stamp, format = 'y-M-d') => {
    /* 日期格式化，不转时区 */
    if (!stamp) return;
    try {
        let d = new Date(stamp);
        const fillzero = t => t > 9 ? t : ('0' + t);
        let year = d.getFullYear(),
            month = fillzero(d.getMonth() + 1),
            date = fillzero(d.getDate()),
            hour = fillzero(d.getHours()),
            min = fillzero(d.getMinutes()),
            sec = fillzero(d.getSeconds());
        let pre = '',
            aft = ''; // 输出时间的两个部分，pre:日期部分,aft:时间部分
        let ymd = format.match(/^y(.+?)M(.+?)d/); // 年月日 ymd
        let hm = format.match(/h\:m$/); // 时分  hm
        let hms = format.match(/h\:m\:s$/); // 时分秒  hms
        if (ymd) {
            let line = ymd[2] || '';
            pre = [year, month, date].join(line);
        }
        if (hm) {
            aft = [hour, min].join(':');
        }
        if (hms) {
            aft = [hour, min, sec].join(':');
        }
        let output = [pre, aft].join(' ');
        return output.trim();
    } catch (error) {
        console.log('time error', error)
        return stamp;
    }

}

/* 时间国际化处理 */
const zeroToLocal = (stamp, format = 'y-M-d') => {
    /* 将传入的零时区的时间转化为当地时间显示，默认输出年月日 */
    /*
     * 参数：
     * offset: 当前时区时间差 = 零时区时间-当地时间 单位：min
     *       eg: 中国时区+0800 时间差为-480(min),-480/60 = -8小时
     * localtime: 转换后输出的当地时间
     */
    if (!stamp) return;
    /* 零时区转当地时间 */
    try {
        let d = new Date(stamp);
        if (!d || d == 'Invalid Date') return stamp;
        let offset = new Date().getTimezoneOffset();
        let localtime = d.getTime() - offset * 60 * 1000;
        let output = formatDate(localtime, format);
        return output;
    } catch (error) {
        console.log('time error', error)
        return stamp;
    }
}


const localToZero = (stamp, format = 'y-M-d') => {
    /* 将当地时间转化为零时区时间 */
    /*
     * 参数：
     * offset: 当前时区时间差 = 零时区时间-当地时间 单位：min
     *       eg: 中国时区+0800 时间差为-480(min),-480/60 = -8小时
     * zeroTime: 转换后输出的当地时间
     */
    if (!stamp) return;
    let d = new Date(stamp);
    if (!d || d == 'Invalid Date') return stamp;
    d = d.toJSON().substr(0, 19);
    let [date, time] = d.split('T');
    let [year, month, day] = date.split('-');
    let [hour, min, sec] = time.split(':');
    let output = '';
    let pre = '',
        aft = ''; // 输出时间的两个部分，pre:日期部分,aft:时间部分
    let ymd = format.match(/^y(.+?)M(.+?)d/); // 年月日 ymd
    let hm = format.match(/h\:m$/); // 时分  hm
    let hms = format.match(/h\:m\:s$/); // 时分秒  hms
    if (ymd) {
        let line = ymd[2] || '';
        pre = [year, month, day].join(line);
    }
    if (hm) {
        aft = [hour, min].join(':');
    }
    if (hms) {
        aft = [hour, min, sec].join(':');
    }
    output = [pre, aft].join(' ');
    return output.trim();
}