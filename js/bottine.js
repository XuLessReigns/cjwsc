/**
 * Created by Administrator on 2016/10/4.
 */
$(function(){
    $.get("../sever/bottine01.json",function(data){
        var html="";
        $.each(data,function(i,o){
            html += "<ul class=\"clearfix\" id=\"g_c_b_1s\">"

                   + "<li>"
                   + "<a href=\"javascript:void(0);\">"
                   + o.b1
                   + "</a>"
                   + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b2
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b3
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b4
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b5
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b6
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b7
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b8
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b9
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b10
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b11
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b12
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b13
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b14
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b15
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b16
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b17
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b18
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b19
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b20
                    + "</a>"
                    + "</li>"

                    + "<li>"
                    + "<a href=\"javascript:void(0);\">"
                    + o.b21
                    + "</a>"
                    + "</li>"

                    +"</ul>"
                    +"<span class=\"more J_CateBrandMore\" style=\"display: inline;\">"
                    +"<em>收起</em>"
                    +"<i></i>"
                    +"</span>"
        });
        $(".m_filter .sys_list_brand_bd .cont").html(html);
    });


    $.get("../sever/bottine02.json",function(data){
        var html="";
       $.each(data,function(i,o){
         html += "<li>"
                 +"<a href='javascript:;' class='img'>"
                 + "<img src='"+o.img+"'>"
                 +  "<i></i>"
                 +  "</a>"

                 + "<a href='javascript:;' class='name'>"
                 +  o.name
                 +  "</a>"

                 +  "<p class='price'>"
                 +   "<b><i>￥</i>"
                 +  o.price
                 +  "</b>"
                 +  "</p>"

                 +  "<p class='btm'>"
                 +  "<a href='javascript:;' class='fl'>立即购买></a>"
                 +  "<span>销量："
                 +  "<b class='red'>"
                 +  o.soldcont
                 +  "</b>"
                 +  "<span>"
                 +  "</p>"
                 +  "</li>"
       });
     $("#artical #ColumnContainer").html(html);
    });


    $.get("../sever/bottine03.json",function(data){
        var html="";
        $.each(data,function(i,o){
            html += "<li>"
                +"<a href='javascript:;' class='img'>"
                +"<img src='"+o.img+"'><i></i>"
                + "</a>"

                + "<a href='javascript:;' class='name'>"
                + o.name
                +"</a>"

                +"<p class='price'>"
                +"<b>￥"
                +o.price
                +"</b>"
                +"</p>"
                +"</li>"
        });
        $("#J_L_Rcom_ColumnContainer").html(html);
    });


    $.get("../sever/bottine04.json",function(data){
        var html="";
        $.each(data,function(i,o){
            html += "<li>"
                +"<a href='javascript:;' class='img'>"
                +"<img src='"+o.img+"'><i></i>"
                + "</a>"

                + "<a href='javascript:;' class='name'>"
                + o.name
                +"</a>"

                +"<p class='price'>"
                +"<b>￥"
                +o.price
                +"</b>"
                +"</p>"
                +"</li>"
        });
        $("#J_L_Sale_ColumnContainer").html(html);
    })
});