function createChart(){
	var charRequest = {};
	charRequest["code"] = $("#indexCode").val();
	charRequest["timeDimension"] = $("#dataType").val();
	$.ajax({
		type : 'POST',
		url : "/gldata/indexDetail-charData",
		data: JSON.stringify(charRequest),//将对象序列化成JSON字符串  
	    dataType:"json",
	    contentType : 'application/json;charset=utf-8', //设置请求头信息  
	    success : function(result) {
		    if(result.status=="200"){
		    	drowChart(result.data);
		    }else{
		    	$.err(result.msg);
		    }
	    },
	    error : function(){
	    	$.err("系统异常");
	    }
	});
}
function drowChart(json){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('chart'));
	// 指定图表的配置项和数据
	var xAxisDate = json.xAxisDate, // x轴轴名称
	    yAxisDate = json.yAxisDate; // 客户数量值
	option = {
	    title: {
	        text: ''
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    grid: {
	        top: '15%',
	        left: '3%',
	        right: '3%',
	        bottom: '15%',
	        containLabel: true
	    },
	    toolbox: false,
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: xAxisDate
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [
	        {
	            name: '',
	            type: 'line',
	            data: yAxisDate
	        }
	    ]
	
	};
	
	myChart.setOption(option);
	window.addEventListener('resize', function () {
	    myChart.resize();
	});
}

$("body").on("click","#indexOperationLogBtn",function(){
	$("#indexOperationLog").submit();
});
$("body").on("click","#indexDataOperationLogBtn",function(){
	$("#indexDataOperationLog").submit();
});


function getAllParam(){
	var indexCode = $("#indexCode").val()==""?null:$("#indexCode").val();
	var jsonData = {code:indexCode};
    return jsonData;	
}
function loadTableData(){
	var jsonData = getAllParam();
	jsonData['pageNum']=1;
	jsonData['pageSize']=15;
  	$("#dataTable").pagination({
  			url : "/gldata/indexDetail-table",
			paramJson : jsonData,
			callback:function(){
			}
		});
	      
}
$(document).ready(function () {
	createChart();
	loadTableData();
});