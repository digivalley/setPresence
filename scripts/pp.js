
function ppWin(q){
	$(q.linkBtn).on('click', function (e){
		e.preventDefault();
		q.filename = $(this).data('filename')+'.html';
		impData(q);
	});
}

function impData(q){
	var cssObj = {
		top: 0,
		position: 'fixed',
		width:$(window).width(),
		height:$(window).height()
	}; 
	var cssPrv = {
		height: 'auto',
		width: '100%'
	};
	$("body").append("<div id='bgBlack'></div><div id='bgWhiteBase'><div id='bgWhite'><div id='prvBlc' class='prvBlc'></div><div id='wndTitle'><i class='fa fa-dot-circle-o fa-2x posa'></i><span>お知らせ</span></div>");
	$("#prvBlc").css(cssPrv);
	$("#bgWhiteBase").css(cssObj);
	$("#bgBlack").css(cssObj).animate(
		{opacity: 0.6}, 
		{
			duration:2,
			easing:q.easType,
			complete:function(){ opr1(q) }
		}
	);
}

function opr1(q){

	var winH= {
		pc: q.wH*0.8,
		tablet: q.wH*0.8,
		mobile: q.wH,
		fp: q.wH
	};
	q.windowH= winH[q.dv];
	var css_puw_info ={
		'position': 'fixed',
		'top': 0,
		'right': 0,
		'margin-top': 0,
		'padding-bottom': '40px',
		'border-radius': 0,
		'overflow-x':'hidden',
		'-webkit-overflow-scrolling': 'touch',
		'overflow-scrolling': 'touch'
	};
	var css_puw ={
		pc: {'display': 'block'},
		tablet: {'display': 'block'},
		mobile: css_puw_info,
		fp:css_puw_info
	}
	$("#bgBlack").css("display","block");
	$("#bgWhite").css(css_puw[q.dv])
	.animate(
		{height: q.windowH},
		{
			duration:300,
			easing:q.easType,
			complete:function(){ opr2(q) }
		}
	);
}

function opr2(q){

	var winW= {
		pc: q.wW*0.8,
		tablet: q.wW*0.8,
		mobile: q.wW,
		fp: q.wW
	};
	var maxw = winW[q.dv];
	if(maxw>696){maxw=696;}
	$("#bgWhite")
	.animate(
		{width: maxw},
		{
			duration:800,
			easing:q.easType,
			complete:function(){
				$("#prvBlc").load(q.filename+ ' #impdata');controlPane(q);
			}
		}
	);
}
	
function controlPane(q){
	//$("#primary").css({height:window.innerHeight*0.8});
	$("#bgWhite").append("<div id='close'><i class='fa fa-close'></i></div>");
	//$('#bgWhite, #prvBlc').css({'height': 'auto'});
	var timer= setTimeout(
		function(){
				var getH = $('#prvBlc').prop('clientHeight');
				var newH= q.windowH-20;
				if(q.windowH>getH){q.windowH=getH;}
				else{$('#prvBlc').css({overflow: 'auto', height: newH});}
				$('#bgWhite').animate( {height: q.windowH}, 800, q.easType);
				clearInterval(timer );
		}, 400
	);
	$("#close").on('click', function(e) {
		e.preventDefault();
		$("#bgBlack,#bgWhiteBase").remove();
		return false;
	});
}
 
function popupSubWin(theURL,targetWin) {
	var features ="location=yes,menubar=yes,status=yes,scrollbars=yes,resizable=yes,toolbar=yes";
	window.open(theURL,targetWin,features);
}
