/* Studio-happyvalley */

function getJsonData(i){
  return new Promise(resolve => {
	$.ajax({
			url:'../json/index.js',
			type:'GET',
			dataType:'jsonp',
			context:i,
			jsonpCallback:'prvIndex'
	}).success(function(data,textStatus,jqXHR){ resolve( setCnts(data,this) );
	}).error(function(xhr,textStatus,errorThrown){});
  });
}
		
function setCnts(d,i){
	var re=new RegExp(i.type,'gi');
	$(i.moreBtn).remove();
	if(i.closeBtn){$(this).remove();}
	var data=[];
	var data2=[];
	$.each(d,function(k,v){
		v.imgPath='';
		v.loginBtn='';
		if(v.news){v.addClass=' new';}
		v.k=k;
		v.buttonPath='<span class="more"><i>詳しく見る&nbsp;</i><i class="fa fa-caret-right fa-lg"></i></span>';
		v.classNames=v.className.split(' ');
		v.categoriesName=categories[v.classNames[0]];
		if(v.buttonType){v.buttonPath='';}
		v.dateBox='';v.classHvDate='';
		if(v.date){i.dates=v.date.split('/');
			let newIconFlag= setNewIcon(v.date,i);
			if(newIconFlag){
				i.year=i.dates[0];
				i.month=i.dates[1];
				i.date=i.dates[2];
				v.dateBox='<span class="date"><time class="date">'+i.month+'/'+i.date+'</time><time class="year">'+i.year+'</time></span>';
				v.classHvDate='hvDate';
			}
		}
		if(i.type=='all'||v.className.match(re)){data.push(setIndexHtml(v));}
	});
	data.reverse();
	$('#content').html(data.join(''));
}

function checkTime(rwDate){
	var now = new Date();
	var targetDate = new Date(rwDate);
	var diff = (now.getTime() - targetDate.getTime()) / (1000 * 60 * 60);
	return diff;
}

function setNewIcon(d,i){
	let resault= checkTime(d);
	if(i.term>resault){
		return true;
	}
}

	
function setIndexHtml(v){if(v.imageName){v.imgPath='<img src="./images/'+v.imageName+'" alt="">';}else{v.imgPath=''}if(v.body){v.body='<em>'+v.body+'</em>';}else{v.body=''}let auto,container,containerEnd;if(v.autoPrv){auto=v.autoPrv;}if(v.wrapperType){container='<span class="multiLink">';containerEnd='</span>';}else{container='<a rel="noreferrer" target="_blank" class="openSubWin" href="'+v.url+'" data-auto="'+auto+'">';containerEnd='</a>';}let html=container+'<dl class="'+v.className+'"><!-- cnt-'+v.k+'+++ --><dt><span class="wrapper">'+v.dateBox+v.imgPath+'<em class="'+v.classHvDate+'">'+v.categoriesName+'</em></span></dt><dd><b>'+v.subheadline+'</b>'+v.body+v.buttonPath+'</dd></dl>'+containerEnd;return html;}

function setMoreDsp(i){$(i.moreBtn).on('click',function(e){e.preventDefault();i.checkDn++;$(i.moreBtn).attr('data-dspnum',i.checkDn);getJsonData(i);history.replaceState('','','/contents/nikki/event/20150729/?prv='+i.checkDn);});$(i.closeBtn).on('click',function(e){e.preventDefault();i.checkDn=0;history.replaceState('','','/contents/nikki/event/20150729/?prv='+i.checkDn);$('#listBlc').empty();setPageScroll(1,i);getJsonData(i);});}