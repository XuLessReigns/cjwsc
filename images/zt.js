
function navPos(nav, wrap, direction){
	var	t = nav.offset().top;
	var l = nav.offset().left;
	var post = nav.position().top;
	var posl = nav.position().left;
	var direction = direction || "right";
	
	$(window).bind("load scroll resize", function(){
		position();
	});

	function position(){
		var maxw = wrap.width() + nav.width()*2;
		var left = posl, top = post,
			pos = "absolute", right = "auto",
			st = $(document).scrollTop(),
			flag = st > t,
			tmd = 1;
		
		if( flag ){
			pos = "fixed";
			left = wrap.offset().left + posl;
			top = "20px";
		}
		
		if( $(window).width() < maxw ){
			pos = "fixed";
			if( direction == "left" ){
				left = 0;
				right = "auto";
			}else{
				left = "auto";
				right = 0;
			}  
			tmd = 0.8;
			if( !flag ){
				top = t - st;
			}
		}
		nav.css({position:pos, left:left, right:right, top:top, opacity:tmd});	
	}	
}

$(function(){
   function scrollShow(){
	  var scrollHeight= $(window).scrollTop();
	  if(scrollHeight > 400){
		  $('#backTopNew').show('slow');
	  }else{
		  $('#backTopNew').hide('slow');
	  }
   }
  $(window).scroll(function(){
	  scrollShow();
  });
  $(window).resize(function(){
	  scrollShow();
  });
  $('#btTop').click(function(){
	  $('html,body').animate({scrollTop:0},300);
  });
  $(".btn_goback").click(function(event) {
      $('html,body').animate({
        'scrollTop': 0
      });
  });
})
