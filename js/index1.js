/**
 * Created by Administrator on 2016/9/28.
 */
$(function(){

    console.log(1);

    $("#ls_fastloginfield_ctrl").click(function(){
        $("#ls_fastloginfield").show();
    })
    $("#qmenu").mouseenter(function(){
        $("#qmenu_menu").css({"borderTop":"none"});
        $("#qmenu_menu").show();
        // $(this).addClass("a");
    });
    $("#qmenu_menu").mouseleave(function(){
        $("#qmenu_menu").hide();
    })
    //     var flag = true;
    //     $("#qmenu").hover(function(){
    //         if(flag){
    //             $("#qmenu_menu").show();
    //             flag = false;
    //         }else{
    //             $("#qmenu_menu").hide();
    //             flag = true;
    //         }
    //     })
    $("#ls_fastloginfield_ctrl").click(function(){
        $(".xuanze").show();
    })
    $(".xuanze").mouseleave(function(){
        $(".xuanze").hide();
    })
    $(".xuanze .email").mouseenter(function(){
        $(this).addClass("active");
    })
    $(".xuanze .email").mouseleave(function(){
        $(this).removeClass("active");
    })
    $(".xuanze .email").click(function(){
        $("#ls_fastloginfield_ctrl").html("Email");
        $(".xuanze").hide();
    })
    $(".xuanze .username").click(function(){
        $("#ls_fastloginfield_ctrl").html("用户名");
        $(".xuanze").hide();
    })
    //鼠标点击事件，通过点击事件获取不同的json文件
    $(".slideswitch").click(function(){
        var $currentIndex = $(this).index();
        // $(".imgs").hide();
        $(".imgs").eq($currentIndex).show();

        var request = function(num){
            $.ajax({
                type:"GET",
                url:"../sever/json1.json",
                dateType:"json",
                success:function(data){
                    // console.log(data)
                    // console.log($currentIndex)
                    var html = "<img class=\"imgs\" src="+ data[num].img +" title="+data[num].titlt +"/>";
                    $("#slide").html(html);
                },
                error: function(obj, status, error) {
                    console.log(arguments);
                }
            })
        }
     request($currentIndex);
    })
    // setInterval(function(){
    //     var $currentIndex = 0;
    //     $currentIndex++;
    //     if($currentIndex>9){
    //         $currentIndex = 0;
    //     }
    //     console.log($currentIndex);
    //     $(".slideswitch").click($currentIndex);
    // },2000)

    //鼠标移动显示tip事件
    // $("#category_grid a").mouseover(function(){
    //     var $tip = $(this).attr("tip");
    //     // $(this).show($tip);
    //     console.log($tip);
    //     $(".this-tip").html($tip).show();
    // })
    // $("#category_grid a").mouseout(function(){
    //     var $tip = $(this).attr("tip");
    //     $(".this-tip").html($tip).hide();
    // })
    // var isShow = true;
    // $("#category_grid li a").hover(function(e){
    //     var $tip = $(this).attr("tip");
    //     var _e = e || event;
    //     var x = _e.clientX;
    //     var y = _e.clientY;
    //     var $x = $(".this-tip").css("width");
    //     var $y = $(".this-tip").css("height");
    //     // console.log($x,$y);
    //
    //     if(isShow){
    //         $(".this-tip").css({
    //             offsetLeft:"x + $x + px ",
    //             offsetTop:"y + $y + px "
    //         }).html($tip).show();
    //          console.log($(".this-tip").clientX);
    //         isShow = false;
    //     }else{
    //         $(".this-tip").hide();
    //         isShow = true;
    //     }
    // })

    $(".category_l1").mouseenter(function(){
        $(".tit_newimg").css({"background":"green"}).animate({"width":"7px"},300);
    })
    $(".category_l1").mouseleave(function(){
        $(".tit_newimg").css({"background":"green"}).animate({"width":"0"},100);
    })
    $(".category_l2").mouseenter(function(){
        $(".tit_subject1").css({"background":"blue"}).animate({"width":"7px"},300);
    })
    $(".category_l2").mouseleave(function(){
        $(".tit_subject1").css({"background":"blue"}).animate({"width":"0"},100);
    })
    $(".category_l3").mouseenter(function(){
        $(".tit_subject2").css({"background":"green"}).animate({"width":"7px"},300);
    })
    $(".category_l3").mouseleave(function(){
        $(".tit_subject2").css({"background":"green"}).animate({"width":"0"},100);
    })
    $(".category_l4").mouseenter(function(){
        $(".tit_subject3").css({"background":"orange"}).animate({"width":"7px"},300);
    })
    $(".category_l4").mouseleave(function(){
        $(".tit_subject3").css({"background":"orange"}).animate({"width":"0"},100);
    })


    $(document).scroll(function(){
        if($(this).scrollTop() >= $(window).height()){
            $("#scrolltop").fadeIn(200);
        }else{
            $("#scrolltop").fadeOut(200);
        }
    })
    $(".scrolltopa").click(function(){
        $("html,body").animate({scrollTop:0},400)
    });

    var $flag = true;
    $("#slide1").click(function(){
        if($flag){
            $("#slide11").css({"display":"none"});
            $(this).attr({"src":"../images/collapsed_yes.gif"});
            $flag = false;
        }else{
            $("#slide11").css({"display":"block"});
            $(this).attr({"src":"../images/collapsed_no.gif"});
            $flag = true;
        }
    })

    var $flag5 = true;
    $("#slide5").click(function(){
        if($flag5){
            $("#slide55").css({"display":"none"});
            $(this).attr({"src":"../images/collapsed_yes.gif"});
            $flag5 = false;
        }else{
            $("#slide55").css({"display":"block"});
            $(this).attr({"src":"../images/collapsed_no.gif"});
            $flag5 = true;
        }
    })

    var $flag2 = true;
    $("#slide2").click(function(){
        if($flag2){
            $("#slide22").css({"display":"none"});
            $(this).attr({"src":"../images/collapsed_yes.gif"});
            $flag2 = false;
        }else{
            $("#slide22").css({"display":"block"});
            $(this).attr({"src":"../images/collapsed_no.gif"});
            $flag2 = true;
        }
    })

    var $flag3 = true;
    $("#slide3").click(function(){
        if($flag3){
            $("#slide33").css({"display":"none"});
            $(this).attr({"src":"../images/collapsed_yes.gif"});
            $flag3 = false;
        }else{
            $("#slide33").css({"display":"block"});
            $(this).attr({"src":"../images/collapsed_no.gif"});
            $flag3 = true;
        }
    })

    var $flag4 = true;
    $("#slide4").click(function(){
        if($flag4){
            $("#slide44").css({"display":"none"});
            $(this).attr({"src":"../images/collapsed_yes.gif"});
            $flag4 = false;
        }else{
            $("#slide44").css({"display":"block"});
            $(this).attr({"src":"../images/collapsed_no.gif"});
            $flag4= true;
        }
    })

    var $flag6 = true;
    $("#slide6").click(function(){
        if($flag6){
            $("#onlinelist").css({"display":"none"});
            $(this).attr({"src":"../images/collapsed_yes.gif"});
            $flag6 = false;
        }else{
            $("#onlinelist").css({"display":"block"});
            $(this).attr({"src":"../images/collapsed_no.gif"});
            $flag6= true;
        }
    })

    $("#tip1,#tip2,#tip3,#tip4,#tip5,#tip6,#tip7,#tip8,#tip9,#tip10").tipso({
        useTitle: false
    });
});
