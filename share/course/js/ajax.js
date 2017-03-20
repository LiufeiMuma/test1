function ajax(method,url,isAsyn,param,callBack){
	// 1. 创建对象
	// var xhr;
	// if (window.XMLHttpRequest) {
	// 	xhr = new XMLHttpRequest();
	// }else{
	// 	xhr = new ActiveXObject("Microsoft.XMLHTTP");
	// }

	var xhr = (window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP"));
	// 2 初始化参数
	if (method.toUpperCase() == "GET") {
		if (param!=null) {
			var str = url+"?";
			for(var v in param){
				str = (str+v+"="+param[v]+"&");
			}
			url = str.substr(0,str.length-1);
			console.log(url);
		}
		// 2--GET
		xhr.open(method,url,isAsyn);
		// 3--GET
		xhr.send();
	}else{
		//设置请求头 告诉服务器你传递的参数是什么类型的
		// "content-type" "text/xml"
		//  "content-type" "application/json"
		
		// 2--POST
		xhr.open(method,url,isAsyn);
		xhr.setRequestHeader("content-type","application/json");
		// 3--POST
		xhr.send(  JSON.stringify(param) );
	}
	
	// 4 监听函数
	xhr.onreadystatechange = callBack;

	return xhr;
}

//param = {userId:1234,pwd:aaa} url?userId=1234&pwd=aaa&