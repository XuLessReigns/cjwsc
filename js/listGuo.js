$.get("../sever/listGuo.json",function(data){
	console.log(data);
	var html="";
	$.each(data, function(i,o) {
		html+="<li class=\"item\">"
                  +"<div class=\"box\">"
                      +"<div class=\"img\"><a href=\"#\" target=\"_blank\"><i></i><img src=\""+o.img+"\"></a></div>"
                      +"<p class=\"name\"><a href=\"#\" target=\"_blank\">"+o.name+"</a></p>"
                      +"<p class=\"price\">"
                          +"<i>￥</i>"+o.price+""
                      +"</p>"
                      +"<p class=\"supp\">"
                      	+"<a href=\"#\" class=\"fl\" target=\"_blank\">"+o.supp+"</a>"
                      	+"<em class=\"follow J_BrandFollow\" data-id=\"1\"><i></i>关注</em>"
                      +"</p>"
                      +"<em class=\"lab hide\">新款</em>"
                  +"</div>"
              +"</li>";
	});
	$(".ColumnContainer").html(html);
});
