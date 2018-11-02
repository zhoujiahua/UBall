/*Common JS*/
var commonObj = (function() {
	var arr = [];

	function Item(params, direction, speed) {
		this.params = params;
		this.direction = direction;
		this.speed = speed;
	}

	/*方法区*/
	var method = {};

	//测试方法
	method.te = function() {
		console.group("-----------------------");
		console.log("1.方法引入正确");
	};

	//选择器
	method.elementID = function(param) {
		var elementID = document.getElementById(param);
		return elementID;
	};

	//元素属性获取
	method.getCSS = function(obj, style) {
		if(window.getComputedStyle) {
			return getComputedStyle(obj)[style];
		}
		return obj.currentStyle[style];
	}

	//清除定时器
	method.setTimer = function(ele) {
		var el = commonObj.elementID(ele);
		clearInterval(el.timer);
		el.timer = 0;
	}

	//清空Canvas画布
	method.clearCanvas = function(ele) {
		var c = commonObj.elementID(ele);
		var cxt = c.getContext("2d");
		cxt.fillStyle = "#2A2A2A"
		cxt.beginPath();
		cxt.clearRect(0, 0, c.width, c.height);
		cxt.fillRect(0, 0, c.width, c.height);
		cxt.closePath();
	}

	//addEventListener add attachEvent 兼容写法
	method.addEvent = function(element, eve, callback) {
		if(element.addEventListener) {
			element.addEventListener(eve, callback, false);
		} else {
			element.attachEvent("on" + eve, callback);
		}
	}

	//改变像素大小
	method.setBoxParsms = function(obj) {
		var objArr = [],
			dataKey = [],
			dataVal = [],
			el = commonObj.elementID(obj.ele);
		for(var i in obj) {
			objArr.push(obj[i]);
		}

		for(var k in objArr[1]) {
			if(objArr[1].hasOwnProperty) {
				dataKey.push(k);
				dataVal.push(objArr[1][k]);
			}
		}

		el.style.width = obj.data.width + "px";
		el.style.height = obj.data.height + "px";
		el.style.borderRadius = obj.data.radius + "px";
	}

	//抖动函数
	method.shake = function(data) {
		var el = data.ele || null, //选择器
			initVal = data.initVal || 950, //定位初始尺寸
			count = data.count || 6, //次数
			rad = data.rad || 300, //弧度
			time = data.time || 30, //时间
			tp = data.tp || 1; //leixing

		if(tp === "1") {
			for(var i = 0; i <= count; i++) {
				if(i === 0) {
					el.removeAttr().animate({
						left: (initVal -= rad)
					}, time);
				} else if(i > 0 && i < count) {
					el.removeAttr().animate({
						left: (initVal += rad * 2)
					}, time).animate({
						left: (initVal -= rad * 2)
					}, time)

				} else if(i === count) {
					el.removeAttr().animate({
						left: (initVal += rad)
					}, time);
				}

			}
		} else if(tp === "2") {
			for(var i = 0; i <= count; i++) {
				if(i === 0) {
					el.removeAttr().animate({
						top: (initVal -= rad)
					}, time);
				} else if(i > 0 && i < count) {
					el.removeAttr().animate({
						top: (initVal += rad * 2)
					}, time).animate({
						top: (initVal -= rad * 2)
					}, time)

				} else if(i === count) {
					el.removeAttr().animate({
						top: (initVal += rad)
					}, time);
				}

			}
		}

	}

	//动态创建script标签
	method.creatScript = function(ele, url, callback) {
		var sc = document.createElement("script");
		sc.setAttribute("id", ele);
		sc.type = "text/javascript";
		sc.src = url;
		sc.charset = "UTF-8";
		/*if(sc.readyState) {
			// IE		
			sc.onreadystatechange = function() {
				if(sc.readyState == 'loaded' || sc.readyState == 'complete') {
					sc.onreadystatechange = null;
					callback();
				}
			};

		} else {
			// Others
			sc.onload = function() {
				callback();
			}
		}*/
		document.getElementsByTagName("head")[0].appendChild(sc);
	}

	//获取屏幕数据
	method.screenParams = function() {
		var screenParamsObj = {};
		screenParamsObj.scrW = document.documentElement.scrollWidth || document.body.scrollWidth,
			screenParamsObj.scrH = document.documentElement.scrollHeight || document.body.scrollHeight,
			screenParamsObj.rollW = document.documentElement.offsetWidth || document.body.offsetWidth,
			screenParamsObj.rollH = document.documentElement.offsetHeight || document.body.offsetHeight;
		screenParamsObj.offW = document.documentElement.clientWidth;
		screenParamsObj.offH = document.documentElement.clientHeight;

		return screenParamsObj;
	}

	//屏幕参数计算
	method.paramsCount = function(ele) {
		var params = commonObj.screenParams(), //屏幕参数
			el = commonObj.elementID(ele); //选择器
		var oW = params.offW, //屏幕总宽
			oH = params.offH, //屏幕总高
			boxW = el.offsetWidth, //物体宽度
			boxH = el.offsetHeight, //物体高度
			wideWHalf = commonObj.accDiv(oW, 2), //屏幕总宽1/2
			highHQuarter = commonObj.accDiv(oH, 4), //屏幕总高1/4
			highHQuarterTwo = commonObj.accMul(highHQuarter, 2), //屏幕总高2/4
			highHQuarterHalf = commonObj.accDiv(highHQuarter, 2), //屏幕总高1/4的1/2
			highHQuarterSubBoxHHalf = commonObj.accDiv(commonObj.accSub(highHQuarter, boxH), 2), //(屏幕1/4高度-物体高度)1/2
			highHQuarterThree = commonObj.accAdd(highHQuarterTwo, highHQuarterSubBoxHHalf), //屏幕总高2/4 减加(屏幕1/4高度-物体高度)1/2
			boxWHalf = commonObj.accDiv(boxW, 2), //物体宽度1/2
			boxHHalf = commonObj.accDiv(boxH, 2), //物体高度1/2
			wideSubBoxW = commonObj.accSub(oW, boxW), //屏幕总宽 -物体宽度
			highSubBoxH = commonObj.accSub(oH, boxH), //屏幕总高 -物体高度
			wideSubBoxWHalf = commonObj.accDiv(wideSubBoxW, 2), //(屏幕总宽 -物体宽度)1/2
			highSubBoxHHalf = commonObj.accDiv(highSubBoxH, 2); //(屏幕总高 -物体高度)1/2

		return {
			"oW": oW,
			"oH": oH,
			"boxW": boxW,
			"boxH": boxH,
			"wideWHalf": wideWHalf,
			"highHQuarter": highHQuarter,
			"highHQuarterHalf": highHQuarterHalf,
			"highHQuarterSubBoxHHalf": highHQuarterSubBoxHHalf,
			"boxWHalf": boxWHalf,
			"boxHHalf": boxHHalf,
			"wideSubBoxW": wideSubBoxW,
			"highSubBoxH": highSubBoxH,
			"wideSubBoxWHalf": wideSubBoxWHalf,
			"highSubBoxHHalf": highSubBoxHHalf,
			"highHQuarterTwo": highHQuarterTwo,
			"highHQuarterThree": highHQuarterThree
		};
	}

	//运动算法
	method.toExercise = function(num) {
		//参数集合
		var thisEle = commonObj.elementID(num.ele),
			thisParams = commonObj.paramsCount(num.ele);

		//圆心坐标
		var x = thisParams.wideWHalf || 300, // 园的中心点 x 坐标
			y = thisParams.highHQuarterHalf || 300, // 园的中心点 y 坐标
			r = num.centerR || 80, // 运动半径
			n = num.centerA || 0; // 运动起始角度

		//Math.sin( n*Math.PI/180 ) = a/r;
		//Math.cos( n*Math.PI/180 ) = b/r;

		// 算出圆周上每一个 A 的 x,y 轴
		var a = Math.sin(n * Math.PI / 180) * r;
		var b = Math.cos(n * Math.PI / 180) * r;

		// 算出 圆周上每一个 A 的坐标
		thisEle.style.left = x + b + 'px';
		thisEle.style.top = y + a + 'px';

		// 运动的痕迹
		var oBox = document.createElement('div');
		oBox.className = 'box';
		document.body.appendChild(oBox);

		/*oBox.style.left = thisEle.offsetLeft + 'px';
		oBox.style.top = thisEle.offsetTop + 'px';*/
		oBox.style.left = thisEle.offsetLeft + thisParams.boxWHalf + 'px';
		oBox.style.top = thisEle.offsetTop + thisParams.boxHHalf + 'px';

	}

	//Canvas 绘图
	method.setCanvas = function(num) {
		//参数 {el:"",seepW:"",seepH:"",moveToX:"",moveToY:"",lineToX:"",lineToX:"",lineWidth:"",strokeStyle:""}
		commonObj.clearCanvas(num.el);
		var canvas = commonObj.elementID(num.el);
		canvas.width = num.seepW;
		canvas.height = num.seepH;
		if(canvas.getContext) {
			var context = canvas.getContext("2d");
			context.moveTo(num.moveToX, num.moveToY);
			context.lineTo(num.lineToX, num.lineToY);
			context.lineWidth = num.lineWidth || 1;
			context.strokeStyle = num.strokeStyle || "red";
			context.stroke();
		} else {
			alert("当前浏览器不支持Canvas！")
		}

	}

	//鼠标坐标获取
	method.getCoordInDocument = function(e) {
		e = e || window.event;
		var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
		var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
		return {
			'x': x,
			'y': y
		};
	}

	//鼠标坐标展示
	method.getCoordInDocumentExample = function(param) {
		var coords = commonObj.elementID(param.ele);
		coords.onmousemove = function(e) {
			var pointer = commonObj.getCoordInDocument(e),
				coord = commonObj.elementID(param.coord);
			coord.style.left = (pointer.x + 16) + "px";
			coord.style.top = (pointer.y + 16) + "px";
			coord.style.width = (param.coordW || 130) + "px";
			coord.style.border = param.border || "1px solid green";
			coord.style.color = param.coler || "red";
			coord.innerHTML = 'X:' + pointer.x + ', Y:' + pointer.y;
		}
	}

	//钟摆运动
	method.pendulMove = function(json) {
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
			cur.left = parseFloat(commonObj.getCSS(obj, 'left'));
			cur.top = parseFloat(commonObj.getCSS(obj, 'top'));

			//更新left和top值
			var x = x0 + r * Math.sin(a * Math.PI / 180),
				y = y0 + r * Math.cos(a * Math.PI / 180);
			test.style.left = x + 'px';
			test.style.top = y + 'px';

			// 运动的痕迹
			var moveBox = document.createElement('div'),
				htmlBox = commonObj.elementID("panelBoxC");
			moveBox.className = 'box';
			htmlBox.appendChild(moveBox);
			moveBox.style.left = x + 'px';
			moveBox.style.top = y + 'px';

			var moveParams = {
				el: "canvas",
				seepW: commonObj.screenParams().offW,
				seepH: commonObj.screenParams().offH,
				moveToX: x0,
				moveToY: y0,
				lineToX: x + commonObj.elementID("ballB").offsetWidth / 2,
				lineToY: y + commonObj.elementID("ballB").offsetHeight / 2,
			};
			commonObj.setCanvas(moveParams);
		}, 20);
	}

	/*运算方法*/

	//加法函数
	method.accAdd = function(arg1, arg2) {
		var r1, r2, m, c;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch(e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch(e) {
			r2 = 0;
		}
		c = Math.abs(r1 - r2);
		m = Math.pow(10, Math.max(r1, r2));
		if(c > 0) {
			var cm = Math.pow(10, c);
			if(r1 > r2) {
				arg1 = Number(arg1.toString().replace(".", ""));
				arg2 = Number(arg2.toString().replace(".", "")) * cm;
			} else {
				arg1 = Number(arg1.toString().replace(".", "")) * cm;
				arg2 = Number(arg2.toString().replace(".", ""));
			}
		} else {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", ""));
		}
		return(arg1 + arg2) / m;
	}

	//给Number类型增加一个add方法。
	Number.prototype.add = function(arg) {
		return commonObj.accAdd(arg, this);
	};

	//减法函数
	method.accSub = function(arg1, arg2) {
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch(e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch(e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
		n = (r1 >= r2) ? r1 : r2;
		return((arg1 * m - arg2 * m) / m).toFixed(n);
	}

	// 给Number类型增加一个mul方法。
	Number.prototype.sub = function(arg) {
		return commonObj.accMul(arg, this);
	};

	//乘法函数
	method.accMul = function(arg1, arg2) {
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length;
		} catch(e) {}
		try {
			m += s2.split(".")[1].length;
		} catch(e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	}

	// 给Number类型增加一个mul方法。
	Number.prototype.mul = function(arg) {
		return commonObj.accMul(arg, this);
	};

	//除法函数
	method.accDiv = function(arg1, arg2) {
		var t1 = 0,
			t2 = 0,
			r1, r2;
		try {
			t1 = arg1.toString().split(".")[1].length;
		} catch(e) {}
		try {
			t2 = arg2.toString().split(".")[1].length;
		} catch(e) {}
		with(Math) {
			r1 = Number(arg1.toString().replace(".", ""));
			r2 = Number(arg2.toString().replace(".", ""));
			return(r1 / r2) * pow(10, t2 - t1);
		}
	}

	//给Number类型增加一个div方法。
	Number.prototype.div = function(arg) {
		return commonObj.accDiv(this, arg);
	};

	//IE浏览器检测
	method.isIE = function() {
		if(!!window.ActiveXObject || "ActiveXObject" in window) {
			return true;
		} else {
			return false;
		}
	}

	//IE 版本检测
	method.IETester = function() {
		var docAll = document.all;
		//IE11或者非IE
		if(!docAll) return {
			"ie": "11",
			"intro": "IE11+ or not IE"
		};
		if(docAll && document.addEventListener && window.atob) return {
			"ie": "10",
			"intro": "IE10"
		};
		if(docAll && document.addEventListener && !window.atob) return {
			"ie": "9",
			"intro": "IE9"
		};
		if(docAll && document.querySelector && !document.addEventListener) return {
			"ie": "8",
			"intro": "IE8"
		};
		if(docAll && window.XMLHttpRequest && !document.querySelector) return {
			"ie": "7",
			"intro": "IE7"
		};
		if(docAll && document.compatMode && !window.XMLHttpRequest) return {
			"ie": "6",
			"intro": "IE6"
		};
	}

	//PIE兼容方法
	method.runPIE = function(ele) {
		for(var i = 0; i < ele.length; i++) {
			var eleID = commonObj.elementID(ele[i]);
			PIE.attach(eleID);
		}
	}

	return method;

}());

//测试方法调用
commonObj.te();