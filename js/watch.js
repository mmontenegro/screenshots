(function($){
    var transport;


    initializeRooms = function(){
        transport = Screenshots.Transport('http://' + Screenshots.host + '/test');
        transport.getRooms(function(response){
            eval('var rooms = ' + response +';');
            for (var i = 0; i < rooms.length; i++) {
                var a = $('<a href="#" target="_blank">').html(rooms[i]).prop('href', '/watch#' + rooms[i]);
                $('#rooms').append(a);
            };
            
        });
    }

    initializeWatch = function(){
        var url = location.href,
        room = url.substring(url.indexOf("#")+1);
        transport = Screenshots.Transport('http://' + Screenshots.host + '/test', room);
        transport.onWatch(updateScreen);
    }

    updateScreen = function(image){
        console.log(image['data']);
        $('#watch img').attr('src', image['data']['image']);
        $('#watch input#url').val(image['data']['url']);
    }

    
})(Zepto);
