/**
 * Created by Administrator on 2016/10/5.
 */
$.get("../sever/020store.json",function(data){
   // console.log(data);
    var html="";
   $.each(data,function(i,o){
       html+="<li>"
           +"<a href=\""+ o.lianjie01 +"\" class=\"imga\" data-name=\"commonhover\">"
           +"<i></i>"
           +"<img src=\""+ o.imgsrc +"\" alt=\"\">"
           +"</a>"
           +"<p data-name=\"commonhover\">"
           +"<a href=\""+ o.lianjie02 +"\">"+ o.desc +"</a>"
           +"</p>"
           +"<span class=\"price\" data-name=\"commonhover\">"+ o.price +"</span>"
           +"<a href=\""+ o.lianjie03 +"\" class=\"btn\" data-name=\"commonhover\"><i></i>立即购买</a>"
           +"</li>";
   });
    $(".list-pro>ul").html(html);
});

$(".list-pro>ul").mouseover(function(e){
    if($(e.target).attr("data-name")=="commonhover"){
        $(e.target).parent().children().last().animate({
           "right":0
        },100);
    }
});
$(".list-pro>ul").mouseout(function(e){
    if($(e.target).is("li")){
        $(e.target).children().last().animate({
            "right":"-76px"
        },100);
    }
});

$(".trade-name").html("宝安璟运店");
