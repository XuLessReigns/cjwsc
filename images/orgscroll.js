// JavaScript Document

var duma = {
	$:function(o){ if(document.getElementById(o)) {return document.getElementById(o);} },
	getStyle:function(o) { return o.currentStyle||document.defaultView.getComputedStyle(o,null); },
	getOffset:function(o) {
		var t = o.offsetTop,h = o.offsetHeight;
		while(o = o.offsetParent) { t += o.offsetTop; }
		return { top:t, height:h };
	},
	bind:function(o,eType,fn) {
		if(o.addEventListener) { o.addEventListener(eType,fn,false); }
		else if(o.attachEvent) { o.attachEvent("on" + eType,fn); }
		else { o["on" + eType] = fn; }
	},
	stopEvent:function(e) {
		e = e || window.event;
		e.stopPropagation && (e.preventDefault(),e.stopPropagation()) || (e.cancelBubble = true,e.returnValue = false);
	},
	setCookie:function(c_name,value,expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
	},
	getCookie:function(c_name) {
		if(document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if(c_start != -1) { 
				c_start = c_start + c_name.length + 1; 
				c_end = document.cookie.indexOf(";",c_start);
				if(c_end == -1) { c_end = document.cookie.length; }
				return unescape(document.cookie.substring(c_start,c_end));
			} 
		}
		return "";
	}
};
duma.BeautifyScrollBar = function(obj,arrowUpCss,arrowUpActiveCss,handleCss,handleActiveCss,arrowDownCss,arrowDownActiveCss) {
	this.arrowUpInterval;
	this.arrowDownInterval;
	this.barMouseDownInterval;
	this.relY;
	this.id = obj;
	this.obj = duma.$(this.id);
	this.setObjCss();		//预先设置父容器的css定位才能让接下来的属性设置起作用
	this.obj.innerHTML = '<div id="' + obj + 'Area" class="dumascroll_area">' + this.obj.innerHTML + '</div><div id="' + obj + 'Bar" class="dumascroll_bar"><div class="dumascroll_arrow_up"></div><div class="dumascroll_handle"></div><div class="dumascroll_arrow_down"></div></div>';
	this.area = duma.$(obj + "Area");
	this.bar = duma.$(obj + "Bar");
	this.barPos;
	this.arrowUp = this.bar.getElementsByTagName("div")[0];
	this.arrowUpCss = arrowUpCss;
	this.arrowUpActiveCss = arrowUpActiveCss;
	this.handle = this.bar.getElementsByTagName("div")[1];
	this.handleCss = handleCss;
	this.handleActiveCss = handleActiveCss;
	this.arrowDown = this.bar.getElementsByTagName("div")[2];
	this.arrowDownCss = arrowDownCss;
	this.arrowDownActiveCss = arrowDownActiveCss;
	this.handleMinHeight = 64;
	this.arrowUpHeight = parseInt(duma.getStyle(this.arrowUp).height);
	this.arrowDownHeight = parseInt(duma.getStyle(this.arrowDown).height);
	this.areaScrollHeight = this.area.scrollHeight;
	this.handleHeight = parseInt(this.area.offsetHeight/this.area.scrollHeight * (this.bar.offsetHeight - this.arrowUpHeight - this.arrowDownHeight));
}
duma.BeautifyScrollBar.prototype = {
	setObjCss:function() {
		duma.getStyle(this.obj).position == "static" ? this.obj.style.position = "relative" : duma.getStyle(this.obj).backgroundColor == "transparent" ? this.obj.style.backgroundColor = "#fff" : null;		//若容器本来就没有设position，则初始化为relative；若容器原来未设置背景色，则初始化为白色；
	},
	sethandle:function() {				//当内容超多时设置拖拽条子的最小高度
		this.handle.style.top = this.arrowUpHeight + "px";
		if(this.handleHeight > this.handleMinHeight) {
			this.handleHeight < this.bar.offsetHeight - this.arrowUpHeight - this.arrowDownHeight ? this.handle.style.height = this.handleHeight + "px" : this.handle.style.display = "none";
		}
		else { this.handleHeight = this.handleMinHeight; this.handle.style.height = this.handleMinHeight + "px"; }
	},
	setBarPos:function() {				//将当前滚动的距离值存入cookie
		this.barPos = this.area.scrollTop + "";
		duma.setCookie(this.id + "CookieName",this.barPos,1);
	},
	getBarPos:function() {
		this.barPos = duma.getCookie(this.id + "CookieName");
		if(this.barPos!=null && this.barPos!="") {
			this.area.scrollTop = this.barPos;
			this.areaScroll();
		}
	},
	clearArrowUpInterval:function() { clearInterval(this.arrowUpInterval); },
	clearArrowDownInterval:function() { clearInterval(this.arrowDownInterval); },
	clearBarMouseDownInterval:function() { clearInterval(this.barMouseDownInterval); },
	areaScroll:function() {
		this.handle.style.display != "none" ? this.handle.style.top = this.area.scrollTop/(this.area.scrollHeight - this.area.offsetHeight) * (this.bar.offsetHeight - this.handleHeight - this.arrowUpHeight - this.arrowDownHeight) + this.arrowUpHeight + "px" : null;
	},
	areakeydown:function(e) {			//支持键盘上下按键
		var that = this;
		document.onkeydown = function(event) {
			var e = event || window.event,
			ek = e.keyCode || e.which;
			if(ek == 40) { that.area.scrollTop += 25 }
			else if(ek == 38) { that.area.scrollTop -= 25 }
			if(that.area.scrollTop > 0 && that.area.scrollTop < that.area.scrollHeight - that.area.offsetHeight){ duma.stopEvent(e); }
			that.setBarPos();
		}
	},
	handleMove:function(e) {
		var e = e || window.event;
		this.area.scrollTop = (e.clientY - this.relY - this.arrowUpHeight)/(this.bar.offsetHeight - this.handleHeight - this.arrowUpHeight - this.arrowDownHeight)*(this.area.scrollHeight - this.area.offsetHeight);
		this.setBarPos();
	},
	handleMouseDown:function(e) {
		var that = this,e = e || window.event;
		that.relY = e.clientY - that.handle.offsetTop;
		that.handle.setCapture ? that.handle.setCapture() : null;
		that.handle.className = that.handleActiveCss;
		document.onmousemove = function(event) { that.handleMove(event); };
		document.onmouseup = function() {
			that.handle.className = that.handleCss;
			that.handle.releaseCapture ? that.handle.releaseCapture() : null;
			document.onmousemove = null;
		};
	},
	barScroll:function(e) {
		var e = e || window.event,eDir;		//设置滚轮事件,e.wheelDelta与e.detail分别兼容IE、W3C，根据返回值的正负来判断滚动方向
		if(e.wheelDelta) { eDir = e.wheelDelta/120; }
		else if(e.detail) { eDir = -e.detail/3; }
		eDir > 0 ? this.area.scrollTop -= 80 : this.area.scrollTop += 80;	//步长设80像素比较接近window滚动条的滚动速度
		if(this.area.scrollTop > 0 && this.area.scrollTop < this.area.scrollHeight - this.area.offsetHeight){ duma.stopEvent(e); }
		this.setBarPos();
	},
	barDown:function(e) {
		var e = e || window.event,that = this,
			eY = e.clientY,
			mStep = this.bar.offsetHeight,
			documentScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
			hOffset = duma.getOffset(this.handle),
			bOffset = duma.getOffset(this.bar);
		if(documentScrollTop + eY < hOffset.top) { this.barMouseDownInterval = setInterval(function(e){
			that.area.scrollTop -= that.area.offsetHeight;
			if(that.area.scrollTop <= (eY + documentScrollTop - bOffset.top - that.arrowUpHeight)/(that.bar.offsetHeight - that.arrowUpHeight - that.arrowDownHeight) * that.area.scrollHeight) { that.clearBarMouseDownInterval(); }
			that.setBarPos();
		},80); }
		else if(documentScrollTop + eY > hOffset.top + hOffset.height) { this.barMouseDownInterval = setInterval(function(){
			that.area.scrollTop += that.area.offsetHeight;
			if(that.area.scrollTop >= (eY + documentScrollTop - bOffset.top - that.arrowUpHeight - hOffset.height)/(that.bar.offsetHeight - that.arrowUpHeight - that.arrowDownHeight) * that.area.scrollHeight) { that.clearBarMouseDownInterval(); }
			that.setBarPos();
		},80); }
		duma.stopEvent(e);
	},
	arrowUpMouseDown:function(e) {
		var that = this;
		this.arrowUpInterval = setInterval(function(){ that.area.scrollTop -= 25; that.setBarPos(); },10);
		this.arrowUp.className = this.arrowUpActiveCss;
		duma.stopEvent(e);
	},
	arrowUpMouseUp:function() { this.clearArrowUpInterval(); this.arrowUp.className = this.arrowUpCss; },
	arrowUpMouseOut:function() { this.clearArrowUpInterval(); this.arrowUp.className = this.arrowUpCss; },
	arrowDownMouseDown:function(e) {
		var that = this;
		this.arrowDownInterval = setInterval(function(){ that.area.scrollTop += 25; that.setBarPos(); },10);
		this.arrowDown.className = this.arrowDownActiveCss;
		duma.stopEvent(e);
	},
	arrowDownMouseUp:function() { this.clearArrowDownInterval(); this.arrowDown.className = this.arrowDownCss; },
	arrowDownMouseOut:function() { this.clearArrowDownInterval(); this.arrowDown.className = this.arrowDownCss; },
	run:function(){
		var that = this;
		this.sethandle();
		this.areaScroll();
		this.getBarPos();
		this.area.onscroll = function(){that.areaScroll()};
		this.area.onmouseover = this.bar.onmouseover = function(event){that.areakeydown(event)};
		this.area.onmouseout = this.bar.onmouseout = function(){document.onkeydown = null};
		this.handle.onmousedown = function(event){that.handleMouseDown(event)};
		this.bar.onmousedown = function(event){that.barDown(event)};
		this.bar.onmouseup = function(){that.clearBarMouseDownInterval()};
		this.bar.onmouseout = function(){that.clearBarMouseDownInterval()};
		this.arrowUp.onmousedown = function(event){that.arrowUpMouseDown(event)};
		this.arrowUp.onmouseup = function(){that.arrowUpMouseUp()};
		this.arrowUp.onmouseout = function(){that.arrowUpMouseOut()};
		this.arrowDown.onmousedown = function(event){that.arrowDownMouseDown(event)};
		this.arrowDown.onmouseup = function(){that.arrowDownMouseUp()};
		this.arrowDown.onmouseout = function(){that.arrowDownMouseOut()};
		duma.bind(this.obj,"mousewheel",function(event){that.barScroll(event)});
		duma.bind(this.obj,"DOMMouseScroll",function(event){that.barScroll(event)});
	}
}
duma.BeautifyScrollBar.init = function() {
	var o = document.getElementsByTagName("div"),
		oLen = o.length,
		dumascrollClass = /\bdumascroll\b/,
		oArr = [],
		oArrLen = oArr.length;
	for(var i=0; i<oLen; i++) {
		if(dumascrollClass.test(o[i].className)) {
			oArr.push("dumaScrollAreaId_" + i);
			oArrLen = oArr.length;
			o[i].id = oArr[oArrLen - 1];
		}
	}
	for(var j=0; j<oArrLen; j++) {
		new duma.BeautifyScrollBar(oArr[j],"dumascroll_arrow_up","dumascroll_arrow_up_a","dumascroll_handle","dumascroll_handle_a","dumascroll_arrow_down","dumascroll_arrow_down_a").run();
	}
}
duma.bind(window,"load",duma.BeautifyScrollBar.init);
