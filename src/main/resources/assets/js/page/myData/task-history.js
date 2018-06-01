function getAllParam(){
	var indexSourceType = $("#indexSourceType").val()==""?null:$("#indexSourceType").val();
	var operationType = $("#operationType").val()==""?null:$("#operationType").val();
	var dataType = $("#dataType").val()==""?null:$("#dataType").val();
	var monitorStatus = $("#monitorStatus").val()==""?null:$("#monitorStatus").val();
	var status = $("#status").val()==""?"1,2":$("#status").val();
	var indexCode = $("#indexCode").val();
	var indexName = $("#indexName").val();
	var marketCode = $("#marketCode").val();
	var startTime = $(".fn-date1-r").data("daterangepicker").startDate.set('hour',0).set('minute',0).set('second', 0).valueOf();
	var endTime = $(".fn-date1-r").data("daterangepicker").endDate.set('hour',23).set('minute',59).set('second', 59).valueOf();
	var jsonData = {
			indexSourceType:indexSourceType,
			operationType:operationType,
			dataType:dataType,
			monitorStatus:monitorStatus,
			status:status,
			indexCode:indexCode,
			indexName:indexName,
			marketCode:marketCode,
			inputStartTime:startTime,
			inputEndTime:endTime
	};
	
    return jsonData;	
}

function reloadData(){
	loadTableData();
	countTaskHistoryByDataType();
	countTaskHistoryByOperation();
	countTaskHistoryByIndexSource();
	
}

function countTaskHistoryByDataType(){
	var jsonData = getAllParam();
	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/countTaskByDataType",
		data : jsonData,
		success : function(result) {
			if(result.status=="200"){
				var dataObj = result.data;
				var dataTypeHtml = '';
				if(dataObj['日']!==undefined){
					dataTypeHtml+="<span class='primary'>日指标</span>"+dataObj['日']+"条；"
				}
				if(dataObj['周']!==undefined){
					dataTypeHtml+="<span class='primary'>周指标</span>"+dataObj['周']+"条；"
				}
				if(dataObj['旬']!==undefined){
					dataTypeHtml+="<span class='primary'>旬指标</span>"+dataObj['旬']+"条；"
				}
				if(dataObj['月']!==undefined){
					dataTypeHtml+="<span class='primary'>月指标</span>"+dataObj['月']+"条；"
				}
				if(dataObj['季']!==undefined){
					dataTypeHtml+="<span class='primary'>季指标</span>"+dataObj['季']+"条；"
				}
				if(dataObj['半年']!==undefined){
					dataTypeHtml+="<span class='primary'>半年指标</span>"+dataObj['半年']+"条；"
				}
				if(dataObj['年']!==undefined){
					dataTypeHtml+="<span class='primary'>年指标</span>"+dataObj['年']+"条；"
				}
				$(".dataTypeNum").html(dataTypeHtml);
			}else{
			  $.err(result.msg);	
			}
		}
    });
}


function countTaskHistoryByOperation(){
	
	var jsonData = getAllParam();
	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/countTaskByOperation",
		data : jsonData,
		success : function(result) {
			if(result.status=="200"){
				var dataObj = result.data;
				var operationHtml = '';
				if(dataObj['手动']!==undefined){
					operationHtml+="<span class='primary'>手动</span>"+dataObj['手动']+"条；"
				}
				if(dataObj['自动']!==undefined){
					operationHtml+="<span class='primary'>自动</span>"+dataObj['自动']+"条；"
				}
				if(dataObj['衍生公式']!==undefined){
					operationHtml+="<span class='primary'>衍生公式</span>"+dataObj['衍生公式']+"条；"
				}
				$(".operationNum").html(operationHtml);
			}else{
			  $.err(result.msg);	
			}
		}
    });
}

function countTaskHistoryByIndexSource(){
	
	var jsonData = getAllParam();
	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/countTaskByIndexSource",
		data : jsonData,
		success : function(result) {
			if(result.status=="200"){
				var totalNum = 0;
				var dataObj = result.data;
				var indexSourceHtml = '';
				if(dataObj['钢联指标']!==undefined){
					indexSourceHtml+="<span class='primary'>钢联指标</span>"+dataObj['钢联指标']+"条；";
					totalNum+=dataObj['钢联指标'];
				}
				if(dataObj['隆众网指标']!==undefined){
					indexSourceHtml+="<span class='primary'>隆众网指标</span>"+dataObj['隆众网指标']+"条；";
					totalNum+=dataObj['隆众网指标']
				}
				if(dataObj['其他外部指标']!==undefined){
					indexSourceHtml+="<span class='primary'>其他外部指标</span>"+dataObj['其他外部指标']+"条；";
					totalNum+=dataObj['其他外部指标']
				}
				$(".indexSourceNum").html(indexSourceHtml);
				$(".totalHistoryNum").html(totalNum);
			}else{
			  $.err(result.msg);	
			}
		}
    });
}


function loadTableData(){
	var jsonData = getAllParam();
	jsonData['pageNum']=1;
	jsonData['pageSize']=50;
  	$("#historyTable").pagination({
			url : "/gldata/mydata/queryTaskHistoryTable",
			paramJson : jsonData,
			callback:function(){
				
			}
		});
}

function reset(){
	 $("#indexSourceType").val("");
	  $("#operationType").val("");
	  $("#dataType").val("");
	  $("#monitorStatus").val("");
	  $("#indexCode").val("");
	  $("#indexName").val("");
	  $("#marketCode").val("");
	  $("#status").val("");
	  var startDate = moment().format('YYYY/MM/DD');
	  var endDate = moment().format('YYYY/MM/DD');
	  $('.fn-date1-r').data("daterangepicker").setStartDate(startDate);
	  $('.fn-date1-r').data("daterangepicker").setEndDate(endDate);
	  $('.fn-date1-r').val(startDate + ' - ' + endDate);
	  setTimeout(function(){reloadData();},500);
};

$(document).ready(function () {
  reloadData();
  $(".searchBtn").on("click",reloadData);
  $(".resetBtn").on("click",reset);
  $('.fn-date1-r').val(moment().format('YYYY/MM/DD') + ' - ' + moment().format('YYYY/MM/DD'))
});


$("body").on("keyup","#indexCode",function(){
	remoePercent(this);
});
$("body").on("keyup","#indexName",function(){
	remoePercent(this);
	remoeUnderLine(this);
});
$("body").on("keyup","#marketCode",function(){
	remoePercent(this);
});