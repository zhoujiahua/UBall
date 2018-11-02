/*Home JS*/

//动态获取参数
(function() {
	var circleParamsA = commonObj.paramsCount("ballA"),
		circleParamsB = commonObj.paramsCount("ballB"),
		xA = circleParamsA.wideWHalf,
		yA = circleParamsA.highHQuarterHalf,
		xB = circleParamsB.wideWHalf,
		yB = circleParamsB.highHQuarterHalf;
	var flag = 1,
		timer = null,
		oA = commonObj.elementID("ballA"),
		oB = commonObj.elementID("ballB"),
		oC = commonObj.elementID("setScr"),
		bA = commonObj.elementID("btnA"),
		bB = commonObj.elementID("btnB"),
		bC = commonObj.elementID("btnC"),
		bD = commonObj.elementID("btnD"),
		bE = commonObj.elementID("btnE"),
		bF = commonObj.elementID("btnF"),
		btnClick = commonObj.elementID("btnClick");

	/*canvas*/
	/*var canvas = commonObj.elementID("canvas");
	canvas.width = circleParamsA.oW;
	canvas.height = circleParamsA.oH;*/

	//屏幕动态修改
	dynamicParam();
	window.onresize = dynamicParam;
	//圆心点
	//	dotType($(".panel-boxA"), (circleParamsA.wideWHalf - 2), (circleParamsA.highHQuarterHalf - 2));
	$(window).resize(function() {
		circleParamsA = commonObj.paramsCount("ballA");
		circleParamsB = commonObj.paramsCount("ballB");
		xA = circleParamsA.wideWHalf;
		yA = circleParamsA.highHQuarterHalf;
		xB = circleParamsB.wideWHalf;
		yB = circleParamsB.highHQuarterHalf;
		//		dotType($(".panel-boxA"), (circleParamsA.wideWHalf - 2), (circleParamsA.highHQuarterHalf - 2));
		$("#btnClick").trigger("click");
	})

	//PIE兼容CSS3样式
	if(commonObj.isIE()) {
		var url = "plugs/pie1.0.0/PIE.js";
		commonObj.creatScript("setScr", url);
		window.setTimeout(function() {
			var arrPIE = ["ballA", "ballB", "btnA", "btnB", "btnC"];
			commonObj.runPIE(arrPIE)
			console.log("PIE执行完成！");
			console.log("请不要使用垃圾IE");
		}, 300)
	}

	if(feature.webGL) {
		$(".main, .wrapper").removeAttr("style").addClass("vh");
	} else {
		$(".main, .wrapper").removeClass("vh");
		$(".main, .wrapper").css({
			"width": circleParamsA.oW,
			"height": circleParamsA.oH
		})
		//$("body").append('<script type="text/javascript" src="plugs/pie1.0.0/PIE.js"></script>');
		$("body").append('<script type="text/javascript" src="plugs/excanvas/excanvas.js"></script>');
		
	}

	if(oC) {
		oC.removeChild();
	}

	//鼠标坐标展示
	commonObj.getCoordInDocumentExample({
		"ele": "btnClick",
		"coord": "coord",
		"coordW": 120,
		"border": "1px solid #fff"
	});

	//鼠标坐标点击
	$("#btnClick").on("click", function(e) {
		var thisParamsA = commonObj.paramsCount("ballA"),
			thisParamsB = commonObj.paramsCount("ballB"),
			cirXA = thisParamsA.wideWHalf,
			cirYA = thisParamsA.highHQuarterHalf,
			cirXB = thisParamsB.wideWHalf,
			cirYB = thisParamsB.highHQuarterHalf,
			elO = commonObj.getCoordInDocument(e),
			elA = $("#ballA"),
			elB = $("#ballB"),
			oXB = elO.x,
			oYB = elO.y;

		elB.css({
			"left": oXB - thisParamsB.boxWHalf,
			"top": oYB - thisParamsB.boxHHalf
		});

		//Canvas 绘图
		/*if(canvas.getContext) {
			var context = canvas.getContext("2d");
			context.moveTo(cirXA, cirYA);
			context.lineTo(oXB, oYB);
			context.lineWidth = 1;
			context.strokeStyle = "red";
			context.stroke();

		} else {
			alert("您的浏览器不支持Canvas！");
		}*/
		commonObj.clearCanvas("canvas");
		var canvarParams = {
			el: "canvas",
			seepW: circleParamsA.oW,
			seepH: circleParamsA.oH,
			moveToX: cirXA,
			moveToY: cirYA,
			lineToX: oXB,
			lineToY: oYB,
		};
		commonObj.setCanvas(canvarParams);

		/*
		 * Math.abs() //绝对值
		 * Math.pow() //平方
		 * Math.sqrt() //平方根
		 * 
		 * c平方 = a平方 + b平方
		 * */
		$(".panel-boxC").html("");
		commonObj.setTimer("ballB");
		var triangleXA = Math.pow(Math.abs(cirXA - oXB), 2),
			triangleYB = Math.pow(Math.abs(cirYA - oYB), 2),
			triangleYC = triangleXA + triangleYB,
			cirR = Math.sqrt(triangleYC),
			cirDir = "",
			cirAngle = 0; //夹角
		if(oXB < cirXA) {
			cirDir = "+";
		} else {
			cirDir = "-";
		}

		/*if(cirDir == "-"){
			cirAngle = 240 + (cirYA-oYB);
		}else if(cirDir == "+"){
			cirAngle = 90 - (cirYA-oYB);
		}*/

		setTimeout(function() {
			commonObj.pendulMove({
				obj: test, //运动对象
				r: cirR, //运动半径
				x0: cirXA, //圆心坐标X
				y0: cirYA, //圆心坐标Y
				a: cirAngle, //当前夹角
				num: 0, //当前次数
				dir: cirDir //运动方向
			});
		}, 500)

	})

	//循环次数处理
	function lengthNum(a, b) {
		var d;
		if(a % b > 0) {
			d = parseInt(a / b) + 1;
		} else {
			d = parseInt(a / b);
		}
		return d;
	}

	//打点
	function dotType(el, l, t) {
		var oWire = '<span class = "cr-wire" id="crWire" style="left:' + l + 'px;top:' + t + 'px;" ><span>';
		el.html(oWire);
	}

	//圆周运动
	commonObj.addEvent(bA, "click", function() {
		dynamicParam();
		window.clearInterval(timer);
		var n = 0;
		timer = setInterval(function() {
			n++;
			commonObj.toExercise({
				"ele": "ballA",
				"centerA": n
			});
		}, 30)

	})
	commonObj.addEvent(bB, "click", function() {
		dynamicParam();
		window.clearInterval(timer);
		var n = 0;
		timer = setInterval(function() {
			n--;
			commonObj.toExercise({
				"ele": "ballA",
				"centerA": n
			});
		}, 30)

	})
	commonObj.addEvent(bC, "click", function() {
		window.clearInterval(timer);
	})
	commonObj.addEvent(bD, "click", function() {
		window.location.reload();
	})

	//大小切换
	commonObj.addEvent(bE, "click", function() {
		if(flag) {
			commonObj.setBoxParsms(WHRParams("ballA", 20));
			commonObj.setBoxParsms(WHRParams("ballB", 80));
			flag = 0;
		} else {
			commonObj.setBoxParsms(WHRParams("ballA", 80));
			commonObj.setBoxParsms(WHRParams("ballB", 20));
			flag = 1;
		}

		dynamicParam();

	});

	//圆大小切换参数构造
	function WHRParams(ele, num) {
		return {
			"ele": ele,
			"data": {
				"width": num,
				"height": num,
				"radius": num
			}
		};
	}

	//IE版本检测
	var IEVersion = commonObj.IETester();
	console.log(IEVersion);
	if(IEVersion.ie === "7" || IEVersion.ie === "6") {
		alert("您使用的IE" + IEVersion.ie + "版本过低请尽快升级！");
		var timer = window.setInterval(function() {
			window.clearInterval(timer);
			alert("您使用的IE" + IEVersion.ie + "版本过低请尽快升级！");
		}, 5000)

		//window.location.href = "https://support.microsoft.com/zh-cn/help/18520/download-internet-explorer-11-offline-installer";
	}

}());

//屏幕获取屏幕参数
function dynamicParam() {
	var screenParam = commonObj.screenParams();
	var oW = screenParam.offW,
		oH = commonObj.accDiv(screenParam.offH, 4);
	setPosition("ballA", "ballB");
}

//位置设置
function setPosition(elA, elB) {
	var elAParams = commonObj.paramsCount(elA),
		elBParams = commonObj.paramsCount(elB),
		ballA = commonObj.elementID(elA),
		ballB = commonObj.elementID(elB);

	//ballA位置
	ballA.style.left = elAParams.wideSubBoxWHalf + "px";
	ballA.style.top = elAParams.highHQuarterSubBoxHHalf + "px";

	//ballB位置
	ballB.style.left = elBParams.wideSubBoxWHalf + "px";
	ballB.style.top = elBParams.highHQuarterThree + "px";
}