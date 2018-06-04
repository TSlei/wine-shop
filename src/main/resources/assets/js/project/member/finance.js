//进项票管理列表
var financeTicketDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#sdt-ticket-manage').dataTable({
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
                  { "bSortable": false }
                ],

                "aaSorting": []
            });
        }
    };
}();
//添加进项票
var financeTicketnewDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#sdt-ticket-new').dataTable({
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
                  { "bSortable": false }
                ],

                "aaSorting": []
            });
        }
    };
}();
