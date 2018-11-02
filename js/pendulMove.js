function getCSS(obj, style) {
	if(window.getComputedStyle) {
		return getComputedStyle(obj)[style];
	}
	return obj.currentStyle[style];
}

function pendulMove(json) {
	//要操作的元素
	var obj = json.obj;

	//起始方向(顺时针'+'或逆时针'-')
	var dir = json.dir;
	dir = dir || '+';

	//最大次数(再次经过最低点为一次)
	var max = json.max;
	max = Number(max) || 'all';

	//半径
	var r = json.r;
	r = Number(r) || 500;

	//圆心x轴坐标
	var x0 = json.x0 || parseFloat(getCSS(obj, 'left'));

	//圆心y轴坐标
	var y0 = json.y0 || parseFloat(getCSS(obj, 'top')) - r;

	//初始夹角，以角度为单位
	var a0 = json.a0;
	a0 = Number(a) || 0;

	//当前夹角
	var a = json.a || 0;

	//当前次数
	var num = 0;

	//清除定时器
	if(obj.timer) {
		return;
	}
	//声明当前值cur
	var cur = {};
	obj.timer = setInterval(function() {
		//将这些瞬时值储存在obj对象中的属性中
		obj.a = a;
		obj.x0 = x0;
		obj.y0 = y0;
		obj.x = x;
		obj.y = y;
		obj.num = num;
		//如果元素运动到指定圈数则停止定时器
		if(num == max) {
			clearInterval(obj.timer);
		}
		//起始向右运动
		if(dir == '+') {
			a++;
			if(a == 90) {
				//方向变成向左
				dir = '-';
			}
		} else {
			a--;
			if(a == -90) {
				//方向变成向右
				dir = '+';
			}
		}
		//更新当前值
		cur.left = parseFloat(getCSS(obj, 'left'));
		cur.top = parseFloat(getCSS(obj, 'top'));

		console.log(cur.left + "||" + cur.top)
		//更新left和top值
		var x = x0 + r * Math.sin(a * Math.PI / 180),
			y = y0 + r * Math.cos(a * Math.PI / 180);
		test.style.left = x + 'px';
		test.style.top = y + 'px';

		// 运动的痕迹
		var moveBox = document.createElement('div');
		moveBox.className = 'box';
		document.body.appendChild(moveBox);
		moveBox.style.left = x + 'px';
		moveBox.style.top = y + 'px';

	}, 20);
}