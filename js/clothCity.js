/**
 * Created by Administrator on 2016/9/27.
 */
$(function(){
        $.get("../sever/cloth.json",function(data){
        var html = "";
        $.each(data,function(i,o){
            html +=  "<li>"
                +"<a href=\"javascript:;\" class=\"img\">"
                +"<img data-original=\""+o.img+"\">"
                +"</a>"
                +"<div class=\"info\">"
                +"<a href=\"javascript:;\" class=\"name\">"+o.content+"</a>"
                +"<p class=\"price\">特价：<b>"+o.price+"</b></p>"
                +"<a href=\"javascript:;\" class=\"btn\">立即购买</a>"
                +"</div>"
                +"</li>"
        });
        $("#ColumnContainer").html(html);
            $("img").lazyload({
                effect:"fadeIn",
                threshold:20,
                placeholder:"../images/logo.png"
            });
    });
});

function  travel(num,jsons){
	$(num).click(function(){
	$.get(jsons,function(data){
        var html = "";
        $.each(data,function(i,o){
            html += "<li>"
                +"<a href=\"javascript:;\" class=\"img\">"
                +"<img data-original=\""+o.img+"\">"
                +"</a>"
                +"<a href=\"javascript:;\" class=\"name\">"+o.content+"</a>"
                +"<p class=\"price\"><b><i>￥</i>"+o.price+"</b></p>"
                +"<p class=\"btm\">"
                +"<a href=\"javascript:;\" class=\"fl\">立即购买></a>"
                +"<span>销量："
                +"<b class=\"red\">"+o.numb+"</b>"
                +"</span>"
                +"</p>"
                +"</li>"
        });
        $("#ColumnContainer1").html(html);
        $("img").lazyload({
            effect:"fadeIn",
            threshold:20,
            placeholder:"../images/logo.png"
        });
   });
   		var current = $(this).index();
   		console.log(current);
        $(".displaynone>a").removeClass("page-cur");
        $(".displaynone>a:eq("+current+")").addClass("page-cur");
	});
}
travel(".displaynone>a:eq(1)","../sever/cloth1.json");
travel(".displaynone>a:eq(2)","../sever/clothButton2.json");
travel(".displaynone>a:eq(3)","../sever/clothButton3.json");
travel(".displaynone>a:eq(4)","../sever/clothButton4.json");


/*$(".displaynone>a:eq(2)").click(function(){
	$.get("clothButton2.json",function(data){
        var html = "";
        $.each(data,function(i,o){
            html += "<li>"
                +"<a href=\"javascript:;\" class=\"img\">"
                +"<img data-original=\""+o.img+"\">"
                +"</a>"
                +"<a href=\"javascript:;\" class=\"name\">"+o.content+"</a>"
                +"<p class=\"price\"><b><i>￥</i>"+o.price+"</b></p>"
                +"<p class=\"btm\">"
                +"<a href=\"javascript:;\" class=\"fl\">立即购买></a>"
                +"<span>销量："
                +"<b class=\"red\">"+o.numb+"</b>"
                +"</span>"
                +"</p>"
                +"</li>"
        });
        $("#ColumnContainer1").html(html);
        $("img").lazyload({
            effect:"fadeIn",
            threshold:20,
            placeholder:"../images/logo.png"
        });
   });
   		var current = $(this).index();
   		console.log(current);
        $(".displaynone>a").removeClass("page-cur");
        $(".displaynone>a:eq("+current+")").addClass("page-cur");
});*/

$(function(){
    $.get("../sever/cloth1.json",function(data){
        var html = "";
        $.each(data,function(i,o){
            html += "<li>"
                +"<a href=\"javascript:;\" class=\"img\">"
                +"<img data-original=\""+o.img+"\">"
                +"</a>"
                +"<a href=\"javascript:;\" class=\"name\">"+o.content+"</a>"
                +"<p class=\"price\"><b><i>￥</i>"+o.price+"</b></p>"
                +"<p class=\"btm\">"
                +"<a href=\"javascript:;\" class=\"fl\">立即购买></a>"
                +"<span>销量："
                +"<b class=\"red\">"+o.numb+"</b>"
                +"</span>"
                +"</p>"
                +"</li>"
        });
        $("#ColumnContainer1").html(html);
        $("img").lazyload({
            effect:"fadeIn",
            threshold:20,
            placeholder:"../images/logo.png"
        });
    });
});

$(function(){
    $.get("../sever/cloth2.json",function(data){
        var html = "";
        $.each(data,function(i,o){
            html +=  "<li>"
                     +"<a href=\"javascript:;\" class=\"img\">"
                     +"<img data-original=\""+o.img+"\">"
                     +"</a>"
                     +"<a href=\"javascript:;\" class=\"name\">"+o.content+"</a>"
                     +"<p class=\"price\">"
                     +"<b>"+o.price+"</b>"
                     +"</p>"
                     +"</li>"
        });
        $("#ColumnContainer2").html(html);
        $("img").lazyload({
            effect:"fadeIn",
            threshold:20,
            placeholder:"../images/logo.png"
        });
    });
});

