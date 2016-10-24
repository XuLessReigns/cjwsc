
(function($){
	
	var defaults = {
		//正则验证规则 可自定义
		//{ Exp: "正则表达式对象", alias:"验证元素名称,如：用户名", error:"验证不通过错误提示内容" }
		regexp : {
			username : { Exp:/^[a-zA-Z0-9_@.\u4e00-\u9fa5]{2,30}$/, alias:"用户名", error:"用户名为2-30个字符,由数字、字母、下划线组成,可以是中文或邮箱" },
			password : { Exp:/^\S{6,20}$/, alias:"密码", error:"密码为6-20位任意非空字符" },
			mobile : { Exp:/^1[3|4|5|7|8][0-9]\d{4,8}$/, alias:"手机号码", error:"手机号码格式错误" },
			phone : { Exp:/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/, alias:"电话号码", error:"电话号码格式错误" }, //电话号码 （区号-号码）
			phoneArea : { Exp:/^\d{3,4}$/, alias:"电话区号", error:"电话区号为3-4个数字" },
			phoneNum : { Exp:/^\d{7,8}$/, alias:"电话号码", error:"电话尾号为7-8个数字" },
			postcode : { Exp:/^\d{6}$/, alias:"邮政编码", error:"请填写6位数字的邮政编码" },
			bankCardNum : { Exp:/^\d{12,19}$/, alias:"银行卡号", error:"银行卡号为12-19个数字" },
			email : { Exp:/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i, alias:"邮箱", error:"邮箱格式不正确" },
			num : { Exp:/^[1-9]\d*$/, alias:"大于0的整数", error:"请输入大于0的整数" } //
		},
		blurValid:false,	//是否开启blur事件验证 默认为false
		callback:null		//验证通过回调函数		
	};
	
	$.fn.formValid = function(options){
		
		var opts = $.extend( true, {}, defaults, options );
		var form = $(this);
		var regexp = opts.regexp;
		
		//console.log(opts)
		//console.log(regexp)
		
		//提示信息html
		function tipsHtml(s){
			return '<span class="tipsInfo"><i class="arr"></i><i class="ico"></i>'+s+'</span>';
		}
		
		//验证函数
		function valid(obj){
			if( obj.attr('reg') == 'no' || obj.is(":disabled") || obj.is(":hidden") ) return true;
			
			removeTips(obj);
			
			if(obj.is(":text") || obj.is("textarea") || obj.is(":password")){ //text & textarea & password
				//如果为空
				if(isEmpty(obj)){
					tipsEmpty(obj);
					return false;
				}else if(obj.attr("name") == "password2"){ 
					//确认密码验证  确认密码文本框name必须为password2, 密码文本框name必须为password1
					if( obj.val() != form.find('input[name="password1"]').val() ){
						tipsError(obj, "两次密码输入不一致");
						return false;
					}
				}else{
					var reg = obj.attr("reg");
					if( !reg ) return true;
					
					//正则验证	
					if( !regexp[reg]["Exp"].test( obj.val() ) ){
						tipsError(obj, regexp[reg]["error"]);
						return false;	
					}
				}
			}else if(obj.is("select")){ //select
				if(obj.val() == 0){
					var n = obj.attr("alias") || obj.find("option:eq(0)").text();
					tipsError(obj, "请选择"+n);
					return false;	
				}
			}else if(obj.is(":checkbox") || obj.is(":radio")){ //checkbox & radio
				if(!obj.parents(".parentsNode").find(":checked").length){
					var n = obj.parents(".parentsNode").attr("alias") || "";
					tipsError(obj, "请选择"+n);
					return false;	
				}
			}else if(obj.is(":file")){
				if(!obj.val()){
					var n = obj.attr("alias") || "";
					tipsError(obj, "请上传"+n+"文件");
					return false;
				}
			}
			return true;
		}
		
		//错误提示
		function tipsError(obj, info){
			if( form.find(".tipsInfo2").length ){
				form.find(".tipsInfo2").show().html(info);
				return;			
			}
			if(obj.parents(".info").find(".tipsInfo").length == 0){
				obj.parents(".info").append(tipsHtml(info));
			}
		}
		
		//非空验证
		function isEmpty(obj){
			var v = obj.val();
			if(v.replace(/\s+/g,'') == '' || v == obj.attr("def")) return true;
			return false;
		}
	
		//删除提示信息
		function removeTips(obj){
			if( form.find(".tipsInfo2").length ){
				form.find(".tipsInfo2").hide();
				return;
			}
			obj.parents(".item").find(".tipsInfo").remove();
		}
		
		//提示为空
		function tipsEmpty(obj){
			var reg = obj.attr("reg");
			var n = obj.attr("alias") || '';
			if( reg && !n ) n = regexp[reg]["alias"];
			 
			if( form.find(".tipsInfo2").length ){
				form.find(".tipsInfo2").show().html(n+"不能为空");
				return;			
			}else{
				if(obj.parents(".info").find(".tipsInfo").length == 0){
					obj.parents(".info").append(tipsHtml(n+"不能为空"));
				}
			}
		}
		
		//需要验证的表单元素
		var ele = form.find(":text, :password, :radio, :file, :checkbox, select, textarea");
		
		//blur验证		
		ele.each(function() {
			$(this).live("blur",function(){
				opts.blurValid ? valid($(this)) : removeTips($(this));					
			});
		});
		
		//提交按钮验证
		form.find(".btnSubmit").live("click",function(){
			fnValid();
		});
		
		function fnValid(){
			var flag = true;
			ele.each(function() {
				flag = valid($(this));
				if(!flag){
					$(this).focus();
					return false;
				}
			});
			if(flag){ //验证通过
				if(opts.callback) opts.callback();
				return true;
			}
			return false;
		}		
		
		//返回验证方法 用于外部调用
		return {
			fnValid:fnValid
		}; 
	};
	
})(jQuery);