/*
 * @Author: zws <nooldey@gmail.com> 
 * @Date: 2021-04-29 17:05:30 
 * @Last Modified by: zws 
 * @Description:  复制本地存储的信息到剪贴板
 */

javascript: void((function () {
  var allKeys = Object.keys(localStorage).filter(item => !/(:\/\/|preview|swagger|webpack|null)/i.test(item));
  var key = allKeys.length ? allKeys : ['devToken', 'token', 'devInfo', 'user'];
  var result = {};
  for (let index = 0; index < key.length; index++) {
    var k = key[index];
    var ctx = localStorage.getItem(k) || '';
    result[k] = ctx;
  };
  var contentValue = JSON.stringify(result);
  if (window.clipboardData) {
    window.clipboardData.setData("Text", contentValue);
    console.log('已复制' + key);
  } else if (document.execCommand) {
    var el = document.createElement('textarea');
    el.setAttribute('style', 'width:0;height:0;');
    el.value = contentValue;
    document.body.appendChild(el);
    el.focus();
    if (el.setSelectionRange) {
      el.setSelectionRange(0, contentValue.length);
    } else {
      el.select();
    }
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log('已复制' + key);
  } else {
    console.clear();
    console.log(key + '的值:');
    console.log(contentValue);
    alert('无法自动复制，请打开控制台复制输出的内容');
  }
})())</nooldey@gmail.com>