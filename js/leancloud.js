/*数据处理方法*/
function addCount(Counter) {
	var $visitors = document.body.querySelector('.leancloud-visitors') || document.body.getElementsByClassName('leancloud-visitors')[0];
	var url = $visitors.getAttribute('id').trim();
	var title = $visitors.getAttribute('data-flag-title').trim();

	var query = new AV.Query(Counter);
	query.equalTo("url", url);
	query.find({
		success: function(res) {
			if (res.length > 0) {
				var counter = res[0];
				counter.fetchWhenSave(true);
				counter.increment("time");
				counter.save(null,{
					success: function(counter) {
						var $element = document.getElementById(url);
						var span = $element.querySelector('.leancloud-count') || $element.getElementsByClassName('leancloud-count')[0];
						span.innerText = counter.get('time');
					},
					error: function(counter,err) {
						console.error('Failed to save Visitor num :' + err.message)
					}
				})
			} else {
				var newcounter = new Counter();
				newcounter.set("title",title);
				newcounter.set("url",url);
				newcounter.set("time",1);
				newcounter.save(null, {
					success: function(newcounter) {
						var $element = document.getElementById(url);
						var span = $element.querySelector('.leancloud-count') || $element.getElementsByClassName('leancloud-count')[0];
						span.innerText = counter.get('time');
					},
					error: function(newcounter,err) {
						console.error('Failed to create')
					}
				})
			}
		},
		error: function(err) {
			console.log("Error:" + err.code + " " + err.message);
		}
	})
}

!function initial() {
	var allow = [
        'zhuweisheng.com.cn',
        'nooldey.github.io'
    ];
    var u = allow.some(url => {
        var s = new RegExp(url);
        return s.test(location.origin)
	});
	if (!u) {
		console.warn('Denied domain! Please check your domain.');
		return;
	}
	var $flag = document.body.querySelector('.leancloud-visitors') || document.body.getElementsByClassName('leancloud-visitors')[0];
	if (!$flag) {
		return;
	}
	var app = {
		id: $flag.getAttribute('data-app-id').trim(),
		key: $flag.getAttribute('data-app-key').trim()
	}
	AV.initialize(app.id,app.key);
	setTimeout(function(){
		var Counter = AV.Object.extend("Counter");
		addCount(Counter);
	},200)
}()