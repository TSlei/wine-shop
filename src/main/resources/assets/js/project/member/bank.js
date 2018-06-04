//银行管理列表
var bankDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#dstbank').dataTable({
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
                  { "bSortable": false }
                ],

                "aaSorting": []
            });
        }
    };
}();
//USBKEY信息列表
var usbkeyDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#dstusbkey').dataTable({
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
                  { "bSortable": false }
                ],

                "aaSorting": []
            });
        }
    };
}();
//操作员信息列表
var operatorDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#dstoperator').dataTable({
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
                  { "bSortable": false }
                ],

                "aaSorting": []
            });
        }
    };
}();
//银行账户管理列表
var accountDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#dstaccount').dataTable({
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
                  { "bSortable": false }
                ],

                "aaSorting": []
            });
        }
    };
}();

//前置机列表
var qzDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#dstqz').dataTable({
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
                  { "bSortable": false }
                ],

                "aaSorting": []
            });
        }
    };
}();

//基础服务列表
var basicDataTable = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#dsbasic').dataTable({
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
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();

//日志管理业务系统请求列表
var logywDataTable = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#dstlog_yw').dataTable({
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
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();
//日志前置机请求列表
var logqzDataTable = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#dstlog_qz').dataTable({
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
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();
//日志前置机请求列表
var reportDataTable = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#dstreport').dataTable({
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
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();
//账户黑名单
var blackDataTable = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#dstblack').dataTable({
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
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();
//账户白名单
var whiteDataTable = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#dstwhite').dataTable({
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
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();
//功能管理树状图
var UITree = function () {
	return {
        //main function to initiate the module
        init: function () {

            $(".tree-folder-header").click(function(){
            	$(this).siblings(".tree-folder-content").children(".tree-folder").toggle();
            	$(this).siblings(".tree-folder-content").children(".tree-item").toggle();
            	$(this).children("i").toggleClass(".fa-folder-open");
            });
            $(".tree-item").click(function(){
            	$(".tree-item").removeClass("tree-selected");
            	$(this).addClass("tree-selected");
            });
			
        }

    };
}();

/*
var UITree = function () {
    return {
        //main function to initiate the module
        init: function () {

            var DataSourceTree = function (options) {
                this._data = options.data;
                this._delay = options.delay;
            };

            DataSourceTree.prototype = {

                data: function (options, callback) {
                    var self = this;

                    setTimeout(function () {
                        var data = $.extend(true, [], self._data);

                        callback({ data: data });

                    }, this._delay)
                }
            };
            $(document).on('click', '.tree-folder-header', function(e){
            	$("#function_add").hide();
            	$("#function_file").show();
        	});
            $(document).on('click', '.tree-item', function(e){
            	$("#function_add").hide();
            	$("#function_file").show();
        	});
            // INITIALIZING TREE
            var treeDataSource = new DataSourceTree({
                data: [
                    { name: 'Sales', type: 'folder', 'icon-class':'blue', additionalParameters: { id: 'F1' } },
                    { name: 'Projects', type: 'folder', 'icon-class': 'success', additionalParameters: { id: 'F2' } },
                    { name: 'Reports', type: 'item', additionalParameters: { id: 'I1' } },
                    { name: 'Finance', type: 'item', additionalParameters: { id: 'I2' } }
                ]
            });
            $('#MyTree').tree({
                dataSource: treeDataSource,
                multiSelect: true
            });
        }

    };

}();
*/
//权限管理列表
var authorityDataTable = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#dstauthority').dataTable({
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
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();
//管理员授权列表
var authorizeDataTable = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#dstauthorize').dataTable({
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
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();
//管理员授权列表
var authorizeDataTable1 = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#dstauthorize1').dataTable({
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
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();
//管理员授权详细
var authorizeDataTable2 = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#dstauthorize2').dataTable({
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
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();