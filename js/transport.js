(function($){
    Screenshots.Transport = function(url, room){
        var socket, onWatchFunction;
        
        function initialize(){
            socket = io.connect(url);

            socket.on('connect', function(msg) {
                if(room)
                     socket.emit('join', {room: room});
                 socket.on('disconnect', function(msg) {
                    console.log("desconnected");
                });
            });

            socket.on('emit', function(msg) {
                if(undefined !== onWatchFunction){
                    onWatchFunction(msg);
                }
            });
        }

        function getRooms(fnc){
            $.get('/rooms', function(response){
                fnc(response);
            });
        }

        function onWatch(fnc){
            onWatchFunction = fnc;
        }

        function send(capture_info){
            capture_info['room'] = room;
            socket.emit('send_image', capture_info);
        }

        initialize();
        return {
            socket: socket,
            send: send,
            onWatch: onWatch,
            getRooms: getRooms
        }
    }
})(Zepto);