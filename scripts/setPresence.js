
function setPresenceWL(i){
	if(i.wlLength >= i.wln){
		i.moreDsp = '<a id="moreDsp" href=""><div class="more"><span>もっと見る</span><i class="fas fa-angle-down"></i></div></a>';
		/*setList(i);*/
		$(i.b).append(i.moreDsp);
	}else{
		/* setList(i); */
	}
	$("#moreDsp").on('click', function(e){
		e.preventDefault();
		setList(i);
	});
	setList(i);
	$("#closeList").on('click', function(e){
		e.preventDefault();
		i.selfID= $(this).prop('id');
		setList(i);
	});
}

function setPresence(i){
	if(i.a.length >= i.n){
		i.moreDsp = '<div id="moreDsp"><a href="#">' + i.moreDspText + '</a></div>';
		setList(i);
		i.a.parent().append(i.moreDsp);
	}else{
		setList(i);
	}
	$("#moreDsp").on('click', function(e){
		e.preventDefault();
		setList(i);
	});
}

function setList(i){
	i.roundN= Math.ceil( i.wlLength/ i.wln) || 0;
	if(i.roundN>i.clickN){
		i.clickN++;
	}else{
		i.clickN=1;
		$("a#moreDsp span").text( i.moreDspText);
	}
	i.total = i.clickN*i.wln || 0;
	
	$.each( i.wl, function(k,v){
		if(k<i.total){
			$(v).show('fast').addClass('show');
			$(v).height($(v).find('a').height() );
			
		}else{
			$(v).hide('fast').removeClass('show');
		}
		i.k=k;
		if(i.total>k){
			$("a#moreDsp span").text(i.closeText);
		}else{
			$("a#moreDsp span").text( i.moreDspText);
		}
	}); 
	
	
	
	/* for(let num=0; num<i.wl.length; num++){
		if(num<i.total){
			$(i.wl[num]).css({'display': 'block'});
		}else{
			$(i.wl[num]).css({'display': 'none'});
		}
	}  */
	
	
}

/*
 * Copyright (c) 2015 Yohichiroh Kohtani (Studio HappyValley || http://studio-happyvalley.com)
 * Dual licensed under the MIT and GPL licenses.
 * @http://www.opensource.org/licenses/GPL-3.0
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 * Java script with jQuery.
 */
