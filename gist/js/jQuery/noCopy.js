/*
 * @Author: nooldey
 * @Date:   2018-01-11 13:27:47
 * @Last Modified by: zws
 * @Last Modified time: 2021-05-07 15:26:00
 * @Description: 屏蔽鼠标右键、复制、粘贴、CTRL、ALT、SHIFT、F2~F12等，仅建议对文章内容独特性要求或不愿意被随意复制内容的站点
 */

/* ---------jQuery-------- */
//屏蔽鼠标右键、ALT翻页、CTRL+N、CTRL+R、F2~F12、SHIFT+左键
jQuery(document).ready(function ($) {
    $(document).bind("contextmenu", function () {
        return false;
    });
    $(document).bind("selectstart", function () {
        return false;
    });
    $(document).keydown(function () {
        return key(arguments[0])
    });

    function key(e) {
        var keyCode;
        if (window.event) //IE
        {
            keyCode = e.keyCode;
        } else if (e.which) //firefox/opera/chrome/netscape
        {
            keyCode = e.which;
        }
        if (
            (keyCode == 112) || //F2
            (keyCode == 113) || //F2
            (keyCode == 114) || //F3
            (keyCode == 115) || //F4
            // (keyCode==116)||       //F5
            (keyCode == 117) || //F6
            (keyCode == 118) || //F7
            (keyCode == 119) || //F8
            (keyCode == 120) || //F9
            (keyCode == 121) || //F10
            // (keyCode==122)||       //F11
            (keyCode == 123) || //F12
            (keyCode == 17) || //CTRL
            (keyCode == 16) //shift
            //此处填写后续条件
        ) {
            alert("别再按了，你节操碎了！");
            return false;
        }
    }
});

/* -----------原生------------ */
/*禁止复制*/
function noCopy() {
    /* 禁止右键复制粘贴 */
    document.oncontextmenu = function () {
        return false;
    }
    document.onselectstart = function () {
        return false;
    }

    function key(e) {
        var keyCode;
        if (window.event) {
            //IE
            keyCode = e.keyCode;
        } else if (e.which) {
            //firefox/opera/chrome/netscape
            keyCode = e.which;
        }
        /*
		112 //F2
        113 //F2
        114 //F3
        115 //F4
        116 //F5
        117 //F6
        118 //F7
        119 //F8
        120 //F9
        121 //F10
        122 //F11
        123 //F12
        17  //CTRL
        16  //shift
        */
        //此处填写后续条件
        if ([112, 113, 114, 115, 117, 118, 119, 120, 121, 122, 123, 17, 16].indexOf(keyCode) > -1) {
            console.log("别再按了，你节操碎了！");
            return false;
        }
    }
    document.onkeydown = function () {
        return key(arguments[0])
    }
}