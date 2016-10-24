if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;
    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

var cart = {
/*
	cookieName : 'cart',

	getCookie : function(name){
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if( arr != null )
			return unescape(arr[2]);
		return null;
	},

	setCookie : function( name, value, expires ){
		var str = name + "=" + escape(value);
		if( expires > 0 ){
			var date = new Date();
			var ms = expires*1000;
			date.setTime( date.getTime() + ms );
			str += ";path=/;expires=" + date.toGMTString();
		}
		document.cookie = str;
	},

	delCookie : function(name){
		var date = new Date();
		date.setTime(date.getTime() - 10000);
		document.cookie = name + "=;expires=" + date.toGMTString();
	},

	get : function(){
		var goodsStr = this.getCookie(this.cookieName);
		if( goodsStr !== null )
			goodsObj = JSON.parse(goodsStr);
		else
			goodsObj = {};
		return goodsObj;
	},

	save : function( goodsObj ){
		goodsStr = JSON.stringify(goodsObj);
		this.setCookie( this.cookieName, goodsStr, 3600*3 );
	},
*/
	uncheckeds:[], //所有没有选中的,
	isAllCheck: true, //是否全选
	fullCut:{},
	data : {},
	islogin : 0,
	type:0,
    isUser:1,
	refresh : function(){
		var cartnum = 0;
		var carthtml = '';
        var total = 0;
//		for( var i in this.data ){
//			var goods = this.data[i];
//            carthtml += '<li>';
//            carthtml += '<a href="'+WWW_URL+'item/'+goods.pid+'.html"><img src="'+goods.pic+'"></a>';
//            carthtml += '<a class="name" href="'+WWW_URL+'item/'+goods.pid+'.html">'+goods.name+'</a>';
//            carthtml += '<p class="opt"><a class="clt" style="display: none;" href="javascript:;">收藏</a><a class="del" href="javascript:cart.del(\'' + goods.pid + '\',\'' + goods.attr1 + '\',\'' + goods.attr2 + '\');">删除</a></p>';
//            carthtml += '</li>';
//			cartnum ++;
//		}
        var cart_length = this.data.length;
        for( var i=0; i < cart_length; i++ ){
            var goods = this.data[i];
            carthtml += '<li> ';
            carthtml +=    '<div class="shopingDiv clearfix">';
            carthtml +=          '<div class="shImg"><a target="_blank" href="'+WWW_URL+'item/'+goods['pid']+'.html"><img width="50px" height="50px" src="'+goods['pic']+'" /></a></div>';
            carthtml +=          '<div class="shName"><a href="'+WWW_URL+'item/'+goods.pid+'.html">'+goods['name']+'</a></div>';
            carthtml +=          '<div class="shPre">&yen;'+goods['price']+'<span class="colorGey_9d">*'+goods['num']+'</span><a class="del" href="javascript:cart.del(\'' + goods['pid'] + '\',\'' + goods['attr1'] + '\',\'' + goods['attr2'] + '\');"><i class="delico"></i></a></div>';
            carthtml +=     '</div>';
            carthtml +=  '</li>';
            cartnum ++;
            total += (goods['price'] * goods['num']);
        }



        $('.J_CartNum').html(cartnum);
        $('.J_CartTotal').html(total);
        if(!carthtml){
            if(this.islogin == 0){
                carthtml = '<li class="empty_cart" style="line-height: 50px;"><div style="color:red;height: 50px;display: block;text-align: center;"><i class="ico_ct"></i>亲，请登录后再来查看吧！<!--<a href="#" onclick="javacript:alertLogin();">马上登陆</a>--></div></li>';
            } else {
                carthtml = '<li class="empty_cart" style="line-height: 50px;"><div style="color:red;height: 50px;display: block;text-align: center;"><i class="ico_ct"></i>亲，您的购物车没有东西！<!--<a href="#" onclick="javacript:alertLogin();">马上登陆</a>--></div></li>';
            }
        } else {
            $('#h_rt_md_cart').attr('height','400px');
            $('#hdDiv').removeClass('hide');
            $('#dwDiv').removeClass('hide');
        }
		$(".J_BannerCart").html(carthtml);
	},
    refreshCartData: function(){
        if( this.islogin == 0 ){
            alertLogin();
        }
        var params = {};
        $.post( '/member/cart/refreshCart', params, function(res){
            if( res.error === true ){
                alert( res.msg );
                return false;
            }  else {
                cart.data = res.msg;
                cart.refresh();
            }
        }, 'json' );
    },
	refreshbuy : function(){

		var html = [];
		html.push('<div class="shopHdtext mt10">');
        html.push('<ul class="Hdlist">');
        html.push('<li class="wh_10"><label><input type="checkbox" class="cart_item all" ');
		if(cart.isAllCheck){
			html.push(' checked="true" ');
		}
		html.push(' onclick="cart.select_all(this);"/>全选</label></li>');
        html.push('<li class="wh_50">商品</li>');
        html.push('<li class="wh_10_tc">单价（元）</li>');
        html.push('<li class="wh_10_tc">数量</li>');
        html.push('<li class="wh_10_tc">小计（元）</li>');
        html.push('<li class="wh_10_tc">操作</li>');
        html.push('</ul>');
        html.push('</div>');
        
        html.push('<form action="/member/cart/buy" method="post" id="to_buy">');
        html.push('<input type = "hidden" name = "foreign_status" value = "0">');
		var totalprice = 0, totalnum = 0, totalcut = 0, suppInfo = null;
		var is_foreign = 0;
		is_foreign_counts = 0;
		not_foreign_counts = 0;
		if(this.data.length > 0){			
			var data_count = this.data.length;
			for( var i = 0; i < data_count; i++){
			
				suppInfo = this.data[i];
				var full_cut = [], goods_row = [], goodsInfo = null, pid = 0, attr1 = 0, attr2 = 0, num = 0, price = 0, goodsprice = 0, suppprice = 0;
				
				html.push('<div class="clearfix">');
	          	html.push('<p class="mt25 mb10 ppl_2"><label><input type="checkbox" ' + cart.isChecked("supp"+suppInfo.sid)+ 'class="cart_item item_parent" data-id="'+suppInfo.sid+'" id="supp'+suppInfo.sid+'" onclick="cart.select_supp(this);"/>'+ suppInfo.name +'</label></p>');
	          	html.push('<div class="shopingDiv">');
	          	var suppInfo_count = suppInfo.goods.length;

				for(var j = 0 ; j < suppInfo_count; j++){
					goodsInfo = suppInfo.goods[j];
					pid = goodsInfo.pid;
					is_foreign = goodsInfo.is_foreign;
					attr1 = goodsInfo.attr1 ? goodsInfo.attr1 : 0;
					attr2 = goodsInfo.attr2 ? goodsInfo.attr2 : 0;
					stock_out = goodsInfo.stock_out ? 1 : 0;
					num = parseInt(goodsInfo.num);
					price = ((goodsInfo.price*100)/100).toFixed(2);
					goodsprice = ((num*(price*100))/100).toFixed(2);
					goods_row.push('<ul class="commodiylist">');
		            goods_row.push('<li class="wh_60">');
		            goods_row.push('<label class="fl">');
		            goods_row.push(stock_out ? '&nbsp;' : '<input type="checkbox"' + cart.isChecked(goodsInfo.id)+ ' name="id[]" data-num= "'+num+'" data-id="'+pid+'" value="'+goodsInfo.id+'" onclick="cart.select_child(this)" class="cart_item cart_goods_item item_child supp'+suppInfo.sid+'" />');
		            goods_row.push('</label>');
		            goods_row.push('<div class="shopImg"><a target="_blank" href="/item?id=' + pid + '"><img width="80" height="80" src="' + goodsInfo.pic + '" alt="' + goodsInfo.name + '" /></a></div>');
					if (is_foreign == 1) { 
							is_foreign_counts  = is_foreign_counts + num;
			            	goods_row.push('<div class="shopText"><a target="_blank" href="/item?id=' + pid + '"><span style="color:red;font-weight:bold;">【保税】</span>' + goodsInfo.name + '</a></div>');
			            } else {
			            	not_foreign_counts ++;
			            	goods_row.push('<div class="shopText"><a target="_blank" href="/item?id=' + pid + '">' + goodsInfo.name + '</a></div>');
			            }		            goods_row.push('</li>');
		            goods_row.push('<li class="wh_20">');

					goods_row.push('<p class="colorSize"><span>');
					
					if (goodsInfo.attrname && goodsInfo.attrname != '') {
						goods_row.push(goodsInfo.attrname.replace(',','<br />'));
					}else{
						goods_row.push(' &nbsp');
					}

					goods_row.push('</span></p>');
					goods_row.push('</li>');
		            goods_row.push('<li class="wh_10_tc">');
		            goods_row.push('<p class="sptext_cl fSize_14 mb5">' + price + '</p>');
		            //goods_row.push( +=     	'<select class="select_col"><option>促销优惠</option></select>';
		            goods_row.push('</li>');
		            goods_row.push('<li class="wh_10_tc">');
		            goods_row.push('<div class="shopAdd">');
		            goods_row.push('<b onclick="cart.sub($(this).next(),\''+ pid +'\',\''+ attr1 +'\',\''+ attr2 +'\');">-</b>');
		            goods_row.push('<input type="text" class="inptext" value="' + num + '" onblur="cart.change( this,\''+ pid +'\',\''+ attr1 +'\',\''+ attr2 +'\');"/>');
		            goods_row.push('<b onclick="cart.inc($(this).prev(),\''+ pid +'\',\''+ attr1 +'\',\''+ attr2 +'\');">+</b>');
		            goods_row.push('</div>');
		            //goods_row.push( +=    	'<span class="sptext">有货</span>';
		            //goods_row.push( +=    	'<span class="sptext_cr">无货</span>';
		            goods_row.push('</li>');
		            goods_row.push('<li class="wh_10_tc"><span class="fSize_14 item_price">' + goodsprice + '</span></li>');
		            goods_row.push('<li class="wh_10_tc">');
		            goods_row.push('<a href="javascript:cart.delbuy(\''+ pid +'\',\''+ attr1 +'\',\''+ attr2 +'\');" class="bttn">删除</a>');
		            goods_row.push('<a href="javascript:;" data-id="'+pid+'" class="bttn mt5 J_ProductFollow">加入关注</a>');
		            goods_row.push('</li>');
		            goods_row.push('</ul>');
		            
					totalnum += num;
				}
				$("#is_foreign_counts").val(is_foreign_counts);
				$("#not_foreign_counts").val(not_foreign_counts);
				totalprice = (( (totalprice*100) + (suppInfo.allprice*100) )/100).toFixed(2);
					
				full_cut.push('<div class="clearfix">');
	            full_cut.push('   <div class="priceHd">');
	            if(suppInfo && suppInfo.full_cut && suppInfo.full_cut.length > 0){
					cart.fullCut[suppInfo.sid] = suppInfo.full_cut;
	            	var fullcutInfo = null;
	            	for(var k in suppInfo.full_cut){
	            		if(suppInfo.full_cut[k].full > suppInfo.allprice){
	            			break;
	            		}else{
	            			fullcutInfo = suppInfo.full_cut[k];	
	            		}
	            	}
	            	if(fullcutInfo != null){
		            	totalcut += parseFloat(fullcutInfo.cut);
		            	full_cut.push('	<i class="i_img">满减</i><span class="H_text">全场满'+fullcutInfo.full+'减'+fullcutInfo.cut+'</span>');
	            	}
	            }
	            full_cut.push('   </div>');
	            full_cut.push('   <div class="priceNum">');
	            full_cut.push('     <p class="fSize_14 mt15 ml_10">'+ suppInfo.allprice +'</p>');
	            //full_cut +=		'     <p class="sptext_clred">已返现50.00</p>';
	            full_cut.push('   </div>');
	            full_cut.push('</div>');
					
				html = html.concat(full_cut, goods_row);
				
				html.push('</div>');
				html.push('</div>');
	
			}//end for
		}else{
			html.push('<div class="clearfix"><p class="mt25 mb10 ppl_2"><label>没有添加商品到购物车</label></p></html>');
		}
		
		html.push('</form>');
		
		html.push('<div class="promptDown mt20 cl">');
        html.push('<ul class="ptdwlist">');
        html.push('<li class="wh_d6"><label><input type="checkbox" class="cart_item all" ;');
		if(cart.isAllCheck){
			html.push(' checked="true" ');
		}
		html.push(' onclick="cart.select_all(this);"/> 全选</label></li>');
        html.push('<li class="wh_d10"><a href="javascript:cart.delbatch();">删除选中的商品</a></li>');
        html.push(   '<li class="wh_d55"><a href="javascript:cart.focusAll();">加入关注</a></li>');
        html.push(   '<li class="wh_d10">已选商品<span class="fSize_18 sptext_clred" id="item_total_num">'+totalnum+'</span>件</li>');
        html.push(   '<li class="wh_d16">');
        html.push(      '<div class="fpdw">总价（不含运费）：<span class="fSize_16 sptext_clred" id="totalprice">&yen;<span id="item_total_price">'+ (totalprice-totalcut) +'</span></span></div>');
        html.push(      '<div class="fpdw_1">已节省：&yen;<span id="item_total_cut">'+totalcut+'</span></div>');
        html.push(   '</li>');
        html.push( '</ul>');
        html.push( '<a class="playGo" href="javascript:cart.to_buy();">去结算</a>');
        html.push( '</div>');

		$( "#cartlist" ).html( html.join('') );
		cart.sum();
	},
	
	del : function( pid, attr1, attr2 ){

		if( this.islogin == 0 ){
            alertLogin();
		}

		var params = {
			pid : pid,
			attr1 : attr1,
			attr2 : attr2
		};
		params[$("#ci_token_cart").attr("name")]  = $("#ci_token_cart").val();
		$.post( '/member/cart/del', params, function(res){
			if( res.error === true ){
				alert( res.msg );
				return false;
			} else {
                tipsBox('删除成功');
            }
			cart.data = res.msg;
			cart.refreshbuy();
            cart.refreshCartData();
		}, 'json' );

	},
	
	delbatch : function(){
	
		if( this.islogin == 0 ){
            alertLogin();
		}
		var id=[],list = $('.cart_goods_item:checked');
		if(list.length == 0){
			tipsBox('请选择删除的商品！');
		}
		for(var i=0;i<list.length;i++){
			id.push(list[i].value);
		}
		
		var params = {id:id};		
		params[$("#ci_token_cart").attr("name")]  = $("#ci_token_cart").val();
		$.post( '/member/cart/del_batch', params, function(res){
			if( res.error === true ){
				alert( res.msg );
				return false;
			}
			cart.data = res.msg;
			cart.refreshbuy();
		}, 'json' );

	},
	
	/*加入购物车
	params = {
		pid : 432
		attr1:43,
		attr2:432
		num:6,
	}
	*/
	add : function( params, callback ){
		if( this.islogin == 0 || this.isUser !== 1 ){
            if(this.isUser !== 1){
                webConfig.tip_notice = '请登录买家账号';
            }
            alertLogin();
            return false;
		}

		var pid = parseInt(params.pid);
		var num = parseInt(params.num);
		var attr1 = params.attr1;
		var attr2 = params.attr2;
		var params = {
			pid : pid,
			attr1 : attr1,
			attr2 : attr2,
			num : num
		};
		params.shopid  = webConfig.shop_id_o2o;
		params.type  = this.type;
		$.post( '/member/cart/add', params, function(res){
			if( res.error === true ){
				alert( res.msg );
				return false;
			}
			cart.data = res.msg;
			cart.refresh();
			callback( res );
		}, 'json' );

	},
	//全选
	select_all : function(el){
		if($(el).attr('checked') == undefined){
			cart.isAllCheck = false;
			$('.cart_item').removeAttr('checked');
		}else{
			cart.isAllCheck = true;
			cart.uncheckeds = [];
			$('.cart_item').attr('checked','true');
		}
		cart.sum();
	},
	//产品品牌选择
	select_supp : function(el){
		var attrid = $(el).attr('id');
		if($(el).attr('checked') == undefined){
			$('.'+attrid).removeAttr('checked');
			$('.all').removeAttr('checked');
			cart.uncheckeds.push(attrid);
			cart.isAllCheck = false;
			$('.'+attrid).each(function(){
				cart.uncheckeds.push($(this).val());
			});
		}else{
			cart.check_all();

			if(cart.uncheckeds.indexOf(attrid) != -1){
				cart.uncheckeds.splice(cart.uncheckeds.indexOf(attrid), 1);
			}

			$('.'+attrid).each(function(){
				var index = cart.uncheckeds.indexOf($(this).val());
				if ( index != -1){
					cart.uncheckeds.splice(index, 1);
				}
			});
			$('.'+attrid).attr('checked','true');
		}
		cart.sum();
	},
	//是否都选上了
	check_all: function(){
		var isAll = [];
		$('#to_buy .item_parent').each(function(){
			if($(this).attr('checked') == undefined){
				isAll.push(false);
			}
		});
		if(isAll.indexOf(false) == -1){
			$('.all').attr('checked', 'true');
			cart.isAllCheck = true;
		}
		cart.sum();
	},
	//品牌下的产品是否都选上了
	select_child: function(el){
		var item_childs = $(el).closest('.shopingDiv').find('.item_child');
		var id = $(el).closest('.clearfix').find('.item_parent').attr('id');
		var all = [];
		item_childs.each(function(){

			if($(this).attr('checked') == undefined){
				all.push(false);
			}
		});

		if(all.indexOf(false) == -1){
			$(el).closest('.clearfix').find('.item_parent').attr('checked', 'true');

			var index = cart.uncheckeds.indexOf(id);
			if(index != -1){
				cart.uncheckeds.splice(index, 1);
			}
			cart.check_all();
		}else{
			cart.isAllCheck = false;
			$('.all').removeAttr('checked');
			$(el).closest('.clearfix').find('.item_parent').removeAttr('checked');
		}

		if($(el).attr('checked') == undefined){
			cart.uncheckeds.push($(el).val());

			var index = cart.uncheckeds.indexOf(id);
			if(index == -1){
				cart.uncheckeds.push(id);
			}
		}else{
			var index = cart.uncheckeds.indexOf($(el).val());
			if(index != -1){
				cart.uncheckeds.splice(index, 1);
			}
		}

		cart.sum();
	},
	//计算总数量与总价
	sum: function(){
		var totalNum = 0, totalPrice = 0.0, totalCut = 0.0, fullInfo = null;

		$('.item_parent').each(function(){
			(function(obj){
				var full_cut_info = cart.fullCut[obj.attr('data-id')];//当前品牌下的满减信息
				var price = 0.0;

				var item_childs = obj.closest('.clearfix').find('.item_child');

				item_childs.each(function(){
					if ($(this).attr('checked') != undefined){
						totalNum += parseInt($(this).closest('.commodiylist').find('.inptext').val());
						price += parseFloat($(this).closest('.commodiylist').find('.item_price').text());
					}

				});

				totalPrice += price;

				if(full_cut_info != undefined){
	
					//查找当前总价对应的满减信息
					var num = full_cut_info.length;
					price = price.toFixed(2);
	
					for(var i = 0 ; i < num; i++){
						if(parseFloat(price) >= parseFloat(full_cut_info[i].full)){
							fullInfo = full_cut_info[i];
						}
					}
					var show_full_cut_node = obj.closest('.clearfix').find('.priceHd');
					if(fullInfo != null){
						
						totalCut += parseFloat(fullInfo.cut);
						show_full_cut_node.show()
						show_full_cut_node.find('.H_text').text('全场满'+fullInfo.full+'减'+fullInfo.cut);
						fullInfo = null;

					}else{
						show_full_cut_node.hide();
					}
				}
			})($(this))
		});

		var total_price = totalPrice-totalCut;
		$('#item_total_num').text(totalNum);
		$('#item_total_price').text(total_price.toFixed(2));
		$('#item_total_cut').text(totalCut);
	},
     //商品关注
    focusAll : function(){
        if( this.islogin == 0 ){
            alertLogin();
        }
        var id=[],list = $('.cart_goods_item:checked');
        if(list.length == 0){
            tipsBox('亲，请选择您要关注的宝贝');
            return;
        }
        list.each(function(){
            id.push($(this).attr('data-id'));
        });
        //数组去重处理
        Array.prototype.unique3 = function(){
            var res = [];
            var json = {};
            for(var i = 0; i < this.length; i++){
                if(!json[this[i]]){
                    res.push(this[i]);
                    json[this[i]] = 1;
                }
            }
            return res;
        }
        var uniqueArr = id.unique3();
        var id_str = uniqueArr.join(',');
        var params = {product_ids : id_str};
        $.post( '/member/ajax/followProducts', params, function(res){
            if( res.error === true ){
                tipsBox( res.msg );
                return false;
            } else {
                tipsBox('关注成功!');
            }
      }, 'json' );
    },

	change : function( obj, pid, attr1, attr2 ){

		var nowObj = $(obj);
		num = nowObj.val();
		if(!/^[1-9]\d*$/.test(num)){
			nowObj.val( '1' );
			var num = 1;
		}

		var params = {
			pid : pid,
			attr1 : attr1,
			attr2 : attr2,
			num : num
		};
		params[$("#ci_token_cart").attr("name")]  = $("#ci_token_cart").val();
		$.post( '/member/cart/update', params, function(res){
			if( res.error === true ){
				alert( res.msg );
				return false;
			}
			cart.data = res.msg;
			cart.refreshbuy();
		}, 'json' );
	},


	inc : function(el, pid, attr1, attr2 ){
		var nowObj = $(el);
		var num = nowObj.val();
		if(!/^[1-9]\d*$/.test(num)){
			nowObj.val( '1' );
			num = 1;
		}else{
			num = parseInt(num);
			num ++ ;
		}

		var params = {
			pid : pid,
			attr1 : attr1,
			attr2 : attr2,
			num : num
		};
		params[$("#ci_token_cart").attr("name")]  = $("#ci_token_cart").val();
		$.post( '/member/cart/update', params, function(res){
			if( res.error === true ){
				alert( res.msg );
				return false;
			}
			cart.data = res.msg;
			cart.refreshbuy();
		}, 'json' );
	},


	sub : function(el, pid, attr1, attr2 ){
		var nowObj = $(el);
		var num = nowObj.val();
		if(!/^[1-9]\d*$/.test(num)){
			nowObj.val( '1' );
			num = 1;
		}else{
			num = parseInt(num);
			if(num > 1)
				num -- ;
		}

		var params = {
			pid : pid,
			attr1 : attr1,
			attr2 : attr2,
			num : num
		};
		params[$("#ci_token_cart").attr("name")]  = $("#ci_token_cart").val();
		$.post( '/member/cart/update', params, function(res){
			if( res.error === true ){
				alert( res.msg );
				return false;
			}
			cart.data = res.msg;
			cart.refreshbuy();
		}, 'json' );
	},


	delbuy : function( pid, attr1, attr2 ){
		var params = {
			pid : pid,
			attr1 : attr1,
			attr2 : attr2
		};
		params[$("#ci_token_cart").attr("name")]  = $("#ci_token_cart").val();
		$.post( '/member/cart/del', params, function(res){
			if( res.error === true ){
				alert( res.msg );
				return false;
			}
			cart.data = res.msg;
			cart.refreshbuy();
		}, 'json' );
	},
	
	to_buy : function(){
		

		if($('.cart_goods_item:checked').size() == 0){
			tipsBox('请选择结算的商品！');
			return;
		}
		var pids = [];
                var nums = [];
		$('.cart_goods_item:checked').each(function(){
			pids.push($(this).attr('data-id'));
                        nums.push($(this).attr('data-num'));
		})
		var params = {
			pids:pids,
                        nums:nums
		};
		var foreign_status = 2;
		$.post( '/member/foreign/verifyIsForeign', params, function(res){

			if( res.code == '404' || res.code == 404 ){
				//var is_foreign_counts = $("#is_foreign_counts").val();
				//var not_foreign_counts = $("#not_foreign_counts").val();
                                var is_foreign_counts = res.is_foreign_counts;
				var not_foreign_counts = res.not_foreign_counts;
				var html = '<div style="">';
        		html += '<div style="font-size:20px;margin:10px 10px;"><label ><div ><input type = "radio" name="is_foreign" class = "foreign_status" checked value = "1" >保税商品（'+is_foreign_counts+'件商品）</div></label>';
        		html += '<label ><div style="margin-top:22px;"><input type = "radio"  name ="is_foreign" class="foreign_status"  value= "0" >其他商品('+not_foreign_counts+'件商品）</div></label>';
				html += "</div></div>"
				$.popup({
		            boxID:"foreign",
		            title:"请分开结算以下商品",
		            width:480,
		            content:'text:'+html,
		            confirmBtn:true,
		            cancelBtn:true,
		            qdCallback:function(){
		                foreign_status = $("input[name='is_foreign']:checked").val();
		                $("input[name='foreign_status']").val(foreign_status);
		                $('#to_buy').submit();
		            },
		        });
			} else {
				$("input[name='foreign_status']").val(foreign_status);
				$('#to_buy').submit();
			}
			
		}, 'json' );
		
	},

	isChecked: function(val){
		var html = '';
		if(cart.uncheckeds.indexOf(val) == -1){
			html = ' checked="true" ';
		}
		return html;
	},
	end : ''

};
