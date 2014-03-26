(function($){
    var transport;

    transport = Screenshots.Transport('http://' + Screenshots.host + '/test');

    initialize = function(){
        transport.onWatch(updateScreen);
    }

    updateScreen = function(image){
        console.log(image['data']);
        $('#watch img').attr('src', image['data']['image']);
        $('#watch input#url').val(image['data']['url']);
    }

    initialize();
})(Zepto);
