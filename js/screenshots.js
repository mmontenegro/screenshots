(function($){
	var transport, host;


    room = new Date().getTime();
    room = 'mat';
	transport = Screenshots.Transport('http://' + Screenshots.host + '/test', room);

	function takeIt(){
		html2canvas($("html"),{
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
		takeIt();
	}

	window.setInterval(uploadCurrent, 1000);

})(Zepto);