!function checkDomain() {
    var allow = [
        'zhuweisheng.com.cn',
        'nooldey.github.io'
    ];
    var u = allow.some(url => {
        var s = new RegExp(url);
        return s.test(location.origin)
    });
    if (!u) {
        location.href = location.href.replace(location.host, '//zhuweisheng.com.cn/')
    }
}();

/* 识别客户端 */ 
!function() {
    var ua = navigator.userAgent;
    var os = '';
    if (ua.indexOf('Windows') > -1) {
        os = 'windows';
    } else {
        os = 'other';
    }
    var $body = document.querySelector('body') || document.body;
    if ($body.classList) {
        $body.classList.add(os)
    } else {
        $body.className += ' ' + os;
    }
}();