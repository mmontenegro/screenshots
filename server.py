from flask import Flask, request, Response
from flask.ext.socketio import SocketIO, emit, join_room, leave_room
import json, urllib2, os, base64

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route("/emit")
def emit_page():
    '''
    Example page used to capture what the user is doing
    '''
    return open('pages/emit.html').read()

@app.route("/")
def rooms_page():
    '''
    Example page used to capture what the user is doing
    '''
    return open('pages/rooms.html').read()

@app.route("/watch")
def watch_page():
    '''
    Page used to see what the user is doing
    '''
    return open('pages/watch.html').read()

@app.route("/rooms")
def rooms():
    return json.dumps([room for room in socketio.rooms['/test']])


@app.route('/<path:path>')
def static_proxy(path):
    '''
    static files
    '''
    return open(path).read()

@app.route('/proxy')
def images_proxy():
    '''
    static files
    '''
    url = request.args.get('url')
    result = urllib2.urlopen(url)
    info = result.info()
    callback = request.args.get('callback')

    callback += '(' +json.dumps("data:" + info['content-type'] + ";base64," + base64.b64encode( result.read()) )+ ');'
    return callback


@socketio.on('send_image', namespace='/test')
def send_image(capture_info):
    '''
    Receives an image and broadcast it to the "watch" method
    '''
    room = capture_info['room']
    emit('emit', {'data': capture_info}, room=room)

@socketio.on('connect', namespace='/test')
def test_connect():
    print('connected')
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected')

@socketio.on('join', namespace='/test')
def on_join(data):
    room = data['room']
    join_room(room)
    print('Has entered the room: ' + room)

@socketio.on('leave', namespace='/test')
def on_leave(data):
    room = data['room']
    leave_room(room)
    print('Has left the room: '+room)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')