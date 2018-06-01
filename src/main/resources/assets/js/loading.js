
/**
 * Created by zcb on 2017-02-13.
 * for sync load data
 */


var loading =  {
	start:function(){
		$(".modal-loading").remove();
		$("body").append('<div class="modal-loading modal-backdrop fade in"  title="loading" style="display: block;background: #000 url(/gldata/assets/img/loading.gif) no-repeat 50% 50%;"></div>');
	},
	end:function(){
		$(".modal-loading").remove();
	}
};

$.extend({
	loading:loading,
	});
