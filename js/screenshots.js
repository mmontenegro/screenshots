(function($){
	var transport, host, room;

	if(localStorage.getItem('screenshots_room')){
		room = localStorage.getItem('screenshots_room');
	}else{
		var room = new Date().getTime();
		alert(room);
		localStorage.setItem('screenshots_room', room);

	}
	alert(room);
    
	transport = Screenshots.Transport('http://' + Screenshots.host + '/test', room);

/*
	html2canvas.Preload($("html"), {
		"complete" : function(images) {
				var queue = html2canvas.Parse(el, images);
				var canvas = html2canvas.Renderer(queue);
				var img = canvas.toDataURL('image/png;base64');

				img = img.replace('data:image/png;base64,', '');
				processImg(img);
			},
			"proxy": Screenshots.proxyURL,
			"logging" : true
	});*/

	function capture(){
		html2canvas($("html"),{
			"proxy": Screenshots.proxyURL,
			logging: false,
		    onrendered: function(canvas) {
                transport.send({
                    url: location.href,
                    image: canvas.toDataURL()
                });
		    }
		});
	}

	uploadCurrent = function(){
		console.log("emiting");
		capture();
	}

	window.setInterval(uploadCurrent, 1000);

})(Zepto);