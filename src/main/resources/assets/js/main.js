var mainModule = function () {
  Date.prototype.dateformat = function (format) {
    var o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  };
};


mainModule.prototype = {
  init: function () {
    this.showtab();
    this.autowindow();
    //this.frameclick();
  },
  frameclick: function () {
    $(function () {
      var _parent = $(window.top.document);
      if ($("#main_frame", _parent).length > 0) {
        $(document).on('click', function (event) {
          $("#main_frame", _parent).trigger("click")
        });
      }
    });
  },


  changemain: function (dom) {
    var _dom = dom || window.event.target;
    var thishref = _dom.href;
    if (thishref == ("javascript:void(0);" || "" || "#")) {
      thishref = _dom.getAttribute("datahref");
    } else if (typeof thishref === "undefined" && _dom.parentNode.tagName.toUpperCase() === 'A') {
      thishref = _dom.parentNode.href || _dom.parentNode.getAttribute("datahref");
    } else if (typeof thishref === "undefined" && _dom.parentNode.parentNode.tagName.toUpperCase() === 'A') {
      thishref = _dom.parentNode.parentNode.href || _dom.parentNode.parentNode.getAttribute("datahref");
    } else {
      thishref = _dom.href;
    }
    var mainFrame = document.getElementById("main_frame") || top.document.getElementById("main_frame");
    if (thishref && mainFrame) {
      //var lastlive = $(top.document.getElementById("breadcrumb"));
      //lastlive.find(".lastlive").remove();
      //lastlive.append('<li class="lastlive">'+$(_dom).text()+'</li>')
      //top.document.getElementById("breadcrumb").appendChild('<li>'+_dom.innerHTML+'</li>')
      mainFrame.src = thishref;
      return false;
    }
  },
  getQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  showtab: function () {
    /*    var _this = this;
    var localhash = _this.getQueryString("site");
    if(localhash){
      $(".nav-tabs li").removeClass('active');
      $(".tab-content .tab-pane").removeClass('active');
      var nav_tabs = $(".nav-tabs li a[href='#"+localhash+"']").parent();
      var nav_cont = $(".tab-content .tab-pane[id='"+localhash+"']");
      nav_tabs.addClass('active');
      nav_cont.addClass("active");
    }*/
    $(document).on("click", "#topnav > li > a",
      function (t) {
        var smalllist = $(this).parents("#topnav").prev(".login-area");
        if (smalllist.css("display") !== "none") {
          smalllist.parents(".show").addClass('open')
        }
      });
  },
  changeLevel: function () {
    $(top.document).find(".lastlive").remove();
  },
  autowindow: function () {
    $(function () {
      var _parent = $(window.parent.document);
      var _height = $("body").height();
      //var _width = $("body").width();
      if (_parent.length > 0 && $(".chanel_frame", _parent).length > 0 && $(".ztree", _parent).length > 0 && _height != 0) {
        var _index = $("#myTab9 li", _parent).index($("#myTab9 .active", _parent));
        var mainFrame = $(".chanel_frame", _parent).eq(_index);
        var ztree = $(".ztree", _parent).eq(_index);
        var tb = 0;
        if (ztree.prevAll(".topsearch").length > 1) { tb = 34; }
        // mainFrame.height(_height+34);
        // ztree.height(_height-tb);
        var stopjump = true;
        $(window).resize(function () {
          if (document.body.style.overflow != "hidden" && document.body.scroll != "no" && document.body.scrollHeight > document.body.offsetHeight && stopjump) {
            var _height = $("body").height();
            var _index = $("#myTab9 li", _parent).index($("#myTab9 .active", _parent));
            var mainFrame = $(".chanel_frame", _parent).eq(_index);
            var ztree = $(".ztree", _parent).eq(_index);
            _parent.find(".chanel_frame").height(_height + 34);
            _parent.find(".ztree").height(_height - tb);
          }
          setTimeout(function () {
            stopjump = document.body.scrollWidth == document.body.offsetWidth;
          }, 500)
        });
      }
    });
  }
};


var mainjs = new mainModule();
mainjs.init();














// ////////////////// 提出来页内js ///////////////////////////////////


function changemain(e) {
  var _dom = e || window.event.target;
  var thishref = _dom.href;
  if (thishref == ("javascript:void(0);" || "" || "#")) {
    thishref = _dom.getAttribute("datahref");
  } else if (typeof thishref === "undefined" && _dom.parentNode.tagName.toUpperCase() === 'A') {
    thishref = _dom.parentNode.href || _dom.parentNode.getAttribute("datahref");
  } else if (typeof thishref === "undefined" && _dom.parentNode.parentNode.tagName.toUpperCase() === 'A') {
    thishref = _dom.parentNode.parentNode.href || _dom.parentNode.parentNode.getAttribute("datahref");
  } else {
    thishref = _dom.href;
  }
  if (_dom.className.indexOf("level") >= 0) {
    $(_dom).parents(".ztree").find(".curSelectedNode").removeClass("curSelectedNode");
    _dom.className = _dom.className + " curSelectedNode";
  }
  var mainFrame = $(".chanel_frame").eq($("#myTab9 .active").index("li"));

  if (thishref && mainFrame) {
    //mainFrame.src = thishref;
    mainFrame.prop({
      src: thishref
    });
    return false;
  }
}

function getFont(treeId, node) {
  if (node.disable === true) {
    return { 'color': '#ccc' };
  } else {
    return node.font ? node.font : {};
  }
}

function setFontCss(treeId, treeNode) {
  return treeNode.level == 0 ? { color: "red" } : {};
}
function onClick(event, treeId, treeNode) {
  var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
  var nodes = zTree.getSelectedNodes();
  if (treeNode.disable === true) {
    zTree.cancelSelectedNode(nodes[0]);
  }
}




//文件上传
$("body").on("change", ".fn-upfile", function () {
  $(this).siblings().children('.fn-fileCover').val($(this).val());
});


//全选
$('.all_checked input[type="checkbox"]').click(function () {
  if ($(this).is(':checked')) {
    $(this).parents('body').find('.fn-check-all-table').eq($('.all_checked input[type="checkbox"]').index(this)).find('input[type="checkbox"]').each(function (i, v) {
      if ($(v).attr("disabled") == undefined) {
        $(v).prop('checked', 'true');
        $(v).attr('check', '1');
      }
    });
  } else {
    $(this).parents('body').find('.fn-check-all-table').eq($('.all_checked input[type="checkbox"]').index(this)).find('input[type="checkbox"]').removeAttr('checked');
    $(this).parents('body').find('.fn-check-all-table').eq($('.all_checked input[type="checkbox"]').index(this)).find('input[type="checkbox"]').removeAttr('check', '1')
  }
});




// 返回按钮
$(".fn-return").on("click", function () {
  //mainjs.changeLevel();
  window.history.go(-1);
});


// 选择框架
$(".fn-select-framework").on('click', function () {
  var _this = this;
  window.parent.bootbox.dialog({
    message: $("#frameworkModal").html(),
    title: "选择框架",
    lage: true,
    className: "modal-inverse",
    buttons: {
      success: {
        label: "确认",
        className: "btn-primary",
        callback: function () {
        }
      },
      cancel: {
        label: "取消",
        className: "btn-primary"
      }
    }
  });
});
// 提交提示
function fnSubmitTip() {
  bootbox.dialog({
    message: '<i class="fa fa-info-circle yellow margin-right-10 margin-left-30" style="font-size:36px; vertical-align:middle;"></i> 确定提交数据？',
    // title: "提示信息",
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "是",
        className: "btn-primary",
        callback: function () {
          fnSubmitSucTip()
          fnSubmitFailTip()
        }
      },
      cancel: {
        label: "否",
        className: "btn-primary",
        callback: function () { }
      }
    }
  });
}
// 提交成功
function fnSubmitSucTip() {
  bootbox.dialog({
    message: '<i class="fa fa-check-circle green margin-right-10 margin-left-30" style="font-size:36px; vertical-align:middle;"></i> 提交成功',
    // title: "提示信息",
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "是",
        className: "btn-primary",
        callback: function () { }
      },
      cancel: {
        label: "否",
        className: "btn-primary",
        callback: function () { }
      }
    }
  });
}
// 提交失败
function fnSubmitFailTip() {
  bootbox.dialog({
    message: '<i class="fa fa-times-circle red margin-right-10 margin-left-30" style="font-size:36px; vertical-align:middle;"></i> 提交失败',
    // title: "提示信息",
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "是",
        className: "btn-primary",
        callback: function () { }
      },
      cancel: {
        label: "否",
        className: "btn-primary",
        callback: function () { }
      }
    }
  });
}

// 删除
$("body").on("click", ".fn-del", function () {
  bootbox.dialog({
    message: '确定删除该选项',
    title: "确定删除",
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "确定",
        className: "btn-primary",
        callback: function () { }
      },
      cancel: {
        label: "取消",
        className: "btn-primary"
      }
    }
  });
});

// 驳回
$("body").on("click", ".fn-fail", function () {
  bootbox.dialog({
    message: '<form action="" class="fn-fail-form"><div class="form-group"><textarea class="form-control" rows="3" name="驳回理由" required data-bv-notempty-message="请填写必填项目"></textarea></div></form>',
    title: '驳回理由<span class="red">*</span>：',
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "确定",
        className: "btn-primary",
        callback: function () {
          $('.fn-fail-form').bootstrapValidator('validate');
          if ($('.fn-fail-form').data('bootstrapValidator').isValid()) {
          } else {
            return false;
          }
        }
      },
      cancel: {
        label: "取消",
        className: "btn-primary"
      }
    }
  });
  $('.fn-fail-form').bootstrapValidator({
    message: '输入错误，请重新输入'
  });
});

// 通过








// 批量操作之前提前
function fnCheckAllTip() {
  bootbox.dialog({
    message: '请选择相应的指标数据',
    title: "提示信息",
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "确定",
        className: "btn-primary",
        callback: function () { }
      }
    }
  });
}
// 批量通过
$("body").on("click", ".fn-pass-all", function () {
  var now_table = $(this).parents('body').find('.fn-check-all-table').eq($('.fn-pass-all').index(this));
  var ckeck = $(now_table).find('.checkbox input:checked');
  if (ckeck.length > 0) {
    var _this = this;
    bootbox.dialog({
      message: '确定批量通过所选项',
      title: "确定批量通过",
      className: "modal-inverse fn-sm",
      buttons: {
        success: {
          label: "确定",
          className: "btn-primary",
          callback: function () { }
        },
        cancel: {
          label: "取消",
          className: "btn-primary"

        }
      }
    });
  } else {
    fnCheckAllTip()
  }
});


// 驳回
$("body").on("click", ".fn-reject", function () {
  bootbox.dialog({
    message: '确定批量驳回所选项',
    title: '确定批量驳回',
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "确定",
        className: "btn-primary",
        callback: function () { }
      },
      cancel: {
        label: "取消",
        className: "btn-primary"

      }
    }
  })
});

// 批量驳回
$("body").on("click", ".fn-reject-all", function () {
  var now_table = $(this).parents('body').find('.fn-check-all-table').eq($('.fn-reject-all').index(this));
  var ckeck = $(now_table).find('.checkbox input:checked');
  if (ckeck.length > 0) {
    var _this = this;
    bootbox.dialog({
      message: '确定批量驳回所选项',
      title: '确定批量驳回',
      className: "modal-inverse fn-sm",
      buttons: {
        success: {
          label: "确定",
          className: "btn-primary",
          callback: function () { }
        },
        cancel: {
          label: "取消",
          className: "btn-primary"

        }
      }
    });
  } else {
    fnCheckAllTip()
  }
});

// 批量导入
$("body").on("click", ".fn-batch-import", function () {
  bootbox.dialog({
    message: $("#input-append-modal").html(),
    title: "批量导入",
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "确定导入",
        className: "btn-primary",
        callback: function () {
          var fnFile = $('.fn-fileCover').val();
          var excelFile = /^.*\.(?:xls|xlsx)$/i;
          if (fnFile == '' || fnFile == null || !excelFile.test(fnFile)) {
            bootbox.dialog({
              message: '请选择 excel 格式文件',
              title: "提示信息",
              className: "modal-inverse fn-sm",
              buttons: {
                success: {
                  label: "确定",
                  className: "btn-primary"
                }
              }
            })
          } else {
            fnImport()
          }
        }
      },
      cancel: {
        label: "取消返回",
        className: "btn-primary"
      }
    }
  });
});
// 批量排序
$("body").on("click", ".fn-batch-sort", function () {
  bootbox.dialog({
    message: $("#input-append-modal").html(),
    title: "批量排序",
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "确定导入",
        className: "btn-primary",
        callback: function () {
          var fnFile = $('.fn-fileCover').val();
          var excelFile = /^.*\.(?:xls|xlsx)$/i;
          if (fnFile == '' || fnFile == null || !excelFile.test(fnFile)) {
            bootbox.dialog({
              message: '请选择 excel 格式文件',
              title: "提示信息",
              className: "modal-inverse fn-sm",
              buttons: {
                success: {
                  label: "确定",
                  className: "btn-primary"
                }
              }
            })
          } else {
            fnImport2()
          }
        }
      },
      cancel: {
        label: "取消返回",
        className: "btn-primary"
      }
    }
  });
});
// 批量关联
$("body").on("click", ".fn-batch-linked", function () {
  bootbox.dialog({
    message: $("#input-append-modal").html(),
    title: "批量关联",
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "确定导入",
        className: "btn-primary",
        callback: function () {
          var fnFile = $('.fn-fileCover').val();
          var excelFile = /^.*\.(?:xls|xlsx)$/i;
          if (fnFile == '' || fnFile == null || !excelFile.test(fnFile)) {
            bootbox.dialog({
              message: '请选择 excel 格式文件',
              title: "提示信息",
              className: "modal-inverse fn-sm",
              buttons: {
                success: {
                  label: "确定",
                  className: "btn-primary"
                }
              }
            })
          } else {
            fnImport()
          }
        }
      },
      cancel: {
        label: "取消返回",
        className: "btn-primary"
      }
    }
  });
});
function fnImport() {
  bootbox.dialog({
    message: '导入成功<strong class="red">20</strong>条，预警<strong class="red">2</strong>条<br/>导入失败1条',
    title: "确定结果:",
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "确定",
        className: "btn-primary",
        callback: function () {
        }
      },
      down: {
        label: "下载失败日志",
        className: "btn-primary",
        callback: function () {
        }
      }
    }
  });
}
function fnImport2() {
  bootbox.dialog({
    message: '<i class="fa fa-check-circle green margin-right-10 margin-left-30" style="font-size:36px; vertical-align:middle;"></i> 导入成功',
    // title: "提示信息",
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "确定",
        className: "btn-primary",
        callback: function () { }
      }
    }
  });
}


// 批量 前端显示
$("body").on("click", ".fn-f-show-all", function () {
  var now_table = $(this).parents('body').find('.fn-check-all-table').eq($('.fn-pass-all').index(this));
  var ckeck = $(now_table).find('.checkbox input:checked');
  if (ckeck.length > 0) {
    ckeck.parents('tr').find('.fn-f-show-hock').text('前端显示');
  } else {
    fnCheckAllDisplay();
  }
});
// 批量 前端隐藏
$("body").on("click", ".fn-f-hide-all", function () {
  var now_table = $(this).parents('body').find('.fn-check-all-table').eq($('.fn-pass-all').index(this));
  var ckeck = $(now_table).find('.checkbox input:checked');
  if (ckeck.length > 0) {
    ckeck.parents('tr').find('.fn-f-show-hock').text('前端隐藏');
  } else {
    fnCheckAllDisplay();
  }
});

// 批量操作之前提前
function fnCheckAllDisplay() {
  bootbox.dialog({
    message: '请选择相应的信息',
    title: "提示信息",
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "确定",
        className: "btn-primary",
        callback: function () { }
      }
    }
  });
}

// reset
$('button[type="reset"]').click(function () {
  var fnText = $(this).parents('form').find('.select2-offscreen option:eq(0)').text();
  $(this).parents('form').find('.select2-choice').text(fnText);
});


// 提交
$("body").on("click", ".fn-submit", function () {
  bootbox.dialog({
    message: '<i class="fa fa-info-circle yellow margin-right-10 margin-left-30" style="font-size:36px; vertical-align:middle;"></i> 是否提交数据',
    // title: "确定提交",
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "是",
        className: "btn-primary",
        callback: function () { }
      },
      cancel: {
        label: "否",
        className: "btn-primary"
      }
    }
  });
});

// 下载模板
$("body").on("click", ".fn-down-template", function () {
  bootbox.dialog({
    message: '成功20条，失败10条',
    title: '确定结果',
    className: "modal-inverse fn-sm",
    buttons: {
      success: {
        label: "确定",
        className: "btn-primary",
        callback: function () { }
      },
      cancel: {
        label: "下载失败记录",
        className: "btn-primary",
        callback: function () { }
      }
    }
  });
});







// fn-select
$(".fn-select").select2();












// bootbox设置中文
bootbox.setDefaults({
  locale: "zh_CN",
});

//时间选择控件
$('.fn-date1-l').daterangepicker({
  "alwaysShowCalendars": true,
  'applyClass': 'btn-primary',
  'cancelClass': 'btn-primary',
  "opens": "left",
  "showDropdowns": true,
  'ranges': {
    '今天': [moment(), moment()],
    '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    '最近7日': [moment().subtract(6, 'days'), moment()],
    '最近30日': [moment().subtract(29, 'days'), moment()]
  },
  "startDate": moment(),
  "endDate": moment(),
}, function(start, end, label) {
});

$('.fn-date1-r').daterangepicker({
  "alwaysShowCalendars": true,
  'applyClass': 'btn-primary',
  'cancelClass': 'btn-primary',
  "opens": "right",
  "showDropdowns": true,
  'ranges': {
    '今天': [moment(), moment()],
    '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    '最近7日': [moment().subtract(6, 'days'), moment()],
    '最近30日': [moment().subtract(29, 'days'), moment()]
  },
  "startDate": moment(),
  "endDate": moment(),
}, function(start, end, label) {
});

$("body").on("mousedown", ".fn-date1-r-s", function () {
  $(this).daterangepicker({
    "format": 'YYYY-MM-DD',
    "singleDatePicker": true,
    'applyClass': 'btn-primary',
    'cancelClass': 'btn-primary',
    "startDate": moment(),
    "endDate": moment()
  });
});

$('.fn-date1').daterangepicker({
  singleDatePicker: true,
  'applyClass': 'btn-primary',
  'cancelClass': 'btn-primary',
  "startDate": moment(),
  "endDate": moment(),
}, function (start, end, label) {
	if(typeof selectCallBack == 'function'){
		setTimeout(function(){
			selectCallBack()
		},300);
	}
});

$('.fn-date-mindate').daterangepicker({
  singleDatePicker: true,
  'applyClass': 'btn-primary',
  'cancelClass': 'btn-primary',
  "startDate": moment(),
  "endDate": moment(),
  'minDate' : moment().format("YYYY/MM/DD")
}/*, function (start, end, label) {
	if(typeof selectCallBack == 'function'){
		setTimeout(function(){
			selectCallBack()
		},300);
	}
}*/);
$('.fn-date-mindate').on('apply.daterangepicker', function(ev, picker){
	if(typeof selectCallBack == 'function'){
		setTimeout(function(){
			selectCallBack()
		},300);
	}
});


function remoePercent(e){
	var re = new RegExp("%","g");
	$(e).val($(e).val().replace(re,""));
}
function remoeUnderLine(e){
	var re = new RegExp("_","g");
	$(e).val($(e).val().replace(re,""));
}
function onlyNumber(e){
	$(e).val($(e).val().replace(/[^\d]/g,""));
}

//$("body").on("keyup","input[type='text']",function(){
//	var re = new RegExp(" ","g");
//	$(this).val($(this).val().replace(re,""));
//});