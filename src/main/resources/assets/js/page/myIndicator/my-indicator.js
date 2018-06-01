$(document).ready(function () {
	$(".reset-add-js").on("click",function(event){
		window.location.href = "/gldata/myIndicator/toPageAddApply";
	});
	
	$(".reset-modify-js").on("click",function(event){
		window.location.href = "/gldata/myIndicator/toPageEditApply";
	});
	
	$(".reset-delete-js").on("click",function(event){
		window.location.href = "/gldata/myIndicator/toPageDeleteApply";
	});
	
	$(".reset-delete-data").on("click",function(event){
		window.location.href = "/gldata/myIndicator/toPageDataDeleteApply";
	});
	
	$(".reset-my-index").on("click",function(event){
		window.location.href = "/gldata/myIndicator/toPageMyIndicatorCount";
	});
});
