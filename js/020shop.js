/**
 * Created by Administrator on 2016/9/26.
 */
//引进头部尾部共同部分

//内容信息的导航吸顶
var $xidingh = $("#navHeight").offset().top;
$(window).scroll(function(){
    if($(this).scrollTop() > $xidingh){
        $(".nav-height").addClass("active");
    }else{
        $(".nav-height").removeClass("active");
    }
});
//内容信息的导航瞄点
$(".nav-wrap").navScroll({
    mobileDropdown: true,
    mobileBreakpoint: 700,
    scrollSpy: true
});
$(".click-me").navScroll({
    "$xidingh":0
});
$(".nav-wrap").on("click",".nav-mobile",function(e){
   e.preventDefault();
    $(".list").slideToggle("fast");
});
//图标的跳动
$(".tit i").hover(function(){
    $(this).animate({
       "margin-top":13
    },100).animate({
        "margin-top":17
    },100).animate({
        "margin-top":15
    },100);
},function () {
    $(this).animate({
       "margin-top":15
    });
});
//中间图片
$.get("../sever/020shop.json",function(data){
    //console.log(data);
    $.each(data,function(i,o){
        var html = "";
       $.each(o,function(i,a){
          html +="<li>"
              +"<a href=\""+ a.lianjie +"\" class=\"bigimg\"><img src=\""+ a.imgSrc +"\" alt=\"\"></a>"
               +"<div class=\"info\">"
              +" <a href=\""+ a.connect +"\"><img src=\""+ a.imgsrc +"\" alt=\"\"></a>"
               +"<a href=\""+ a.connect +"\" class=\"goshop\">进入店铺&gt;</a>"
               +"</div>"
               +"</li>";
       });
        if(i==2){
            //console.log($(".list").children())
            $(".list").children().eq(8).css({
               "margin-left":0
            });
        }
        $(".list:eq("+ i +")").html(html);
    });
});