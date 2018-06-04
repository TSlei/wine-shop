var InitiateEditableDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#editabledatatable').dataTable({
                
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
                ]
            });

            var isEditing = null;

            //Add New Row
            $('#editabledatatable_new').click(function (e) {
                e.preventDefault();
                var aiNew = oTable.fnAddData(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                        '<a href="javascript:;" class="btn btn-success btn-xs save"><i class="fa fa-edit"></i> 保存</a> <a href="javascript:;" class="btn btn-warning btn-xs cancel"><i class="fa fa-times"></i> 取消</a>'
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                isEditing = nRow;
            });

            //Delete an Existing Row
            $('#editabledatatable').on("click", 'a.delete', function (e) {
                e.preventDefault();

                if (confirm("确定要删除吗?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
                //alert("已删除!");
            });

            //Cancel Editing or Adding a Row
            $('#editabledatatable').on("click", 'a.cancel', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                } else {
                    restoreRow(oTable, isEditing);
                    isEditing = null;
                }
            });

            //Edit A Row
            $('#editabledatatable').on("click", 'a.edit', function (e) {
                e.preventDefault();

                var nRow = $(this).parents('tr')[0];

                if (isEditing !== null && isEditing != nRow) {
                    restoreRow(oTable, isEditing);
                    editRow(oTable, nRow);
                    isEditing = nRow;
                } else {
                    editRow(oTable, nRow);
                    isEditing = nRow;
                }
            });

            //Save an Editing Row
            $('#editabledatatable').on("click", 'a.save', function (e) {
                e.preventDefault();
                if (this.innerHTML.indexOf("保存") >= 0) {
                    saveRow(oTable, isEditing);
                    isEditing = null;
                    //Some Code to Highlight Updated Row
                }
            });


            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }

                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                //jqTds[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[3] + '">';
                jqTds[4].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[4] + '">';
                jqTds[5].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[5] + '">';
                jqTds[6].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[6] + '">';
                jqTds[7].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[7] + '">';
                jqTds[8].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[8] + '">';
                jqTds[9].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[9] + '">';
                jqTds[10].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[10] + '">';
                jqTds[11].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[11] + '">';
                jqTds[12].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[12] + '">';
                jqTds[13].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[13] + '">';
                jqTds[14].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[14] + '">';
                jqTds[15].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[15] + '">';
                jqTds[16].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[16] + '">';
                jqTds[17].innerHTML = '<a href="javascript:;" class="btn btn-success btn-xs save"><i class="fa fa-save"></i> 保存</a> <a href="javascript:;" class="btn btn-warning btn-xs cancel"><i class="fa fa-times"></i> 取消</a>';
            }

            function saveRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                //oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
                oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
                oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
                oTable.fnUpdate(jqInputs[7].value, nRow, 7, false);
                oTable.fnUpdate(jqInputs[8].value, nRow, 8, false);
                oTable.fnUpdate(jqInputs[9].value, nRow, 9, false);
                oTable.fnUpdate(jqInputs[10].value, nRow, 10, false);
                oTable.fnUpdate(jqInputs[11].value, nRow, 11, false);
                oTable.fnUpdate(jqInputs[12].value, nRow, 12, false);
                oTable.fnUpdate(jqInputs[13].value, nRow, 13, false);
                oTable.fnUpdate(jqInputs[14].value, nRow, 14, false);
                oTable.fnUpdate(jqInputs[15].value, nRow, 15, false);
                oTable.fnUpdate(jqInputs[16].value, nRow, 16, false);
                oTable.fnUpdate(jqInputs[17].value, nRow, 17, false);
                oTable.fnUpdate('<a href="javascript:;" class="btn btn-success btn-xs">上架</a> <a href="javascript:;" class="btn btn-info btn-xs edit"><i class="fa fa-edit"></i> 编辑</a> <a href="javascript:;" class="btn btn-danger btn-xs delete"><i class="fa fa-trash-o"></i> 删除</a>', nRow, 18, false);
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                //oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
                oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
                oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
                oTable.fnUpdate(jqInputs[7].value, nRow, 7, false);
                oTable.fnUpdate(jqInputs[8].value, nRow, 8, false);
                oTable.fnUpdate(jqInputs[9].value, nRow, 9, false);
                oTable.fnUpdate(jqInputs[10].value, nRow, 10, false);
                oTable.fnUpdate(jqInputs[11].value, nRow, 11, false);
                oTable.fnUpdate(jqInputs[12].value, nRow, 12, false);
                oTable.fnUpdate(jqInputs[13].value, nRow, 13, false);
                oTable.fnUpdate(jqInputs[14].value, nRow, 14, false);
                oTable.fnUpdate(jqInputs[15].value, nRow, 15, false);
                oTable.fnUpdate(jqInputs[16].value, nRow, 16, false);
                oTable.fnUpdate(jqInputs[17].value, nRow, 17, false);
                oTable.fnUpdate('<a href="javascript:;" class="btn btn-success btn-xs">上架</a> <a href="javascript:;" class="btn btn-info btn-xs edit"><i class="fa fa-edit"></i> 编辑</a> <a href="javascript:;" class="btn btn-danger btn-xs delete"><i class="fa fa-trash-o"></i> 删除</a>', nRow, 18, false);
                oTable.fnDraw();
            }
        }

    };
}();
