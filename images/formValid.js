
var regexp = {
    user_name : /^[a-zA-Z0-9_@.\u4e00-\u9fa5]{2,30}$/, //用户名 
    user_psw : /^\S{6,20}$/,	 //密码 任意字符长度6-20
    mobile : /^1[3|4|5|7|8][0-9]\d{8}$/, //手机号码
    phone : /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,//电话号码 （区号-号码）
	area_code:/^\d{3,4}$/, //电话区号3-4位
	p_num:/^\d{7,8}$/, //电话号码7-8位
    yb : /^\d{6}$/, //邮编
    s5 : /^.{5,}$/, //不少于5位的任意字符
    bank : /^\d{9,23}$/, //9-23位数字银行卡
    mb_ph : /^(1[3|4|5|8][0-9]\d{8})|((([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?)$/, //手机或电话
    email:/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i,	 //邮箱
	url:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, //url	
	floatNum:/^\d+\.?\d*$/,  //浮点数
	Idcard:/^[\da-zA-Z]{10,18}$/, //身份证
	qq:/^[1-9]\d{4,9}$/ ,
	intNum:/^\d+$/
}
function tipsHtml(s){
	return '<span class="tips2"><i class="tipsArr"></i><i class="tipsIco"></i><span>'+s+'</span></span>';
}
function valid(obj){
	var flag = true;
	obj.find("input,select,textarea").each(function() {
		if($(this).is(":hidden")) return;
		if($(this).attr('reg') == 'no') return;
		var v = this.value,n = this.name;

		if($(this).is("select")){
			if(v == 0){
				obj.find('.tips').length ? obj.find('.tips').show().html('请选择'+$(this).find(":selected").text()) : $(this).parent().append(tipsHtml('请选择'+$(this).find(":selected").text()))
				$(this).focus().addClass('txt_tip');
				flag = false; return false;
			}
		}else{
			if($(this).is(":file")) return;

			if($(this).is(":checkbox") || $(this).is(":radio")){	//复选框
				if(!$(this).parents('.item').find(":checked").length){
					if(this.id == 'agreement'){	//注册协议	
						$(this).parents('.item').append(tipsHtml('请阅读并同意《厂家网用户注册协议》服务条款'));
						flag = false; return false;	
					}else{	
						var lab = $(this).parents('.item').find('.lab').html(),t = '';
                		if(lab)	t = lab.replace(/:|：|\s/g,'');
						
						obj.find('.tips').length ? obj.find('.tips').show().html('请选择'+t) : $(this).parents('.info').append(tipsHtml('请选择'+t));	
						$(this).focus();
						flag = false; return false;	
					}
					
				}
				
			}else if(v.replace(/\s+/g,'') == '' || v == $(this).attr("def")){ //非空验证
				var lab = $(this).parents('.item').find('.lab').html(),t = '内容';
                if(lab)	t = lab.replace(/:|：|\s/g,'');

				if( obj.attr("id") == "addAddress" && ( n == 'phone' || n == 'mobile') ){
					if($("#addAddress input[name='phone']").val() == '' && $("#addAddress input[name='mobile']").val() == ''){
						if($(this).attr('tips') == undefined ) $(this).focus();
						$(this).addClass('txt_tip');
						obj.find('.tips').length ? obj.find('.tips').show().html('手机或电话请至少填写一个') : $(this).parent().append(tipsHtml('手机或电话请至少填写一个'));	
						flag = false; return false;	
					}
				}else if($(this).attr('disabled') == 'disabled'){	//上传证件
					$(this).parent().append(tipsHtml('请'+t));
					flag = false; return false;	
				}else{
					obj.find('.tips').length ? obj.find('.tips').show().html('请输入'+t) : $(this).parent().append(tipsHtml('请输入'+t));	
					if($(this).attr('tips') == undefined ) $(this).focus();
					$(this).addClass('txt_tip');
					flag = false; return false;	
				}

			}else{	//正则验证
				var reg = $(this).attr('reg');
				if(reg != undefined){
					if(!regexp[reg].test(v)){
						var err = $(this).attr("error") == undefined ? "格式错误" : $(this).attr("error");
						obj.find('.tips').length ? obj.find('.tips').show().html(err) : $(this).parent().append(tipsHtml(err));
						if($(this).attr('tips') == undefined ) $(this).focus();
						$(this).addClass('txt_tip');
						flag = false; return false;
					};
				}
				if(n == 'password2'){
					if(v != obj.find('input[name="password1"]').val()){
						obj.find('.tips').length ? obj.find('.tips').show().html('两次密码输入不一致') : $(this).parent().append(tipsHtml('两次密码输入不一致'));
						if($(this).attr('tips') == undefined ) $(this).focus();
						$(this).addClass('txt_tip');
						flag = false; return false;
					}
				}
			}
		}
	});
	return flag;	

}
function valid_bf(obj){
	
	obj.find("input,select,textarea").live('blur',function() {
		obj.find('.tips').length ? obj.find('.tips').hide() : $(this).parents('.item').find(".tips2").remove();
		$(this).removeClass('txt_tip');  
	}).focus(function(){
		//obj.find('.txt').removeClass('txt_tip').end().find(".tips2").remove();
		if($(this).attr('tips') != undefined ){ 
			$(this).parent().append(tipsHtml($(this).attr('tips')));
		}
	});
}
//表单验证 obj:表单对象, fn:回调函数, 提交按钮class:btnSubmit
function formValid(obj,fn){	
	if(!obj.length) return false;
	//console.log("a");	
	obj.find(".btnSubmit").click(function(){
		var flag;
		if(valid(obj)){
			if(fn) flag = fn();
			if(flag === false) return false;
		}else{
			return false;
		}
	});
	valid_bf(obj);
}
