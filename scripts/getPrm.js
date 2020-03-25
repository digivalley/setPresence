
function getPrm(){
	var andPairs=location.search.split('?');
	if(!andPairs[1]){return false;}
	var pairs=andPairs[1].split('&');	
	var key = new Array();
	var value = new Array();
	var settings = new Array();
	for( var i=0; i<pairs.length; i++ ){
		key[i]=(pairs[i].split('='))[0];
		value[i] =(pairs[i].split('='))[1];
		settings[key[i]] = value[i];
	}
	return settings;
}
