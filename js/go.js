/*
 * 公用JS
 */
var go = (function() {
	var method = {
		test: function() { //测试方法
			console.log("方法引入成功！")
		},
		el: function(ele) { //选择器
			return document.getElementById(ele);
		},
		clearTimer: function(param, num) { //定时器清除
			if(!param | !num) return;
			switch(num.toString()) {
				case "1":
					window.clearTimeout(param);
					break;
				case "2":
					window.clearInterval(param);
					break;
				default:
					console.log("请输入类型")
					break;
			}
		},
		rundomColor: function() { //随机颜色
			var r = Math.floor(Math.random() * 256),
				g = Math.floor(Math.random() * 256),
				b = Math.floor(Math.random() * 256);
			return 'rgb(' + r + ',' + g + ',' + b + ')';
		},
		getCoordInDocument: function(e) { //获取屏幕坐标
			var el = e || window.event,
				mouseCoords = {};
			mouseCoords.x = el.pageX || (el.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
			mouseCoords.y = el.pageY || (el.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
			return mouseCoords;
		},
		speenParam: function(ele) {
			var el, spW, spH, objW, objH, maxW, maxH;
			if(ele) {
				el = go.el(ele);
				objW = el.offsetWidth;
				objH = el.offsetHeight;
				maxW = spW - objW;
				maxH = spH - objH;
				return {
					"spW": spW,
					"spH": spH,
					"objW": objW,
					"objH": objH,
					"maxW": maxW,
					"maxH": maxH
				}
			} else {
				spW = document.documentElement.clientWidth;
				spH = document.documentElement.clientHeight;
				return {
					"spW": spW,
					"spH": spH
				}
			}

		},

	}

	return method;
}())

go.test();