function changeItems(index) {
	var currentItems = $("#onboardItems_" + index).val();
	var averageQty = $("#averageQty_" + index).val();
	var oldItems = $("#oldItems_" + index).val();

	if (MyNumber.minus(oldItems, currentItems, 4) < 0) {
		currentItems = oldItems;
		$("#onboardItems_" + index).val(oldItems);
	}
	var currentQty = MyNumber.mul(currentItems, averageQty);
	currentQty = parseFloat(currentQty).toFixed(4);

	$("#onboardQty_" + index).val(currentQty);
	$("#td_onboardQty_" + index).html(currentQty);

}

// 复选框全选
$('.select-all').click(function() {
	if ($(this).is(':checked')) {
		$('.select-single').prop('checked', true)
	} else {
		$('.select-single').prop('checked', false)
	}
});

// 批量定量
$("#bulkItems").click(function() {
	var checkboxs = $("#simpledatatable").find("tbody input[type=checkbox]");
	$.each(checkboxs, function(index, item) {
		if ($(item).is(":checked")) {
			// 当前velocityCount的值
			var velocityCount = index+1;
			// 当期页面定量
			var currentItems = $("#newItems").val();
			// 可供量
			var oldItems = $("#oldItems_" + velocityCount).val();
			// 件重
			var averageQty = $("#averageQty_" + velocityCount).val();
			// 如果超过可供量则显示可供量
			if (MyNumber.minus(oldItems, currentItems, 4) < 0) {
				$("#onboardItems_" + velocityCount).val(oldItems);
				// 页面显示的重量
				var currentQty = MyNumber.mul(oldItems, averageQty);
				$("#onboardItems_" + velocityCount).val(oldItems);
				$("#td_onboardQty_" + velocityCount).html(currentQty);
			} else {
				// 页面显示的重量
				var currentQty = MyNumber.mul(currentItems, averageQty);
				$("#onboardItems_" + velocityCount).val(currentItems);
				$("#td_onboardQty_" + velocityCount).html(currentQty);
			}
		}
	})
});

// 批量定价
$("#bulkPrice").click(function() {
	var checkboxs = $("#simpledatatable").find("tbody input[type=checkbox]");
	$.each(checkboxs, function(index, item) {
		if ($(item).is(":checked")) {
			// var curTr = $(item).parents("tr")[0];
			// var priceTd = $(curTr).find("td")[10];
			// var priceInput = $(priceTd).find("input");
			// $(priceInput).val($("#newPrice").val());
			$("#basePrice_" + (index+1)).val($("#newPrice").val());
		}
	})
});

// 批量浮动价格
$("#bulkFloatPrice").click(
		function() {
			var checkboxs = $("#simpledatatable").find(
					"tbody input[type=checkbox]");
			$.each(checkboxs, function(index, item) {
				if ($(item).is(":checked")) {

					// 当前勾选的浮动前的价格
					var oldPrice = $('#basePrice_' + (index+1) ).val();
					// 需要浮动的变量
					var float = $('#floatPrice').val();
					// 浮动后的价格
					var floatPrice = 0;
					if (oldPrice == '') {
						oldPrice = 0;
					}
					floatPrice = MyNumber.add(oldPrice, float, 2);
					if (floatPrice < 0) {
						alert("对不起，第" + (index+1) + "行价格已经小于0，请检查后再设定价格！");
						floatPrice = 0.00;
					}
					$('#basePrice_' + (index+1) ).val(floatPrice)
				}
			})
		});

function checkPrice(vObj) {
	var vNum = vObj.value.replace(/(^\s*)|(\s*$)/g, '');
	if (vNum == '') {
		vObj.value = '';
	} else if (vNum != '-' && isNaN(vNum)) {
		alert("对不起，输入价格必是有效数字（可最多含有两位小数）！");
		vObj.value = '';
		vObj.focus();
	}
}