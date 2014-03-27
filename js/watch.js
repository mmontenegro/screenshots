(function($){
    var transport;

    room = 'mat';
    transport = Screenshots.Transport('http://' + Screenshots.host + '/test', room);

    initializeWatch = function(){
        transport.onWatch(updateScreen);
    }

    initializeRooms = function(){
        var rooms = transport.getRooms();
        console.log(rooms);
    }

    updateScreen = function(image){
        console.log(image['data']);
        $('#watch img').attr('src', image['data']['image']);
        $('#watch input#url').val(image['data']['url']);
    }

    
})(Zepto);
