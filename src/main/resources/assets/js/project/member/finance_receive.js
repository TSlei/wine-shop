//到账单备注页
var BillmemoDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#sdt-billmemo').dataTable({
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
//到账单列表页
var BilllistDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#sdt-billlist').dataTable({
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
//到账单异常列表页
var exBilllistDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#sdt-billlist-ex').dataTable({
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
//人工充值列表页
var ArtificialDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#sdt-artificial').dataTable({
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
//人工充值列表页
var BrechargeDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#sdt-buyers-recharge').dataTable({
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
//买家充值日志列表页
var BrechargeDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#sdt-buyers-recharge').dataTable({
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
//买家充值对账报告列表页
var BrechargeaccountDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#buyers-recharge-account').dataTable({
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
//买家充值对账报告列表详细页
var BaccountdetailDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#buyers-account-detail').dataTable({
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
//NC对账报告列表详细页
var NCaccountDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#NC-recharge-account').dataTable({
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
