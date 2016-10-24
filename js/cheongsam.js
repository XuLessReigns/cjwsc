/**
 * Created by Administrator on 2016/9/27.
 */
$(function(){

    $("#container #ColumnContainer .item").hover(function(){
        console.log("123");
        $("#container .item .supp").removeClass("hide");
        $("#container .item .supp").addClass("show");
    },function(){
        $("#container .item .supp").removeClass("show");
        $("#container .item .supp").addClass("hide");
    });

    $.get("../sever/cheongsam.json",function(data){
        var html="";
        $.each(data,function(i,o){
            html += "<li class=\"item\">"
                    +"<div class=\"box\">"

                    + "<div class=\"img\">"
                    + "<a href=\"javascript:;\">"
                    + "<i></i>"
                    + "<img src=\""+o.img+"\" alt=\"\">"
                    + "</a>"
                    + "</div>"

                    + "<div class=\"name\">"
                    + "<a href=\"javascript:;\">"
                    + o.name
                    + "</a>"
                    + "</div>"

                    + "<div class=\"price\">"
                    + "<i>￥</i>"
                    + o.price
                    + "</div>"

                    + "<p class=\"supp hide\">"
                    + "<a href=\"javascript:;\">"
                    +  o.supp
                    + "</a>"
                    + "<em class=\"follow J_BrandFollow\">"
                    + "<i></i>关注"
                    + "</em>"
                    + "</p>"

                    + "</div>"
                    + "</li>"
        });
        $("#ColumnContainer").html(html);
    });
});