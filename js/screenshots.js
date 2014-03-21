(function($){
	var canv;

	takeIt = function(){
		html2canvas($("html"),{
			logging: true,
		    onrendered: function(canvas) {
		        canv = canvas;
		    }
		});
	}

	pasteIt = function(){
		$("body").html("").append(canv);
	}
})(Zepto);