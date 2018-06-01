!function() {
    navconfig = window.navconfig || {};
    var defaultnav = [
        {
            name: "工作台",
            href:"http://mgt.mysteelcms.com/gzt/",
            icon: "fa fa-desktop",
            target: "_self"
        }
        ,{
            name: "报表",
            href:"",
            icon: "fa fa-th-list",
            dropdown: true,
            data:[
                {
                    gray:true,
                    name:"财务报表",
                    icon:"C",
                    href:"http://mgt.mysteelcms.com/bb-cw"
                }
                ,{
                    gray:true,
                    name:"短信报表",
                    icon:"D",
                    href:"http://mgt.mysteelcms.com/bb-dx"
                }
                ,{
                    name:"行情报表",
                    icon:"H",
                    href:"http://mgt.mysteelcms.com/bb-hq/"
                }
                ,{
                    gray:true,
                    name:"合同报表",
                    icon:"H",
                    href:"http://mgt.mysteelcms.com/bb-ht"
                }
                ,{
                    name:"会员报表",
                    icon:"H",
                    href:"http://mgt.mysteelcms.com/bb-hy"
                }
                ,{
                    gray:true,
                    name:"文章报表",
                    icon:"W",
                    href:"http://mgt.mysteelcms.com/bb-wz"
                }
                ,{
                    gray:true,
                    name:"运营报表",
                    icon:"Y",
                    href:"http://mgt.mysteelcms.com/bb-yy"
                }
            ]
        }
        ,{
            name: "资讯",
            href:"",
            icon: "fa fa-globe",
            dropdown: true,
            data:[
                {
                    name:"报表管理",
                    icon:"B",
                    href:"http://mgt.mysteelcms.com/zx-bbgl/"
                },
                {
                    name:"榜单管理",
                    icon:"B",
                    href:"http://mgt.mysteelcms.com/bdgl"
                }
                ,{
                    gray:true,
                    name:"短信管理",
                    icon:"D",
                    href:""
                }
                ,{
                    gray:true,
                    name:"行情管理",
                    icon:"H",
                    href:"",
                    //href:"http://mgt.mysteelcms.com/hqgl/"
                }
                ,{
                    name:"黑色产业链调研",
                    icon:"H",
                    href:"http://mgr.mysteelcms.com/black-mgt/myWorkbench/gotoWorkTask"
                }
                ,{
                    gray: true,
                    name:"库存管理",
                    icon:"K",
                    href:""
                }
                ,{
                    gray: true,
                    name:"手工管理",
                    icon:"S",
                    href:""
                }
                ,{
                    //gray: true,
                    name:"数据采集管理",
                    icon:"S",
                    //href:""
                    href:"http://mgt.mysteelcms.com/sjcjgl/index.htm"
                }
                ,{
                    name:"铁矿价格指数管理",
                    icon:"T",
                    href:"http://mgt.mysteelcms.com/tkjgzsgl/index.htm"
                }
                ,{
                    name:"文章采集管理",
                    icon:"W",
                    href:"http://mgt.mysteelcms.com/wzcjgl/index.htm"
                }
                ,{
                    name:"文章管理",
                    icon:"W",
                    href:"http://mgt.mysteelcms.com/wzgl"
                }
                ,{
                    gray: true,
                    name:"专题管理",
                    icon:"Z",
                    href:""
                }
                ,{
                    gray: true,
                    name:"指数管理",
                    icon:"Z",
                    href:""
                }
            ]
        }
        ,{
            name: "业务",
            href:"",
            icon: "fa fa-group",
            dropdown: true,
            data:[
                {
                    gray:true,
                    name:"合同管理",
                    icon:"H",
                    href:""
                }
                ,{
                    name:"MBS",
                    icon:"M",
                    href:"http://mgt.mysteelcms.com/mbs/checking/checking_futures_list.htm?from=changeMain6"
                }
                , {
                    name: "VIP信息服务",
                    icon: "V",
                    href: "http://mgt.mysteelcms.com/vipxxfw/index.htm"
                }
                ,{
                    gray: true,
                    name:"用户管理",
                    icon:"Y",
                    href:""
                }
                , {
                    name: "IP管理",
                    icon: "Y",
                    href: "http://mgt.mysteelcms.com/ipgl/index.htm"
                }
            ]
        }
        ,{
            name: "运营",
            href:"",
            icon: "fa fa-envelope",
            dropdown: true,
            data:[
                {
                    name:"广告管理",
                    icon:"G",
                    href:"http://mgt.mysteelcms.com/gggl"
                }
                ,{
                    name:"钢银可视化",
                    icon:"G",
                    href:"http://mgt-gt.mysteelcms.com/trade/index"
                }
                ,{
                    name:"工作管理",
                    icon:"G",
                    href:"http://mgt-yy.mysteelcms.com/dailywork/dailywork-list.ms?original=original"
                }
                ,{
                    gray: true,
                    name:"黑名单管理",
                    icon:"H",
                    href:""
                }
                ,{
                    name:"流量统计-百度",
                    icon:"L",
                    href:"http://mgt-yy.mysteelcms.com/visit/daily-analyse-report/daily-report"
                }
                ,{
                    name:"流量统计-手机版",
                    icon:"L",
                    href:"http://mgt-yy.mysteelcms.com/mobile"
                }
                ,{
                    name:"流量统计-主站",
                    icon:"L",
                    href:"http://mgt-yy.mysteelcms.com/webSite-static/flowanalysis"
                }
                ,{
                    name:"sitemap",
                    icon:"S",
                    href:"http://mgt.mysteelcms.com/outside/sitemap/"
                }
                ,{
                    name:"收入统计报表",
                    icon:"S",
                    href:"http://mgr.mysteelcms.com/income/ "
                }
                ,{
                    name:"投票管理",
                    icon:"T",
                    href:"http://mgt.mysteelcms.com/tpgl"
                }
                ,{ 
                    name:"违规图片查询",
                    icon:"W",
                    href:"http://mgt.mysteelcms.com/yygj/md5/"
                }
                ,{ 
                    name:"微信数据统计",
                    icon:"W",
                    href:"http://mgt.mysteelcms.com/wxsjtj"
                }
                ,{
                    name:"意见反馈",
                    icon:"Y",
                    href:"http://mgt.mysteelcms.com/yjfk/"
                }
            ]
        }
        ,{
            name: "产品",
            href:"",
            icon: "fa fa-sitemap",
            dropdown: true,
            data:[
                {
                    name:"钢联数据",
                    icon:"G",
                    href:"http://mgt-dc.mysteelcms.com"
                }
                ,{
                    name:"会展系统",
                    icon:"H",
                    href:"http://mgt-hz.mysteelcms.com/index.htm"
                }
                ,{
                    gray: true,
                    name:"手机版",
                    icon:"S",
                    href:""
                }
                ,{
                    name:"搜搜钢",
                    icon:"S",
                    href:"http://mgt-soso.mysteelcms.com/index.htm"
                }
                ,{
                    name:"英文站",
                    icon:"Y",
                    href:"http://mgt-net.mysteelcms.com/manager/"
                }
            ]
        }
        ,{
            name: "财务",
            href:"",
            icon: "fa fa-money",
            dropdown: true,
            //gray: true,
            data:[
                {
                    name:"会务管理",
                    icon:"H",
                    href:"http://mgt.mysteelcms.com/zc/"
                }
                ,{
                    gray:true,
                    name:"收入",
                    icon:"S",
                    href:""
                }
                ,{
                    gray: true,
                    name:"预算",
                    icon:"Y",
                    href:""
                }
            ]
        }
        ,{
            name: "系统",
            href:"http://mgt.mysteelcms.com/xt/",
            icon: "fa fa-wrench",
            dropdown: false
        }
    ];
    var resault = [];
    $.each( defaultnav, function(i, n){
        var _thishtml = '<li>',subitem = '',gray='',href='',dropdown='',dropdownicon='',target="_blank";
        if(defaultnav[i].gray){gray='gray'}
        if(defaultnav[i].target){target=defaultnav[i].target}
        if(defaultnav[i].href=='' || defaultnav[i].href=='#'){href='javascript:void(0);';target="_self"}
        else{href=defaultnav[i].href}
        if(defaultnav[i].dropdown){
            dropdown = 'data-toggle="dropdown"';
            dropdownicon = '<i class="dropdownicon fa fa-angle-down"></i>';
            subitem += '<ul class="dropdown-menu dropdown-danger themeprimary dropdown-arrow">';
            $.each( defaultnav[i].data, function(j, m){
                var thisgray = '',thishref='',thistarget="_blank";
                if(defaultnav[i].data[j].gray){thisgray='gray'}
                if(defaultnav[i].data[j].href=="" || defaultnav[i].data[j].href=='#'){thishref='javascript:void(0);';thistarget="_self"}
                else{thishref=defaultnav[i].data[j].href}
                subitem += '<li><a class="'+thisgray+'" href="'+thishref+'" target="'+thistarget+'"><i class="newicon">'+defaultnav[i].data[j].icon+'</i>'+defaultnav[i].data[j].name+'</a></li>';
            });
            subitem += '</ul>';
        }
        _thishtml += '<a class="dropdown-toggle" '+dropdown+' title="'+defaultnav[i].name+'" href="'+href+'" target="'+target+'"><i data-original-title="'+defaultnav[i].name+'" class="icon '+defaultnav[i].icon+' '+gray+'"></i><span class="text '+gray+'">'+defaultnav[i].name+'</span>'+dropdownicon+'</a>';
        _thishtml += subitem;
        _thishtml += '</li>';
        resault.push(_thishtml);
    });
    resault = resault.join("");
    $("#topnav").html(resault);

    /*nav右侧数据处理*/
    var topnavRight = $(".userinfo");
    //var callbacks = "jQuery" + Math.floor((Math.random().toFixed(2))*100);
    $.ajax({
        url: "/getUser",
        type:"get",
        success:function(data){
             var topnavRight_data = '<div class="navbar-account">'
                        +'<ul class="account-area pull-right">'
                            +'<li>'
                                +'<a class="home dropdown-toggle" title="我的钢铁" target="_blank" href="http://www.mysteel.com/">'
                                    +'<i class="icon fa fa-home"></i>'
                                    +'<span class="text">我的钢铁网</span>'
                                +'</a>'
                            +'</li>'
                            +'<li>'
                                +'<a class="home dropdown-toggle" title="意见反馈" target="_blank" href="http://mgt.mysteelcms.com/cpyjfk">'
                                    +'<i class="icon fa fa-comment"></i>'
                                    +'<span class="text">意见反馈</span>'
                                +'</a>'
                            +'</li>'
                            +'<li>'
                                +'<a class="home dropdown-toggle" title="Tasks" target="_blank" href="http://mgt.mysteelcms.com/xx?url=toEmitPage">'
                                    +'<i class="icon fa fa-bell-o"></i>'
                                    +'<span class="text">消息</span>'
                                +'</a>'
                            +'</li>'
                            +'<li>'
                                +'<a class="login-area dropdown-toggle" data-toggle="dropdown">'
                                    +'<div class="avatar" title="View your public profile">'
                                        +'<img src="http://a.mysteelcdn.com/libs/mysteelUI/assets/img/avatars/adam-jansen.jpg">'
                                    +'</div>'
                                    +'<section class="minW">'
                                        +'<h2><span class="profile">'+data.name+'</span></h2>'
                                    +'</section>'
                                +'</a>'
                                +'<ul class="pull-right dropdown-menu dropdown-arrow dropdown-login-area">'
                                    +'<li class="edit">'
                                        +'<a href="http://mgt.mysteelcms.com/grzx" target="_blank">个人中心</a>'
                                    +'</li>'
                                    +'<li class="edit">'
                                        +'<a href="/login">'
                                            +'<i class="icon glyphicon glyphicon-off"></i>'
                                            +'<span class="text">退出</span>'
                                        +'</a>'
                                    +'</li>'
                                +'</ul>'
                            +'</li>'
                        +'</ul>'
                    +'</div>';
             topnavRight.html(topnavRight_data);        
        },
        error:function(){
            console.log("系统异常");
        }
    });
    
    // 点击空白处隐藏下拉框
    $("#main_frame").load(function() { 
        frameclick();
    }); 

    function frameclick(){
        if($("#main_frame").contents().length>0){
            $("#main_frame").contents().click(function(event){  
                $("#topnav li.open").removeClass("open");
            });
        }
    }
}();