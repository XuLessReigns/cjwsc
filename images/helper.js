// 字符串转换JSON
function JSONparse(JsonString) {
    if ($.browser.msie) {
        if ($.browser.version == "7.0" || $.browser.version == "6.0") {
            var result = jQuery.parseJSON(Json);
        } else {
            var result = JSON.parse(Json);
        }
    } else {
        var result = JSON.parse(Json);
    }
    return result;
}

var getUrlByName = function (staticDomain, name, type) {
    if (arguments.length < 3) {
        var type = "image";
    } else {
        var type = arguments[2];
    }
    var path_a = name.substr(0, 2);
    var path_b = name.substr(2, 2);
    var path_c = name.substr(4, 2);
    return staticDomain + '/' + type + '/' + path_a + '/' + path_b + '/' + path_c + '/' + name;
}
var getNameByUrl = function (name) {
    var arr =name.split("/");
    var arrLen = arr.length;
    return  arr[arrLen-1];
};
var getThumbUrlByName = function (staticDomain, name, thumbType, type) {
    if (arguments.length === 3) {
        var type = 'image';
    }
    var picThumbArr = {};
    picThumbArr[1] = {
        'width': 58,
        'height': 58
    };
    picThumbArr[2] = {
        'width': 215,
        'height': 215
    };
    picThumbArr[3] = {
        'width': 452,
        'height': 452
    };
    picThumbArr[4] = {
        'width': 230,
        'height': 230
    };
    picThumbArr[5] = {
        'width': 230,
        'height': ''
    };
    picThumbArr[6] = {
        'width': 800,
        'height': 800
    };
    picThumbArr[7] = {
        'width': 160,
        'height': 160
    };
    if (!(picThumbArr[thumbType])) {
        return '';
    }
    // image flash media file
    var path_a = name.substr(0, 2);
    var path_b = name.substr(2, 2);
    var path_c = name.substr(4, 2);

    //获得文件扩展名
    //    $temp_arr = explode(".", $name);
    //    $file_name = $temp_arr[0];
    //    $file_ext = array_pop($temp_arr);
    //    $file_ext = trim($file_ext);
    //    $file_ext = strtolower($file_ext);
    var temArr = name.split(".");
    var file_name = temArr[0];
    var file_ext = temArr[1];
    return staticDomain + '/' + type + '/' + path_a + '/' + path_b + '/' + path_c + '/' + file_name + 'thumb' + picThumbArr[thumbType]['width'] + '_' + picThumbArr[thumbType]['height'] + '.' + file_ext;
};

function loadScript(url, callback) {
    var script = document.createElement("Script");
    script.type = "text/javascript";

    //IE 验证脚本是否下载完成
    if (script.readyState) {
        script.onreadystatechange = function() {
            //readyState属性有5种取值
            //uninitialized：初始状态
            //loading：开始下载
            //interactive：数据完成下载但尚不可用
            //complete：数据已经准备就绪
            //实际使用时，readyState的值并不像我们预想的那样有规律，实践发现使用readyState
            //最靠谱的方式是同时检查以下2个状态，只要其中1个触发，就认为脚本下载完成。
            if (script.readyState == "loaded" || script.readyState == "complete") {
                //移除事件处理器，确保事件不会处理2次
                script.onreadystatechange = null;
                callback();
            }
        };
    }

    //其他浏览器
    else {
        script.onload = function() {
            callback();
        };
    }

    script.src = url;
    //把新建的<Script>添加到<head>里比添加到<body>里更保险。
    document.getElementsByTagName("head")[0].appendChild(script);
}
var getLocalTime = function () {
    var type = '';
    var  t = arguments[0];
    if(arguments.length===2){
         type = arguments[1];
    }
    var now = new Date( parseInt(t) * 1000 );
    var year = now.getFullYear();
    var month = setSn(now.getMonth()+1);
    var date = setSn(now.getDate());
    var hour = setSn(now.getHours());
    var minute = setSn(now.getMinutes());
    var second = setSn(now.getSeconds());
    if(type){
        return  year+"-"+month+"-"+date; //年-月-日
    }
    return  year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; //年-月-日 时-分-秒

    function setSn(n){
        if(parseInt(n)<10) return "0"+n;
        return n;
    }
};

function alertLogin(){
    KISSY.use("module_page/sys_pop_login",function(S,Sys_pop_login){
        Sys_pop_login.show();
    });
}

function popConfirm(){
    var user_options = null;
    if(typeof arguments[0]==="object"){
       var  contents = '';
       user_options = arguments[0];
    }else{
      var  contents = arguments[0];
    }
    var cbExist = false;
    if(typeof arguments[arguments.length-1]==="function"){
         cbExist = true;
         cb = arguments[arguments.length-1];
    }


    KISSY.ready(function (S) {
        var srcPath = PUBLIC_URL + "/script/jin";
        S.config({
            packages: [
                {
                    name: "gallery",
                    path: srcPath,
                    charset: "utf-8"
                },
                {
                    name: "scripts4.0",
                    path: srcPath,
                    charset: "utf-8"
                }
            ]
        });
        KISSY.use("scripts4.0/module_components/pop_confirm",function(S,POPCONFIRM){

            var options = {
                title:"小提示",
                width:500,
                height:80,
                contentType:'text',
                content:'<div style="line-height: 80px;text-align: center;">'+contents+'</div>',
                confirmBtn: false,
                selector:"#popup_confirm",
                confirmCallback:function(){
                    cb();
                }
            };
            if(cbExist===true){
                options.confirmBtn = true;
                options.cancelBtn = true;
            }
            POPCONFIRM.init(options);
        });
    });

}

function selectAddress(cb){
    KISSY.ready(function (S) {
        var srcPath = PUBLIC_URL+"/script/jin";
        S.config({
            packages:[
                {
                    name:"gallery",
                    path:srcPath,
                    charset:"utf-8"
                },
                {
                    name:"scripts4.0",
                    path:srcPath,
                    charset:"utf-8"
                }
            ]
        });
        webConfig.addressBox = {};
        webConfig.addressBox.J_SetAddress1 =  webConfig.send_address;
        webConfig.addressBox.J_SetAddress2 =   webConfig.back_address;
        KISSY.use("node,scripts4.0/module_components/pop_confirm",function (S,Node,POPCONFIRM) {
            (function($){
                $(".J_SetAddress1,.J_SetAddress2").on("click",function(){
                    var last_click_address_box = null;
                    if($(this).hasClass("J_SetAddress1")){
                        last_click_address_box = 'J_SetAddress1';
                    }
                    if($(this).hasClass("J_SetAddress2")){
                        last_click_address_box = 'J_SetAddress2';
                    }
                    webConfig.last_click_address_box = last_click_address_box;
                    var options = {
                        title:"地址选择",
                        selector:"#J_SetAddressBox",
                        width:720,
                        height:200,
                        contentType:"link",
                        content:WWW_URL+'modules/get_module/firstwork/tshop-um-sys_address_list/index/1/default/?t='+new Date().getTime()+'&params={%22previewUser%22:false}',
                        confirmBtn: true,
                        cancelBtn:false,
                        confirmCallback:function(){
                            webConfig.addressBox[webConfig.last_click_address_box] =   $(".radio_address:checked").val();
                        }
                    };
                    POPCONFIRM.init(options);
                });
            })(Node.all);
        });
    });
}

/**
 *
 * @param option  option.type brand company all
 * @param cb
 */

function selectBrandSupp(option,cb){
    KISSY.ready(function (S) {
        var srcPath = PUBLIC_URL+"/script/jin";
        S.config({
            packages:[
                {
                    name:"gallery",
                    path:srcPath,
                    charset:"utf-8"
                },
                {
                    name:"scripts4.0",
                    path:srcPath,
                    charset:"utf-8",
                    tag:"201412230010003"
                }
            ]
        });
        var titleString = '';
        if(option.type==="brand"){
            titleString = '供应商品牌选择';
        }else if(option.type==="company"){
            titleString = '供应商选择';
        }else if(option.type==="all"){
            titleString = '供应商品牌选择';
        }
        KISSY.use("node,scripts4.0/module_components/pop_confirm,",function (S,Node,POPCONFIRM) {
            (function($){
                var options = {
                    title:titleString,
                    selector:"#J_SelectBrandSuppBox",
                    width:720,
                    height:500,
                    contentType:"link",
                    content:WWW_URL+'modules/get_module/firstwork/tshop-um-sys_company_brand_search/index/1/default/?t='+new Date().getTime()+'&params={%22previewUser%22:false,%22type%22:%22'+option.type+'%22}',
                    confirmBtn: true,
                    cancelBtn:true,
                    confirmCallback:function(){
                        var searchType  = $(".J_ComBrandSearchType").val();
                        var data = {};
                        webConfig.selectBrandSupp_Brand_id =  webConfig.tem_selectBrandSupp_Brand_id;
                        webConfig.selectBrandSupp_supplier_id =  webConfig.tem_selectBrandSupp_supplier_id;
                        if(searchType==="brand"){
                            data.brand_id = webConfig.selectBrandSupp_Brand_id;
                            data.supplier_id = webConfig.selectBrandSupp_supplier_id;
                        }else if(searchType==="company"){
                            data.supplier_id = webConfig.selectBrandSupp_supplier_id;
                        }
                        cb(data);
                    }
                };
                POPCONFIRM.init(options);
            })(Node.all);
        });
    });
}
function dateComponent(name, timeStamp){
    var end_hour = "";
    var end_minute = "";
    var ishour = "";
    var isminute = "";
    var readonly = false;
    if(arguments[2]&&(typeof arguments[2]!=="object")){
        end_hour = arguments[2];
    }
    if(arguments[3]&&(typeof arguments[3]!=="object")){
        end_minute = arguments[3];
    }
    if(arguments[4]&&(typeof arguments[4]!=="object")){
        ishour = arguments[4];
    }
    if(arguments[5]&&(typeof arguments[5]!=="object")){
        isminute = arguments[5];
    }
    if(arguments[6]&&(typeof arguments[6]!=="object")){
        readonly = arguments[6];
    }
    var options = null;
    if(typeof arguments[arguments.length-1]==="object"){
        options = arguments[arguments.length-1];
    }

    var string = '';

    if(options&& options.Calendar){
        var today = options.Calendar.DATE.stringify(timeStamp);
        var calendar = new options.Calendar({
            'container': options.obj
        });
        calendar.set('selectedDate', today);
        calendar.set('count', 1);
        calendar.render();
        webConfig.selectedDate = calendar.getSelectedDate();
        // 显示选择的日期及日期信息
        calendar.on('dateclick', function(e) {
            webConfig.selectedDate = e.date;
        });
        if(options.no_time_select===true){
            return '';
        }
    }else{

        if(readonly===false){
            if(options.kissyComponent ===true){
                var  J_Class= 'J_CalendarTrigger';
            }else{
                var  J_Class= 'txtTime';
            }
            string += '<input  class="txt      ' +J_Class+'  '+name+ '" type="text" name="' +name+ '"    value="';
            if(typeof timeStamp==="string"){
                string += timeStamp;
            }else{
                n_end =  timeStamp?getLocalTime(timeStamp,1):"";
                string += n_end;
            }
            string += '"/>';
        }else{
            n_end =  timeStamp?getLocalTime(timeStamp,1):"";
            string += '<span class="' +name+ '">'+n_end+'</span>';
        }

    }





    string +='&nbsp;';

    if(options){
        string += '<div class="self_time_selector">';
    }
    if (ishour == 1) {

        if(readonly===false){
            string += ' <select name="' +name + '_hour"  class="' +name + '_hour">';
        }

        var m = 0;

        for (var n = 0; n < 24; n++) {

            m = n < 10 ? ("0" + n) : n;


            if(readonly===false){
                string += '<option value="' + m + '"';

                isselect = end_hour == m ? "selected" : "";

                string += isselect;

                string += '>';

                string += m;

                string += '</option>';
            }else{
                if(end_hour == m){
                    string += '<span class="' +name + '_hour">'+m+'</span>';
                }
            }
        }
        if(readonly===false){
            string += '</select>';
        }

        string += ' 时 ';
    }

    if (isminute == 1) {


        if(readonly===false){
            string += '<select name="' +name+ '_minute" class="' +name+ '_minute">';
        }
        var m = 0;

        for (var n = 0; n < 60; n+=30) {

            m =  n < 10 ? ("0" +n) : n;


            if(readonly===false){
                string += '<option value="' +m + '"';

                isselect = end_minute == m ? "selected" : "";

                string += isselect;

                string += '>';

                string +=  m;

                string += '</option>';
            }else{
                if(end_minute == m){
                    string += '<span class="' +name+ '_minute">'+m+'</span>';
                }
            }
        }
        if(readonly===false){
            string += '</select>';
        }
        string += ' 分  ';
        string +='&nbsp;&nbsp;';
    }


    if(options){
        string += '</div>';
    }
    return string;
}

function getSimpleEditPop(options){
    var loadedCall = function(){};
    var  callback = function(){};
    if(arguments.length===3){
        callback = arguments[2];
        loadedCall= arguments[1];
    }else if(arguments.length===2){
        callback = arguments[1];
    }
    KISSY.use("node,ajax,scripts4.0/module_components/pop_confirm", function (S,Node, IO,POPCONFIRM) {
        var $ = Node.all;
        var width = 650;
        var height = 600;
        var loadedCallBack = function(kissy_common_popup_confirm){

            loadedCall();

            var popSelector = options.selector;
            /**
             * 绑定事件
             */
            var childs = $(popSelector+' .nav').children();
            childs.each(function(){
                $(this).on("click",function(){
                    var indexNum =  $(this).index();
                    $(popSelector+" .nav").children().each(function(){
                        $(this).removeClass('selected');
                    });
                    $(this).addClass("selected");

                    $(popSelector+" .panels").children().each(function(){
                        if($(this).index()===indexNum){
                            $(this).removeClass('hidden');
                            $(this).style('display','block');
                        }else{
                            $(this).addClass('hidden');
                            $(this).style('display','none');
                        }
                    });

                });
            });

            $(popSelector+" .J_TShowTitle,"+popSelector+" .J_TNotShowTitle").on("click",function(){
                var w = this;
                if($(w).val()==='true'){
                    $(w).parent().parent().children().each(function(){
                        if($(this).hasClass("J_TTitleInput")){
                            $(this).css("display","inline");
                        }
                    });
                }else{
                    $(w).parent().parent().children().each(function(){
                        if($(this).hasClass("J_TTitleInput")){
                            $(this).css("display","none");
                        }
                    });
                }
            });


            $(popSelector+" .J_itemSetTrigger").on("click",function(){
                var w = this;
                var self = $(w).parent();
                if($(self).hasClass("closed")){
                    $(self).removeClass("closed");
                }else{
                    $(self).addClass("closed");
                }
            });
            $(popSelector+'.auto-rec-form').attr('onsubmit',"return false;");





            $(popSelector+" .J_Btn-ok").on("click",function(){
               if(typeof editor!=="undefined"){
                    editor.sync();
                }
                callback();
                kissy_common_popup_confirm.destroy();
            });

        };
        options.loadedCallBack = loadedCallBack;
        options.width = 650;
        options.height = 600;
        POPCONFIRM.init(options);
    });
}







