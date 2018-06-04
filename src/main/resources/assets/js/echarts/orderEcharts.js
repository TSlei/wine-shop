// 图表实例化------------------
// srcipt标签式引入
var allDate = "";
var myChart = echarts.init(document.getElementById('initTable'));

// 过渡---------------------
myChart.showLoading({
    text: '正在努力的读取数据中...',    //loading话术
});


// 图表使用-------------------
option = {
	    title : {
	        text: '销售情况',
	        subtext: '整体统计'
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['销售额']
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            magicType : {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : null
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'销售额',
	            type:'bar',
	            data:null
	        }
	    ]
	};
$(document).ready(function(){
	$.ajax({
		type:"post",
		url:"/echarts/getAllDate",
		data:{
			"yearNum":$("#yearNum").val()
		},
		success:function(msg){
			allDate = msg;
			myChart.hideLoading();
			option.xAxis[0].data = allDate.arrayX;
			option.series[0].data = allDate.arrayY;
			myChart.setOption(option);
		}
	});
});


$("#changeType").change(function(){
	var type = $(this).val();
	if(type == "price"){
		option.legend.data[0] = "销售额";
		option.series[0].name = "销售额";
		option.xAxis[0].data = allDate.arrayX;
		option.series[0].data = allDate.arrayY;
		myChart.setOption(option);
	}else{
		option.legend.data[0] = "销售量";
		option.series[0].name = "销售量";
		option.xAxis[0].data = allDate.arrayX;
		option.series[0].data = allDate.arrayZ;
		myChart.setOption(option);
	}
})

$("#yearNum").change(function(){
	$.ajax({
		type:"post",
		url:"/echarts/getAllDate",
		data:{
			"yearNum":$("#yearNum").val()
		},
		success:function(msg){
			allDate = msg;
			myChart.hideLoading();
			option.xAxis[0].data = allDate.arrayX;
			option.series[0].data = allDate.arrayY;
			myChart.setOption(option);
		}
	});
})

//// 增加些数据------------------
//option.legend.data.push('win');
//option.series.push({
//        name: 'win',                            // 系列名称
//        type: 'line',                           // 图表类型，折线图line、散点图scatter、柱状图bar、饼图pie、雷达图radar
//        data: [1, 232, 451, 561, 23, 34, 44, 189, 43, 23, 145, 23]
//});
//myChart.setOption(option);