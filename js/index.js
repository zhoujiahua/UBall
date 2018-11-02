$(function() {
	//抖动函数
	$("#btnF").on("click", function() {
		execute();
	});

	var canvas = document.createElement("canvas");
	canvas.id = "canvas";
	canvas.setAttribute("class", "canvas");
	document.body.appendChild(canvas);
	canvas = window.G_vmlCanvasManager.initElement(canvas);

})

//抖动函数调用
function execute() {
	var ballA = $("#ballA"),
		ballB = $("#ballB");
	var thatNumB = commonObj.paramsCount("ballB"),
		thisNumB = thatNumB.wideSubBoxWHalf,
		thatNumA = commonObj.paramsCount("ballA"),
		thisNumA = thatNumA.highHQuarterHalf;
	/*$(this).shakeLeft(2, 10, 400, thisNumB);
	$("#ballA").shakeTop(2, 10, 400, thisNumA);*/
	commonObj.shake({
		"ele": ballA,
		"rad": 80,
		"time": 30,
		"initVal": thisNumA,
		"tp": "2"
	});
	commonObj.shake({
		"ele": ballB,
		"rad": 300,
		"time": 30,
		"initVal": thisNumB,
		"tp": "1"
	});
}