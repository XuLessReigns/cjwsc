/**
 * Created by Administrator on 2016/9/9.
 */
$(function () {
    var oNav = $('#LoutiNav');//导航壳
    var aNav = oNav.find('li');//导航
    var aDiv = $('#main .louceng');//楼层
    var oTop = $('#goTop');
    //回到顶部
    $(window).scroll(function(){
        var winH = $(window).height();//可视窗口高度
        var iTop = $(window).scrollTop();//鼠标滚动的距离
        if(iTop>=$('#main').offset().top){
            oNav.fadeIn();
            oTop.fadeIn();
            //鼠标滑动式改变
            aDiv.each(function(){
                if(winH+iTop - $(this).offset().top>winH/2){
                    aNav.removeClass('active');
                    aNav.eq($(this).index()).addClass('active');
                }
            })
        }else{
            oNav.fadeOut();
            oTop.fadeOut();
        }
    })
    // //点击top回到顶部
    // oTop.click(function(){
    //     $('body,html').animate({"scrollTop":0},500)
    // })
    //点击回到当前楼层
    aNav.click(function(){
        var t = aDiv.eq($(this).index()).offset().top;
        $('body,html').animate({"scrollTop":t},500);
        $(this).addClass('active').siblings().removeClass('active');
    });
})