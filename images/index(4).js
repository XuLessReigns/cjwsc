KISSY.use("button/assets/dpl.css");
var srcPath = PUBLIC_URL + "/script/jin";
KISSY.config({
    packages: [
        {
            name: "scripts4.0",
            path: srcPath,
            charset: "utf-8"
        }
    ]
});
KISSY.add('file_upload/sys_cate', function (S, JSON, Node, Tree, IO, Path) {
    KISSY.use("tree/assets/dpl.css");
    var $ = Node.all;
    webConfig.locationPath = webConfig.locationPath?webConfig.locationPath:"厂家网";
    var itemTpl1 = '<div class="item ui-widget-content" data-id="{}">\
        <div class="folder">\
        <div class="base-msg">\
            <div class="folder-msg">\
                <div class="without-img"></div>\
            </div>\
            <div title="{name}" class="folder-name"><div class="my_txt">{basename}</div></div>\
            <input type="text" value="{basename}" style="display: none;">\
            </div>\
        </div>\
        </div>';

//    <li title="复制图片" data-clipboard-text="" class="copy-pic"><span class="icon hover-clip"></span></li>\
//                        <li title="复制链接" data-clipboard-text="" class="copy-link"><span class="icon"></span></li>\
//                        <li title="复制代码" data-clipboard-text="" class="copy-code"><span class="icon"></span></li>\
    var itemTpl2 = '<div class="item ui-widget-content" data-id="{id}">\
        <div class="image">\
        <div class="base-msg">\
            <div class="img-container"><i></i><img alt="" src="{pic}"></div>\
                <div title="{name}" class="img-name"><div class="my_txt">{name}</div></div>\
                <input type="text" value="{name}" style="display: none;">\
                    <div class="qout icon"></div>\
                    <ul class="handle clearfix">\
                            <li title="复制链接" data-clipboard-text="" class="copy-link"><span class="icon">复制</span></li>\
                            <li title="删除图片" data-clipboard-text="" class="del-pic"><span class="icon">删除</span></li>\
                    </ul>\
                </div>\
                <div class="out">{extname}</div>\
                <div class="out">{width}x{height}</div>\
                <div class="out">{size}k</div>\
                <div class="out">{time}</div>\
                <div class="out J_FileName">{file_name}</div>\
            </div>\
        </div>';


    var self = {
        init: function () {
            self.functions.intTree();
            self.events();
            window.ajaxPage = self.functions.readDir;
        },
        events: function () {

            $("#sys_file_list_box").delegate("click",".folder-msg",function(e){
                webConfig.page = 1;
                var w = $(e.currentTarget);
                var folderName  = $(w).parent().one(".folder-name").text();
                var tempPath = webConfig.locationPath==="/"?"":webConfig.locationPath;
                webConfig.locationPath = tempPath+"/"+folderName;
                self.functions.loadToBackBtn();
                self.functions.readPathDir(function(){
                    self.functions.readDir();
                    $(".locationPathContent").html(webConfig.locationPath);
                });
            });

            $(".J_ToBackPath").on("click",function(){
                webConfig.locationPath = Path.dirname(webConfig.locationPath);
                self.functions.loadToBackBtn();
                self.functions.readPathDir(function(){
                    self.functions.readDir();
                    $(".locationPathContent").html(webConfig.locationPath);
                });

            });
        },
        functions: {
            loadToBackBtn:function(){
                if(Path.dirname(webConfig.locationPath)==="."){
                    $(".J_ToBackPath").hide();
                }else{
                    $(".J_ToBackPath").show();
                }
            },
            readPathDir: function (cb) {
                var hasCallBack = false;
                if(arguments.length>0&&typeof arguments[0]==="function"){
                     hasCallBack = true;
                }

                var toUrl = '';
                if(webConfig.isFromAdmin===true){
                    toUrl = ADMIN_URL;
                }else{
                    toUrl = API_URL;
                }

                var url = toUrl + 'fs/readpathdir';
                var tem_locationPathArr = webConfig.locationPath.replace(/^厂家网/, "");
                tem_locationPathArr = tem_locationPathArr.replace(/(^\/*)|(\/*$)/g,"");
                var postData = {path: tem_locationPathArr};
                new IO({
                    dataType: 'jsonp',
                    url: url,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        var pathContent = '';
                        $("#sys_file_list_box .path_item").remove();
                        $(".full_warm_content").remove();
                        if (data.error === false) {
                            S.each(data.msg,function(item,key){
                                item.basename = item.name;
                                pathContent += '<div class="path_item">';
                                pathContent += S.substitute(itemTpl1,item);
                                pathContent += '</div>';
                            });
                        } else {
//                            pathContent = '<div class="full_warm_content"><span>' + data.msg + '</span></div>';
                        }
                        $("#sys_file_list_box").append(pathContent);
                        if(hasCallBack===true){
                            cb();
                        }
                    }
                });
            },
            readDir:function(){
                if (arguments.length === 1) {
                    webConfig.page = arguments[0];
                }
                var toUrl = '';
                if(webConfig.isFromAdmin===true){
                    toUrl = ADMIN_URL;
                }else{
                    toUrl = API_URL;
                }
                var url = toUrl + 'fs/readdir';
                var tem_locationPathArr = webConfig.locationPath.replace(/^厂家网/, "");
                tem_locationPathArr = tem_locationPathArr.replace(/(^\/*)|(\/*$)/g,"");
                var postData = {path: tem_locationPathArr}
                webConfig.pageSize = 20;
                webConfig.page = webConfig.page?webConfig.page:1;
                postData.page = webConfig.page;
                postData.pageSize = webConfig.pageSize;
                new IO({
                    dataType: 'jsonp',
                    url: url,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        var pathContent = '';
                        $("#sys_file_list_box .file_item").remove();
                        $(".full_warm_content").remove();

                        if(data.error === true) {
                            pathContent = '<div class="full_warm_content"><span>' + data.msg + '</span></div>';
                            $("#sys_file_list_box").append(pathContent);
                            $("#J_PagesBottom").html("");
                            return;
                        }

                        var total = data.msg.total;
                        var data = data.msg.data;
                        S.each(data,function(item,key){
                            item.extname = Path.extname(item.file_name);
                            item.pic = getThumbUrlByName(STATIC_URL,item.file_name,7,"image");
                            item.name = item.nick_name?item.nick_name:item.file_name;
                            pathContent += '<div class="file_item">';
                            pathContent += S.substitute(itemTpl2,item);
                            pathContent += '</div>';
                        });
                        $("#sys_file_list_box").append(pathContent);
                        var pageObject = new pages_class(webConfig.pageSize , parseInt(webConfig.page), parseInt(total));
                        var pageContent = pageObject.fpage([3,4,5,6,7,8]);
                        $("#J_PagesBottom").html(pageContent);

                    }
                });
            },
            intTree: function () {
                var toUrl = '';
                if(webConfig.isFromAdmin===true){
                    toUrl = ADMIN_URL;
                }else{
                    toUrl = API_URL;
                }
                var url = toUrl + 'fs/gettree';
                var postData = {};
                new IO({
                    dataType: 'jsonp',
                    url: url,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error === false) {
                            var ajax_msg = data.msg;
                            self.childrenBox = [];
                            var data = {
                                content: "厂家网",
                                children: self.childrenBox
                            };
                            data.children = ajax_msg;
                            var tree = new Tree({
                                content: "厂家网",
                                isLeaf: false,
//                                showRootNode:false,
                                render: "#treeContainer"
                            });
                            tree.on("click", function (e) {
                                var node = e.target;
                                var id = node.get("id");
                                webConfig.page = 1;
                                if ($("#" + id).one(".ks-tree-node-row")) {
                                    var id = $("#" + id).one(".ks-tree-node-row").attr("id");
                                    var pathBox = [];
                                    try {
                                        self.functions.loopFindPath("#" + id, pathBox);
                                    } catch (e) {
                                        console.log(e);
                                    }
                                    webConfig.locationPath = pathBox.join("/");
                                    self.functions.loadToBackBtn();
                                    $(".locationPathContent").html(webConfig.locationPath);
                                    self.functions.readPathDir(function(){
                                        self.functions.readDir();
                                    });

                                }
                            });


                            tree.on("expand", function (e) {
                                var node = e.target;
                                var tem_locationPath = '';
                                if (!node.get("children").length) {
                                    webConfig.temPath = [];
                                    var id = node.get("id");
                                    if ($("#" + id).one(".ks-tree-node-row")) {
                                        var id = $("#" + id).one(".ks-tree-node-row").attr("id");
                                        var pathBox = [];
                                        try {
                                            self.functions.loopFindPath("#" + id, pathBox);
                                        } catch (e) {
                                            console.log(e);
                                        }
                                        tem_locationPath = pathBox.join("/");
                                    }
//                                    var temEvalString = 'ajax_msg';
//                                    var tem_locationPathArr = tem_locationPath.replace(/^厂家网/, "").split("/");
//                                    for (var k in tem_locationPathArr) {
//                                        if (tem_locationPathArr[k]) {
//                                            temEvalString += '["' + tem_locationPathArr[k] + '"]';
//                                        }
//                                    }
//                                    var getNodeData = data;
//
//                                    if (temEvalString != "ajax_msg") {
//                                        eval('var getNodeData = ' + temEvalString + ';');
//                                        var temp_p = [];
//                                        self.functions.loopFind(getNodeData, temp_p);
//                                        getNodeData = {"content": node.get("content"), "children": temp_p};
//                                    }

                                    var toUrl = '';
                                    if(webConfig.isFromAdmin===true){
                                        toUrl = ADMIN_URL;
                                    }else{
                                        toUrl = API_URL;
                                    }
                                    var url = toUrl + 'fs/gettree';
                                    var postData = {};
                                    var tem_locationPath  = tem_locationPath.replace(/^厂家网/, "");
                                    postData.path = tem_locationPath;
                                    new IO({
                                        dataType: 'jsonp',
                                        url: url,
                                        data: postData,
                                        jsonp: "jsonpcallback",
                                        success: function (data) {
                                            if (data.error === false) {
                                                var ajax_msg = data.msg;
                                                var  getNodeData = {"content": node.get("content"), "children": ajax_msg};
                                                var c = self.functions.getNode(getNodeData, node.get("content")).children;
                                                S.each(c, function (v) {
                                                    node.addChild(new Tree.Node({
                                                        isLeaf: !(v.children && v.children.length),
                                                        expanded: !(v.children && v.children.length),
                                                        content: v.content
                                                    }));
                                                });
                                            }
                                        }
                                    });









                                }
                            });

                            tree.render();
                        }
                    }
                });
            },
            getNode: function (node, content) {
                if (node.content == content) {
                    return  node;
                }
                var c = node.children || [];
                for (var i = 0; i < c.length; i++) {
                    var t = self.functions.getNode(c[i], content);
                    if (t) {
                        return t;
                    }
                }
                return null;
            },
            loopFind: function (data, p) {
                KISSY.each(data, function (val, key) {
                    var temp = {
                        'content': key
                    };
                    if (val.path && typeof val.path === "string") {
                        p.push(temp);
                        return;
                    } else {
                        temp.children = [];
                        self.functions.loopFind(val, temp.children);
                        p.push(temp);
                    }
                });
            },
            loopFindPath: function (selector, pathBox) {

                if ($(selector).one(".ks-tree-node-content")) {
                    pathBox.unshift($(selector).one(".ks-tree-node-content").text());
                    if ($(selector).parent().parent().prev() && $(selector).parent().parent().prev().hasClass(".ks-tree-node-row")) {
                        self.functions.loopFindPath("#" + $(selector).parent().parent().prev().attr("id"), pathBox);
                    }
                }

            }
        }
    };
//    self.init();
    return self;
}, {requires: ["json", "node", "tree", "ajax", "path"]});


KISSY.add('file_upload/sys_control', function (S, Node, Dom,IO, Button, POPCONFIRM, file_upload_sys_cate,gbPopUploadFun,UPLIST ) {
    var $ = Node.all;
    webConfig.locationPath = webConfig.locationPath?webConfig.locationPath:"厂家网";
    var D = S.DOM;
    var itemTpl1 = '<div class="item ui-widget-content" data-id="{}">\
        <div class="folder">\
        <div class="base-msg">\
            <div class="folder-msg">\
                <div class="without-img"></div>\
            </div>\
            <div title="{name}" class="folder-name"><div class="my_txt">{basename}</div></div>\
            <input type="text" value="{basename}" style="display: none;">\
            </div>\
        </div>\
        </div>';
    var self = {
        init: function () {
            self.events();
            var addPathBtn = new Button({
                content: "添加目录",
                render: "#button_container",
                tooltip: "点击我有惊喜~"
            });
            addPathBtn.render();
            // 绑定事件
            addPathBtn.on("click", function () {
                self.functions.addPathBtn_fun();
            });
            var uploadBtn = new Button({
                content: "上传文件",
                render: "#button_container",
                tooltip: "点击我有惊喜~"
            });
            uploadBtn.render();
            // 绑定事件
            uploadBtn.on("click", function () {
                if($("#popup_add_file_list .ks-overlay-content").children().length==0){
                    webConfig.fromPage = 'pop_upload';
                    UPLIST.init();
                }else{
                    D.get($("#popup_add_file_list .to-max")).click();
                }
            });
        },
        events: function () {
            // img-name


        },
        functions: {
            uploadBtn_fun: function (cb) {
//                webConfig.locationPath = webConfig.locationPath?webConfig.locationPath:"/";
//                var tableString = '<div style="padding-top:10px;" class="form r_t">\
//                                              <div style="padding: 0 20px;">\
//                                                       <span class="fr">当前目录：' + webConfig.locationPath + '</span>\
//                                                       <div class="clr"></div>\
//                                                       <div id="boxAlbumList" style=" margin-top:20px;height: 50px;color: #000000;font-size: 24px;line-height: 50px;text-align: center"></div>\
//                                                 </div>\
//                                     </div>';
//                webConfig.fromPage = 'pop_upload';
//                var options = {
//                    title: "开始上传",
//                    width: 500,
//                    height: 430,
//                    contentType: 'text',
//                    content: tableString,
//                    confirmBtn: false,
//                    cancelBtn: false,
//                    closed:false,
//                    selector: "#popup_add_file",
//                    confirmCallback: function () {
//
//                    },
//                    loadedCallBack: function () {
//                        if (!$("#boxAlbum_default").html()) {
//                            $("#boxAlbumList").prepend(createUpload("default"));
//                            gbPopUploadFun("photo", 'default');
//                            $("#boxAlbum_default").removeClass('hide');
//                        }
//                    }
//                };
//                POPCONFIRM.init(options);
            },
            addPathBtn_fun: function () {
                webConfig.pageJsonId = $(this).attr("data-id");
                var tableString = '<div style="padding-top:40px;" class="form r_t">\
                                            <table class="tb_attr w tc">\
                                                <thead>\
                                                    <tr class="bg tc"><td></td></tr>\
                                               </thead>\
                                                <tbody>\
                                                    <tr>\
                                                      <td>\
                                                         <div class="item">\
                                                            <label class="lab">目录名：</label>\
                                                            <div class="info">\
                                                            <input type="text" class="txt  J_PathName">（中文·英文·数字）\
                                                            <div style="height: 10px;"></div>\
                                                            <span>当前目录：</span>' + webConfig.locationPath + '</div>\
                                                        </div>\
                                                      </td>\
                                                   </tr>\
                                               </tbody>\
                                            </table>\
                                            </div >';
                var options = {
                    title: "新增目录",
                    width: 500,
                    height: 130,
                    contentType: 'text',
                    content: tableString,
                    confirmBtn: true,
                    cancelBtn: true,
                    selector: "#popup_add_path",
                    confirmCallback: function () {
                        var path =  $(".J_PathName").val();
                        var pathBaseName = path;
                        if (!path) {
                            popConfirm("目录名不能为空");
                            return;
                        }
                        var pathAdd = webConfig.locationPath.replace(/^厂家网/, "");
                        path = pathAdd + "/" + path;
                        var toUrl = '';
                        if(webConfig.isFromAdmin===true){
                            toUrl = ADMIN_URL;
                        }else{
                            toUrl = API_URL;
                        }
                        var url = toUrl + 'fs/mkdir';
                        var postData = {path: path};
                        new IO({
                            dataType: 'jsonp',
                            url: url,
                            data: postData,
                            jsonp: "jsonpcallback",
                            success: function (data) {
                                if (data.error === true) {
                                    popConfirm("操作失败：" + data.msg);
                                } else {
                                    $("#treeContainer").html("");
                                    file_upload_sys_cate.functions.intTree();
                                    popConfirm("操作成功");

                                    var pathContent = "";
                                    var item = {};
                                    item.basename = pathBaseName;
                                    pathContent += '<div class="path_item">';
                                    pathContent += S.substitute(itemTpl1,item);
                                    pathContent += '</div>';
                                    $("#sys_file_list_box").prepend(pathContent);
                                }
                            }
                        });
                    },
                    loadedCallBack: function () {
                    }
                };
                POPCONFIRM.init(options);
            }

        }
    };
//    self.init();
    return self;

}, {requires: ["node","dom", "ajax", "button", "scripts4.0/module_components/pop_confirm", "file_upload/sys_cate","scripts4.0/file_upload/upload","scripts4.0/file_upload/upload_list"]});


KISSY.add('file_upload/sys_file_list', function (S, Node,DOM, IO, Button, POPCONFIRM, file_upload_sys_cate) {

    var $ = Node.all;
    var D = S.DOM;
    var self = {
        init: function () {
            self.events();
        },
        events: function () {

            $("#sys_file_list_box").delegate("dblclick",".img-name,.folder-name",function(e){
                var w = $(e.currentTarget);
                var inputDom =  $(w).parent().one('input');
                inputDom.show();
                D.get(inputDom).focus();
            });
            $("#sys_file_list_box").delegate("focusout","input",function(e){
                var w = $(e.currentTarget);
                var txt  = $(w).val();
                /**
                 * itemType 1文件夹 2文件
                 */
               var fileType =  $(w).parent(".path_item")&&$(w).parent(".path_item").length>0?"path":"file";
                var tem_locationPathArr = webConfig.locationPath.replace(/^厂家网/, "");
                tem_locationPathArr = tem_locationPathArr.replace(/(^\/*)|(\/*$)/g,"");
                if(fileType==="path"){
                    var newPath = tem_locationPathArr+"/"+txt;
                    var toUrl = '';
                    if(webConfig.isFromAdmin===true){
                        toUrl = ADMIN_URL;
                    }else{
                        toUrl = API_URL;
                    }
                    var url = toUrl + 'fs/renamepath';
                    var txt2 =  $(w).parent(".path_item").one(".folder-name").text();
                    var oldPath =  tem_locationPathArr+"/"+txt2;
                    var postData = {oldPath:oldPath,newName:txt};
                }else{
                    var newFileName = tem_locationPathArr+"/"+txt;
                    var toUrl = '';
                    if(webConfig.isFromAdmin===true){
                        toUrl = ADMIN_URL;
                    }else{
                        toUrl = API_URL;
                    }
                    var url = toUrl + 'fs/renamefile';
                    var txt2 =  $(w).parent(".file_item").one(".img-name").text();
                    var fileName =  tem_locationPathArr+"/"+txt2;
                    var postData = {fileName:fileName,newName:txt};
                }

                new IO({
                    dataType: 'jsonp',
                    url: url,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error === true) {
                            popConfirm("操作失败：" + data.msg);
                        } else {
                            if(fileType==="path"){
                                $("#treeContainer").html("");
                                file_upload_sys_cate.functions.intTree();
                            }
                            popConfirm("操作成功");
                            $(w).parent().one(".my_txt").html(txt);
                            $(w).hide();
                        }
                    }
                });


            });



            $("#sys_file_list_box").delegate("mouseenter",".file_item",function(e){
                var w = $(e.currentTarget);
                $(w).one(".handle").show();

            });
            $("#sys_file_list_box").delegate("mouseleave",".file_item",function(e){
                var w = $(e.currentTarget);
                $(w).one(".handle").hide();
            });


            $("#sys_file_list_box").delegate("click",".del-pic",function(e){
                var w = $(e.currentTarget);
                var txt = $(w).parent(".image").one(".J_FileName").text();
                var tem_locationPathArr = webConfig.locationPath.replace(/^厂家网/, "");
                tem_locationPathArr = tem_locationPathArr.replace(/(^\/*)|(\/*$)/g,"");
                var fileName = tem_locationPathArr+"/"+txt;
                var toUrl = '';
                if(webConfig.isFromAdmin===true){
                    toUrl = ADMIN_URL;
                }else{
                    toUrl = API_URL;
                }
                var url = toUrl + 'fs/unlink';
                var postData = {fileName:fileName};





                popConfirm("您确定删除该文件吗",function(){

                    new IO({
                        dataType: 'jsonp',
                        url: url,
                        data: postData,
                        jsonp: "jsonpcallback",
                        success: function (data) {
                            if (data.error === true) {
                                popConfirm("操作失败：" + data.msg);
                            } else {
                                popConfirm("操作成功");
                                $(w).parent(".file_item").remove();
                                $(w).hide();
                            }
                        }
                    });

                });





            });

            $("#sys_file_list_box").delegate("click",".copy-link",function(e){
                var w = $(e.currentTarget);
                var linkContent = $(w).parent(".image").one(".J_FileName").text();
                linkContent = getUrlByName(STATIC_URL,linkContent,'image');

                var tableString = '<div style="padding-top:10px;" class="form r_t">\
                                              <div style="">\
                                                    <textarea style="margin:0 auto;display:block;padding: 20px;width: 400px;height: 180px;" class="txt" id="J_CopyPicContent">'+linkContent+'</textarea>\
                                                 </div>\
                                     </div>';
                var options = {
                    title: "复制图片链接",
                    width: 500,
                    height: 260,
                    contentType: 'text',
                    content: tableString,
                    confirmBtn: false,
                    cancelBtn: false,
                    selector: "#popup_copy_pic_link",
                    confirmCallback: function () {
                    },
                    loadedCallBack: function () {
                        D.get($("#J_CopyPicContent")).focus();
                    }
                };
                POPCONFIRM.init(options);

            });



        },
        functions: {
            readPathDir: function (cb) {
                file_upload_sys_cate.functions.readPathDir(cb);
            },
            readDir: function (cb) {
                file_upload_sys_cate.functions.readDir(cb);
            }
        }
    };
    self.init();
    return self;

}, {requires: ["node","dom", "ajax", "button", "scripts4.0/module_components/pop_confirm", "file_upload/sys_cate"]});