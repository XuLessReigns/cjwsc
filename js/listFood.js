$.get("../sever/listFood.json",function(data){
	console.log(data);
	var html="";
	$.each(data, function(i,o) {
		html+="<li>"
					+"<a href=\"#\" class=\"img\"><img src=\""+o.img+"\"><i></i></a>"
					+"<a href=\"#\" class=\"name\">"+o.name+"</a>"
					+"<p class=\"price\"><b>"+o.price+"</b></p>"
					+"<p class=\"btm\">"
					+"<a href=\"#\" class=\"fl\">立即购买&gt;</a><span>销量：<b class=\"red\">"+o.count+"</b></span></p>"
				+"</li>";
	});
	$(".ColumnContainerCON").html(html);
});


$.get("../server/listFood2.json",function(data){
	console.log(data);
	var html="";
	$.each(data, function(i,o) {
		html+="<li>"
					+"<a href=\"#\" class=\"img\"><img src=\""+o.img+"\"><i></i></a>"
					+"<a href=\"#\" class=\"name\">"+o.name+"</a>"
					+"<p class=\"price\"><b>"+o.price+"</b></p>"
				+"</li>";
	});
	$(".J_L_Rcom_ColumnContainer").html(html);
});