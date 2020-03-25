jQuery.fn.pageScroll=function(s){
	s=jQuery.extend({
		test:"section h1",
		num:0,
		menu : "#spNavi .scrollNavi a",
		scrollToAbs: '#pcNavi .nav-collapse a, footer .menu a',
		elBox:"article",
		targetBox:"#primary",
		pageTop:"h1.section, footer .gotoTop",
		button:"#nav-collapse",
		wrapper:"#scrollNavi",
		pageScrollDuration:800,
		pageScrollEasing:'easeOutCirc'
	},s);
return this.each(function(){
	$(s.wrapper).removeClass("scrolldown");
	$(s.menu).off('click');
	$(s.menu).on('click',function(e){
		e.preventDefault();
		s.num=$(s.menu).index($(this));
		s.y_position=$(s.targetBox+" "+s.elBox+":eq("+s.num+")").position().top;
		setPageScroll(parseInt(s.y_position) + $('header.root').height());
		$("#scrollNavi").toggleClass("scrolldown");});
	$(s.scrollToAbs).off('click');
	$(s.scrollToAbs).on('click',function(e){
		e.preventDefault();
		s.num=$(this).attr("data-target");
		s.y_position=$(s.targetBox+" "+s.elBox+":eq("+s.num+")").position().top;
		setPageScroll(parseInt(s.y_position));
		$("#scrollNavi").toggleClass("scrolldown");
	});
	$(s.pageTop).off('click');
	$(s.pageTop).on('click',function(e){
		e.preventDefault();
		setPageScroll(1);
	});
	$(s.button).off('click');
	$(s.button).on('click',function(e){
		e.preventDefault();
		$("#scrollNavi").toggleClass("scrolldown");
		$("header.root > .wrapper").toggleClass("scrolldown");
	});
	function setPageScroll(e){
		$("html,body").animate({scrollTop:e},s.pageScrollDuration,s.pageScrollEasing);
	}
});}