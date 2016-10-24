/**
 * Created by Administrator on 2016/9/27.
 */
;(function(){
    (function(){
        var str = $.cookie("shangp");
        if(!str)  return ;
		var cols = str.split("|");
        var ppaiArr = [];
        $.each(cols,function(i,o){
            var rows = o.split("#");
            if(!i){
                ppaiArr.push(rows[1]);
            }else{
                var flag = true;
                for(var j=0;j<ppaiArr.length;j++){
                    if(ppaiArr[j]==rows[1]){
                        flag = false
                    }
                    if(flag&&j==ppaiArr.length-1){
                       ppaiArr.push(rows[1]);
                    }
                }
            }
        })
        $.each(ppaiArr,function(i,o){
            var html = "<div class=\"gwu_body\">"+
                        "<p class=\"gwu_body_title\">"+
                        "<label>"+
                        "<input type=\"checkbox\" names='checkPPId' checked=\"true\" >"+o+
                        "</label>"+
                        "</p>"+
                        "<div class=\"gwu_body_co\">"+
                        "<div class=\"gwu_body_content\">"+
                        "<div class=\"gwu_content_top\">"+
                        "<div class=\"price_hd\">168</div>"+
                        "</div>"+
                        "</div>";
            var price = 0;
           for(var j=0;j<cols.length;j++){
               var rows = cols[j].split("#");
               if(rows[1]==o){
                    html +="<ul class=\"gwu_inf\">"+
                           "<li class=\"inf_wd400\">"+
                           "<label class=\"fl\">"+
                           "<input type=\"checkbox\" names=\"checkId\" checked=\"true\" >"+
                           "</label>"+
                           "<div class=\"inf_img fl\">"+
                            "<a href=\""+rows[5]+"\"><img src=\""+rows[2]+"\" ></a>"+
                            "</div>"+
                            "<div class=\"inf_Text fl\">"+
                          "<a href=\""+rows[5]+"\" target=\"_bank\">"+rows[4]+"</a>"+
                          "</div>"+
                          "</li>"+
                           "<li class=\"ing_wd240 fl\">"+
                           "<span class=\"inf_colorSize\">"+rows[6]+"</span>"+
                          "</li>"+
                          "<li class=\"gwu_wd_100 fl\">"+
                          "<p class=\"inf_price\">"+rows[3]+"</p>"+
                          "</li>"+
                          "<li class=\"gwu_wd_100 fl\">"+
                          "<div class=\"inf_add_count\">"+
                          "<b class=\"fl\" name=\"deta_count\">-</b>"+
                          "<input class=\"fl\" type=\"text\" pid=\""+rows[0]+"\" siz=\""+rows[6]+"\" value=\""+rows[7]+"\">"+
                          "<b class=\"fl\" name=\"add_count\">+</b>"+
                          "</div>"+
                          "</li>"+
                          "<li class=\"gwu_wd_100 fl\">"+
                          "<span class=\"inf_sum_price\">"+parseInt(rows[3])*parseInt(rows[7])+"</span>"+
                          "</li>"+
                          "<li class=\"gwu_wd_100 fl\">"+
                          "<a href=\"javascript:void(0);\" att=\""+rows[6]+"\" pid=\""+rows[0]+"\" class=\"inf_bttn\">删除</a>"+
                          "<a href=\"javascript:;\" class=\"inf_bttn mt5\">加入关注</a>"+
                          "</li>"+
                          "<div class=\"clear\"></div>"+
                          "</ul>";
                   price += parseInt(rows[3])*parseInt(rows[7]);
               }
           }
           html +="</div></div>";
            $(html).insertBefore("#gwu_footer");
            $("#gwu_footer").prev().find(".price_hd").html(price);
            $("#sum_price").html(price);
        })

    })()
      $("#content_gw").click(function(e){
        if($(e.target).attr("class")==="inf_bttn"){
           var pid = $(e.target).attr("pid");
            var siz = $(e.target).attr("att");
            console.log(pid,siz)
            opeateCookie.removePid(pid,siz);
            $(e.target).parent().parent().remove();
        }
        if($(e.target).attr("name")==="deta_count"){
              var val = parseInt($(e.target).next().val())-1;
            if(!val) return ;
            var pid = $(e.target).next().attr("pid");
            var siz = $(e.target).next().attr("siz");
            opeateCookie.addPid(pid,siz,false);
            var $dom = $(e.target).parent().parent();
            var money = val*parseInt($dom.prev().find("p").html());
            $dom.next().find("span").html(money);
             $(e.target).next().val(val);
            sumMoney();   //更改总价格
        }
        if($(e.target).attr("name")==="add_count"){
            var val = parseInt($(e.target).prev().val())+1;
            var $dom = $(e.target).parent().parent();
            var money = val*parseInt($dom.prev().find("p").html());
            var pid = $(e.target).prev().attr("pid");
            var siz = $(e.target).prev().attr("siz");
            opeateCookie.addPid(pid,siz,true);
            $dom.next().find("span").html(money);
            $(e.target).prev().val(val);
            sumMoney();   //更改总价格
          }
          if($(e.target).attr("names")==="checkId"){
              var $dom = $(e.target).parents(".gwu_body");
              var flg = $(e.target).prop("checked");
              if(flg){
                    var $arr = $dom.find("[names=checkId]");
                   var flag = true;
                    $.each($arr,function(i,o){
                        if($(o).prop("checked")==false){
                            flag = false;
                            return false;
                        }
                    })
                    if(flag){
                        $dom.find("[names=checkPPId]").prop("checked",true);
                    }
              }else{
                  $dom.find("[names=checkPPId]").prop("checked",false);
              }
          }
      })
    $(".gwu_body").click(function(e){
        if($(e.target).attr("names")==="checkPPId"){
            if($(e.target).prop("checked")==true){
                var $arr = $(e.target).parents(".gwu_body").find("[names=checkId]");
                $.each($arr,function(i,o){
                    $(o).prop("checked",true);
                })
            }else{
                var $arr = $(e.target).parents(".gwu_body").find("[names=checkId]");
                $.each($arr,function(i,o){
                    $(o).prop("checked",false);
                })
            }
        }
    })
    function   sumMoney(){
     var $arr = $(".content_gw").find("[names=checkId]");
        var price = 0;
        $.each($arr,function(i,o){
            if($(o).prop("checked")==true){
               var money =  parseInt($(o).parents(".gwu_inf").find(".inf_sum_price").html());
                price += money;
            }
        })
        $(".price_hd").html(price);
        $("#sum_price").html(price);
    }

    var OtherShop = function(){
        this.data = [];
        this.ulWidth = 0;
        this.hide = "none";
    }
    OtherShop.prototype = {
        addHtml:function(){
            var leng = this.data.length;
            if(leng){
                this.ulWidth = leng*200;
                this.$ulDom = $("<ul></ul>").appendTo("#other_shop").css({
                    "display":this.hide,
                    "width":this.ulWidth
                }).addClass("shop_box_ul");
                var that =this;
                $.each(this.data,function(i,o){
                  var html = "<li>" +
                      "<a href=\"+o.getpath+\" class=\"shop_imgDiv\">" +
                      "<img src=\""+o.pic+"\" alt=\"\"></a>"+
                      "<p class=\"shop_content\"><a href=\""+o.getpath+"\">" +o.introduce+"</a></p>"+
                      "<p class=\"mt_20_price\">¥"+o.price+"</p>"+
                       "<a href=\""+o.getpath+"\" class=\"go_shop_cart\">立即购买</a>"+
                        "</li>";
                    that.$ulDom.append(html);
                })
            }
        },
        addDom:function(){
            $("#other_shop_ul").attr("index",0);
            $("#other_shop_ul").attr("flag",true);
          $("#other_shop_ul").on("click",function(e){
              if($(e.target).is("li")){
                  $(this).children().removeClass("cur");
                  var index = $(e.target).addClass("cur").index();
                  $("#other_shop>ul").hide().eq(index).show();
                 $(this).attr("index",index);
              }
          })
         $(document).on("click",".shop_box_left,.shop_box_right",function(e){
             if( $("#other_shop_ul").attr("flag")=="false")  return ;
             $("#other_shop_ul").attr("flag",false);
             var index = $("#other_shop_ul").attr("index");
             var $ul = $("#other_shop>ul").eq(index)
             var lefts = parseInt($ul.css("left"));
             var widths = $ul.width();
             if($(e.target).attr("class")=="shop_box_left"){
                if(lefts<0){
                    $ul.animate({
                        left:lefts+1000
                    },800,function(){
                        $("#other_shop_ul").attr("flag",true);
                    });
                }else{
                    $ul.animate({
                        left:1000-widths
                    },800,function(){
                        $("#other_shop_ul").attr("flag",true);
                    })
                }

             }else{
                 if(lefts+widths>1000){
                     $ul.animate({
                         left:lefts-1000
                     },800,function(){
                         $("#other_shop_ul").attr("flag",true);
                     });
                 }else{
                     $ul.animate({
                         left:0
                     },800,function(){
                         $("#other_shop_ul").attr("flag",true);
                     })
                 }

             }
         })
            $("#other_shop_hover").hover(function(){
                $(this).find("i").show();
            },function(){
                $(this).find("i").hide();
            })
        }
    }
    var otherdata1 = new OtherShop();
    otherdata1.addDom();
    $.ajax({
        method:"get",
        url:"../sever/shop_cart.json",
        success:function(dat){
            otherdata1.data=dat;
            otherdata1.hide="block";
            otherdata1.addHtml();
        },
        error:function(err){
            console.log(err);
        }
    })
})();