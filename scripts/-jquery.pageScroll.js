jQuery.fn.pageScroll=function(s){s=jQuery.extend({test:"section h1",num:0,menu:"#scrollNavi a",elBox:"div.bsInd",targetBox:"#primary",pageTop:"h1.section, footer .gotoTop",button:"#nav-collapse",wrapper:"#scrollNavi",pageScrollDuration:800,pageScrollEasing:'easeOutCirc'},s);return this.each(function(){$(s.menu).on('click',function(e){e.preventDefault();s.num=$(s.menu).index($(this));s.y_position=$(s.targetBox+" "+s.elBox+":eq("+s.num+")").position().top;setPageScroll(parseInt(s.y_position));$("#scrollNavi").toggleClass("scrolldown");});$(s.scrollToAbs).on('click',function(e){e.preventDefault();s.num=$(this).attr("data-target");s.y_position=$(s.targetBox+" "+s.elBox+":eq("+s.num+")").position().top;setPageScroll(parseInt(s.y_position));$("#scrollNavi").toggleClass("scrolldown");});$(s.pageTop).on('click',function(e){e.preventDefault();setPageScroll(1);});$(s.button).on('click',function(e){e.preventDefault();$("#scrollNavi").toggleClass("scrolldown");});function setPageScroll(e){$("html,body").animate({scrollTop:e},s.pageScrollDuration,s.pageScrollEasing);}});}