/**
 * Created by Administrator on 2016/10/4.
 */
$(function(){
    $.get("../sever/household01.json",function(data){
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
                    +"</ul>"

        });
        $(".m_filter .sys_list_brand_bd .cont").html(html);
    });


    $.get("../sever/household02.json",function(data){
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


    $.get("../sever/household03.json",function(data){
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


    $.get("../sever/household04.json",function(data){
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