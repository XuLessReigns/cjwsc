/**
 * Created by Administrator on 2016/9/26.
 */

//ajax获取数据
    $.get("../sever/newly.json",function(data){
        var html = "";
        $.each(data,function(i,o){
                html =  "<dl>"
                        +"<dt><img src=\""+o.imgsrc+"\">"
                        +"<em></em></dt>"
                        +"<dd>"+o.pname+"</dd>"
                        +" <p>"+o.price+"</p>"
                        +" </dl>"
                        +" <div class=\"brand\">"
                        +" <i>"+o.brand+"</i>"
                        +" <span pid=\""+o.id+"\">关注</span>"
                        +" </div>"

            $(".item:eq("+i+")").html(html);
            //console.log(o.id);
        });
    });

    //向cookie里传入数据
    $(".item").click(function(e){

      if($(e.target).is("span")){
          //alert("ok");
      }
        //alert(1);
        var pid =$(this).children().eq(1).children().eq(1).attr("pid");
        var brand = $(this).children().eq(1).children().eq(0).html();
        var pname = $(this).children().eq(0).children().eq(1).html();
        var price = $(this).children().eq(0).children().eq(2).html();
        var img = $(this).children().eq(0).children().eq(0).children().eq(0).attr("src");
        console.log(pid);
        console.log(brand);

        var str = pid + "#" + pname + "#" + img + "#" + price + "#" + brand+ "#" + "1";
        var $shopcart = $.cookie("shopcart");
        if(!$shopcart){
            //cookie文件中是空的
            $.cookie("shopcart",str,{
                expires:30
            });
        }
        else{
            var result = strOper.add($shopcart,str);
            $.cookie("shopcart",result);
        }

    });

