(function($){
    Screenshots.Transport = function(url){
        var socket, onWatchFunction;
        
        function initialize(){
            socket = io.connect(url);

            socket.on('connect', function(msg) {
                console.log("connected");
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

        function onWatch(fnc){
            onWatchFunction = fnc;
        }

        function send(capture_info){
            socket.emit('send_image', capture_info);
        }

        initialize();
        return {
            socket: socket,
            send: send,
            onWatch: onWatch,
        }
    }
})(Zepto);