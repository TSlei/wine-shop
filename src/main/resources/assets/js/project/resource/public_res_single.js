var InitiateSimpleDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#simpledatatable').dataTable({
                "sDom": "t<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
                "iDisplayLength": 10,
                
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

