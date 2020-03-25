 $(function(){
	var i ={
		df: $.Deferred(),
		dsTm: new Array(),
		num:  0,
		order: parseInt(getPrm()["order"]),
		dfElm: ".fotorama img",/* ロード処理が必要なオブジェクトclass */
		targetObj: ".fotorama__loaded--img",
		refH: 1,
		type: "",
		name: "addCp",
		brPoint: 728,/*767 1039*/
		ua: navigator.userAgent,
		wW:$(window).width(),/* 実際の表示サイズ JS制御用 */
		wH:$(window).height(),
		dW:window.innerWidth,/* MQの対象値・scrollBar含む IE非対応 */
		dH:window.innerHeight,
		brname: getBrName(),
		a: '#newsBox dl',
		n: 5,
		dn: 0,
		dn2: 0,
		button: '#nav-collapse',
		menu : "#spNavi .scrollNavi a",
		scrollToAbs: '#pcNavi .nav-collapse a, footer .menu a',
				pageScrollDuration:800,
		pageScrollEasing:'easeOutCirc',
		tgtH: 0,
		targetBox : "#scrollContents",
		elBox : "article",
		spNabiPanel: "#scrollNavi",
		topMargin: -79,
		topFrameMargin: 0,
		/*pctopMargin: 140, 94*/
		pageTop: "h1.section, footer .gotoTop",
		naviPosition : 200,
		pageScrollDuration : 800,
		h: $("#utb").width()*315/560,
		fixed: '.fixedWrapper',
		borderLine: 'footer',
		linkBtn: '#system.banner a, #project.banner a, #inaugural a, #vpd a, #spNaviAiside a, #headerNews a',
		dv: checkDevice()/* mobile,tablet,fp,pc */
	};

	if(i.order != null){
		setTimeout(function(){
			i.num=i.order;
				i.y_position=$(i.targetBox+" "+i.elBox+":eq("+i.num+")").position().top;
			console.log('num:  '+i.num);
			$(i.targetBox+" "+i.elBox+":eq("+i.num+")");
				setPageScroll(parseInt(i.y_position));
		},600);	
		$(i.spNabiPanel).removeClass("scrolldown");
	};
	function setPageScroll(e){
		let topMargin= $('header.root').height();
		$("html,body").animate({scrollTop:e+topMargin},i.pageScrollDuration,i.pageScrollEasing);
		$(i.spNabiPanel).removeClass("scrolldown");
	}
	
	
	eTracking();

	setReader(i);
	if(i.dv=='pc'){
		var timer = false; 
		$(window).resize(function(){  if (timer !== false){ clearTimeout(timer); } timer = setTimeout(function() {
			setReader(i);
		}, 300); }); 
	}
		
	$(i.button).on('click', function(e) {
		e.preventDefault();
		$(i.spNabiPanel).toggleClass('scrolldown');
		$(i.spNabiPanel).toggleClass('scrolldown');
	});
	getJsonData(i);
	jump(i);
	
	$(i.linkBtn).css({'cursor':'pointer'});
	
	$('body').pageScroll ( i );
	//setFnc(i);
	gotoTop(i);
	setSlideDown(i);
	
	/* selectList start +++++++++++++++++++++ */
	i.timer3 = setInterval(
		function(){
			if ($('#newsBox').height()>200){
				setPresence(i);
				setSlideDown(i);
				clearInterval( i.timer3 );
			}
		}, 100
	);
	/* selectList end +++++++++++++++++++++ */
	tp(i);	
	ppWin(i);/* pp.js */
	
	if(i.wW>=i.brPoint){
		i.fixed= ".fixedWrapper";
		i.fixed2= "#pcNavi";
		scrollEv(i); 
	}else{
		i.fixed= "#scrollNavi";
		scrollEv(i); 
	}
});

function setReader(i){
	$('.moredsp').each(function(){
		i.imgW=0;
		i.img= $(this).next().find('img').attr('src');
		if(i.img){
			$(this).find('img').remove();
			$(this).prepend('<img class="thumb" src="'+ i.img +'">');
			i.imgW=52;
		}
		$('img.thumb').css({
			'height': '44px',
			'width': 'auto',
			'padding-right': '4px',
			'float': 'left'
		});
		i.smrWds= Math.floor( ($(this).width()-88-i.imgW )/14)+2;
		i.textFull= $(this).next().find('p').text();
		i.reader= i.textFull.substr(0,i.smrWds*2)+'…';
		$(this).find('span').text(i.reader);
	});
}	

function scrollEv(i){
	if(i.fixed== ".fixedWrapper"){i.tgtH= parseInt($(i.fixed).offset().top)+i.topMargin || 0;}
	if(i.fixed2){i.tgtH2= parseInt($(i.fixed2).offset().top)+i.topFrameMargin || 0;}
	$(window).on("scroll", function() {
		var selfH= $(i.fixed).prop('clientHeight');
		var selfH2= $(i.fixed2).prop('clientHeight');
		var scrollBtm = $(i.borderLine).offset().top - selfH;
		i.wnH = $(window).scrollTop();
		fixObj(i.wnH,i.tgtH,i.fixed);
		fixObj(i.wnH,i.tgtH2,i.fixed2);
		if( scrollBtm < i.wnH ){
			$(i.fixed).removeClass('fixed').addClass('refixed');
		}else{
			$(i.fixed).removeClass('refixed');
		}/**/
	});
}

function fixObj(h,t,obj){		
	if( h>t ){
		$(obj).addClass('fixed');
	}else{$(obj).removeClass('fixed');}
}

function eTracking(){
	$('a').on('click', function(e){
		//e.preventDefault();
		var category= $(this).data('c');
		var action= $(this).data('a');
		var label= $(this).data('l')|| 'n';

		ga('send', {
			hitType: 'event',
			eventCategory: category,
			eventAction: action,
			eventLabel: label
		});
	});
}

function gotoTop(q){
	var i={
		ptbtn: '#floating-banner'
	};
	$(window).on('scroll', function(){
		if ($(this).scrollTop() > 66) {
			//$(i.ptbtn).fadeIn();
			$(i.ptbtn).addClass('fixed');
		}
		else {
			//$(i.ptbtn).fadeOut();
			$(i.ptbtn).removeClass('fixed');
		}
	});
	$(i.ptbtn).on('click', function(e){
		e.preventDefault();
		var speed = 400;
		q.count=0;
		$('body,html').animate({scrollTop:0}, speed, 'swing');
	});
}

function jumpPlus(i){
	$('a.jumpPlus').on('click', function(e){
		e.preventDefault(); 
		$("#bgBlack,#bgWhiteBase").remove();

		var target= $( $(this).attr('href'));
		i.y_position = target.offset().top;
/* 		$("html,body").animate(
			{scrollTop: i.y_position-48}, 
			{
				duration: i.pageScrollDuration, 
				easing: i.pageScrollEasing, 
				complete: function(){
					target.next().slideUp();
					target.next().next().slideDown();
				}
			}
		);
 */	});
}

function jump(i){
	$('a.jump').on('click', function(e){
		e.preventDefault();
		var target= $( $(this).attr('href'));
		i.y_position = target.offset().top;
		$("html,body").animate({scrollTop: i.y_position-48}, i.pageScrollDuration,i.pageScrollEasing);
		target.next().slideUp();
		target.next().next().slideDown();
	});
}

function tp(i){

	$('#system, #spNaviAiside').on('click', function(e){		//prvAlt([i.dv]);	
		//e.preventDefault();
		var link= {
			left: {/* regist */
				pc: 'https://www.vpd-ss.jp/pc/patient/24125/mail-input',
				tablet: 'https://www.vpd-ss.jp/pc/patient/24125/mail-input',
				mobile: 'https://www.vpd-ss.jp/sp/patient/sp/24125/mail-input',
				fp: 'https://www.vpd-ss.jp/fp/patient/fp/24125/mail-input'
			},
			right: {/* login */
				pc: 'https://www.vpd-ss.jp/pc/patient/24125/login',
				tablet: 'https://www.vpd-ss.jp/pc/patient/24125/login',
				mobile: 'https://www.vpd-ss.jp/sp/patient/sp/24125/login',
				fp: 'https://www.vpd-ss.jp/fp/patient/fp/24125/login'
			}
		};
		/* selectList start +++++++++++++++++++++ */
		i.timer2 = setInterval(
			function(){ //prvAlt([link.left[i.dv] ]);
				if ($('#bgWhite a').height()>10){
					 $('#leftBox a').prop('href', link.left[i.dv]);
					 $('#rightBox a').prop('href', link.right[i.dv]);
					 clearInterval( i.timer2 );
				}
			}, 100
		);
		/* selectList end +++++++++++++++++++++ */
		
	});
}

function setSlideDown(i){
	$('.contents').hide();
	$('.moredsp').on('click', function(e){
		e.preventDefault();
		$(this).next().slideDown(400);
		$(this).hide();
	});
	
	$('.shutup').on('click', function(e){
		e.preventDefault();	
		var scrollValue = $(this).closest('.box').prop('offsetTop');
		$(this).parent('.contents').slideUp(400);
		var moredsp = $(this).parents('.box').find('.moredsp');
		moredsp.show();
		$("html,body").animate({scrollTop:  scrollValue }, i.pageScrollDuration,i.pageScrollEasing);
	});
}

		/* チェック後に適用する処理の設定 */
 function setFnc(i){
	$.each($(i.dfElm),function(k,v){
		i.type = $(v).data("cp") ;
		if( i.type == "copyrightImg" ){
			i.fnc= {
				copyrightImg:function(){setHtml(i);},
				false: function(){ }
			};
			def(i);
		}
	});
}

function setHtml(i){
	$(i.targetObj).addClass( i.type );
}

function def(q){
	q.comp =function(){
		mainFnc(q);
		return q.df.promise(q);
	};
	q.comp()
	.done( function(){ q.fnc[ q.type ](); })
	.fail( function(q){ return false; });
}

function mainFnc(q){
	var tm = setInterval(
		function(){
			q.h= $( q.targetObj ).height();
			if (q.h > q.refH){ 
				clearInterval( tm  );
				q.df.resolve();
			}
		}, 100
	);
} 

function resetFB(){
	var timer = false;
	$(window).on('resize', function() {
		if (timer !== false) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			console.log('resized');
			// fnc
		}, 200);
	});
};
/*  */

function checkDevice(){
	var _ua = (function(u){
      return {
        Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) 
          || u.indexOf("ipad") != -1
          || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
          || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
          || u.indexOf("kindle") != -1
          || u.indexOf("silk") != -1
          || u.indexOf("playbook") != -1,
        Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
          || u.indexOf("iphone") != -1
          || u.indexOf("ipod") != -1
          || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
          || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
          || u.indexOf("blackberry") != -1,
        Fp:(u.indexOf("docomo") != -1 )
          || u.indexOf("up.browser") != -1
          || u.indexOf("j-phone") != -1
          || u.indexOf("mod-") != -1
          || u.indexOf("willcom") != -1
          || u.indexOf("emobile") != -1
      }
    })(window.navigator.userAgent.toLowerCase());
    var dvRs={
		mv: _ua.Mobile,
		tb: _ua.Tablet,
		fp: _ua.Fp
	};
	if(dvRs.mv){return 'mobile';}
	else if(dvRs.tb){return 'tablet';}
	else if(dvRs.fp){return 'fp';}
	else{return 'pc';}
}

function getBrName(){
	var userAgent = window.navigator.userAgent.toLowerCase();
	 
	// 一般的なブラウザ判定
	if (userAgent.indexOf('msie') != -1) {
	  /* IE. */
	  return 'ie';
	} else if (userAgent.indexOf('chrome') != -1) {
	  /* Google Chrome. */
	  return 'chrome';
	} else if (userAgent.indexOf('firefox') != -1) {
	  /* FireFox. */
	  return 'firefox';
	} else if (userAgent.indexOf('safari') != -1) {
	  /* Safari. */
	  return 'safari';
	} else if (userAgent.indexOf('opera') != -1) {
	  /* Opera. */
	  return 'opera';
	} else if (userAgent.indexOf('gecko') != -1) {
	  /* Gecko. */
	  return 'gecko';
	} else {
	  return false;
	}	
}

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});
	
/*  	$(window).resize(function() {
		if (i.timer !== false) {
			clearTimeout(i.timer);
		}
		i.timer = setTimeout(function() {
			location.reload();
		}, 600);
	});スマフォだとスクロールするとリサイズイベントが発生しエラーになる
*/	
