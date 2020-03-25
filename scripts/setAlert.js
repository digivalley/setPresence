
 function prvAlt( q,n,b ) {
	n--;
	var i = {
		css:{position: 'fixed',top: 0,left: 0,'max-width':'1000px','font-size':12,'line-height':'12px',color: "#fff",'z-index': 9999999999999},
		cssChild: {padding: '2px 4px 2px 2px',display:'block',wordWrap: 'break-word',borderBottom:'rgba(255,255,255,0.4) solid 1px'},
		color : [
'rgba(243,82,129,0.6)',
'rgba(179,0,179,0.4)',
'rgba(0,54,217,0.4)',
'rgba(0,120,120,0.4)',
'rgba(89,179,0,0.5)'
		],
		num:0
	};
		
	if( b==true ){ if( $("body div").hasClass("prvAlt") ){$(".prvAlt").remove();}}
	if( !$("body>div").hasClass("prvAlt") ){
		$("body").prepend('<div class="prvAlt"></div>');
	}
	$(".prvAlt").css(i.css).click(function(){$(this).remove();}); 
	if( 1<q.length ){
		var data= [];
		$.each( q,
			function(k, v){
				data.push('<span class="line'+ k + '">'+v+'</span>');
			}
		);
		$('.prvAlt').prepend(data.join(''));
	}else{
		i.cssChild.background = i.color[n];
		$('.prvAlt').prepend('<span class="line'+ n +'">' +q +'</span>');
		$(".prvAlt span.line"+n).css(i.cssChild); 
	}
}
