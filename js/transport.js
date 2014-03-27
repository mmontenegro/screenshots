(function($){
    Screenshots.Transport = function(url, room){
        var socket, onWatchFunction;
        
        function initialize(){
            socket = io.connect(url);

            socket.on('connect', function(msg) {
                 socket.emit('join room', {room: room});
                 socket.on('disconnect', function(msg) {
                    console.log("desconnected");
                });
            });

            socket.on('emit', function(msg) {
                if(onWatchFunction){
                    onWatchFunction(msg);
                }
            });
        }

        function getRooms(){
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