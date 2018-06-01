$(document).ready(function () {
	$('#chanel_frame', window.parent.document).attr("table-index",1);
	$("body").on("click",".tabbable .nav.nav-tabs li:not(.active) a",function(){
		$("#frameForm").attr("action",$(this).attr("url"));
		$("#frameForm").submit();
	})
});