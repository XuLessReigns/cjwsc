/**
 * Created by Administrator on 2016/10/4.
 */
;(function(){
    $("#my_img").mousemove(function(e){
        var wid = $(this).children().eq(1).width();
        var hei = $(this).children().eq(1).height();
        var x0 = e.clientX-$(this).offset().left+$(window).scrollLeft()-wid/2;
        var y0 = e.clientY-$(this).offset().top+$(window).scrollTop()-hei/2;
        x0 = Math.max(0,Math.min(x0,$(this).width()-wid))
        y0 = Math.max(0,Math.min(y0,$(this).height()-hei))
        $(this).children().eq(1).css({
            left:x0,
            top:y0
        })
       $(this).next().find("img").css({
           marginLeft:-x0*2,
           marginTop:-y0*2
       })
    }).hover(function(){
        $(this).children().last().show();
       var sr =  $(this).children().first().attr("src");
        $("#img_tool_Div").show().find("img").attr("src",sr);
    },function(){
        $("#img_tool_Div").hide();
        $(this).children().last().hide();
    })
    $("#my_pic_ul_tab").click(function(e){
        if($(e.target).is("img")){
           var Src = $(e.target).attr("tool");
            $("#my_img").find("img").attr("src",Src);
        }
        if($(e.target).is("li")){
            var Src = $(e.target).find("img").attr("tool");
            $("#my_img").find("img").attr("src",Src);
        }
    })
    $(".hove_title").click(function(e){
        if($(e.target).attr("class")=="hove_right fr"){
            var $dom = $("#hove_content>ul[hid=true]");
            if($dom.next().is("ul")){
                $dom.hide().attr("hid","").next().attr("hid","true").show();
            }
        }
        if($(e.target).attr("class")=="hove_left fr"){
            var $dom = $("#hove_content>ul[hid=true]");
            if($dom.prev().is("ul")){
                $dom.hide().attr("hid","").prev().attr("hid","true").show();
            }
        }
    })
    $(".main_tab>ul").click(function(e){
        if($(e.target).is("li")){
            $(e.target).addClass("cur").siblings().removeClass("cur");
            if($(e.target).index()){
                $("[names=shouh]").show().prev().hide();
            }else{
                $("[names=shouh]").hide().prev().show();
            }
        }
    })
    $(".main_footer_right>i").hover(function(){
        $(this).find("a").show();
    },function(){
        $(this).find("a").hide();
    })
    $(".add_count").click(function(e){
        if($(e.target).attr("class")==="jian"){
           var valu = parseInt($(e.target).next().val())+1;
            $(e.target).next().val(valu);
        }if($(e.target).attr("class")==="jia"){
            var valu = parseInt($(e.target).prev().val())-1;
            valu=Math.max(valu,1);
            $(e.target).prev().val(valu);
        }
    })
    $(".add_count>input").keyup(function(){
        var html = $(this).val();
        var reg = /^[0-9]{1,}$/;
        if(!reg.test(html)){
            $(this).val(1);
        }
    })
    //添加购物车
    var addGwc = function(){
       var arr = [];
        var $dom =$("#my_col_to1");
        arr[0]=$("#chp_pid").html().split(":")[1];
        arr[1]=$(".details_sitemap").children().last().html();
        arr[2]=$("#my_pic_ul_tab:eq(0)").find("img").attr("src");
        arr[3]=$("#attr_y_price").html();
        arr[4]=$("#attr_name").attr("title");
        arr[5]=location.href;
        arr[6]=$dom.html()+" "+$dom.next().children().filter(".cur").find("b").html()+"</br>"+
            $("#my_col_to2").html()+" "+$("#my_col_to2").next().children().filter(".cur").html();
        arr[7]=$("#my_shop_count").val();
        var str = opeateCookie.objChangestr(arr);
        opeateCookie.createPid(str);
        if(confirm("添加成功,是否跳转至购物车")){
            location.href="goshang.html";
        }

    }
    $("#add_gch").click(addGwc);
    $("#add_gch1").click(addGwc);
    $(window).scroll(function(e){
        var $scr = $(this).scrollTop();
        var top = $("#main_tab").parent().offset().top;
        var lef = $("#main_tab").parent().offset().left;
        if($scr>top){
            $("#main_tab").css("position","fixed").css("left",lef);
        }else{
            $("#main_tab").css("position","static");
        }
    })
    var crearTop=function(data){
        $.each(data,function(i,o){
            var html= "<a href=\""+o.get+"\">"+o.names+"</a><i> > </i>";
            if(i==data.length-1)
                html= "<a href=\""+o.get+"\">"+o.names+"</a>";
            $(html).appendTo(".details_sitemap");
        })
    };
    var crearppai = function(data){
       var html ="<img src=\""+data.img+"\">";
        $(".shop_PPai .go_PPai").attr("href",data.get);
        $(html).appendTo(".shop_PPai .PPai_img");
    };
    var shopxx = function(data){
    $("#attr_name").prepend(""+data.title).attr("title",data.title);
    $("#attr_y_price").html(data.price);
    $("#del_price").html(data.prices);
    $("#my_origin").html(data.origin);
    $("#my_sum").val(data.count);
    $("#chp_pid").html("商品ID:"+data.pid)
        /*检测是否为抢购商品*/
        if(data.timeStop){
          $("#shop_time").show();
        }
        if(data.count==="0"){
            $(".chp_sale_out").show();
        }
        if(data.fwshang){
          $("#my_fwshang").show().find("b").html(data.fwshang);
        }
        if(data.hot){
            $("#attr_name").find("span").html(data.hot)
        }
        if(data.hint){
            $("#attr_name").next().html(data.hint);
        }
    }
    var shaopCols = function(data){
     $("#my_col_to1").html(data[0]);
        $.each(data,function(i,o){
            if(i) {
                var html = "<em class=\"choice_shop\">";
                if (i == 1) {
                    var html = "<em class=\"choice_shop cur\">";
                }
                html += o;
                html += "</em>";
                $("#my_col_to1").next().append(html);
            }
        })
        $("#my_col_to1").next().find("em").click(function(){
            var index = $(this).index()
             $(this).addClass("cur").siblings().removeClass("cur");
             var $input =$("#my_pic_ul").children().eq(index);
            $("#my_pic_ul_tab").html("");
            $.each($input.children(),function(i,o){
              var html = "<li><img src=\""+$(o).attr("small")+"\" tool=\""+$(o).attr("tool")+"\"><span></span></li>";
                $(html).appendTo("#my_pic_ul_tab");
            })
            $("#my_img").find("img").attr("src",$input.children().eq(0).attr("tool"))
        })
    }
    var shopSize = function(data){
     $("#my_col_to2").html(data[0]);
        $.each(data,function(i,o){
            if(i){
                var html = "<em class=\"choice_shop\">";
                if(i==1){
                    html = "<em class=\"choice_shop cur\">";
                }
                html += o;
                html +="</em>";
                $("#my_col_to2").next().html(html);
            }
        })
    }
    var faimg =function(data){
        $.each(data,function(i,o){
            var html = "<li>";
            for(var j=0,leng=o.length;j<leng;j++){
                html += "<input type=\"hidden\" small=\""+o[j][0]+"\" tool=\""+o[j][1]+"\">";
            }
             html += "</li>";
            $(html).appendTo("#my_pic_ul");
        })
        $.each(data[0],function(i,o){
            var html = "<li><img src=\""+o[0]+"\" tool=\""+o[1]+"\"><span></span></li>";
            $(html).appendTo("#my_pic_ul_tab");
        })
        $("#my_img").find("img").attr("src",data[0][0][1]);
    }
    var myHave =function(data){
        var cols = parseInt((data.length-1)/6)+1;
        for(var j=0;j<cols;j++){
            var html = "<ul style=\"display:none\">";
            if(j==0){
                html = "<ul style=\"display:block\" hid=\"true\">";
            }
            for(var i=j*6;i<(j+1)*6;i++){
               html += "<li class=\"fl\">"+
                       "<a href=\""+data[i].geturl+"\" class=\"hove_a1\">"+
                       "<img src=\""+data[i].pic+"\">"+
                       "</a>"+
                       "<a href=\""+data[i].geturl+"\" class=\"hove_a2\">"+
                        data[i].title+
                       "</a>"+
                       "<p class=\"price\"><b>￥"+data[i].price+"</b></p>"+
                       "</li>";
                if( i == data.length-1){
                    break;
                }
            }
            html += "</ul>";
            $(html).appendTo("#hove_content");
        }
    }
    var hotTj = function(data){
        var html = "<ul>";
        $.each(data,function(i,o){
            html += "<li>"+
                    "<a href=\""+o.geturl+"\" class=\"tuijian_a1\">"+
                    "<img src=\""+o.pic+"\" >"+
                    "</a>"+
                    "<a href=\""+o.geturl+"\" class=\"tuijian_a2\">"+o.title+"</a>"+
                    "<p class=\"price\">"+
                    "<b>￥"+o.price+"</b>"+
                    "</p>"+
                    "</li>";
        })
        html +="</ul>";
        $(html).appendTo("#my_tuijian");
    }
    var myGzhu = function(data){
        var html = "<ul>";
        $.each(data,function(i,o){
            html += "<li>"+
                "<a href=\""+o.geturl+"\" class=\"tuijian_a1\">"+
                "<img src=\""+o.pic+"\" >"+
                "</a>"+
                "<a href=\""+o.geturl+"\" class=\"tuijian_a2\">"+o.title+"</a>"+
                "<p class=\"price\">"+
                "<b>￥"+o.price+"</b>"+
                "</p>"+
                "</li>";
        })
        html +="</ul>";
        $(html).appendTo("#my_gzhu");
    }
    var detailsPic = function(data){
        var html = "";
        $.each(data,function(i,o){
            html += "<img src=\""+o+"\">";
        })
        $(html).appendTo("[names=pic]");
    }
    var myShouh = function(data){
        var html="";
        $.each(data,function(i,o){
            html += "<img src=\""+o+"\" >";
        })
        $(html).appendTo("[names=shouh]");
    }
    $.ajax({
        method:"get",
        typedata:"json",
        url:"../sever/details-top.json",
        success:function(dat){
            crearTop(dat[0]);
            crearppai(dat[1]);
            shopxx(dat[2]);
            shaopCols(dat[3]);
            shopSize(dat[4]);
            faimg(dat[5]);
            myHave(dat[6]);
            hotTj(dat[7]);
            myGzhu(dat[8]);
            detailsPic(dat[9]);
            myShouh(dat[10]);
        },
        error:function(err){
            console.log(err);
        }
    })
})();