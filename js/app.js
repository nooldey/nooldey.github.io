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