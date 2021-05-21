/*
 * @Author: zws <nooldey@gmail.com> 
 * @Date: 2021-04-29 17:06:03 
 * @Last Modified by: zws 
 * @Description:  将剪贴板信息写入到本地存储
 */

javascript: void((function () {
  if (window.clipboardData && window.clipboardData.items) {
    /* IE */
    var items = window.clipboardData.items;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.kind === 'string') {
        item.getAsString(function (str) {
          var result = JSON.parse(str);
          Object.keys(result).filter(item => !/:\/\//.test(item)).forEach(k => {
            localStorage.setItem(k, result[k]);
            console.log('设置' + k + '成功！');
          });
        });
      };
    };
  } else {
    /* Other */
    var title = '请粘贴内容：';
    var content = prompt(title, '');
    if (content && content.length) {
      var result = JSON.parse(content);
      Object.keys(result).forEach(k => {
        localStorage.setItem(k, result[k]);
        console.log('设置' + k + '成功！');
      });
    };
  }
})())