KISSY.add(function (S,JSON, Node, IO, DataLazyload, loadWidget) {
    var $ = Node.all;
    var Dom = S.DOM;
    /* 各模块具体的js代码{{{ */
    loadWidget.functions.loadWidget(".J_TWidget");
    window.createPopEdit = function (regionWidth, moduleHeight) {
        var editHtml = '<div class="bar" style="display: block; height: ' + moduleHeight + 'px;">\
        <div class="barbd" style="height:' + (moduleHeight + 2) + 'px; width:' + (regionWidth - 2) + 'px;"></div>\
        <div class="baracts">\
       <a class="ds-bar-lock" href="javascript:void(0);"><span>&nbsp;</span></a> \
       <a class="ds-bar-edit" href="javascript:void(0);"><span>&nbsp;</span></a>\
       <a class="ds-bar-del" href="javascript:void(0);"><span>&nbsp;</span></a>\
       <a class="ds-bar-add" href="javascript:void(0);"><span>&nbsp;</span></a>\
        </div>\
        </div>';
//        <a class="ds-bar-moveup" href="javascript:void(0);"><span>&nbsp;</span></a>\
//       <a class="ds-bar-movedown" href="javascript:void(0);"><span>&nbsp;</span></a>\
        return editHtml;
    };
    if(webConfig.module_debug===true){
        $(".J_TModule").each(function () {
            if(!$(this).hasClass("J_TEmptyBox")){
                var editHtml = createPopEdit($(this).width(), $(this).height());
                $(this).append(editHtml);
            }
        });
    }



    window.ajaxGetModule = function (templateDirectory,moduleName, positionId, shopModuleId) {
        var previewUser = webConfig.previewUser;
        if (previewUser) {
            previewUser = '/' + previewUser;
        } else {
            previewUser = '/0';
        }
        var moduleParams  = webConfig.moduleParams||'';
        if(moduleParams){
            moduleParams = KISSY.JSON.stringify(moduleParams);
            var moduleParamsString = '&params='+moduleParams;
        }else{
            var moduleParamsString = '';
        }
        var fromLayout = '';
        if(arguments.length===5){
            fromLayout = arguments[4];
        }
        var regionWidth = '';
        if(arguments.length===6){
           regionWidth = arguments[5];
        }
        if(!regionWidth){
            regionWidth = webConfig.regionWidth;
        }
        var json_type = fromLayout;
        if (json_type !== "header" && json_type !== "footer") {
            json_type = webConfig.pageFileName || 'index';
        } else if (json_type === "header") {
            json_type = webConfig.head_json_name;
        } else if (json_type === "footer") {
            json_type = webConfig.foot_json_name;
        }
        IO.get(WWW_URL+'modules/get_module/'+templateDirectory+'/' + moduleName + '/'+json_type+'/' + positionId + '/default' + previewUser + '/_/'+regionWidth+'?t=' + new Date().getTime()+moduleParamsString, function (data) {
            var shopModuleItem  = $("#shopModuleId" + shopModuleId);
            shopModuleItem.html(data,true);
            shopModuleItem.removeAttr('style');
            shopModuleItem.removeClass('module_load');
            if(webConfig.module_debug===true){
                var editHtml = createPopEdit(shopModuleItem.width(),shopModuleItem.height());
                shopModuleItem.append(editHtml);
            }
            loadWidget.functions.loadWidget(".J_TWidget",moduleName);
        }, "html");
    };
    if($("#content").length>0){
        var selector = "#page";
        if($("#sidebar").length>0){
            var selector = "#wrapper";
        }
        var d = new DataLazyload(
            [
                Dom.get(selector)
            ],
            {
                diff: {
                    bottom: 10,
                    top: -10
                }
            }
        );
        DataLazyload.loadCustomLazyData( Dom.get(selector), "img");
    }

    $("#content").delegate("click",".J_BrandFollow",function(e){
        var w = $(e.currentTarget);
        if(webConfig.isUserLogin==1){
            var postData = {};
            postData.brand_id = $(w).attr('data-id');
            IO.post("/member/ajax/follow",postData,function(data){
                tipsBox(data.msg);
            },"json");
        }else{
            webConfig.tip_notice="请登录会员账号";
            alertLogin();
        }
    });
    $("#content").delegate("click",".J_ProductFollow",function(e){
        var w = $(e.currentTarget);
        if(webConfig.isUserLogin==1){
            var postData = {};
            postData.product_id = $(w).attr('data-id');
            IO.post("/member/ajax/followP",postData,function(data){
                tipsBox(data.msg);
            },"json");
        }else{
            webConfig.tip_notice="请登录会员账号";
            alertLogin();
        }
    });

    /* 各模块具体的js代码}}} */
}, {
    requires: ["json","node", "ajax", "gallery/datalazyload/1.0.1/index", "./init_widget_base.js"]
});
