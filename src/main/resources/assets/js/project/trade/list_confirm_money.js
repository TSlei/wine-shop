
//待确认收款列表
var IistConfirmMoneyDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#list-confirm-money').dataTable({
                "sDom": "t<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
                "iDisplayLength": 6,
                
                "language": {
                    "search": "",
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "上一页",
                        "sNext": "下一页"
                    }
                },
                "aoColumns": [
                null,
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false }
                ],

                "aaSorting": []
            });

        }

    };
}();
//待确认收款列表-确认收款
var ConfirmMoneyDataTable1 = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#detail-confirm-money').dataTable({
                "sDom": "t<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
                "iDisplayLength": 6,
                
                "language": {
                    "search": "",
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "上一页",
                        "sNext": "下一页"
                    }
                },
                "aoColumns": [
                
                  { "bSortable": false },
                  null,
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false }
                ],

                "aaSorting": []
            });

        }

    };
}();
 $(".select-all").click(function(){              
     if ($(this).is(":checked")){ 
        $(".select-single").prop("checked", true);
        $(".select-all").prop("checked", true); 
         } else {  
          $(".select-single").removeAttr("checked", false);
          $(".select-all").removeAttr("checked", false);
         }
   });
