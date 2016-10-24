/**
 * Created by Administrator on 2016/9/29.
 */
$(function(){
    //引入公共样式头部和尾部
    $(".comtop").load("../html/header-common2.html");
    $(".comfoot").load("../html/footer-common2.html");
    //轮播图
    $.get("../sever/lunbo1.json",function(data){
        var html = "";
        $.each(data,function(i,o){
            html += "<div class=\"scrollImgbd\">"+
                "<a href=\"javascript:\"><img src=\""+o.src+"\"></a>"+
                "</div>";
        });
        $(".scrollImgBox").html(html);
    });
    var $index = 0;
    $(".scrollImgList .btn-rg").click(function(){
        $index++;
        if($index>2){
            $index = 0;
        }
        changeStyle();
    });
    $(".scrollImgList .btn-lf").click(function(){
        $index--;
        if($index<0){
            $index = 2;
        }
        changeStyle();
    });
    $(".scrollImgList-bottom ul").click(function(e){
        $index = $(e.target).index();
        // changeStyle();
        // console.log($index);
        $(".scrollImgbd").fadeOut(200);
        $(".scrollImgbd").eq($index).fadeIn(400);
        $(this).children().removeClass("on");
        $(e.target).addClass("on");
    });
    function changeStyle(){
        $(".scrollImgbd").fadeOut(200);
        $(".scrollImgbd").eq($index).fadeIn(400);
        $(".scrollImgList-bottom ul li").removeClass("on");
        $(".scrollImgList-bottom ul li").eq($index).addClass("on");
    };
    $(".scrollImgList .btn1").mouseenter(function(){
        $(this).animate({
            "opacity":0.9
        },200,function(){
            $(".scrollImgList .btn1").mouseleave(function(){
                $(this).animate({
                    "opacity":0.4
                },200);
            })
        });
    });
    $(".video").mouseenter(function(){
        $(".main-video").animate({
            "width":1040
        },400);
        $(".video-mp4").animate({
            "width":1040
        },400);
        $(".rightHotmore").animate({
            "right":0
        },400);
        $(".cen-Btn").addClass("changes");
    });
    $(".video").mouseleave(function(){
        $(".main-video").animate({
            "width":1200
        },400);
        $(".video-mp4").animate({
            "width":1200
        },400);
        $(".rightHotmore").animate({
            "right":-160
        },400);
        $(".cen-Btn").removeClass("changes");
    });
        $(".cen-Btn").click(function(){
            $(this).css("display","none");
            if(video.paused){
                video.play();
            }else{
                video.pause();
            }

        });
})