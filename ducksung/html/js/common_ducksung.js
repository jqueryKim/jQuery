(function($){
	$window = $(window); // window

	var gnb = {
		btn : $('.allGnb'),
		btn_m : $('.btnMember'),
		nav : $('#gnb'),
		li : $('#gnb .nav > li'),
		cover : $('#header .gnb_cover'),
		speed : 300,
		ease : 'easeOutCubic'
	}

	

	gnb_reset = function(){
		gnb.cover.stop().animate({height:0},{duration:gnb.speed,easing:gnb.ease});
	}

	gnb_cover_evt = function(){
		gnb.cover.stop().animate({height:45},{duration:gnb.speed,easing:gnb.ease});
	}

	gnb.li.bind('mouseenter',function(){
		$(this).addClass('on');
		$(this).find('ul').show().stop().animate({opacity:1,marginTop:0},{duration:gnb.speed,easing:gnb.ease});
	});

	gnb.li.bind('mouseleave',function(){
		$(this).removeClass('on');
		$(this).find('ul').stop().animate({opacity:0,marginTop:-20},{duration:gnb.speed,easing:gnb.ease,complete:function(){
			$(this).hide();
		}});
	});

	gnb.btn.bind('click',function(){
		if($('body').attr('class')){
			$('body').removeClass('active');
		}else{
			$('body').addClass('active');
		}
	});

	gnb.btn_m.bind('click',function(){
		if($('body').attr('class')){
			$('body').removeClass('member_active');
		}else{
			$('body').addClass('member_active');
		}
	});


	allGnb_active = function(){
		$body = $('body');
		if($body.attr('class')){
			$body.removeClass('active');
			$body.removeClass('member_active');

			$body.find('.h_body .nav li.active').removeClass('active');
		}
	}

	// h_body common nav
	var c_nav = {
		items : $('.h_body .nav > li > a')
	}

	c_nav.items.bind('click',function(){
		this_li = $(this).parent();
		if(this_li.find('ul').length > 0){
			if(this_li.attr('class').indexOf('active') > -1){
				this_li.removeClass('active');
			}else{
				this_li.parent().find('active').removeClass('active');
				this_li.addClass('active');
			}
			
			if($('body.active').length > 0){
				return false;
			}
		}
	});


	var mcate = {
		wrap : $('.mainCategory'),
		li : $('.mainCategory > li'),
		oneDep : $('.mainCategory > li > strong')
	}

	mcate.oneDep.bind('click',function(){
		if($(this).parent().attr('class')){
			mcate.wrap.find('> li.active').removeClass('active');
		}else{
			mcate.wrap.find('> li.active').removeClass('active');
			$(this).parent().addClass('active');
		}
	});

	multi_nav_call = function(class_name){
		if($('.'+class_name).length > 0){
			$('.'+class_name).each(function(index){
				var_ = class_name+(index+1);
				var var_ = new Swiper($(this).find('.swiper-container'), {
					scrollbar: $(this).find('.swiper-scrollbar'),
					scrollbarHide: false,
					nextButton: $(this).find('.swiper-button-next'),
					prevButton: $(this).find('.swiper-button-prev'),
					slidesPerView: 'auto',
					//centeredSlides: true,
					spaceBetween: 0,
					grabCursor: true
				});
			});
		}
	}

	multi_slide_call = function(class_name,perviewNum){
		if($('.'+class_name).length > 0){
			$('.'+class_name).each(function(index){
				var_ = class_name+(index+1);
				var var_ = new Swiper($(this).find('.swiper-container'), {
					pagination: $(this).find('.swiper-pagination'),
					nextButton: $(this).find('.swiper-button-next'),
					prevButton: $(this).find('.swiper-button-prev'),
					slidesPerView: perviewNum
				});
			});
		}
	};

	multi_slide_call('m_schedule',1); // 개강일정
	multi_slide_call('m_confirm_post',1); // 도면검도
	multi_slide_call('professor_slide_wrap',1); // 전문 교수진 소개
	multi_slide_call('icon_contentsWrap',4); // 수강생 혜택
	multi_slide_call('bookGuide_slideWrap',1); // 강의교재 소개
	multi_slide_call('thumbWrap',4);
	multi_slide_call('historyWrap',3);

	var doit;
	window_size = function(){
		win_w = $window.outerWidth();
		if(win_w >= 960){ // PC Mode
			allGnb_active(); // GNB Reset
			multi_slide_call('our_clients',6);
			multi_slide_call('icon_contentsWrap',4);
			multi_slide_call('historyWrap',3);
		}else{
			if(win_w < 960 && win_w >= 640){
				multi_slide_call('our_clients',4);
				multi_slide_call('icon_contentsWrap',2);
				multi_slide_call('historyWrap',2);
				console.log(111);
			}else if(win_w < 640){
				multi_slide_call('our_clients',3);
				multi_slide_call('icon_contentsWrap',2);
				multi_slide_call('historyWrap',1);
			}

			multi_nav_call('h_topNav');
			multi_nav_call('snb');
		}
	}

	$window.bind('resize load',function(){
		window_size();
	});

	window.onresize = function() {
		clearTimeout(doit);
		doit = setTimeout(function() {
			window_size();
		}, 100);
	};

	var swiper1 = new Swiper('#mainVisual .swiper-container', {
		pagination: '.swiper-pagination1',
		nextButton: '#mainVisual .swiper-button-next',
		prevButton: '#mainVisual .swiper-button-prev',
		slidesPerView: 1,
		paginationClickable: true,
		spaceBetween: 0,
		parallax: true,
		effect: 'fade',
		autoplay: 6000,
		autoplayDisableOnInteraction: false
	});


	func_tab = {
		items : $('.func_tab a')
	}

	func_tab.items.bind('click',function(){
		this_parent = $(this).closest('.func_tab');
		cont = $('.'+this_parent.attr('data-cont'));
		active_cont = $($(this).attr('href'));
		cont.hide();
		active_cont.show();
		this_parent.find('.active').removeClass('active');
		$(this).addClass('active');
		$(this).parent().addClass('active');
		if(this_parent.attr('data-cont') == 'm_confirm_post'){
			multi_slide_call('m_confirm_post',1);
		}

		return false;
	});

	func_select = {
		items : $('.func_select')
	}

	func_select.items.bind('change',function(){
		cont = $('.'+$(this).attr('data-cont'));
		active_cont = $($(this).val());
		cont.hide();
		active_cont.show();
	});

	// back_btn
	$('.back_btn').bind('click',function(){
		history.back();
		return false;
	});
	
	var preview = {
		wrap : $('.preview_galleryWrap'),
		vphoto : $('.vPhotoList'),
		thumb : $('.thumbList li a'),
		num : 0,
		speed : 500,
		ease : 'easeOutCubic',
		interv : 4000
	}

	preview_evt = function(){
		preview.vphoto.stop().animate({marginLeft:-100*preview.num+'%'},{duration:preview.speed,easing:preview.ease});
	}
	
	preview_thumb_evt = function(){
		$('.thumbList').find('.on').removeClass('on');
		preview.thumb.parent().eq(preview.num).addClass('on');
		preview_evt();
	}

	preview.thumb.bind('click',function(){
		clearInterval(preview_interval);
		preview.num = $(this).parent().index();
		preview_thumb_evt();
		preview_auto();
		return false;
	});

	preview_num_evt = function(){
		preview.num++;
		if(preview.num >= preview.thumb.parent().length){
			preview.num = 0;
		}
		preview_thumb_evt();
	}
	
	var preview_interval;
	preview_auto = function(){
		preview_interval = setInterval(preview_num_evt,preview.interv);
	}

	if(preview.vphoto.length > 0){
		$('.thumbList li:first').addClass('on');
		preview_auto();
	}
$('.thumbList li:first').addClass('on');

	// table in table
	var table_in_action = $('.action_tr_link');
	table_in_action.bind('click',function(){
		hidden_tr = $($(this).attr('href'));
		if(hidden_tr.length > 0){
			this_tr = $(this).closest('tr');
			if(this_tr.attr('class')){
				this_tr.removeClass('active');
				hidden_tr.hide();
			}else{
				$(this).closest('.sheetInContents').find('.active').removeClass('active').find('+.hidden_tr').hide();
				this_tr.addClass('active');
				hidden_tr.show();
			}
		}

		return false;
	});

	// faq
	$('.faqList dt').bind('click',function(){
		this_item = $(this).closest('li');
		if(this_item.attr('class')){
			this_item.removeClass('active').find('dd').stop(true,true).slideUp(300);
		}else{
			if(this_item.parent().find('.active').length > 0){
				this_item.parent().find('.active').removeClass('active').find('dd').stop(true,true).slideUp(300);
			}
			this_item.addClass('active').find('dd').stop(true,true).slideDown(300);
		}
	});

	// btnLayer
	var layer = {
		btn : $('.btnLayer'),
		dim : '<div class="dim"></div>',
		close : $('.layerClose'),
		speed : 500
	}

	dim_evt = function(obj){
		if(obj){
			$('body').append(layer.dim);
			$('.dim').fadeIn(layer.speed);
		}else{
			$('.dim').fadeOut(layer.speed,function(){
				$('.dim').remove();
			});
		}
	}
	
	layer_evt = function(obj){
		if($('.commonLayer').not(':hidden').length < 1){
			dim_evt(true);
		}
		
		layer_obj = $('#'+obj);
		$('body').append(layer_obj);
		pos_top = $(window).scrollTop()+($(window).outerHeight()/2);
		layer_obj.fadeIn(layer.speed);

		if(layer_obj.outerHeight() > $(window).outerHeight()){
			layer_obj.css({
				'top':($(window).scrollTop()+20)+'px',
				'margin-left':-(layer_obj.outerWidth()/2)+'px'
			});
		}else{
			layer_obj.css({
				'top':pos_top-(layer_obj.outerHeight()/2)+'px',
				'margin-left':-(layer_obj.outerWidth()/2)+'px'
			});
		}
	}

	layer_close = function(obj){
		if(obj == 'all'){
			dim_evt(false);
			$('.commonLayer').fadeOut(layer.speed);
		}else{
			if($('.commonLayer').not(':hidden').length < 2){
				dim_evt(false);
			}
			
			layer_obj = $('#'+obj);
			layer_obj.fadeOut(layer.speed);
		}
	}

	layer.btn.bind('click',function(){
		layer_id = $(this).attr('data-layer');
		layer_evt(layer_id);
		return false;
	});

	layer.close.bind('click',function(){
		layer_id = $(this).attr('data-layer');
		layer_close(layer_id);
		return false;
	});

	/* 모의고사 */
	// 문제답안클릭
	examCheck = function(){
		$(".exam_area .conLeft dd").each(function(index){
			if($(this).find('li :radio:checked').length > 0){
				$(this).find("li").each(function(index){
					if($(this).find(":radio").prop("checked")){
						ooo = index;
					}
				})
				xxxQues = $(".exam_area .conRight li").eq(index).find("button");
				oooQues = $(".exam_area .conRight li").eq(index).find("button").eq(ooo);
				xxxQues.not(oooQues).removeClass("active");
				oooQues.addClass("active");
			}
		});
	}

	// 답안카드 직접클릭
	krCheck = function(){
		$(".exam_area .conRight li").each(function(index){
			if($(this).find('button.active').length > 0){
				$(this).find("button").each(function(index){
					if($(this).hasClass("active")){
						ooo = index;
					}
				})
				xxxQues = $(".exam_area .conLeft dd").eq(index).find(":radio");
				oooQues = $(".exam_area .conLeft dd").eq(index).find(":radio").eq(ooo);
				xxxQues.not(oooQues).prop("checked", false);
				oooQues.prop("checked", true);
			}
		});
	}

	$(document).on("click", ".exam_area .conLeft :radio", function(){
		examCheck();
	});

	$(document).on("click", ".exam_area .conRight li button", function(){
		$(this).parent().find("button").not($(this)).removeClass("active");
		$(this).addClass("active");
		krCheck();
	});

	$(document).on("click", "#next_more", function(){
		$(".exam_area .conLeft dl:hidden").each(function(){
			if($(".exam_area .conLeft dl:hidden").length==1){
				$("#next_more").hide();
			}
			$(this).eq(0).show();
			return false;
		})
	});
	/* //모의고사 */

	function bookmarksite() {
		var title = "서울덕성기술학원"; //현재 보고 있는 페이지의 Title
		var url = location.href; //현재 보고 있는 페이지의 Url
	   // Internet Explorer
	   if(document.all){
		  window.external.AddFavorite(url, title);
	   }
	   // Google Chrome
	   else if(window.chrome){
		  alert("Ctrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
	   }
	   // Firefox
	   else if (window.sidebar) // firefox
	   {
		  window.sidebar.addPanel(title, url, "");
	   }
	   // Opera
	   else if(window.opera && window.print)
	   { // opera
		  var elem = document.createElement('a');
		  elem.setAttribute('href',url);
		  elem.setAttribute('title',title);
		  elem.setAttribute('rel','sidebar');
		  elem.click();
	   }else if( window.external ) {
		  window.external.AddFavorite(url, title);
		}
	}

	$('.bookmark > a').bind('click',function(){
		bookmarksite();
		return false;
	});

}) (jQuery);