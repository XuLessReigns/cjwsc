/**
 * Created by Administrator on 2016/9/28.
 */
$(function(){
    (function(){
        $.get("../sever/nav.json",function(data){
           // console.log(data);
            var html = "";
            $.each(data,function(i,o){
                var html3 = "";
                var html1 = "";
                $.each(o.dl,function(i,o){
                    var html2 = "";
                    $.each(o.aa,function(i,o){
                        html2 += "<a href=\"javascript:;\" target=\"_blank\">"+o.a+"</a>";
                    });
                    html1 +="<dl>" +
                        "<dt>" +
                        "<a href=\"javascript:;\" target=\"_blank\">"+o.dl+"</a>" +
                        "<i></i>" +
                        "</dt>" +
                        "<dd class=\"aa\">" + html2 +
                        "</dd>" +
                        "</dl>";
                });
                $.each(o.dda,function(i,o){
                    html3 += "<dd>" +
                        "<a href=\"javascript:;\" target=\"_blank\" title=\"简布秀姿\">"+o.a+"</a>" +
                        "</dd>";
                });
                html += "<li class=\"m1\" data-id=\""+o.pid+"\">" +
                    "<h3>" +
                    "<span style=\"position:relative;padding-left:25px\">" +
                    "<i class=\"shen_li pic_"+o.pid+"\"></i>" +
                    "<a href=\""+o.url+"\" target=\"_blank\">"+o.name+"</a>" +
                    "</span>" +
                    "</h3>" +
                    "<div class=\"menu_i\" id=\"cat_item_1\" style=\"display: none;\">" +
                    "<div class=\"thb clearfix\">" +
                    "<div class=\"wh50\">" +
                    "<span class=\"ht\">" +
                    "<a href=\"javascript:;\" target=\"_blank\">"+o.name+"</a>" +
                    "</span>" +
                    "</div>" +
                    "<div class=\"wh50 rht\">" +
                    "<a href=\"javascript:;\" target=\"_blank\">更多</a>" +
                    "<i></i>" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"dlDiv dumascroll clearfix  \" id=\"dumaScrollAreaId_42\" style=\"position: relative;\">" +
                    "<div id=\"dumaScrollAreaId_42Area\" class=\"dumascroll_area\">" +
                    "<div class=\"fl scroll\">" + html1 +
                    "</div>" +
                    "</div>" +
                   // "<div id=\"dumaScrollAreaId_42Bar\" class=\"dumascroll_bar\">" +
                   // "<div class=\"dumascroll_arrow_up\"></div>" +
                   // "<div class=\"dumascroll_handle\" style=\"top: 0px; height: 64px; opacity: 1;\"></div>" +
                   // "<div class=\"dumascroll_arrow_down\"></div>" +
                   // "</div>" +
                    "</div>" +
                    "<div class=\"bn_w clearfix\" id=\"bn_w1\">" +
                    "<div class=\"banner\" id=\"banner_1\">" +
                    "<div class=\"img\">" +
                    "<a href=\"javascript:;\" target=\"_blank\">" +
                    "<img src=\""+o.img+"\" style=\"display: inline\" index=\"0\" alt=\"1\">" +
                    "</a>" +
                    "</div>" +
                    "<div class=\"ico\">" +
                    "<ol class=\"fl\">" +
                    "<li class=\"cur\" style=\"width: 34px;\">0</li>" +
                    "</ol>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div id=\"adtextDiv1\" class=\"adtextDiv\">" +
                    "<p class=\"tht\">品牌推荐</p>" +
                    "<dl class=\"clearfix\">" + html3 +
                    "</dl>" +
                    "</div>" +
                    "</div>" +
                    "</li>";
            });
            $("#menu").html(html);
            $("#menu>li").hover(function(){
                $(this).children().eq(1).show();
            },function(){
                $(this).children().eq(1).hide();
            });
        });
    })();
    (function(){
        $.get("../sever/lunbo.json",function(data){
            var html = "";
            var str = "";
            $.each(data,function(i,o){
                if(i==0){
                    html += "<div class=\"lunBo_list_item active\">" +
                        "<a href=\"javascript:;\"><img src=\""+o.img+"\"></a>" +
                        "</div>";
                    str += "<li class=\"on\"><a href=\"javascript:;\">"+(i+1)+"</a></li>";
                }else {
                    html += "<div class=\"lunBo_list_item\">" +
                        "<a href=\"javascript:;\"><img src=\""+o.img+"\"></a>" +
                        "</div>";
                    str += "<li class=\"\"><a href=\"javascript:;\">"+(i+1)+"</a></li>";
                }
            });
            $(".num_list").html(str);
            $(".lunBo_list").html(html);
            var num = 0;
            var termId;
            $(".lBtn").click(function(){
                //  $(".lunBo_list_item").eq(num).hide();
                //  $(".num_list li").eq(num).removeClass("on");
                num--;
                if(num<0){
                    num = 5;
                }
                // $(".lunBo_list_item").eq(num).fadeIn(400);
                // $(".num_list li").eq(num).addClass("on");
                change(num);
            });
            $(".rBtn").click(function(){
                //var num = $(".lunBo_list_item").length;
                //$(".lunBo_list_item").eq(num).hide();
                // $(".num_list li").eq(num).removeClass("on");
                num++;
                if(num>=$(".lunBo_list_item").length){
                    num = 0;
                }
                //  $(".lunBo_list_item").eq(num).fadeIn(400);
                // $(".num_list li").eq(num).addClass("on");
                change(num);
            });
            $(".num_list li").click(function(){
                // $(".lunBo_list_item").eq(num).hide();
                // $(".num_list li").eq(num).removeClass("on");
                // num = $(this).index();
                // $(".lunBo_list_item").eq(num).fadeIn(400);
                // $(".num_list li").eq(num).addClass("on");
                num = $(this).index();
                change(num);
            });
            function  change(num){
                $(".lunBo_list_item").hide();
                $(".num_list li").removeClass("on");
                $(".lunBo_list_item").eq(num).fadeIn(400);
                $(".num_list li").eq(num).addClass("on");
            }
            function start(){
                termId = setInterval(function(){
                    $(".rBtn").click();
                },6000);
            }
            start();
            $(".lunBo").hover(function(){
                clearInterval(termId);
            },function(){
                start();
            });
        });
    })();
    $.get("../sever/huiLife.json",function(data){
        var html = "";
        $.each(data,function(i,o){
            var str = "";
            $.each(o.img,function(i,o){
                str += "<dd>" +
                    "<div class=\"borderDiv\">" +
                    "<div class=\"Adimg\">" +
                    "<a href=\"details.html\" target=\"_blank\">" +
                    "<img width=\"142\" height=\"142\" src=\""+o.imgSrc+"\" alt=\"\">" +
                    "</a>" +
                    "</div>" +
                    "<div class=\"hd-Text\">" +
                    "<p class=\"hdTitle\">" +
                    "<a href=\"details.html\" target=\"_blank\">"+o.pName+"</a>" +
                    "</p>" +
                    "<div class=\"clearfix\">" +
                    "<div class=\"price\">" +
                    "<p class=\"jiage\">" +
                    "<span>¥&nbsp;</span>" +
                    "<span class=\"fontSize_22\">"+o.price+"</span>.00" +
                    "</p>" +
                    "<p class=\"yanjia\">￥"+o.yuanjia+"</p>" +
                    "</div>" +
                    "<div class=\"dazhe\">"+o.dazhe+"折</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"border-left\" style=\"overflow: hidden;\"></div>" +
                    "<div class=\"border-bottom\" style=\"overflow: hidden;\"></div>" +
                    "<div class=\"border-top\" style=\"overflow: hidden;\"></div>" +
                    "<div class=\"border-right\" style=\"overflow: hidden;\"></div>" +
                    "</div>" +
                    "</dd>";
            });
            html += "<li data-trigger=\"1\" style=\"position: absolute; width: 603px; left: 0px; top: 0px; display: none;\">" +
                "<dl class=\"clearfix\">" + str +
                "</dl>" +
                "</li>";
        });
        $("#J_TModule .bd>.clearfix").html(html);
        (function(){
            var num = 0;
            $("#J_TModule .bd>.clearfix>li").eq(num).show();
            $("#J_TModule .next").click(function(){
                $("#J_TModule .bd>.clearfix>li").eq(num).hide();
                num++;
                if(num>4){
                    num = 0;
                }
                $("#J_TModule .bd>.clearfix>li").eq(num).fadeIn(400);
            });
            $("#J_TModule .prev").click(function(){
                $("#J_TModule .bd>.clearfix>li").eq(num).hide();
                num--;
                if(num<0){
                    num = 4;
                }
                $(".bd>.clearfix>li").eq(num).fadeIn(400);
            });
            var term;
            function star(){
                term = setInterval(function(){
                    $("#J_TModule .next").click();
                },6000);
            }
            star();
            $("#J_TModule .banner-box").hover(function(){
                clearInterval(term);
            },function(){
                star()
            });
        })();
    });

    // (function(){
    //     $("#shopModuleId6 .bd>ul>li").eq(0).show();
    //     var num = 0;
    //     $("#shopModuleId6 .next").click(function(){
    //         $("#shopModuleId6 .bd>ul>li").eq(num).hide();
    //         $("#shopModuleId6 .hd>ul>li").eq(num).removeClass("on");
    //         num++;
    //         if(num>2){
    //             num = 0;
    //         }
    //         $("#shopModuleId6 .bd>ul>li").eq(num).show();
    //         $(".hd>ul>li").eq(num).addClass("on");
    //     });
    //     $("#shopModuleId6 .prev").click(function(){
    //         $("#shopModuleId6 .bd>ul>li").eq(num).hide();
    //         num--;
    //         if(num<0){
    //             num = 2;
    //         }
    //         $("#shopModuleId6 .tshop-um-sys_floor_1 .bd>ul>li").eq(num).show();
    //         $("#shopModuleId6 .hd>ul>li").eq(num).addClass("on");
    //     });
    //     var term;
    //     function start(){
    //         term = setInterval(function(){
    //             $("#shopModuleId6 .next").click();
    //         },4000);
    //     }
    //     start();
    //     $("#shopModuleId6 .banner-box_small .bd").hover(function(){
    //         clearInterval(term);
    //     },function(){
    //         start();
    //     });
    // })();
    // (function(){
    //     $("#shopModuleId6 #titleList443 li").mouseover(function(){
    //         $("#shopModuleId6 #titleList443 li").removeClass("tab");
    //         $(this).addClass("tab");
    //         $("#shopModuleId6 .rightContent").hide();
    //         $("#shopModuleId6 .rightContent").eq($(this).index()).show();
    //         var left = parseInt($(this).index())*120;
    //         $("#shopModuleId6 #scrollbanner443").css("left",left);
    //     });
    // })();

    (function(){
        function change(element){

            $(element +" .bd>ul>li").eq(0).show();
            var num = 0;
            $(element +" .next").click(function(){
                $(element +" .bd>ul>li").eq(num).hide();
                $(element +" .hd>ul>li").eq(num).removeClass("on");
                num++;
                if(num>2){
                    num = 0;
                }
                $(element +" .bd>ul>li").eq(num).show();
                $(element +" .hd>ul>li").eq(num).addClass("on");
            });
            $(element +" .prev").click(function(){
                $(element +" .bd>ul>li").eq(num).hide();
                $(element +" .hd>ul>li").eq(num).removeClass("on");
                num--;
                if(num<0){
                    num = 2;
                }
                $(element +" .tshop-um-sys_floor_1 .bd>ul>li").eq(num).show();
                $(element +" .hd>ul>li").eq(num).addClass("on");
            });
            var term;
            function start(){
                term = setInterval(function(){
                    $(element +" .next").click();
                },4000);
            }
            start();
            $(element +" .banner-box_small .bd").hover(function(){
                clearInterval(term);
            },function(){
                start();
            });


            $(element +" #titleList443 li").mouseover(function(){
                $(element +" #titleList443 li").removeClass("tab");
                $(this).addClass("tab");
                $(element +" .rightContent").hide();
                $(element +" .rightContent").eq($(this).index()).show();
                var left = parseInt($(this).index())*120;
                $(element +" #scrollbanner443").css("left",left);
            });
        }
        change("#shopModuleId6");
        change("#shopModuleId7");
        change("#shopModuleId8");
        change("#shopModuleId9");
        change("#shopModuleId10");
        change("#shopModuleId11");
        change("#shopModuleId12");
        change("#shopModuleId13");
    })();
    (function(){
        $("#backTop").click(function(){
            $("body,html").animate({
                "scrollTop":0
            },400);
        });
        $(document).scroll(function(){
            if(parseInt($(document).scrollTop())>parseInt($(window).height())){
                $("#zt_wrap #floatNav").show();
            }else {
                $("#zt_wrap #floatNav").hide();
            }
        });
    })();
});