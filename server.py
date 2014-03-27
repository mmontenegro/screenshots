from flask import Flask
from flask.ext.socketio import SocketIO, emit, join_room, leave_room
import json
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

app.rooms = []

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
    return json.dumps(app.rooms)


@app.route('/<path:path>')
def static_proxy(path):
    '''
    static files
    '''
    return open(path).read()


@socketio.on('send_image', namespace='/test')
def send_image(capture_info):
    '''
    Receives an image and broadcast it to the "watch" method
    '''
    room = capture_info['room']
    emit('emit', {'data': capture_info}, broadcast=True, room=room)

@socketio.on('connect', namespace='/test')
def test_connect():
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected')

@socketio.on('join')
def on_join(data):
    room = data['room']
    rooms.append(room)
    send(username + ' has entered the room.', room=room)

@socketio.on('leave')
def on_leave(data):
    room = data['room']
    send(username + ' has left the room.', room=room)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')