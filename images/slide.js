/*
* @description: 幻灯片插件
* @author: kuangqijie
* @update: 2014.11.18
*/
(function($){
	var defaults = {
		type:"fade",				//切换方式 "fade":淡入, "slide:left"：滑动：方向, "scroll:left"：滚动：方向
		icoEventType:"mouseover",	//焦点图标事件类型 
		autoPlay:false,				//是否自动切换 默认"false"
		autoTime:3000,				//自动切换间隔时间
		duration:600				//动画持续时间
	}
	$.fn.slide = function(opts){
		opts = $.extend({}, defaults, opts);
		var slide = $(this),
			slideWrap = slide.find(".slide_w"),
			slideUl = slideWrap.find("ul"),
			slideLi = slideUl.find("li"),
			slideBtn = slide.find(".slide_btn"),
			btn_lf = slide.find(".slide_btn_lf"),
			btn_rt = slide.find(".slide_btn_rt"),
			slideIco = slide.find(".slide_ico"),
			w = slideWrap.outerWidth(),
			h = slideWrap.outerHeight(),
			w_li = slideLi.outerWidth(true),
			h_li = slideLi.outerHeight(true),
			len = slideLi.length,
			w_ul = w_li*len,
			h_ul = h_li*len,	
			index = 0, n = 0, timer = null;
			
		var slideType = opts.type.split(":"),
			type = slideType[0], //幻灯片类型  fade/slide/scroll
			direction = slideType[1], //滚动方向 top/left
			d = {direction:direction},
			json = {};		

		if(direction == 'top') slideUl.width(w).height(h_ul);
		if(direction == 'left') slideUl.width(w_ul).height(h);
		
		if(type == 'scroll'){
			var wh = direction == 'top' ? h_ul : w_ul;
			var w_h = direction == 'top' ? h : w;
			len = Math.ceil(wh/w_h);
		}
		opts.icoEventType = opts.icoEventType == 'mouseover' ? 'mouseover mousedown' : opts.icoEventType;
		//焦点图标
		if(slideIco.length){	
			for(var i=0;i<len;i++){
				slideIco.append('<li>'+(i+1)+'</li>'); //添加焦点图标
			}
			slideIco.find("li:eq(0)").addClass("cur");	
			
			//添加事件
			slideIco.on(opts.icoEventType, "li", function(){
				index = $(this).index();
				if(type == 'fade') fade(index);
				if(type == 'slide'){
					if(slideUl.is(":animated")) return;
					var indexCur = slideIco.find("li.cur").index();
					if(index == indexCur) return;
					index > indexCur ? slideNext(index) : slidePrev(index);
				}
				if(type == 'scroll') sc(index);
			});
		}	
		if(type == 'fade') slideLi.eq(index).fadeIn(opts.duration);
		if(type == 'slide'){
			slideLi.each(function(i) {
				$(this).attr("index",i);
			});
		}
		//按钮事件
		if(slideBtn.length){
			slideBtn.on("click", ".slide_btn_lf, .slide_btn_rt", function(){
				if(slideUl.is(":animated") || slideLi.is(":animated")) return;
				//左侧按钮
				if($(this).hasClass("slide_btn_lf")){
					index--;
					if(index<0)index=len-1;
					play(index, true);
				}else{
					index++;
					if(index==len)index=0;
					play(index);
				}
			});
		}	
		//slide	
		function slidePrev(index){
			json[d.direction] = 0;
			var gn = direction == 'top' ? gn = -h_li : -w_li;
			var curli = slideUl.find("li[index='"+index+"']");
			ico(index);
			slideUl.prepend(curli).css(d.direction,gn).animate(json,opts.duration);
		}
		function slideNext(index){
			json[d.direction] = direction == 'top' ? -h_li : -w_li;
			var curli = slideUl.find("li[index='"+index+"']");
			ico(index);
			slideUl.find("li:eq(0)").after(curli);
			slideUl.animate(json,opts.duration,function(){
				var first = slideUl.find("li:first");
				slideUl.append(first).css(d.direction,0);
			});
		}
		//scroll
		function sc(index){
			json[d.direction] = direction == 'top' ? -h*index : -w*index;
			ico(index);
			slideUl.stop().animate(json, opts.duration);
		}
		
		//渐隐渐显	
		function fade(index){
			slideLi.eq(index).fadeIn(opts.duration).siblings().fadeOut(opts.duration);
			ico(index);
		}
		//焦点图标
		function ico(index){
			if(slideIco.length){
				slideIco.find("li").eq(index).addClass("cur").siblings().removeClass("cur");
			}
		} 
		function play(index, direction){
			if(type == 'fade') fade(index);
			if(type == 'slide'){
				direction ? slidePrev(index) : slideNext(index);
			}
			if(type == 'scroll') sc(index);
		}
		//自动切换
		if(opts.autoPlay){
			slide.on("hover", ".slide_btn_lf, .slide_btn_rt, .slide_ico li", function(e){
				if(e.type == "mouseenter"){
					clearInterval(timer);
				}else{
					timer = setInterval(function auto(){
						index++;
						if(index==len) index=0;
						play(index);
					},opts.autoTime);
				}
			});
			
			//触发自动播放	
			if( slideBtn.length ){
				btn_rt.trigger("mouseleave");
			}else if( slideIco.length ){
				slideIco.find("li:eq(0)").trigger("mouseleave");
			}else{
				setInterval(function(){
					index++;
					if(index==len) index=0;
					play(index);
				},opts.autoTime);
			}
		}
	}
})(jQuery);
