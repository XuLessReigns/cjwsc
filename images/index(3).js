var JQUERY = window.$;
KISSY.add('module_page/sys_top_link', function (S) {
    (function ($) {
        $(function () {
            $(".sc_box").on("mouseover", function () {
                $(this).children().last().css('display', 'block');
            });
            $(".sc_box").on("mouseleave", function () {
                $(this).children().last().css('display', 'none');
            });

            //返回顶部
            $('body').append('<p class="backtop" id="backTop"><i></i>返回顶部</p>');
            if ($(document).scrollTop() > $(window).height() / 2) $("#backTop").fadeIn(200);
            var bt = $("#backTop");
            bt.click(function () {
                $('html,body').animate({
                    scrollTop: 0
                }, 400);
            });
            $(window).scroll(function () {
                if ($(document).scrollTop() < $(window).height() / 2) {
                    bt.fadeOut(200);
                } else {
                    bt.fadeIn();
                }
            });
        });
    })(JQUERY);
});


KISSY.add('module_page/sys_top_link2', function (S) {
    (function ($) {
        $(function () {
            $(".sc_box").on("mouseover", function () {
                $(this).children().last().css('display', 'block');
            });
            $(".sc_box").on("mouseleave", function () {
                $(this).children().last().css('display', 'none');
            });

            if (webConfig.subsite_id === 0) {
                //返回顶部
                $('body').append('<p class="backtop" id="backTop"><i></i>返回顶部</p>');
                if ($(document).scrollTop() > $(window).height() / 2) $("#backTop").fadeIn(200);
                var bt = $("#backTop");
                bt.click(function () {
                    $('html,body').animate({
                        scrollTop: 0
                    }, 400);
                });
                $(window).scroll(function () {
                    if ($(document).scrollTop() < $(window).height() / 2) {
                        bt.fadeOut(200);
                    } else {
                        bt.fadeIn();
                    }
                });
            }

        });
    })(JQUERY);
});

KISSY.add('module_page/sys_banner', function (S) {
    (function ($) {
        $(".J_SearchBtn").on("click", function () {
            var queryVal = $(".J_SearchVal").val();
            location.href = '/query/0-1-' + queryVal + '-0-1.html';
        });
        $(".J_SearchVal").keyup(function (e) {
            if (e.keyCode == 13) {
                $(".J_SearchBtn").trigger('click');
            }
        });

    })(JQUERY);
});


KISSY.add('module_page/sys_top_search', function (S) {
    (function ($) {
        $(".tshop-pbsm-sys_top_search .J_SearchBtn").on("click", function () {
            var queryVal = $(".tshop-pbsm-sys_top_search .J_SearchVal").val();
            location.href = '/query2/index/0-1-' + queryVal + '-0-0-0-0-1.html';
        });
        $(".tshop-pbsm-sys_top_search .J_SearchVal").keyup(function (e) {
            if (e.keyCode == 13) {
                $(".tshop-pbsm-sys_top_search .J_SearchBtn").trigger('click');
            }
        });

    })(JQUERY);
});


KISSY.add('module_page/sys_top_search2', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;
    (function ($) {
        $(".tshop-pbsm-sys_top_search2 .J_SearchBtn").on("click", function () {
            var queryVal = $(".tshop-pbsm-sys_top_search2 .J_SearchVal").val();
            location.href = '/query2/index/0-1-' + queryVal + '-0-0-0-0-1.html';
        });
        $(".tshop-pbsm-sys_top_search2 .J_SearchVal").keyup(function (e) {
            if (e.keyCode == 13) {
                $(".tshop-pbsm-sys_top_search2 .J_SearchBtn").trigger('click');
            }
        });
        $('.hot a').live('click', function (event) {
            var w = event.currentTarget;
            var link = $(w).attr('href');
            var search_word = $(w).html();

            if (link == '#') {
                if (search_word !== '') {
                    var queryVal = delHtmlTag(search_word);
                    if (search_word != '') {
                        var url = '/query2/index/0-1-' + queryVal + '-0-0-0-0-1.html';
                        window.open(url);
                    }
                }
            }
        });
        $('.chenshi_list a').live('click', function (event) {
            var w = event.currentTarget;
            var subsite_id = $(w).attr('subsite');
            var province_id = $(w).attr('data-id');
            var select_name = $(w).html();

            getO2oCounts(subsite_id, province_id, select_name);
        });
        if (webConfig.tag_status == '1') {
            getO2oCounts(webConfig.subsite_id, webConfig.province_id, webConfig.subsite_name);
        }
    })(JQUERY);

    function getO2oCounts(subsite_id, province_id, select_name) {
        var url_subsite_home = '';
        var url_subsite_oto = '';

        if (province_id == 1 || province_id == '1') {
            url_subsite_home = WWW_URL + 'distribution';
            url_subsite_oto = WWW_URL + 'distribution';
        } else {
            url_subsite_home = WWW_URL + 'app_subsite/subsite_home?subsite_id=' + subsite_id + '&province_id=' + province_id;
            url_subsite_oto = WWW_URL + 'app_subsite/subsite_o2ostore?subsite_id=' + subsite_id + '&province_id=' + province_id;
        }

        //未切换分站
        $('#main_slide_enter_o2o').attr('href', WWW_URL + 'store');

        //切换分站启用
        //$('#main_slide_enter_o2o').attr('href', url_subsite_oto);
        $('#subsite_item_url').attr('href', url_subsite_home);
        $('#nearbyo2o').attr('href', url_subsite_oto);

        //分站启用切换
        //$('#main_slide_enter_o2o').html('进入' + select_name + '体验店');
        $('#main_slide_enter_o2o').html('进入O2O体验店');

        //当前选中店铺
        $('#current_city').html(select_name);
        if (province_id == 1) {
            $('#subsite_item_url').html('O2O全国');
            $('#current_subsite').html('全国');
        } else {
            $('#current_subsite').html(select_name + '站');
            $('#subsite_item_url').html(select_name + 'O2O专区');
        }
        if (subsite_id > 0 && province_id > 0) {
            var postData = {
                'province_id': province_id,
                'subsite_id': subsite_id
            };
            IO.post(WWW_URL + "ajaxrequest/ajax_get_o2o", postData, function (data) {
                var brandList = "";
                if (data.error === false) {
                    var msg = data.msg;
                    $('#main_slide_o2o').html('<span>' + select_name + data.msg + '家O2O店</span>');
                } else {
                    $('#main_slide_o2o').html(select_name + ',欢迎加盟O2O店');
                    return;
                }
            }, "json");
        }
    }

    function delHtmlTag(str) {
        return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
    }
}, {requires: ["node", "io"]});

//购物车头部搜索
KISSY.add('cart/sys_cart_search', function (S) {
    (function ($) {
        $(".ch_sys_cart_search .J_SearchBtn").on("click", function () {
            var queryVal = $(".ch_sys_cart_search .J_SearchVal").val();
            location.href = '/query2/index/0-1-' + queryVal + '-0-0-0-0-1.html';
        });
        $(".ch_sys_cart_search .J_SearchVal").keyup(function (e) {
            if (e.keyCode == 13) {
                $(".ch_sys_cart_search .J_SearchBtn").trigger('click');
            }
        });
    })(JQUERY);
});


KISSY.add('module_page/sys_recommend5', function (S) {
    (function ($) {
        //限时抢购
        $(function () {
            $(".snapup_list  .item").hover(function () {
                $(this).find(".info").animate({width: 120}, 300).find("dl").animate({left: 28}, 300);
            }, function () {
                $(this).find(".info").animate({width: 100}, 300).find("dl").animate({left: 18}, 300);
            });
        });
    })(JQUERY);
});

KISSY.add('module_page/sys_list_recommend', function (S, Node) {
    var NodeAll = Node.all;
    (function ($) {
        $("#content").delegate("click", ".J_RecommendClose", function (e) {
            var w = $(e.currentTarget);
            $(w).parent().parent().hide();
        });
    })(NodeAll);
}, {requires: ["node"]});

KISSY.add('module_page/sys_list_brands', function (S, Node) {
    var NodeAll = Node.all;
    (function ($) {
        $("#content").delegate("click", ".J_BrandMore", function (e) {
            var w = $(e.currentTarget);
            var obj = $(w).prev().first();
            if (obj.css('overflow') === "auto") {
                $(obj).scrollTop(0);
                obj.css('overflow', 'hidden');
            } else {
                obj.css('overflow', 'auto');
            }
        });
    })(NodeAll);
}, {requires: ["node"]});


KISSY.add('module_page/sys_cate_brand_select', function (S, Node) {
    var NodeAll = Node.all;
    (function ($) {
        $("#content").delegate("click", ".J_CateBrandMore", function (e) {
            var w = $(e.currentTarget);
            var obj = $(w).prev().last();
            if (obj.css('overflow') === "auto") {
                $(obj).scrollTop(0);
                obj.css('overflow', 'hidden');
            } else {
                obj.css('overflow', 'auto');
            }
        });
    })(NodeAll);

    (function ($) {
        $(".tshop-um-sys_cate_brand_select .J_SearchBtn").on("click", function () {
            if ($(".tshop-pbsm-sys_pro_search_list").length > 0) {
                sys_search_list_page(1);
            } else {
                ajaxPage(1);
            }

        });
        $(".tshop-um-sys_cate_brand_select .J_SearchVal").keyup(function (e) {
            if (e.keyCode == 13) {
                $(".tshop-um-sys_cate_brand_select .J_SearchBtn").trigger('click');
            }
        });

    })(JQUERY);
}, {requires: ["node"]});

KISSY.add('module_page/sys_cate_brand_attr_select', function (S, Node) {
    var NodeAll = Node.all;
    (function ($) {
        $("#content").delegate("click", ".J_CateBrandMore", function (e) {
            var w = $(e.currentTarget);
            var obj = $(w).prev().last();
            if (obj.css('overflow') === "auto") {
                $(obj).scrollTop(0);
                obj.css('overflow', 'hidden');
            } else {
                obj.css('overflow', 'auto');
            }
        });
//        $(".tshop-um-sys_cate_brand_attr_select .J_SearchBtn").on("click", function () {
//            if($(".tshop-pbsm-sys_pro_search_list").length>0){
//                sys_search_list_page(1);
//            }else{
//                ajaxPage(1);
//            }
//
//        });
//        $(".tshop-um-sys_cate_brand_attr_select .J_SearchVal").keyup(function (e) {
//            if (e.keyCode == 13) {
//                $(".tshop-um-sys_cate_brand_attr_select .J_SearchBtn").trigger('click');
//            }
//        });
    })(NodeAll);

}, {requires: ["node"]});

KISSY.add('module_page/sys_cate_brand_select_sync', function (S, Node, IO) {
    var NodeAll = Node.all;
    (function ($) {
        $("#content").delegate("click", ".J_CateBrandMore", function (e) {
            var w = $(e.currentTarget);
            var obj = $(w).prev().first();
            if (obj.css('overflow') === "auto") {
                $(obj).scrollTop(0);
                obj.css('overflow', 'hidden');
            } else {
                obj.css('overflow', 'auto');
            }
        });


        var runWaterBySelf = function () {
            pidBoxOnePage = {};
            webConfig.nowpage = 1;
            $("#J_PagesBottom").html("");
        };
        var showBrand = function () {
            $("#g_c_b_ls").html('');
            var postData = {};
            postData.supplier_id = webConfig.supplier_id;
            postData.cate_id = webConfig.cate_id;
            if ($("#g_c_l .cur").attr("data-type") == "2") {
                webConfig.from_type = 2;
            }
            postData.from_type = webConfig.from_type;

            IO.post(WWW_URL + "brand/getbrandbycate", postData, function (data) {
                var brandList = "";
                if (data.error === false) {
                    var msg = data.msg;
                    for (var key in msg) {
                        brandList += '<li data-id="' + key + '"><a href="javascript:void(0);" >' + msg[key] + '</a></li>';
                    }
                    $("#g_c_b_ls").html(brandList);
                }
            }, "json");
        };
        if (webConfig.cate_id) {
            showBrand();
        }

        $("#g_c_l a").on("click", function () {
            if ($(this).parent().hasClass("cur")) {
                $("#g_c_l li").removeClass("cur");
                webConfig.from_type = 1;
                webConfig.cate_id = webConfig.cate_sec_id;
            } else {
                $("#g_c_l li").removeClass("cur");
                $(this).parent().addClass("cur");
                webConfig.from_type = 3;
                webConfig.cate_id = $(this).parent().attr("data-id");
            }
            showBrand();
            runWaterBySelf();
        });


        $("#g_c_b_ls").delegate("click", "a", function (event) {
            var self = event.currentTarget;
            if ($(self).parent().hasClass("cur")) {
                $("#g_c_b_ls li").removeClass("cur");
            } else {
                $("#g_c_b_ls li").removeClass("cur");
                $(self).parent().addClass("cur");
            }
            waterConfig.brand_click = true;
            runWaterBySelf();
        });
    })(NodeAll);
}, {requires: ["node", "io"]});


KISSY.add('module_page/sys_recommend_slide', function (S) {
    (function ($) {
        //本周热销推荐
        $(function () {
            var recom = $("#J_recom_slide"),
                slide = recom.find(".slide"),
                w = slide.width(),
                ul = slide.find("ul"),
                len = ul.find("li").length,
                li_w = ul.find("li").outerWidth(true),
                page = Math.ceil(len * li_w / w),
                scw = w * (page - 1); //可滚动内容宽
            //右侧按钮
            slide.find(".slide_btn_rt").click(function () {
                if (ul.is(":animated")) return;
                var lf = ul.position().left - w;
                if (-lf > scw) {
                    if (lf + scw <= -w) {
                        lf = 0;
                    } else {
                        lf = -scw
                    }
                }
                sc(lf);
            });

            //左侧按钮
            slide.find(".slide_btn_lf").click(function () {
                if (ul.is(":animated")) return;
                var lf = ul.position().left + w;
                if (lf > 0) {
                    if (lf < w) {
                        lf = 0;
                    } else {
                        lf = -scw;
                    }
                }
                sc(lf);
            });

            function sc(lf) {
                ul.animate({left: lf}, 300);
                drag.css("left", -lf / scw * drag_w);
            }

            var scbar = recom.find(".scrollBar"),
                drag = scbar.find(".drag"),
                drag_w = scbar.width() - drag.width();

            //拖拽
            drag.mousedown(function (e) {
                var disx = e.clientX - $(this).position().left;
                $(document).mousemove(function (e) {
                    var x = e.clientX - disx;
                    if (x < 0) x = 0;
                    if (x > drag_w) x = drag_w;
                    var scale = -x / drag_w;
                    drag.css("left", x);
                    ul.css("left", scw * scale);
                });
                $(document).mouseup(function () {
                    $(document).unbind("mousemove mouseup");
                });
                return false;
            });
        });
    })(JQUERY);
});


KISSY.add('module_page/sys_color_recommend', function (S) {
    (function ($) {
        var nav = $("#zt_nav");

        /*$(window).bind("scroll resize", function () {
         ztNavPos();
         });

         function ztNavPos() {
         if ($(document).scrollTop() > t) {
         nav.css({position: "fixed", left: $(".newgoods").offset().left + 1230, top: 50});
         } else {
         $("#zt_nav").css({position: "absolute", left: 1230, top: 0});
         }
         }*/
        navPos(nav, $(".newgoods"));

        function navPos(nav, wrap, direction) {
            var t = nav.offset().top;
            var l = nav.offset().left;
            var post = nav.position().top;
            var posl = nav.position().left;
            var maxw = wrap.width() + nav.width() * 2;
            var direction = direction || "right";

            $(window).bind("scroll resize", function () {
                position();
            });

            function position() {
                var left = posl, top = post,
                    pos = "absolute", right = "auto",
                    st = $(document).scrollTop(),
                    flag = st > t,
                    tmd = 1;

                if (flag) {
                    pos = "fixed";
                    left = wrap.offset().left + posl;
                    top = 0;
                }

                if ($(window).width() < maxw) {
                    pos = "fixed";
                    if (direction == "left") {
                        left = 0;
                        right = "auto";
                    } else {
                        left = "auto";
                        right = 0;
                    }
                    tmd = 0.8;
                    if (!flag) {
                        top = t - st;
                    }
                }
                nav.css({position: pos, left: left, right: right, top: top, opacity: tmd});
            }
        }

        nav.find("li").click(function () {
            var t = $(".newgoods .cate").eq($(this).index()).offset().top;
            $("body,html").animate({ scrollTop: t }, 300);
        });
    })(JQUERY);
});

KISSY.add('module_page/sys_shop_cate_list', function (S) {
    (function ($) {
        $("#gz_brand_btn").click(function () {
            if (webConfig.isUserLogin == 1) {
                var postData = {};
                postData.brand_id = webConfig.brand_id;
                $.post("/member/ajax/follow", postData, function (data) {
                    if (data.error === false) {
                        var oldSum = $("#gz_brand_btn").parent().find('span').html();
                        $("#gz_brand_btn").parent().find('span').html(parseInt(oldSum) + 1);
                        var oldSum = $("#head_gz").next().html();
                        $("#head_gz").next().html(parseInt(oldSum) + 1);
                        tipsBox("关注成功");
                    } else {
                        tipsBox(data.msg, 1);
                    }
                }, "json");
            } else {
                webConfig.tip_notice = "请登录会员账号";
                alertLogin();
            }
        });
    })(JQUERY);
});


KISSY.add('module_page/sys_pop_login', function (S, IO, O, UA, Node, POPCONFIRM) {
        var $ = Node.all;
        (function ($) {
            //文本框聚焦隐藏默认值
            $(".txtfb").live('focus blur', function (e) {
                var v = this.defaultValue;
                if ($(this).attr('def')) v = $(this).attr("def");
                if (e.type == 'focusin') {
                    if (this.value == v) {
                        this.value = '';
                    }
                } else {
                    if (this.value == '') {
                        this.value = v;
                    }
                }
            });
        })(JQUERY);
        window.kissy_popup = {};
        var options_size = {width: 400, height: 370};
        var selector = '#popup_login_content';
        var showPop = {'show': function () {
            var options = {
                title: "您尚未登录",
                width: options_size.width,
                height: options_size.height,
                contentType: 'link',
                content: WWW_URL + "modules/get_module/firstwork/tshop-pbsm-sys_login3/index/1/default/?t=" + new Date().getTime(),
                confirmBtn: false,
                cancelBtn: false,
                selector: selector,
                loadedCallBack: function () {
                    webConfig.fromPage = 'sys_pop_login';
                    KISSY.use("module_page/sys_login", function (S, Sys_login) {
                        Sys_login.init();
                    });
                }
            };
            POPCONFIRM.init(options);


        }};

        return showPop;
    }, {requires: ["ajax", "overlay", "ua", "node", "scripts4.0/module_components/pop_confirm"]}
);


KISSY.add('module_page/sys_login', function (S, D) {
    return {"init": function () {
        (function ($) {
            formValid($("#box_lg"), function () {
                $("#box_lg").attr('disabled', 'disabled');
                var userName = $("#username").val();
                var userPwd = $("#password").val();
                var authNum = $("#validation").val();
                var captcha_id = $("#captcha_id").val();
                var postdata = {};
                postdata.userName = userName;
                postdata.userPwd = userPwd;
                postdata.authNum = authNum;
                postdata.captcha_id = captcha_id;
                postdata.referPage = webConfig.referPage;

                var url = "/user/dologin";
                $.post(url, postdata, function (data) {
                    $("#box_lg").removeAttr('disabled');
                    //var ret = $.parseJSON(data);
                    var ret = data;
                    if (ret.error === false) {

                        var userType = ret.msg.userType;
                        var userName = ret.msg.userName;
                        if (userType == 1) {
                            webConfig.isUserLogin = 1;
                            webConfig.loginRet = ret;
                            var back_link = '/member/member';
                            var orderLink = '/morder/m_order';
                        } else {
                            var back_link = '/supplier/supplier';
                            var orderLink = '/sorder/s_order';
                        }
                        if (webConfig.fromPage === "sys_pop_login") {
                            cart.islogin = "1";
                            cart.isUser = ret.msg.userType == 1 ? 1 : 0;
                            $('.top_user_info').html('<a href="' + back_link + '" class="c_org">' + userName + '</a><a href="/user/logout">退出</a>');
                            $('.top_order').find('a').attr('href', orderLink);

                            //$('.tshop-pbsm-sys_buy_goods2')
//                            $(".J_TopLinks").html(' <li>您好，欢迎光临厂家网!</li><li><a href="' + back_link + '" class="user_n">' + userName + '</a></li>\
//                            <li><a href="' + back_link + '" >个人中心</a></li>\
//                            <li><a href="/user/logout">退出</a></li>\
//                            <li><a href="' + orderLink + '">我的订单</a></li>');
                            $("#popup_login_content").remove();
                            tipsBox("登录成功");
                            //cart.refreshCartData();
                        } else {
                            var referrer = webConfig.referPage;
                            if (referrer == '')
                                referrer = '/';
                            location.href = referrer;
                        }
                    } else {
                        $("#J_PopLoading").remove();
                        $(".popWrap").remove();
                        if (ret.captcha === true)
                            captcha_refresh();
                        $('#backTips').show().html("登陆失败：" + ret.msg);
//                        if(ret.msg == '用户名错误' || ret.msg == '该账号不存在'){
//                            $('#error_ds').html(ret.msg).show();
//                        }
//                        if(ret.msg == '密码错误' || ret.msg == '验证码错误'){
//                            $('#error_dsp').html(ret.msg).show();
//                        }
//                        if(webConfig.fromPage === "sys_pop_login"){
//                            alert(ret.msg);
//                            //$('#backTips').html(ret.msg).show();
//                            //tipsBox(ret.msg);
//                        }
                        return;
                    }
                }, 'json');
            });

            $("#box_lg .txt").keyup(function (e) {
                if (e.keyCode == 13) {
                    $("#btn_lg").trigger('click');
                }
            });
            $('#password').on('mouseout', function () {
                $('#error_dsp').hide();
            });
        })(JQUERY);
    }};

});

KISSY.add('module_page/sys_refresh_cart', function (S, D) {
    return {'init': function () {
        (function ($) {

        })(JQUERY);
    }};
});

KISSY.add('module_page/sys_self_discount', function (S, IO, CommonUtils) {
    var $ = window.$;
    webConfig.activeType = webConfig.activeType ? webConfig.activeType : "self_discount_default";
    webConfig.fromPage = webConfig.fromPage ? webConfig.fromPage : "supplier";
    var self = {
        init: function () {
            self.events();
        },
        events: function () {
            $(".J_DiscountBtn").on('click', function () {
                var time_arr = null;
                var timeCheck = true;
                if (webConfig.isSubmit) {
                    return;
                } else {
                    webConfig.isSubmit = true;
                }


                if (webConfig.fromPage === 'admin') {
                    $(".time_list li").each(function () {
                        var startTime = $(this).find(".start_time").val();
                        var startHour = $(this).find(".start_time_hour").val();
                        var startMinute = $(this).find(".start_time_minute").val();

                        var endTime = $(this).find(".end_time").val();
                        var endHour = $(this).find(".end_time_hour").val();
                        var endMinute = $(this).find(".end_time_minute").val();

                        var ret = self.functions.checkTime(startTime, startHour, startMinute, endTime, endHour, endMinute);
                        if (ret === false) {
                            timeCheck = false;
                            webConfig.isSubmit = false;
                            return;
                        }
                        time_arr = ret;
                    });
                }

                if (timeCheck === false) {
                    webConfig.isSubmit = false;
                    return;
                }
                CommonUtils.getSigData(webConfig.product_id, function (err, data) {
                    if (err === true) {
                        tipsBox(data, 1);
                        return;
                    }
                    var timestamp = data.timestamp;
                    var sig = data.sig;
                    var postdata = $(".J_DiscountForm").serialize();
                    postdata += '&id=' + webConfig.product_id;
                    var objString = KISSY.JSON.stringify(time_arr);
                    postdata += '&time_arr=' + objString;
                    // eleven
                    postdata += '&activeType=' + webConfig.activeType;
                    postdata += '&fromPage=' + webConfig.fromPage;
                    var url = API_URL + 'activity/selfdiscount/sys_self_discount_add';
                    new IO({
                        dataType: 'jsonp',
                        url: url,
                        data: postdata + "&timestamp=" + timestamp + "&sig=" + sig,
                        jsonp: "jsonpcallback",
                        success: function (data) {
                            webConfig.isSubmit = false; // 如果不刷新才有效
                            if (data.error == false) {
                                tipsBox("设置产品打折时间成功");
                                var addSting = "&fromPage=" + webConfig.fromPage;
                                addSting += '&activeType=' + webConfig.activeType;
                                var url = WWW_URL + 'modules/get_module/firstwork/tshop-pbsm-sys_self_discount/index/1/default/_/_?id=' + webConfig.product_id + addSting;
                                self.functions.reflushModuleContent(webConfig.product_id, url);
                                return;
                            }
                            if (data.error == true) {
                                tipsBox(data.msg, 1);
                                webConfig.isSubmit = false;
                                return;
                            }
                        }
                    });


                });

            });

            $(".J_AddOneGroup").on("click", function () {

                var tpl = $("#time_tpl").html();
                var item = {};
                var now_time = new Date().getTime();
                now_time = parseInt(now_time / 1000);
                item.dateComponent1 = dateComponent('start_time', now_time, 0, 0, 1, 1, false, {kissyComponent: true});
                item.dateComponent2 = dateComponent('end_time', now_time, 0, 0, 1, 1, false, {kissyComponent: true});
                item.add_btn_class = '';
                if (webConfig.page_type === "add") {
                    item.add_btn_class = 'hide';
                }
                item.id = "";
                $(".time_list").append(S.substitute(tpl, item));
                self.functions.resetNo();
            });


            if (!webConfig.liveEvent) {
                webConfig.liveEvent = true;
                $(".J_DelTimeItem").live("click", function () {
                    var id = $(this).parents(".item").attr('data-id');
                    var pid = $(".J_DiscountForm").attr('data-id');
                    var postData = {};
                    postData.pid = pid;
                    postData.id = id;
                    if (!id) {
                        $(this).parents("li").remove();
                        return;
                    }
                    CommonUtils.getSigData(pid.toString() + id.toString(), function (err, data) {
                        if (err === true) {
                            tipsBox(data, 1);
                            return;
                        }
                        var timestamp = data.timestamp;
                        var sig = data.sig;
                        var url = API_URL + 'activity/selfdiscount/sys_self_discount_del';
                        postData.timestamp = timestamp;
                        postData.sig = sig;
                        new IO({
                            dataType: 'jsonp',
                            url: url,
                            data: postData,
                            jsonp: "jsonpcallback",
                            success: function (data) {
                                if (data.error === false) {
                                    tipsBox('操作成功');
                                    var addSting = "&fromPage=" + webConfig.fromPage;
                                    addSting += '&activeType=' + webConfig.activeType;
                                    var url = WWW_URL + 'modules/get_module/firstwork/tshop-pbsm-sys_self_discount/index/1/default/_/_?id=' + pid + addSting;
                                    self.functions.reflushModuleContent(pid, url);
                                } else {
                                    tipsBox('操作失败：' + data.msg, 1);
                                }
                            }
                        });
                    });
                });
                $(".J_AddTimeItem").live("click", function () {
                    var time_arr = null;
                    var parent = $(this).parents("li");
                    var id = $(this).parents(".item").attr('data-id');

                    var startTime = $(parent).find(".start_time").val();
                    var startHour = $(parent).find(".start_time_hour").val();
                    var startMinute = $(parent).find(".start_time_minute").val();

                    var endTime = $(parent).find(".end_time").val();
                    var endHour = $(parent).find(".end_time_hour").val();
                    var endMinute = $(parent).find(".end_time_minute").val();


                    var ret = self.functions.checkTime(startTime, startHour, startMinute, endTime, endHour, endMinute);
                    if (ret === false) {
                        return;
                    }
                    time_arr = ret;
                    var pid = $(".J_DiscountForm").attr('data-id');
                    var postData = {};
                    postData.pid = pid;
                    postData.id = id;
                    postData.time_arr = KISSY.JSON.stringify(time_arr);
                    var sig_string = '';
                    if (id) {
                        sig_string = pid.toString() + id.toString();
                    } else {
                        sig_string = pid.toString();
                    }
                    CommonUtils.getSigData(sig_string, function (err, data) {
                        if (err === true) {
                            tipsBox(data, 1);
                            return;
                        }
                        var timestamp = data.timestamp;
                        var sig = data.sig;
                        var url = API_URL + 'activity/selfdiscount/sys_self_discount_upset_time';
                        postData.timestamp = timestamp;
                        postData.sig = sig;
                        new IO({
                            dataType: 'jsonp',
                            url: url,
                            data: postData,
                            jsonp: "jsonpcallback",
                            success: function (data) {
                                if (data.error === false) {
                                    tipsBox('操作成功');
                                    if (webConfig.fromPage == "supplier") {
                                        var addSting = "&fromPage=supplier";
                                    } else {
                                        var addSting = "&fromPage=admin";
                                    }
                                    addSting += '&activeType=' + webConfig.activeType;
                                    self.functions.reflushModuleContent(pid, WWW_URL + 'modules/get_module/firstwork/tshop-pbsm-sys_self_discount/index/1/default/_/_?id=' + pid + addSting);
                                } else {
                                    tipsBox('操作失败：' + data.msg, 1);
                                }
                            }
                        });
                    });
                });
                $(".J_EditTimeItem").live("click", function () {

                    var parent = $(this).parents("li");
                    var id = $(this).parents(".item").attr('data-id');

                    var startTime = $(parent).find(".start_time").html();
                    var startHour = $(parent).find(".start_time_hour").html();
                    var startMinute = $(parent).find(".start_time_minute").html();

                    var endTime = $(parent).find(".end_time").html();
                    var endHour = $(parent).find(".end_time_hour").html();
                    var endMinute = $(parent).find(".end_time_minute").html();


                    var tpl = $("#time_tpl").html();
                    var item = {};
                    item.dateComponent1 = dateComponent('start_time', startTime, startHour, startMinute, 1, 1, false, {kissyComponent: true});
                    item.dateComponent2 = dateComponent('end_time', endTime, endHour, endMinute, 1, 1, false, {kissyComponent: true});
                    item.add_btn_class = '';
                    item.id = id;
                    $(parent).before(S.substitute(tpl, item));
                    $(parent).remove();
                });
            }

            var popSelector = '#tbWrap';
            $(popSelector + " .J_TShowTitle," + popSelector + " .J_TNotShowTitle").on("click", function () {
                var w = this;
                if ($(w).val() === 'true') {
                    $(w).parent().parent().children().each(function () {
                        if ($(this).hasClass("J_TTitleInput")) {
                            $(this).css("display", "inline");
                        }
                    });
                } else {
                    $(w).parent().parent().children().each(function () {
                        if ($(this).hasClass("J_TTitleInput")) {
                            $(this).css("display", "none");
                        }
                    });
                }
            });
        },
        functions: {
            "checkTime": function (startTime, startHour, startMinute, endTime, endHour, endMinute) {
                var time_arr = [];
                if (startTime == "" || startTime == null || startTime == "undefind") {
                    tipsBox("请填写开始时间", 1);
                    return false;
                }
                if (endTime == "" || endTime == null || endTime == "undefind") {
                    tipsBox("请填写结束时间", 1);
                    return false;
                }
                var timeStings = self.functions.GetDate(startTime, startHour, startMinute);
                var timeStings1 = self.functions.GetDate(endTime, endHour, endMinute);
                var timeArr = timeStings.split("|");
                var timeArr1 = timeStings1.split("|");
                var starttimestr = timeArr[0];
                var endtimestr = timeArr1[0];

                if (starttimestr == endtimestr) {
                    tipsBox("开始时间和结束时间不能够相等", 1);
                    return false;
                }
                if ((endtimestr - starttimestr) < 0) {
                    tipsBox("结束时间不能小于开始时间", 1);
                    return false;
                }

                var thirtyMin = 30 * 60 * 1000;
                if ((endtimestr - starttimestr) < thirtyMin) {
                    tipsBox("打折时间不能够低于30分钟,请重写选择时间！", 1);
                    return false;
                }
                time_arr.push({start: timeArr[1], end: timeArr1[1]});
                return time_arr;
            },

            "reflushModuleContent": function (pid, url) {
                CommonUtils.getSigData(pid, function (err, data) {
                    if (err === true) {
                        tipsBox(data, 1);
                        return;
                    }
                    var timestamp = data.timestamp;
                    var sig = data.sig;
                    var hrefData = url + "&timestamp=" + timestamp + "&sig=" + sig;
                    if (hrefData.indexOf("?") > -1) {
                        var combine_tag = "&";
                    } else {
                        var combine_tag = "?";
                    }
                    var findString = WWW_URL + 'modules/get_module/';
                    var paramsIndex = hrefData.indexOf(WWW_URL + 'modules/get_module/');
                    if (paramsIndex > -1) {
                        var strings = hrefData.substr(paramsIndex + findString.length);
                        var items = strings.split("/");
                        var templateDirectory = items[0];
                        var module_id = items[1];
                        var htdocsString = 'htdocs';
                        if (webConfig.isFromShop === true) {
                            htdocsString = 'htdocs_shop';
                        }
                        KISSY.getScript(PUBLIC_URL + htdocsString + "/" + templateDirectory + "/modules/" + module_id + "/assets/stylesheets/default.css?v=" + new Date().getTime());
                    }
                    IO.get(hrefData + combine_tag + "t=" + new Date().getTime(), '', function (data) {
                        var self = $("." + module_id).parent();
                        $("." + module_id).remove();
                        self.append(data);
                    });
                });
            },

            "GetDate": function (datestr, hour, min) {
                var year = "", month = '', day = '';
                if (datestr != "") {
                    var dateArr = datestr.split('-');
                    year = dateArr[0];
                    month = dateArr[1];
                    day = dateArr[2];
                }
                if (hour != "") {
                    hour = hour.split("时");
                    hour = hour[0];
                }
                if (min != "") {
                    min = min.split('分');
                    min = min[0];
                }
                var dateString = year + '/' + month + '/' + day + ' ' + hour + ":" + min + ":" + "00";
                var datestring = new Date(dateString).getTime();
                var dates = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + "00";
                return datestring + "|" + dates;
            },
            "resetNo": function () {
                var mm = 1;
                $(".J_No").each(function () {
                    $(this).html(mm);
                    mm++;
                });
            }
        }
    };
    return self;
}, {requires: ["ajax", "scripts4.0/common_utils/index"]});


KISSY.add('module_page/sys_item_price_setting', function (S, IO, CommonUtils) {
    var $ = window.$;
    webConfig.fromPage = webConfig.fromPage ? webConfig.fromPage : "supplier";
    var self = {
        init: function () {
            self.events();
        },
        events: function () {
            $(".J_ItemPriceDiscountBtn").on('click', function () {
                var time_arr = null;
                var timeCheck = true;
                if (webConfig.isSubmit) {
                    return;
                } else {
                    webConfig.isSubmit = true;
                }
                if (timeCheck === false) {
                    webConfig.isSubmit = false;
                    return;
                }
                CommonUtils.getSigData(webConfig.product_id, function (err, data) {
                    if (err === true) {
                        tipsBox(data, 1);
                        return;
                    }
                    var timestamp = data.timestamp;
                    var sig = data.sig;
                    var postdata = $(".J_DiscountForm").serialize();
                    postdata += '&id=' + webConfig.product_id;
                    // eleven
                    postdata += '&type=' + webConfig.sys_item_price_setting_type;
                    postdata += '&fromPage=' + webConfig.fromPage;
                    var url = API_URL + 'activity/college/sys_item_price_setting';
                    new IO({
                        dataType: 'jsonp',
                        url: url,
                        data: postdata + "&timestamp=" + timestamp + "&sig=" + sig,
                        jsonp: "jsonpcallback",
                        success: function (data) {
                            webConfig.isSubmit = false; // 如果不刷新才有效
                            if (data.error == false) {
                                tipsBox("设置产品打折时间成功");
                                var addSting = "&fromPage=" + webConfig.fromPage;
                                addSting += '&type=' + webConfig.sys_item_price_setting_type;
                                var url = WWW_URL + 'modules/get_module/firstwork/tshop-pbsm-sys_item_price_setting/index/1/default/_/_?id=' + webConfig.product_id + addSting;
                                self.functions.reflushModuleContent(webConfig.product_id, url);
                                return;
                            }
                            if (data.error == true) {
                                tipsBox(data.msg, 1);
                                webConfig.isSubmit = false;
                                return;
                            }
                        }
                    });
                });
            });


            $(".J_ItemPriceDiscountDelBtn").on('click', function () {
                var time_arr = null;
                var timeCheck = true;
                if (webConfig.isSubmit) {
                    return;
                } else {
                    webConfig.isSubmit = true;
                }
                if (timeCheck === false) {
                    webConfig.isSubmit = false;
                    return;
                }
                CommonUtils.getSigData(webConfig.product_id, function (err, data) {
                    if (err === true) {
                        tipsBox(data, 1);
                        return;
                    }
                    var timestamp = data.timestamp;
                    var sig = data.sig;
                    var postdata = '';
                    postdata += '&id=' + webConfig.product_id;
                    // eleven
                    postdata += '&type=' + webConfig.sys_item_price_setting_type;
                    postdata += '&fromPage=' + webConfig.fromPage;
                    var url = API_URL + 'activity/college/sys_item_price_setting_del';
                    new IO({
                        dataType: 'jsonp',
                        url: url,
                        data: postdata + "&timestamp=" + timestamp + "&sig=" + sig,
                        jsonp: "jsonpcallback",
                        success: function (data) {
                            webConfig.isSubmit = false; // 如果不刷新才有效
                            if (data.error == false) {
                                tipsBox("删除成功");
                                var addSting = "&fromPage=" + webConfig.fromPage;
                                addSting += '&type=' + webConfig.sys_item_price_setting_type;
                                var url = WWW_URL + 'modules/get_module/firstwork/tshop-pbsm-sys_item_price_setting/index/1/default/_/_?id=' + webConfig.product_id + addSting;
                                self.functions.reflushModuleContent(webConfig.product_id, url);
                                return;
                            }
                            if (data.error == true) {
                                tipsBox(data.msg, 1);
                                webConfig.isSubmit = false;
                                return;
                            }
                        }
                    });


                });

            });
        },
        functions: {
            "reflushModuleContent": function (pid, url) {
                CommonUtils.getSigData(pid, function (err, data) {
                    if (err === true) {
                        tipsBox(data, 1);
                        return;
                    }
                    var timestamp = data.timestamp;
                    var sig = data.sig;
                    var hrefData = url + "&timestamp=" + timestamp + "&sig=" + sig;
                    if (hrefData.indexOf("?") > -1) {
                        var combine_tag = "&";
                    } else {
                        var combine_tag = "?";
                    }
                    var findString = WWW_URL + 'modules/get_module/';
                    var paramsIndex = hrefData.indexOf(WWW_URL + 'modules/get_module/');
                    if (paramsIndex > -1) {
                        var strings = hrefData.substr(paramsIndex + findString.length);
                        var items = strings.split("/");
                        var templateDirectory = items[0];
                        var module_id = items[1];
                        KISSY.getScript(PUBLIC_URL + "htdocs/" + templateDirectory + "/modules/" + module_id + "/assets/stylesheets/default.css?v=" + new Date().getTime());
                    }
                    IO.get(hrefData + combine_tag + "t=" + new Date().getTime(), '', function (data) {
                        var self = $("." + module_id).parent();
                        $("." + module_id).remove();
                        self.append(data);
                    });
                });
            }
        }
    };
    return self;
}, {requires: ["ajax", "scripts4.0/common_utils/index"]});

KISSY.add('module_page/sys_recommend_to_top', function (S) {
    (function ($) {
        //  webConfig.default_top 默认具体顶部距离

        $(window).load(function () {
            $("#zt_nav2").show().css("top", $(".tshop_bd").height() + 10);
            var tit = '';
            $(".act_md .tit h3").each(function () {
                tit += '<li>' + this.innerHTML + '</li>';
            });
            $("#zt_nav2").append(tit);
            navPos($("#zt_nav2"), $(".act_md"));

            $("#zt_nav2 li").click(function () {
                var index = $(this).index();
                if (!index) return;
                var t = $(".act_md").eq($(this).index() - 1).offset().top;
                $("body,html").animate({ scrollTop: t }, 300);
            });
        });

        function navPos(nav, wrap, direction) {
            var t = nav.offset().top;
            var l = nav.offset().left;
            var post = nav.position().top;
            var posl = nav.position().left;
            var direction = direction || "right";

            $(window).bind("scroll resize", function () {
                position();
            });

            function position() {
                var maxw = wrap.width() + nav.width() * 2;
                var left = posl, top = post,
                    pos = "absolute", right = "auto",
                    st = $(document).scrollTop(),
                    flag = st > t,
                    tmd = 1;

                if (flag) {
                    pos = "fixed";
                    left = wrap.offset().left + posl;
                    top = 20;
                }
                if ($(window).width() < maxw) {
                    pos = "fixed";
                    if (direction == "left") {
                        left = 0;
                        right = "auto";
                    } else {
                        left = "auto";
                        right = 0;
                    }
                    tmd = 0.8;
                    if (!flag) {
                        top = t - st;
                    }
                }
                nav.css({position: pos, left: left, right: right, top: top, opacity: tmd});
            }
        }
    })(JQUERY);
});
KISSY.add('module_page/sys_recommend5_2', function (S) {
    (function ($) {

//        $("body").delegate(".act_md .list li", "mouseenter mouseleave", function (e) {
//            if (e.type == "mouseenter") {
//                $(this).find(".btn").animate({right: 0}, 100);
//            } else if (e.type == "mouseleave") {
//                $(this).find(".btn").animate({right: -64}, 100);
//            }
//        });


        $("#zt_nav2 li").click(function () {
            var index = $(this).index();
            if (!index) return;
            var t = $(".act_md").eq($(this).index() - 1).offset().top;
            $("body,html").animate({ scrollTop: t }, 300);
        });

    })(JQUERY);
});
KISSY.add('module_page/sys_address_list', function (S, Node, IO) {
    var $ = Node.all;
    var tpl1 = $("#tpl1").html();
    var url = API_URL + 'address/lists/supplier';
    var postdata = {supplier_id: webConfig.supplier_id};
    if (!webConfig.supplier_id) {
        popConfirm("未登录的用户无法访问该模块");
        return;
    }
    var self = {
        init: function () {
            self.functions.getList();
        },
        functions: {
            getChecked: function () {
                return $(".radio_address:checked").val();
            },
            events: function () {
            },
            getList: function () {
                new IO({
                    dataType: 'jsonp',
                    url: url,
                    data: postdata,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error == true) {
                            $(".J_AddressList").html('<tr><td colspan="7">' + data.msg + '</td></tr>');
                            return;
                        }
                        var items = [];
                        S.each(data.msg, function (item) {
                            try {
                                item.province = region[item.province].region_name;
                                item.city = region[item.city].region_name;
                                item.district = region[item.district].region_name;
                                var checkedId = webConfig.addressBox[webConfig.last_click_address_box];
                                if (item.id == checkedId) {
                                    item.checkedString = 'checked="checked"';
                                } else {
                                    item.checkedString = '';
                                }
                            } catch (e) {
                                S.log(e);
                            }
                            items.push(S.substitute(tpl1, item));
                        });
                        $(".J_AddressList").html(items.join(" "));
                    }
                });
            }
        }
    };
    return self;
}, {requires: ["node", "ajax"]});


KISSY.add('module_page/sys_company_brand_search', function (S, Node, IO) {
    var $ = Node.all;

    function myClass(options) {
        this.options = options;
    }

    var pro = myClass.prototype;
    var TplCompanyHead = $(".J_TplCompanyHead").html();
    var TplCompany = $(".J_TplCompany").html();

    var TplBrandHead = $(".J_TplBrandHead").html();
    var TplBrand = $(".J_TplBrand").html();
    var contentVal = "";
    var self = {
        init: function () {
            webConfig.page = 1;
            self.events();
            window.ajaxPage = self.functions.ajaxPage;
            self.functions.ajaxPage();
        },
        events: function () {

            $(".sys_company_brand_search .J_SearchBtn").on("click", function () {
                webConfig.page = 1;
                self.functions.ajaxPage();
            });

            $("#J_SelectBrandSuppBox").delegate("click", ".radio_brand_label", function (e) {
                var w = $(e.currentTarget);
                webConfig.tem_selectBrandSupp_Brand_id = $(".radio_brand:checked").attr("data-brand");
                webConfig.tem_selectBrandSupp_supplier_id = $(".radio_brand:checked").attr("data-supp");
            });

            $("#J_SelectBrandSuppBox").delegate("click", ".radio_supplier_label", function (e) {
                var w = $(e.currentTarget);
                webConfig.tem_selectBrandSupp_supplier_id = $(".radio_supplier:checked").attr("data-supp");
            });
        },
        functions: {
            ajaxPage: function () {
                if (arguments.length === 1) {
                    webConfig.page = arguments[0];
                }
                var postData = {};
                webConfig.selectedType = $(".sys_company_brand_search .J_ComBrandSearchType").val();
                postData.queryString = $(".sys_company_brand_search .J_QueryVal").val();
                if (webConfig.selectedType == "company") {
                    contentVal = TplCompanyHead;
                    webConfig.url = API_URL + 'supplier/query/lists';
                } else if (webConfig.selectedType == "brand") {
                    contentVal = TplBrandHead;
                    postData.type = 'online';
                    webConfig.url = API_URL + 'brand/query/lists';
                }
                $(".sys_company_brand_search .J_Content").html(contentVal);
                postData.page = webConfig.page;
                var url = webConfig.url;
                new IO({
                    dataType: 'jsonp',
                    url: url,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        var items = [];
                        if (data.error == true) {
                            $(".sys_company_brand_search .content_items").html('<tr><td colspan="3">' + data.msg + '</td></tr>');
                            return;
                        }
                        var retData = data.msg.data;
                        if (webConfig.selectedType == "company") {
                        } else if (webConfig.selectedType == "brand") {
                            var getBrandNameById = data.msg.getBrandNameById;
                            var getSuppNameById = data.msg.getSuppNameById;
                        }
                        S.each(retData, function (item, key) {
                            try {
                                if (webConfig.selectedType == "company") {
                                    item.reg_time = getLocalTime(item.reg_time);
                                    item.suppLink = ADMIN_URL + "supplier/supplier_detail?id=" + item.id;
                                    items.push(S.substitute(TplCompany, item));
                                } else if (webConfig.selectedType == "brand") {
                                    S.each(item, function (item2) {
                                        item2.id = key;
                                        item2.brand_name = getBrandNameById[key];
                                        item2.suppLink = ADMIN_URL + "supplier/supplier_detail?id=" + item2.supplier_id;
                                        item2.brandLink = WWW_URL + "lists2/" + key + "-0-0-0-1-" + item2.supplier_id + "-0-1.html";
                                        item2.company_name = getSuppNameById[item2.supplier_id];
                                        item2.create_time = getLocalTime(item2.create_time);
                                        items.push(S.substitute(TplBrand, item2));
                                    });
                                }
                            } catch (e) {
                                S.log(e);
                            }
                        });
                        $(".sys_company_brand_search .content_items").html(items.join(" "));
                        var counts = data['msg'].total;
                        var pageSize = 20;
                        var pageObject = new pages_class(pageSize, webConfig.page, counts);
                        var pageContent = pageObject.fpage([3, 4, 5, 6, 7]);
                        $(".sys_company_brand_search .J_PagesBottom").html(pageContent);
                    }
                });

            }
        }
    };
    for (var key in self) {
        pro[key] = self[key];
    }
    return {init: function (options) {
        new myClass(options).init();
    }};
}, {requires: ["node", "ajax"]});


KISSY.add('module_page/sys_admin_goods_empty_stock_numt', function (S, Node, IO, POPCONFIRM) {
    var postData = {};
    $(".J_SetBrandSuppGoodsOut").on("click", function () {
        if (webConfig.selectedType == "company") {
            postData.supplier_id = webConfig.tem_selectBrandSupp_supplier_id;
        } else if (webConfig.selectedType == "brand") {
            postData.supplier_id = webConfig.tem_selectBrandSupp_supplier_id;
            postData.brand_id = webConfig.tem_selectBrandSupp_Brand_id;
        } else {
            tipsBox("类型错误");
            return false;
        }

        var options = {
            title: "确定操作吗",
            width: 500,
            height: 80,
            contentType: 'text',
            content: '<div style="line-height: 80px;text-align: center;">将导致选中的供应商或品牌的所有产品库存为0</div>',
            confirmBtn: true,
            cancelBtn: true,
            selector: "#popup_confirm",
            confirmCallback: function () {
                IO.post(ADMIN_URL + "goods/goods_empty_stock_num/by_supp_brand", postData, function (data) {
                    if (data.error === true) {
                        tipsBox(data.msg, 1);
                    } else {
                        tipsBox("操作成功");
                    }
                }, "json");
            }
        };
        POPCONFIRM.init(options);
    });
}, {requires: ["node", "ajax", "scripts4.0/module_components/pop_confirm"]});


KISSY.add('module_page/sys_student_active', function (S, Node, IO, POPCONFIRM) {

    var $ = Node.all;
    var D = S.DOM;
    var tpl = $("#tpl").html();
    window.ajaxPage = function (page) {
        var positionId = 1417256066;
        if (webConfig.devEnv === true) {
            positionId = 1417255867;
        }
//            var url = API_URL + 'goods/index/item_query/' + webConfig.templateDirectory + '/tshop-um-sys_student_active/' + webConfig.pageFileName + '/'+positionId+'?page=' + page + '&trigger=goods1_1&preview_user=' + webConfig.previewUser + "&pageSize=" + pageSize;
        var url = API_URL + 'modules/modules/sys_student_active_list';
        var data = {};
        data.item_price_setting_type = webConfig.item_price_setting_type;
        data.pageSize = 20;
        data.page = page;
        data.active_type = 'sys_item_price_setting1';
        var dataId = $("#g_c_l .cur").attr("data-id");
        var cate_type = $("#g_c_l .cur").attr("data-type");
        if (dataId) {
            data.cate_id = dataId;
        } else {
            data.cate_id = webConfig.cate_id;
        }
        if (cate_type) {
            data.cate_type = cate_type;
        } else {
            data.cate_type = webConfig.cate_type;
        }
        var linkHref = location.href;
        var preview_userString = '';
        if (linkHref.indexOf("preview_user") > -1) {
            preview_userString = 'preview_user=' + webConfig.previewUser;
        }
        var linkHref = '/welcome/schoolcheap?';
        linkHref += preview_userString;
        linkHref += "&cate_id=" + data.cate_id;
        linkHref += "&cate_type=" + data.cate_type;
        if (webConfig.fromPage !== "admin") {
            try {
                window.history.pushState({}, 0, linkHref);
            } catch (e) {
                S.log(e);
            }
        }
        new IO({
            dataType: 'jsonp',
            url: url,
            data: data,
            jsonp: "jsonpcallback",
            success: function (data) {
                var items = [];
                if (data.error == true) {
                    $(".J_sys_student_active").html('<li>' + data.msg + '</li>');
                    return;
                }
                var retData = data.msg.data;
                S.each(retData, function (item, key) {
                    try {
                        item.pic = getThumbUrlByName(STATIC_URL, item.pic, 3);
                        item.now_price = item.now_price ? item.now_price : item.price;
                        item.price = item.price;

                    } catch (e) {
                        S.log(e);
                    }
                    items.push(S.substitute(tpl, item));
                });
                $(".J_sys_student_active").html(items.join(" "));
                var counts = data['msg'].total;
                var pageSize = 20;
                var pageObject = new pages_class(pageSize, page, counts);
                var pageContent = pageObject.fpage([3, 4, 5, 6, 7]);
                $(".tshop-um-sys_student_active  .J_PagesBottom").html(pageContent);
            }
        });
    };
    ajaxPage(1);
    var toTodistance = D.offset($(".tshop-um-sys_student_active"));
    $("#g_c_l li").on("click", function () {
        if ($(this).hasClass("cur")) {
            $("#g_c_l li").removeClass("cur");
        } else {
            $("#g_c_l li").removeClass("cur");
            $(this).addClass("cur");
        }
        D.scrollTop(window, toTodistance.top);
        ajaxPage(1);
    });

    $("#J_SysStudentsBox").delegate("click", ".js_event", function (e) {
        var w = $(e.currentTarget);
        var liDom = $(w).parent("li");
        var id = liDom.attr("data-id");
        var brand_id = liDom.attr("data-brand_id");
        var paramsString = '&params={"brand_id":"' + brand_id + '","previewUser":"","product_id":' + id + ',"attr1":0,"attr2":0,"shop_id_o2o":0,"item_price_setting_type":' + webConfig.item_price_setting_type + '}';
//            var options = {
//                title: "优惠购",
//                width: 900,
//                height: 620,
//                contentType: 'link',
//                content: WWW_URL + "modules/get_module/" + webConfig.templateDirectory + "/tshop-pbsm-sys_buy_goods_cheap/index/1/default/?t=" + new Date().getTime()+paramsString ,
//                confirmBtn: false,
//                cancelBtn: false,
//                selector: "#pop_sys_cheap_buy",
//                loadedCallBack: function () {
//
//                }
//            };
//            POPCONFIRM.init(options);


        (function ($) {
            $.popup({
                title: "优惠购",
                content: "iframe:" + WWW_URL + "modules/get_module/" + webConfig.templateDirectory + "/tshop-pbsm-sys_buy_goods_cheap/index/1/default?t=" + new Date().getTime() + paramsString,
                width: 980,
                height: 620,
                qdCallback: function () {
                    //确定回调函数
                }
            });
        })(JQUERY);


    });

}, {requires: ["node", "ajax", "scripts4.0/module_components/pop_confirm"]});


KISSY.add('module_page/sys_item_stock_setting', function (S, Node, IO, CommonUtils) {
    var $ = Node.all;
    webConfig.fromPage = webConfig.fromPage ? webConfig.fromPage : "supplier";
    var self = {
        init: function () {
            self.events();
        },
        events: function () {
            $(".J_ItemStockBtn").on('click', function () {
                var timeCheck = true;
                if (webConfig.isSubmit) {
                    return;
                } else {
                    webConfig.isSubmit = true;
                }
                if (timeCheck === false) {
                    webConfig.isSubmit = false;
                    return;
                }
                CommonUtils.getSigData(webConfig.product_id, function (err, data) {
                    if (err === true) {
                        tipsBox(data, 1);
                        return;
                    }
                    var timestamp = data.timestamp;
                    var sig = data.sig;
                    var postdata = IO.serialize(".J_StockNumForm");
                    postdata += '&id=' + webConfig.product_id;
                    postdata += '&fromPage=' + webConfig.fromPage;
                    var url = API_URL + 'goods/editbase/modstocknum';
                    new IO({
                        dataType: 'jsonp',
                        url: url,
                        data: postdata + "&timestamp=" + timestamp + "&sig=" + sig,
                        jsonp: "jsonpcallback",
                        success: function (data) {
                            webConfig.isSubmit = false; // 如果不刷新才有效
                            if (data.error == false) {
                                tipsBox("修改成功");
                                return;
                            }
                            if (data.error == true) {
                                tipsBox(data.msg, 1);
                                webConfig.isSubmit = false;
                                return;
                            }
                        }
                    });

                });

            });
        },
        functions: {
        }
    };
    return self;
}, {requires: ["node", "io", "scripts4.0/common_utils/index"]});

KISSY.add('module_page/sys_list_new_recommend', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    var self = {
        tpl: $('#list_new_recom_tpl').html(),
        isShowDefault: '',
        moduleUrl: '',
        init: function (initData) {
            self.modduleUrl = initData.isShowDefault;
            self.moduleUrl = initData.moduleUrl;
            self.functions.ajaxPage();
        },
        functions: {
            ajaxPage: function (sec_cat_id) {
                var postData = {
                    'cate_id': webConfig.cate_id,
                    'from_type': webConfig.from_type,
                    'page': 1,
                    'group_type': 'brand_id',
                    'order_type': 'newUpdate',
                    'pageSize': 10,
                    'time_type': 10
                };
                //
                IO.post(WWW_URL + '/query_recom/ajaxListRcom', postData, function (data) {
                    var items = [];
                    if (data.error == true) {
                        self.functions.getModuleProduct();
                        return;
                    }
                    var retData = data.msg;
                    var i = 1;
                    if (retData.length > 0) {
                        S.each(retData, function (item, key) {
                            if (i < 4) {
                                item.title = item.name;
                                item.detailsUrl = "/item/" + item.id + '.html';
                                item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                                if (item.discountPrice !== item.price) {
                                    item.price_string = item.discountPrice;
                                } else {
                                    item.price_string = item.price;
                                }
                                items.push(S.substitute(self.tpl, item));
                            }
                            i++;
                        });
                        $("#J_Rcom_ColumnContainer").html(items.join(" "));
                        KISSY.use('gallery/datalazyload/1.0.1/index',function(S,DataLazyload){
                            DataLazyload('#J_Rcom_ColumnContainer', {
                                mod: 'auto', //模式：'auto'自动 'manual'手动
                                diff: 300, //当前视窗往下 diff px内进行预先加载，默认为当前视窗高度product_loading.gif
                                placeholder: PUBLIC_URL +"images/product_loading.gif" //未加载前的图像占位符，默认为空,
                            });
                        });
                    } else {
                        $('.tshop-pbsm-sys_list_new_recommend').parent().hide();
                    }
                }, 'json');
            },
            getModuleProduct: function () {
                var postData = { };
                var items = [];
                new IO({
                    dataType: 'jsonp',
                    url: self.modduleUrl,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error == true) {

                            return;
                        } else {
                            var retData = data.msg.data;
                            var k = 1;
                            S.each(retData, function (item, key) {
                                if (k < 4) {
                                    item.detailsUrl = "/item/" + item.id + '.html';
                                    item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                                    item.title = item.name;
                                    if (item.discountPrice !== item.price) {
                                        item.price_string = item.discountPrice;
                                    } else {
                                        item.price_string = item.price;
                                    }
                                    items.push(S.substitute(self.tpl, item));
                                }
                            });
                            $("#J_L_Rcom_ColumnContainer").html(items.join(" "));
                            KISSY.use('gallery/datalazyload/1.0.1/index',function(S,DataLazyload){
                                DataLazyload('#J_L_Rcom_ColumnContainer', {
                                    mod: 'auto', //模式：'auto'自动 'manual'手动
                                    diff: 300, //当前视窗往下 diff px内进行预先加载，默认为当前视窗高度product_loading.gif
                                    placeholder: PUBLIC_URL +"images/product_loading.gif" //未加载前的图像占位符，默认为空,
                                });
                            });
                        }
                    }
                });
            }
        }
    };
    return self;
}, {requires: ['node', 'io']});

KISSY.add('module_page/sys_list_left_recommend', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    webConfig.cate_id;
    var self = {
        tpl: $('#left_recom_tpl').html(),
        is_show_default: '',
        modduleUrl: '',
        init: function (initData) {
            self.is_show_default = initData.isShowDefault;
            self.modduleUrl = initData.moduleUrl;
            if (webConfig.cate_id > 0) {
                //显示模块配置数据
                self.functions.ajaxPage();
            }
//            if(self.is_show_default == 'false') {
//                if(webConfig.cate_id > 0){
//                    //显示模块配置数据
//                    self.functions.ajaxPage();
//                }
//            }
        },
        functions: {
            ajaxPage: function () {
                var postData = {
                    'cate_id': webConfig.cate_id,
                    'from_type': webConfig.from_type,
                    'group_type': 'id',
                    'order_type': '_newOn',
                    'pageSize': 6,
                    'time_type': 25,
                    'request_type': 'request_type'
                };
                IO.post(WWW_URL + '/query_recom/ajaxQuery', postData, function (data) {
                    var items = [];
                    if (data.error == true) {
                        //如果动态数据没有
                        self.functions.getModuleProduct();
                        return;
                    }
                    var retData = data.msg;
                    S.each(retData, function (item, key) {
                        item.detailsUrl = "/item/" + item.id + '.html';
                        item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                        if (item.discountPrice !== item.price) {
                            item.price_string = item.discountPrice;
                        } else {
                            item.price_string = item.price;
                        }
                        items.push(S.substitute(self.tpl, item));
                    });
                    $("#J_L_Rcom_ColumnContainer").html(items.join(" "));
                    KISSY.use('gallery/datalazyload/1.0.1/index',function(S,DataLazyload){
                        DataLazyload('#J_L_Rcom_ColumnContainer', {
                            mod: 'auto', //模式：'auto'自动 'manual'手动
                            diff: 300, //当前视窗往下 diff px内进行预先加载，默认为当前视窗高度product_loading.gif
                            placeholder: PUBLIC_URL +"images/product_loading.gif" //未加载前的图像占位符，默认为空,
                        });
                    });
                }, 'json');
            },
            getModuleProduct: function () {
                var postData = { };
                var items = [];
                new IO({
                    dataType: 'jsonp',
                    url: self.modduleUrl,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error == true) {
                            return;
                        } else {
                            var retData = data.msg.data;
                            S.each(retData, function (item, key) {
                                item.detailsUrl = "/item/" + item.id + '.html';
                                item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                                item.title = item.name;
                                if (item.discountPrice !== item.price) {
                                    item.price_string = item.discountPrice;
                                } else {
                                    item.price_string = item.price;
                                }
                                items.push(S.substitute(self.tpl, item));
                            });
                            $("#J_L_Rcom_ColumnContainer").html(items.join(" "));
                            KISSY.use('gallery/datalazyload/1.0.1/index',function(S,DataLazyload){
                                DataLazyload('#J_L_Rcom_ColumnContainer', {
                                    mod: 'auto', //模式：'auto'自动 'manual'手动
                                    diff: 300, //当前视窗往下 diff px内进行预先加载，默认为当前视窗高度product_loading.gif
                                    placeholder: PUBLIC_URL +"images/product_loading.gif" //未加载前的图像占位符，默认为空,
                                });
                            });
                        }
                    }
                });
            }
        }
    };
    //如果动态数据以及后台均无数据则隐藏该层
//    if($("#J_L_Rcom_ColumnContainer").html() == ''){
//        $('.tshop-pbsm-sys_list_left_recommend').hide();
//    }
    return self;
}, {requires: ['node', 'io']});


KISSY.add('module_page/sys_list_sale_recommend', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    webConfig.cate_id;
    var self = {
        tpl: $('#Sale_recom_tpl').html(),
        is_show_default: '',
        modduleUrl: '',
        init: function (initData) {
            self.is_show_default = initData.isShowDefault;
            self.modduleUrl = initData.moduleUrl;
            if (self.is_show_default == 'true') {
                //显示模块配置数据
                self.functions.getModuleProduct();
            } else {
                //显示动态数据
                self.functions.ajaxPage();
            }
        },
        functions: {
            ajaxPage: function () {
                var postData = {
                    'cate_id': webConfig.cate_id,
                    'from_type': webConfig.from_type,
                    'group_type': 'brand_id',
                    'pageSize': 6,
                    'time_type': 7,
                    'order_type': 'hot_sell',
                    'request_type': 'request_type'
                };
                IO.post(WWW_URL + '/query_recom/ajaxQuery', postData, function (data) {
                    var items = [];
                    if (data.error == true) {
                        self.functions.getModuleProduct();
                        return;
                    }
                    var retData = data.msg;
                    S.each(retData, function (item, key) {
                        if (item.title == 'undefind') {
                            item.name = item.title;
                        }
                        item.name = item.title;
                        item.detailsUrl = "/item/" + item.id + '.html';
                        item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                        if (item.discountPrice !== item.price) {
                            item.price_string = item.discountPrice;
                        } else {
                            item.price_string = item.price;
                        }
                        items.push(S.substitute(self.tpl, item));
                    });
                    $("#J_L_Sale_ColumnContainer").html(items.join(" "));
                    KISSY.use('gallery/datalazyload/1.0.1/index',function(S,DataLazyload){
                        DataLazyload('#J_L_Sale_ColumnContainer', {
                            mod: 'auto', //模式：'auto'自动 'manual'手动
                            diff: 300, //当前视窗往下 diff px内进行预先加载，默认为当前视窗高度product_loading.gif
                            placeholder: PUBLIC_URL +"images/product_loading.gif" //未加载前的图像占位符，默认为空,
                        });
                    });
                }, 'json');
            },
            getModuleProduct: function () {
                var postData = { };
                var items = [];
                new IO({
                    dataType: 'jsonp',
                    url: self.modduleUrl,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error == true) {
                            return;
                        } else {
                            var retData = data.msg.data;
                            S.each(retData, function (item, key) {
                                item.detailsUrl = "/item/" + item.id + '.html';
                                item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                                if (item.discountPrice !== item.price) {
                                    item.price_string = item.discountPrice;
                                } else {
                                    item.price_string = item.price;
                                }
                                items.push(S.substitute(self.tpl, item));
                            });
                            $("#J_L_Sale_ColumnContainer").html(items.join(" "));
                        }
                        KISSY.use('gallery/datalazyload/1.0.1/index',function(S,DataLazyload){
                            DataLazyload('#J_L_Sale_ColumnContainer', {
                                mod: 'auto', //模式：'auto'自动 'manual'手动
                                diff: 300, //当前视窗往下 diff px内进行预先加载，默认为当前视窗高度product_loading.gif
                                placeholder: PUBLIC_URL +"images/product_loading.gif" //未加载前的图像占位符，默认为空,
                            });
                        });
                    }
                });
            }
        }
    };
    return self;
}, {requires: ['node', 'io']});


KISSY.add('module_page/sys_list_picked_goods', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    webConfig.cate_id;
    var self = {
        tpl: $('#PickedRecomTpl').html(),
        modduleUrl: '',
        is_show_default: '',
        init: function (initData) {
            self.is_show_default = initData.isShowDefault;
            self.modduleUrl = initData.moduleUrl;
//            if(self.is_show_default == 'false') {
//                if(webConfig.cate_id > 0){
//                    //显示模块配置数据
//
//                }
//            }
            self.functions.ajaxPage();
        },
        functions: {
            ajaxPage: function () {
                var postData = {
                    'cate_id': webConfig.cate_id,
                    'from_type': webConfig.from_type,
                    'group_type': 'id',
                    'order_type': 'newUpdate',
                    'pageSize': 5,
                    'time_type': 14
                };
                IO.post(WWW_URL + '/query_recom/ajaxQuery', postData, function (data) {
                    var items = [];
                    if (data.error == true) {
                        self.functions.getModuleProduct();
                        return;
                    }
                    var retData = data.msg;
                    S.each(retData, function (item, key) {
                        item.detailsUrl = "/item/" + item.id + '.html';
                        item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                        if (item.discountPrice !== item.price) {
                            item.price_string = item.discountPrice;
                        } else {
                            item.price_string = item.price;
                        }
                        items.push(S.substitute(self.tpl, item));
                    });
                    $("#J_L_Picked_ColumnContainer").html(items.join(" "));
                    KISSY.use('gallery/datalazyload/1.0.1/index',function(S,DataLazyload){
                        DataLazyload('#J_L_Picked_ColumnContainer', {
                            mod: 'auto', //模式：'auto'自动 'manual'手动
                            diff: 300, //当前视窗往下 diff px内进行预先加载，默认为当前视窗高度product_loading.gif
                            placeholder: PUBLIC_URL +"images/product_loading.gif" //未加载前的图像占位符，默认为空,
                        });
                    });
                }, 'json');
            },
            getModuleProduct: function () {
                var postData = { };
                var items = [];
                new IO({
                    dataType: 'jsonp',
                    url: self.modduleUrl,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error == true) {
                            //如果模块数据也没有配置即将模块隐藏
                            $('.tshop-pbsm-sys_list_picked_goods').hide();
                            return false;
                        } else {
                            var retData = data.msg.data;
                            S.each(retData, function (item, key) {
                                item.detailsUrl = "/item/" + item.id + '.html';
                                item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                                if (item.discountPrice !== item.price) {
                                    item.price_string = item.discountPrice;
                                } else {
                                    item.price_string = item.price;
                                }
                                items.push(S.substitute(self.tpl, item));
                            });
                            $("#J_L_Picked_ColumnContainer").html(items.join(" "));
                        }
                    }
                });
            }
        }
    };
    return self;
}, {requires: ['node', 'io']});


KISSY.add('module_page/sys_list_scan_recommend', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    webConfig.cate_id;
    var self = {
        tpl: $('#ScanRecommendTpl').html(),
        modduleUrl: '',
        init: function (moduleData) {
            self.modduleUrl = moduleData;
            self.events();
            self.functions.ajaxPage(1);
        },
        events: function () {
            $('.sys_list_scan_recommend').delegate('click', '.change', function (e) {
                var w = e.currentTarget;
                var page = $(w).attr('data-id');
                if (page == 1) {
                    $(w).attr('data-id', 2);
                } else {
                    $(w).attr('data-id', 1);
                }
                self.functions.ajaxPage(page);
            });
        },
        functions: {
            ajaxPage: function (page) {
                if (page > 0) {
                    webConfig.recom_page = page;
                } else {
                    webConfig.recom_page = 1;
                }
                var postData = {
                    'cate_id': webConfig.cate_id,
                    'from_type': webConfig.from_type,
                    'brand_id': webConfig.brand_id,
                    'group_type': 'id',
                    'pageSize': 6,
                    'page': webConfig.recom_page,
                    'time_type': 14
                };
                IO.post(WWW_URL + '/query_recom/ajaxQueryScanRcom', postData, function (data) {
                    var items = [];
                    if (data.error === true) {
                        self.functions.getModuleProduct();
                        return;
                    }
                    var retData = data.msg;
                    S.each(retData, function (item, key) {
                        item.detailsUrl = "/item/" + item.id + '.html';
                        item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                        if (item.discountPrice !== item.price) {
                            item.price_string = item.discountPrice;
                        } else {
                            item.price_string = item.price;
                        }
                        items.push(S.substitute(self.tpl, item));
                    });
                    $("#J_L_ScanRcom_ColumnContainer").html(items.join(" "));
                    KISSY.use('gallery/datalazyload/1.0.1/index',function(S,DataLazyload){
                        DataLazyload('#J_L_ScanRcom_ColumnContainer', {
                            mod: 'auto', //模式：'auto'自动 'manual'手动
                            diff: 300, //当前视窗往下 diff px内进行预先加载，默认为当前视窗高度product_loading.gif
                            placeholder: PUBLIC_URL +"images/product_loading.gif" //未加载前的图像占位符，默认为空,
                        });
                    });
                }, 'json');
            },
            getModuleProduct: function () {
                var postData = { };
                var items = [];
                new IO({
                    dataType: 'jsonp',
                    url: self.modduleUrl,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error == true) {
                            return;
                        } else {
                            var retData = data.msg.data;
                            S.each(retData, function (item, key) {
                                item.detailsUrl = "/item/" + item.id + '.html';
                                item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                                if (item.discountPrice !== item.price) {
                                    item.price_string = item.discountPrice;
                                } else {
                                    item.price_string = item.price;
                                }
                                items.push(S.substitute(self.tpl, item));
                            });
                            $("#J_L_ScanRcom_ColumnContainer").html(items.join(" "));
                        }
                    }
                });
            }
        }
    };
    return self;
}, {requires: ['node', 'io']});


KISSY.add('module_page/sys_nav_ch2', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    var self = {
        cur_url: '',
        init: function (cur_url) {
            self.cur_url = cur_url;
            self.events();
        },
        events: function () {
            //写js事件代码
            (function($){
                if (!$('.tshop-um-sys_nav_ch2').hasClass('tshop-um-sys_nav_home')) {
                    //非首页
                    $('.classify').on('mouseover', function () {
                        $('#menu').removeClass('display_none');
                    });
                    $('.classify').on('mouseout', function () {
                        $('#menu').addClass('display_none');
                    });
                    $('#menu').on('mouseout', function () {
                        $(this).addClass('display_none');
                    });
                }
            })(JQUERY);
        }
    };
    return self;
}, {requires: ['node', 'io']});


KISSY.add('module_page/sys_detail_middle_recommend', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    webConfig.cate_id;
    var self = {
        tpl: $('#Detail_middle_recom_tpl').html(),
        modduleUrl: '',
        init: function (moduleData) {
            self.modduleUrl = moduleData.moduleUrl;
            self.events();
            self.functions.ajaxPage(1);
        },
        events: function () {
            $('.sys_detail_middle_recommend').delegate('click', '.change', function (e) {
                var w = e.currentTarget;
                var page = $(w).attr('data-id');
                self.functions.ajaxPage(page);
            });
        },
        functions: {
            ajaxPage: function (page) {
                if (page > 0) {
                    webConfig.detail_recom_page = page;
                } else {
                    webConfig.recom_page = 1;
                }
                var postData = {
                    'cate_id': webConfig.cate_id,
                    'brand_id': webConfig.brand_id,
                    'from_type': webConfig.from_type,
                    'pageSize': 6,
                    'page': webConfig.detail_recom_page
                };

                IO.post(WWW_URL + '/query_recom/ajaxDetailMiddleRcom', postData, function (data) {
                    var items = [];
                    if (data.error === true) {
                        self.functions.getModuleProduct();
                        return;
                    }
                    var retData = data.msg;
                    S.each(retData, function (item, key) {
                        item.title = item.name;
                        item.detailsUrl = "/item/" + item.id + '.html';
                        item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                        if (item.discountPrice !== item.price) {
                            item.price_string = item.discountPrice;
                        } else {
                            item.price_string = item.price;
                        }
                        items.push(S.substitute(self.tpl, item));
                    });
                    $("#J_D_MRcom_ColumnContainer").html(items.join(" "));
                }, 'json');
            },
            getModuleProduct: function () {
                var postData = { };
                var items = [];
                new IO({
                    dataType: 'jsonp',
                    url: self.modduleUrl,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error == true) {
                            return;
                        } else {
                            var retData = data.msg.data;
                            S.each(retData, function (item, key) {
                                item.title = item.name;
                                item.detailsUrl = "/item/" + item.id + '.html';
                                item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                                if (item.discountPrice !== item.price) {
                                    item.price_string = item.discountPrice;
                                } else {
                                    item.price_string = item.price;
                                }
                                items.push(S.substitute(self.tpl, item));
                            });
                            $("#J_D_MRcom_ColumnContainer").html(items.join(" "));
                        }
                    }
                });
            }
        }
    };
    return self;
}, {requires: ['node', 'io']});


KISSY.add('module_page/sys_detail_left_hotsell', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    webConfig.cate_id;
    var self = {
        tpl: $('#Detail_HotSell_Tpl').html(),
        modduleUrl: '',
        init: function (moduleData) {
            self.modduleUrl = moduleData.moduleUrl;
            self.events();
            self.functions.ajaxPage(1);
        },
        events: function () {

        },
        functions: {
            ajaxPage: function (page) {
                if (page > 0) {
                    webConfig.detail_recom_page = page;
                } else {
                    webConfig.recom_page = 1;
                }
                var postData = {
                    'cate_id': webConfig.cate_id,
                    'brand_id': webConfig.brand_id,
                    'pageSize': 6,
                    'page': webConfig.detail_recom_page
                };

                IO.post(WWW_URL + '/query_recom/ajaxDetailHotsell', postData, function (data) {
                    var items = [];
                    if (data.error === true) {
                        self.functions.getModuleProduct();
                        return;
                    }
                    var retData = data.msg;
                    S.each(retData, function (item, key) {
                        item.detailsUrl = "/item/" + item.id + '.html';
                        item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                        if (item.discountPrice !== item.price) {
                            item.price_string = item.discountPrice;
                        } else {
                            item.price_string = item.price;
                        }
                        items.push(S.substitute(self.tpl, item));
                    });
                    $("#J_D_Hotsell_ColumnContainer").html(items.join(" "));
                }, 'json');
            },
            getModuleProduct: function () {
                var postData = { };
                var items = [];
                new IO({
                    dataType: 'jsonp',
                    url: self.modduleUrl,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error == true) {
                            return;
                        } else {
                            var retData = data.msg.data;
                            S.each(retData, function (item, key) {
                                item.title = item.name;
                                item.detailsUrl = "/item/" + item.id + '.html';
                                item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                                if (item.discountPrice !== item.price) {
                                    item.price_string = item.discountPrice;
                                } else {
                                    item.price_string = item.price;
                                }
                                items.push(S.substitute(self.tpl, item));
                            });
                            $("#J_D_Hotsell_ColumnContainer").html(items.join(" "));
                        }
                    }
                });
            }
        }
    };
    return self;
}, {requires: ['node', 'io']});


KISSY.add('module_page/sys_detail_left_focus', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    webConfig.cate_id;
    var self = {
        tpl: $('#Detail_Focus_Tpl').html(),
        modduleUrl: '',
        init: function (moduleData) {
            self.modduleUrl = moduleData.moduleUrl;
            self.events();
            self.functions.ajaxPage(1);
        },
        events: function () {

        },
        functions: {
            ajaxPage: function (page) {
                if (page > 0) {
                    webConfig.detail_focus_page = page;
                } else {
                    webConfig.recom_page = 1;
                }
                var postData = {
                    'cate_id': webConfig.cate_id,
                    'brand_id': webConfig.brand_id,
                    'pageSize': 6,
                    'page': webConfig.detail_focus_page
                };

                IO.post(WWW_URL + '/query_recom/ajaxaGetFocus', postData, function (data) {
                    var items = [];
                    if (data.error === true) {
                        self.functions.getModuleProduct();
                        return;
                    }
                    var retData = data.msg;
                    S.each(retData, function (item, key) {
                        item.detailsUrl = "/item/" + item.id + '.html';
                        item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                        if (item.discountPrice !== item.price) {
                            item.price_string = item.discountPrice;
                        } else {
                            item.price_string = item.price;
                        }
                        items.push(S.substitute(self.tpl, item));
                    });
                    $("#J_D_Focus_ColumnContainer").html(items.join(" "));
                }, 'json');
            },
            getModuleProduct: function () {
                var postData = { };
                var items = [];
                new IO({
                    dataType: 'jsonp',
                    url: self.modduleUrl,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error == true) {
                            return;
                        } else {
                            var retData = data.msg.data;
                            S.each(retData, function (item, key) {
                                item.title = item.name;
                                item.detailsUrl = "/item/" + item.id + '.html';
                                item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                                if (item.discountPrice !== item.price) {
                                    item.price_string = item.discountPrice;
                                } else {
                                    item.price_string = item.price;
                                }
                                items.push(S.substitute(self.tpl, item));
                            });
                            $("#J_D_Focus_ColumnContainer").html(items.join(" "));
                        }
                    }
                });
            }
        }
    };
    return self;
}, {requires: ['node', 'io']});

KISSY.add('module_page/sys_detail_scan_recommend', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    webConfig.cate_id;
    var self = {
        tpl: $('#Detail_Scan_Tpl').html(),
        modduleUrl: '',
        init: function (moduleData) {
            self.modduleUrl = moduleData.moduleUrl;
            self.events();
            self.functions.ajaxPage(1);
        },
        events: function () {
            $('.tshop-pbsm-sys_detail_scan_recommend').delegate('click', '.change', function (e) {
                var w = e.currentTarget;
                var pagenum = parseInt($(w).attr('data-id'));
                if (pagenum == '3') {
                    $(w).attr('data-id', 1);
                    webConfig.detail_scan_page = pagenum;
                } else {
                    $(w).attr('data-id', pagenum + 1);
                    webConfig.detail_scan_page = pagenum;
                }
                self.functions.ajaxPage(pagenum);
            });
        },
        functions: {
            ajaxPage: function (page) {
                if (page > 0) {
                    webConfig.detail_scan_page = page;
                } else {
                    webConfig.detail_scan_page = 1;
                }
                var postData = {
                    'cate_id': webConfig.cate_id,
                    'brand_id': webConfig.brand_id,
                    'pageSize': 6,
                    'page': webConfig.detail_scan_page
                };

                IO.post(WWW_URL + '/query_recom/ajaxDetailScan', postData, function (data) {
                    var items = [];
                    if (data.error === true) {
                        self.functions.getModuleProduct();
                        return;
                    }
                    var retData = data.msg;
                    S.each(retData, function (item, key) {
                        item.detailsUrl = "/item/" + item.id + '.html';
                        item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                        if (item.discountPrice !== item.price) {
                            item.price_string = item.discountPrice;
                        } else {
                            item.price_string = item.price;
                        }
                        items.push(S.substitute(self.tpl, item));
                    });
                    $("#J_D_Scan_ColumnContainer").html(items.join(" "));
                }, 'json');
            },
            getModuleProduct: function () {
                var postData = { };
                var items = [];
                new IO({
                    dataType: 'jsonp',
                    url: self.modduleUrl,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error == true) {
                            return;
                        } else {
                            var retData = data.msg.data;
                            S.each(retData, function (item, key) {
                                item.title = item.name;
                                item.detailsUrl = "/item/" + item.id + '.html';
                                item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                                if (item.discountPrice !== item.price) {
                                    item.price_string = item.discountPrice;
                                } else {
                                    item.price_string = item.price;
                                }
                                items.push(S.substitute(self.tpl, item));
                            });
                            $("#J_D_Scan_ColumnContainer").html(items.join(" "));
                        }
                    }
                });
            }
        }
    };
    return self;
}, {requires: ['node', 'io']});


KISSY.add('module_page/sys_detail_content2', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    webConfig.cate_id;
    var self = {
        init: function () {
            self.events();
        },
        events: function () {
            $('#content_add_to_cart').on('click', function () {
                D.get($('#addToCart')).click();
            });
        },
        functions: {

        }
    };
    return self;
}, {requires: ['node', 'io']});


KISSY.add('module_page/sys_detail_other_buys', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    webConfig.cate_id;
    var self = {
        tpl: $('#DetailOtherTpl').html(),
        modduleUrl: '',
        showDefault: '',
        initData: {},
        init: function (moduleData) {
            self.events();
            self.modduleUrl = moduleData.moduleUrl;
            self.showDefault = moduleData.default_show;
            self.initData = moduleData;
            self.functions.ajaxPage(1);
//            if(self.showDefault == false){
//                self.functions.ajaxPage(1);
//            } else {
//                if($("#J_D_OtherBuyColumnContainer").html() == ''){
//                    self.functions.ajaxPage(1);
//                }
//            }
        },
        events: function () {

        },
        functions: {
            ajaxPage: function (page) {
                if (page > 0) {
                    webConfig.detail_scan_page = page;
                } else {
                    webConfig.detail_other_page = 1;
                }
                var postData = {
                    'cate_id': self.initData.cate_id,
                    'brand_id': self.initData.brand_id,
                    'product_id': self.initData.product_id,
                    'pageSize': 7,
                    'page': webConfig.detail_other_page
                };
                IO.post(WWW_URL + '/query_recom/ajaxDetailOtherBuys', postData, function (data) {
                    var items = [];
                    if (data.error === true) {
                        self.functions.getModuleProduct();
                        return;
                    }
                    var retData = data.msg;
                    var i = 0;
                    S.each(retData, function (item, key) {
                        if (i < 6) {
                            if (i != 0 && i != 3) {
                                item.className = 'ml_20';
                            }
                            if (i != 0 && i != 1 && i != 2) {
                                item.className += ' mt35';
                            }
                            item.title = item.name;
                            item.detailsUrl = "/item/" + item.id + '.html';
                            item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                            if (item.discountPrice !== item.price) {
                                item.price_string = item.discountPrice;
                            } else {
                                item.price_string = item.price;
                            }
                            items.push(S.substitute(self.tpl, item));
                        }
                        i++;
                    });
                    $("#J_D_OtherBuyColumnContainer").html(items.join(" "));
                }, 'json');
            },
            getModuleProduct: function () {
                var postData = { };
                var items = [];
                new IO({
                    dataType: 'jsonp',
                    url: self.modduleUrl,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error == true) {
                            return;
                        } else {
                            var retData = data.msg.data;
                            var i = 0;
                            S.each(retData, function (item, key) {
                                if (i < 6) {
                                    if (i != 0 && i != 3) {
                                        item.className = 'ml_20';
                                    }
                                    if (i != 0 && i != 1 && i != 2) {
                                        item.className += ' mt35';
                                    }
                                    item.title = item.name;
                                    item.detailsUrl = "/item/" + item.id + '.html';
                                    item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                                    if (item.discountPrice !== item.price) {
                                        item.price_string = item.discountPrice;
                                    } else {
                                        item.price_string = item.price;
                                    }
                                    items.push(S.substitute(self.tpl, item));
                                }
                                i++;
                            });
                            $("#J_D_OtherBuyColumnContainer").html(items.join(" "));
                        }
                    }
                });
            }
        }
    };
    return self;
}, {requires: ['node', 'io']});


KISSY.add('module_page/sys_detail_success_recomm', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    webConfig.cate_id;
    var self = {
        tpl: $('#Detail_success_Scan_Tpl').html(),
        modduleUrl: '',
        showDefault: '',
        initData: {},
        init: function (moduleData) {
            self.events();
            self.modduleUrl = moduleData.moduleUrl;
            self.showDefault = moduleData.isShowDefault;
            self.initData = moduleData;
            if (self.showDefault == false) {
                self.functions.ajaxPage(1);
            } else {
                if ($("#J_D_SuccessColumnContainer").html() == '') {
                    self.functions.ajaxPage(1);
                }
            }
        },
        events: function () {
            //事件
        },
        functions: {
            ajaxPage: function (page) {
                if (page > 0) {
                    webConfig.detail_scan_page = page;
                } else {
                    webConfig.detail_scan_page = 1;
                }
                var postData = {
                    'cate_id': webConfig.cate_id,
                    'brand_id': webConfig.brand_id,
                    'pageSize': 6,
                    'page': webConfig.detail_scan_page
                };

                IO.post(WWW_URL + '/query_recom/ajaxDetailScan', postData, function (data) {
                    var items = [];
                    if (data.error === true) {
                        self.functions.getModuleProduct();
                        return;
                    }
                    var retData = data.msg;
                    var i = 0;
                    S.each(retData, function (item, key) {
                        if (i < 6) {
                            if (i != 0 && i != 3) {
                                item.className = 'ml_20';
                            }
                            if (i != 0 && i != 1 && i != 2) {
                                item.className += ' mt35';
                            }
                            item.title = item.name;
                            item.detailsUrl = "/item/" + item.id + '.html';
                            item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                            if (item.discountPrice !== item.price) {
                                item.price_string = item.discountPrice;
                            } else {
                                item.price_string = item.price;
                            }
                            items.push(S.substitute(self.tpl, item));
                        }
                        i++;
                    });
                    $("#J_D_SuccessColumnContainer").html(items.join(" "));
                }, 'json');
            },
            getModuleProduct: function () {
                var postData = { };
                var items = [];
                new IO({
                    dataType: 'jsonp',
                    url: self.modduleUrl,
                    data: postData,
                    jsonp: "jsonpcallback",
                    success: function (data) {
                        if (data.error == true) {
                            return;
                        } else {
                            var retData = data.msg.data;
                            var i = 0;
                            S.each(retData, function (item, key) {
                                if (i < 6) {
                                    if (i != 0 && i != 3) {
                                        item.className = 'ml_20';
                                    }
                                    if (i != 0 && i != 1 && i != 2) {
                                        item.className += ' mt35';
                                    }
                                    item.title = item.name;
                                    item.detailsUrl = "/item/" + item.id + '.html';
                                    item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                                    if (item.discountPrice !== item.price) {
                                        item.price_string = item.discountPrice;
                                    } else {
                                        item.price_string = item.price;
                                    }
                                    items.push(S.substitute(self.tpl, item));
                                }
                                i++;
                            });
                            $("#J_D_SuccessColumnContainer").html(items.join(" "));
                        }
                    }
                });
            }
        }
    };
    return self;
}, {requires: ['node', 'io']});


KISSY.add('cart/bottom_slide_products', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    webConfig.cate_id;
    var self = {
        tpl: $('#Cart_slide_Tpl').html(),
        init: function () {
            webConfig.select_url = 'ajaxCartPick';
            self.functions.ajaxPage(1);
            webConfig.select_index = 1;
            self.events();
        },
        events: function () {
            //事件
            $('.shopShow').on('mouseover', function () {
                $('.slide_btn b').show();
            });
            $('.shopShow').on('mouseout', function () {
                $('.slide_btn b').hide();
            });
            $('.navlist li').on('click', function () {
                $(this).addClass('curt').siblings().removeClass('curt');
                webConfig.select_index = $(this).attr('data-index');
                var select_type = $(this).attr('data-id');
                if (select_type == 'focus') {
                    webConfig.select_url = 'ajaxUserFocus';
                }
                if (select_type == 'scan') {
                    webConfig.select_url = 'ajaxScanHistory';
                }
                if (select_type == 'pick') {
                    webConfig.select_url = 'ajaxCartPick';
                }
                self.functions.ajaxPage(1);
                self.functions.showSlide();
            });
        },
        functions: {
            ajaxPage: function (page) {
                if (page > 0) {
                    webConfig.cart_page = page;
                } else {
                    webConfig.cart_page = 1;
                }
                var postData = {
                    'pageSize': 6,
                    'page': webConfig.cart_page
                };
                //判断当前模块是否为空，如果为空即发起请求获取数据
                //if($("#J_C_SlideColumnContainer" + webConfig.select_index).children().length == 0){
                IO.post(WWW_URL + '/query_recom/' + webConfig.select_url, postData, function (data) {
                    var items = [];
                    if (data.error === true) {
                        $("#J_C_SlideColumnContainer" + webConfig.select_index).html('<li style="text-align: center;width: 1000px;"><div style="height:100px;margin-top:100px;margin-left: 100px;text-align: center;font-size: 14px;"><span>' + data.msg + '</span><a href="' + WWW_URL + '"><span style="color: red;">猛戳我!</span></a></div></li>');
                        return;
                    } else {
                        var retData = data.msg;
                        var totalPage = (retData.length + 5 - 1) / 5;
                        var i = 0;
                        S.each(retData, function (item, key) {
                            item.detailsUrl = "/item/" + item.id + '.html';
                            item.pic = getThumbUrlByName(STATIC_URL, item.pic, 2);
                            if (item.discountPrice !== item.price) {
                                item.price_string = item.discountPrice;
                            } else {
                                item.price_string = item.price;
                            }
                            items.push(S.substitute(self.tpl, item));
                        });
                        $("#J_C_SlideColumnContainer" + webConfig.select_index).html(items.join(""));
                    }
                    //初始化点击事件
                    self.functions.slideItems(webConfig.select_index);
                }, 'json');
                //}

            },
            slideItems: function (slide_num) {
                //轮播事件
                (function ($) {
                    $("#slide" + slide_num).slide({
                        type: 'scroll:left',
                        duration: 800
                    });
                    self.functions.showSlide();
                })(JQUERY);
            },
            showSlide: function () {
                for (var i = 1; i < 4; i++) {
                    if (i == webConfig.select_index) {
                        $('#slide' + i).show();
                    } else {
                        $('#slide' + i).hide();
                    }
                }
            }

        }
    };
    return self;
}, {requires: ['node', 'io']});


KISSY.add('module_page/sys_hsh', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;
    var self = {
        init: function () {
            self.events();
            self.functions.bannerSlide();
        },
        events: function () {

        },
        functions: {
            bannerSlide: function () {
                (function ($) {
                    $('.right-float').hide();
                    var floatBtn = $('.right-float ul li'), modTop = [], floatItem = $('.float-item');
                    var ItemNum = floatItem.length;
                    var ItemHt = ItemNum * 488 + 800;

                    $(window).resize(function () {
                        self.functions.reloaction();
                    });
                    //var windowTop = $(window).scrollTop();
                    $(window).scroll(function () {
                        //console.log($(window).width() );
                        if ($(window).width() < 1257) {
                            $('.right-float').hide();
                            return;
                        }
                        self.functions.reloaction();
                        windowTop = $(window).scrollTop() + 50;
//						console.log('窗口高度'+windowTop);
//						console.log('模块高度'+ItemHt);
                        if (windowTop > 750 && windowTop < ItemHt + 450) {
                            $('.right-float').show();
                        } else {
                            $('.right-float').hide();
                        }

                        for (var i = 0; i < floatItem.length; i++) {
                            modTop[i] = floatItem.eq(i).offset().top - 50;
                            if (windowTop >= modTop[i]) {
                                floatBtn.eq(i).addClass('on').siblings('li').removeClass('on');
                            }
                            ;
                        }
                        ;
                    });

                    floatBtn.each(function (index) {
                        var btn = $(this);
                        btn.click(function () {
                            floatBtn.eq(index).addClass('on').siblings('li').removeClass('on');
                            $('html,body').animate({
                                'scrollTop': modTop[index] + 40
                            });
                        });
                    });

                    /*$('.gotop').click(function(){
                     $('html,body').animate({
                     'scrollTop': $('.header-l').offset().top
                     })
                     })*/
                })(JQUERY);
            },
            reloaction: function () {
                var offset = $('.tshop-um-sys_hsh').offset();
                var left_w = offset.left;
                if (left_w < 57) {
                    $('.right-float').hide();
                } else {
                    $('.right-float').css({'left': left_w - 57 + 'px'});
                    $('.right-float').show();
                }
            }
        }
    };
    return self;
}, {requires: ['node', 'io']});

KISSY.add('module_page/sys_hsh_1', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;
    var self = {
        init: function () {
            self.events();
            self.functions.bannerSlide();
        },
        events: function () {

        },
        functions: {
            bannerSlide: function () {
                (function ($) {
                    $('.right-float').hide();
                    var floatBtn = $('.right-float ul li'), modTop = [], floatItem = $('.float-item');
                    var ItemNum = floatItem.length;
                    var ItemHt = ItemNum * 488 + 800;

                    $(window).resize(function () {
                        self.functions.reloaction();
                    });
                    //var windowTop = $(window).scrollTop();
                    $(window).scroll(function () {
                        //console.log($(window).width() );
                        if ($(window).width() < 1257) {
                            $('.right-float').hide();
                            return;
                        }
                        self.functions.reloaction();
                        windowTop = $(window).scrollTop() + 50;
//						console.log('窗口高度'+windowTop);
//						console.log('模块高度'+ItemHt);
                        if (windowTop > 750 && windowTop < ItemHt + 450) {
                            $('.right-float').show();
                        } else {
                            $('.right-float').hide();
                        }

                        for (var i = 0; i < floatItem.length; i++) {
                            modTop[i] = floatItem.eq(i).offset().top - 50;
                            if (windowTop >= modTop[i]) {
                                floatBtn.eq(i).addClass('on').siblings('li').removeClass('on');
                            }
                            ;
                        }
                        ;
                    });

                    floatBtn.each(function (index) {
                        var btn = $(this);
                        btn.click(function () {
                            floatBtn.eq(index).addClass('on').siblings('li').removeClass('on');
                            $('html,body').animate({
                                'scrollTop': modTop[index] + 40
                            });
                        });
                    });

                    /*$('.gotop').click(function(){
                     $('html,body').animate({
                     'scrollTop': $('.header-l').offset().top
                     })
                     })*/
                })(JQUERY);
            },
            reloaction: function () {
                var offset = $('.tshop-um-sys_hsh_1').offset();
                var left_w = offset.left;
                if (left_w < 57) {
                    $('.right-float').hide();
                } else {
                    $('.right-float').css({'left': left_w - 57 + 'px'});
                    $('.right-float').show();
                }
            }
        }
    };
    return self;
}, {requires: ['node', 'io']});
//品牌推荐
KISSY.add('module_page/sys_country_brands', function (S) {
    (function ($) {
        //收藏品牌
        var follow = (function ($) {
            return {
                _follow: function (self, tag_1, tag_2, is_follow) {

                    if (webConfig.isUserLogin == 1) {
                        var postData = {};
                        postData.brand_id = self.attr('data-id');
                        $.post("/member/ajax/follow", postData, function (data) {

                            if (!data.error) {
                                if (is_follow) {

                                    self.find(tag_2).stop().animate({opacity: '0'}, 500);
                                    self.find(tag_1).stop().animate({opacity: '1'}, 500);
                                    self.find(tag_2).addClass('opacity');
                                    self.find(tag_1).removeClass('opacity');

                                } else {

                                    self.find(tag_2).stop().animate({opacity: '1'}, 500);
                                    self.find(tag_1).stop().animate({opacity: '0'}, 500);
                                    self.find(tag_1).addClass('opacity');
                                    self.find(tag_2).removeClass('opacity');

                                }
                            }
                            tipsBox(data.msg);

                        }, "json");
                    } else {
                        tipsBox("请登录会员账号")
                    }
                }
            }
        })($);

        $('.Ico_bt_s').live('click', function () {
            //没有关注则有opacity
            if ($(this).find('.i_IcoH_s_r').hasClass('opacity')) {
                follow._follow($(this), 'i_IcoH_s', '.i_IcoH_s_r', false);
            } else {
                follow._follow($(this), 'i_IcoH_s', '.i_IcoH_s_r', true);
            }
        });
    })(JQUERY);
});

KISSY.add('module_page/sys_country_stores', function (S, Node, IO) {
    var $ = Node.all;
    var D = S.DOM;

    var self = {
        init: function (moduleData) {
            webConfig.province_id = 1;
            self.functions.ajaxPage();
            self.events();
        },
        events: function () {
            (function ($) {
                //省份点击效果
                $('.yikaiNav_list li a').on('click', function (event) {
                    var w = event.currentTarget;
                    if ($(w).hasClass('dimin')) {
                        $(w).removeClass('dimin').addClass('dimin_choose');
                        $(w).find('i').removeClass('dwei_ico').addClass('dweiB_ico');
                        $(w).parent().siblings().find('a').removeClass('dimin_choose').addClass('dimin');
                        $(w).parent().siblings().find('a').children('i').removeClass('dweiB_ico').addClass('dwei_ico');
                    }
                    webConfig.province_id = $(w).attr('data-id');
                    self.functions.ajaxPage();
                });
            })(JQUERY);
        },
        functions: {
            ajaxPage: function (page) {
                if (page > 0) {
                    webConfig.store_page = page;
                } else {
                    webConfig.store_page = 1;
                }
                var postData = {
                    'page': webConfig.store_page,
                    'province_id': webConfig.province_id,
                    'pageSize': 12,
                    'page': webConfig.store_page
                };

                IO.post(WWW_URL + '/ajaxFromSubsite/ajax_get_stores', postData, function (data) {
                    var items = [];
                    if (data.error === true) {
                        return;
                    }
                    var retData = data.msg.data;
                    var i = 1;
                    var li_items = '';
                    var all_li_items = '';
                    var len = retData.length;
                    S.each(retData, function (item, key) {

                        if (item.subsite_id > 0) {
                            item.store_url = WWW_URL + 'app_subsite/subsite_o2onav?subsite_id=' + item.subsite_id + '&store_id=' + item.stid;
                            item.link = WWW_URL + 'storesearch/index/' + item.subsite_id + '-' + item.stid + '-0-0-0-0-0-0-0-1.html';
                        } else {
                            item.link = WWW_URL + 'lists3/' + item.stid + '.html';
                            item.store_url = WWW_URL + 'lists3/' + item.stid + '.html';
                        }

                        if (item.pic !== '') {
                            item.pic = getUrlByName(STATIC_URL, item.pic);
                        }
                        //公众号信息
                        if (item.o2o_qr_code) {
                            item.o2o_qr_code = getUrlByName(STATIC_URL, item.o2o_qr_code);
                        }
                        //item.o2o_qr_code = 'http://public.cjwsc.com//htdocs/firstwork/modules/tshop-um-sys_foot2/assets/images/qr2.png';
                        var margin_style = '';
                        if (i == 1 || (i - 1) % 3 == 0) {
                            margin_style = 'margin-left:0';
                        }
                        li_items += '<li style="' + margin_style + '">' +
                            '<div class="clearfix">' +
                            '<div class="tydImg_s">' +
                            '<div class="tyd_imgR">' +
                            '<a target="_blank" href="' + item.link + '">' +
                            '<img width="101" height="101" src="' + item.pic + '" alt=""/><!--<img src="' + PUBLIC_URL + 'htdocs/firstwork/modules/tshop-um-sys_country_stores/assets/images/dianbiao_img.png" alt=""/>-->' +
                            '</a>' +
                            '</div>' +
                            '</div>' +
                            '<div class="tyd_address_s">' +
                            '<div class="adds">' +
                            '<p class="font-size_14">' +
                            '<span class="position_rel"><a target="_blank" href="' + item.link + '">' + item.store_name + '</a><a target="_blank" href="' + item.store_url + '"><i class="tydDw_ico"></i></a></span></p>' +

                            '<p class="mt_10">地址：<a target="_blank" href="' + item.store_url + '">' + item.address + '</a></p>' +

                            '<p class="mt_10">电话：' + (item.tel ? item.tel : '暂无') + '</p>' +

                            '<div class="guanzhu_btn"><i class="xing_w_ico"></i><span>关注店铺公众号</span>' +
                            '<div class="qR_ico"><img width="120" height="120" src="' + item.o2o_qr_code + '"></div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</li>';
                        if (i % 3 === 0) {
                            all_li_items += '<ul class="tydShow_list_s clearfix">' + li_items + '</ul>';
                            li_items = '';
                        }

                        if (i === len && i % 3 > 0) {
                            all_li_items += '<ul class="tydShow_list_s clearfix">' + li_items + '</ul>';
                            li_items = '';
                        }
                        i++;
                    });

                    $('#Q_Stroelist').html(all_li_items);
                    var counts = parseInt(data.msg.total);
                    var pageSize = postData.pageSize;

                    if (counts > pageSize) {
                        var pageObject = new pages_class_v(pageSize, webConfig.store_page, counts, 'sys_country_stores_list_page');
                        pageObject.config.prev = '<<上一页';
                        pageObject.config.next = '下一页>>';
                        var pageContent = pageObject.fpage([3, 4, 5, 6, 7, 8]);
                        $(".tshop-um-sys_country_stores .J_PagesBottom").html(pageContent);
                        $('.numBer').show();
                    } else {
                        $('.numBer').hide();
                    }
                }, 'json');
            }
        }
    };
    window.sys_country_stores_list_page = function (page) {
        self.functions.ajaxPage(page);
    };
    return self;
}, {requires: ['node', 'io']});
