//example
/*$.popup({
	boxID:"defaultID",
	title:"修改地址",
	width:500,
	height:300,
	content:'url:pop_edit_address.html', //'text:<div>文本内容</div>';
	confirmBtn:true, //确定按钮
	cancelBtn:true,  //取消按钮	
	onload:function(){ //弹窗加载后执行
		//
	},
	qdCallback:function(){ //确认按钮回调函数
		//
	},
	qxCallback:function(){ //取消按钮回调函数
		//
	},
	callback:function(){ //弹窗关闭回调函数
		
	}
});*/

//弹出层
(function($){
	$.popup = function(options){
		var o = $.extend({
			title:"",				//标题 默认无
			content:"text:内容", 	//弹出层内容 text:文本 url:url iframe:iframe
			boxID:"popupID",		//弹出层id	必须 
			width:"",				//宽 可选 默认自适应	
			height:"",				//高 可选 默认自适应
			showbg:true,			//是否显示遮罩 可选 默认显示 true=>显示 false=>不显示
			showbd:true,			//是否显示边框 默认显示 false：隐藏
			bdCss:'',				//定义弹出层边框样式
			confirmBtn:false,  		//是否显示确定按钮
			cancelBtn:false,		//是否显示取消按钮
			autoClose:false, 		//是否自动关闭
			callback:null,			//关闭弹出层回调函数
			qdCallback:null,		//确定按钮回调函数
			qxCallback:null,		//取消按钮回调函数
			autoClose:false,		//自动关闭
			autoCloseTime:3000,		//自动关闭时间	
			onload:null				//内容加载完成执行函数
		},options);	
		
		if($('#'+o.boxID).length) return;
		
		$("body").append(
			'<div class="popWrap">'+
				'<div id="'+o.boxID+'" class="popup">'+
					'<a href="javascript:void(0)" class="close_pop">&times;</a>'+
					'<h3 class="pop_tit">'+o.title+'</h3>'+
					'<div class="html"></div>'+
				'</div>'+
			'</div>'
		);
		
		var obj = $('#'+o.boxID),
			popCont = obj.find('.html'),
			popTit = obj.find('.pop_tit');
		
		if(!o.title) obj.find(".pop_tit").remove();
		
		if(o.confirmBtn || o.cancelBtn){
			obj.append('<p class="btn_pop"></p>');
		}
		
		var popBtn = obj.find('.btn_pop');
		
		o.confirmBtn && obj.find('.btn_pop').append('<a href="javascript:;" class="confirm btnSubmit">确定</a>');
		o.cancelBtn && obj.find('.btn_pop').append('<a href="javascript:;" class="cancel">取消</a>');

		if(!o.showbd) obj.css("border","none");
		if(o.bdCss != '') obj.css(o.bdCss); 
		if(o.showbg || o.showbg==null) obj.before('<div class="mask"></div>');
	
		obj.fadeTo(200,1).siblings(".mask").fadeTo(200,0.5);
		
		var type = o.content.substring(0,o.content.indexOf(":"));
		var content = o.content.substring(o.content.indexOf(":")+1,o.content.length);
		
		switch(type){
			case 'text':
				popCont.html(content);
				setPos(o);
				if(o.autoClose){
					setTimeout(function(){
						close_pop($(".popWrap:last"),function(){
							if(o.callback) o.callback();
						});	
					},o.autoCloseTime);
				}
				if(!!o.onload) o.onload();
				break;
			case 'img':
				popCont.html("<p class='img_loading'>正在加载..</p><img src='"+content+"' style='display:none' />");
				setPos(o);	
				popCont.find("img").load(function(){
					$(this).show().siblings(".img_loading").remove();
					setPos(o);
				});
				if(!!o.onload) o.onload();
				break;		
			case 'url':
				var contentDate=content.split("?");
				$.ajax({
					beforeSend:function(){
						popCont.html("<p class='img_loading'>正在加载..</p>");
						setPos(o);
					},
					type:"GET",
					dataType:"html",
					url:contentDate[0],
					data:contentDate[1],
					success:function(html){
						popCont.html(html);
						setPos(o);
						if(!!o.onload) o.onload();
					},
					error:function(){
						popCont.html("<p class='pop_error'>加载数据出错！</p>");
						setPos(o);
					}
				});
				break;
			case 'iframe':
				var contentDate=content.split("?");
				popCont.html("<iframe src='"+content+"' scrolling='auto' id='pop_iframe' frameborder='0' width='0' height='0'></iframe>");
				popCont.append("<p class='img_loading'>正在加载..</p>");
				
				$("#pop_iframe").load(function(){	
					$(this).css({width:o.width,height:o.height}).siblings("p").remove();
					if(!!o.onload) o.onload();
				});	
				setPos(o);
				/*$.ajax({
					beforeSend:function() {
						popCont.html("<p class='img_loading'>正在加载...</p>");
						setPos(o);
					},	
					url:contentDate[0],
					success:function(url){
						popCont.html("<iframe src='"+url+"' scrolling='auto' id='pop_iframe' frameborder='0' width='0' height='0'></iframe>");
						popCont.append("<p class='img_loading'>正在加载..</p>");
						
						$("#pop_iframe").load(function(){	
							$(this).css({width:o.width,height:o.height}).siblings("p").remove();
							if(!!o.onload) o.onload();
						});	
						setPos(o);
					},
					error:function(){
						popCont.html("<p class='pop_error'>加载数据出错！</p>");
						setPos(o);
					}
				});*/
				break;
		}
		//设置弹出层居中显示
		function setPos(o){
			var winW = $(window).width(),
				winH = $(window).height();
			var titH = popTit.length && popTit.height() || 0;
			var btnH = popBtn.length && popBtn.outerHeight() || 0;
			
			var contW = (o.width && parseInt(o.width) ) || popCont.outerWidth(), 
				contH = (o.height && parseInt(o.height) ) || popCont.outerHeight();
			var resH = contH + titH + btnH;
			
			//console.log(contH)
			//console.log("内容宽："+contW+',内容高：'+contH+',总高：'+resH)
			
			var lf = ( winW - contW )/2,
				top = ( winH - resH )/2;
			popCont.css({ height:contH });
			obj.css({width:contW, height:resH, left:lf, top:top, margin:0});
		}
		
		//标题拖拽
		if(o.title){
			obj.find(".pop_tit").mousedown(function(event){
				$("body").append("<div id='flagDIV' style='width:100%; height:100%; position:fixed; top:0; left:0; background:#ccc; z-index:999999; opacity:0; filter:alpha(opacity=0);'></div>");
				var _this = $(this);
				var disx = event.clientX - $(this).offset().left;
				var disy = event.clientY - $(this).offset().top;
				$(document).mousemove(function(event){
					var lf = event.clientX - disx;
					var t = event.clientY - disy-$(document).scrollTop();			
					if(t<0)t=0;			
					_this.parent().css({left:lf,top:t});
				});
				$(document).mouseup(function(){
					$("#flagDIV").remove();
					$(this).unbind("mousemove");
					$(this).unbind("mouseup");
				});
				return false;
			});
		}
		$(window).resize(function(){
			setPos(o);
		});
		
		//关闭弹出层
		obj.find(".close_pop").click(function(e){			
			close_pop();
		});
		//取消按钮关闭
		obj.find(".cancel").click(function(e){			
			if(!!o.qxCallback) o.qxCallback();
			close_pop();
		});
		//确定按钮关闭
		obj.find(".confirm").click(function(){
			var flag;
			if(obj.find('.pop_error').length){
				close_pop();
				return;
			}
			if(obj.find('.formValid').length){
				if(valid(obj)){
					if(!!o.qdCallback) flag = o.qdCallback();
					if(flag !== false) close_pop();
				}
				valid_bf(obj);
			}else{
				if(!!o.qdCallback) flag = o.qdCallback();
				if(flag !== false) close_pop();
			}
		});	
		function close_pop(){
			obj.parent().remove();
			if(!!o.callback) o.callback();		
		}
		//弹出层重定位函数
		var method = {};
		method.resetPos = function(){
			setPos(o);
		}
		method.closePop = function(){
			close_pop();
		}
		return method;
	}
	
})(jQuery);

//操作提示弹出层
//两秒自动关闭 如果type为true 则为错误提示样式, type不传 则为默认成功提示样式
function tipsBox(info,type){
	var tips = '<p class="tipsBox">'+info+'</p>';
	if(type) tips = '<p class="tipsBox tipsBox2"><i></i>'+info+'</p>';
    var showTime = 2000;
	if(type){
        showTime = 5000;
    }
	$.popup({
		boxID:"tipsBox",
		content:'text:'+tips,
		autoClose:true,
		autoCloseTime:showTime,
		showbg:false
	});
}

//发送请求loading
function tipsLoading(){
	$.popup({
		boxID:"popLoading",
		content:"text:<div class='tc p20'><img src='"+PUBLIC_URL+"/images/loading.gif' /><p class='pt10'>正在发送请求...</p></div>"
	});
}

//删除加载弹出层
function removeTipsLoading(){
	$("#popLoading").parent().remove();
}