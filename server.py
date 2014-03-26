from flask import Flask
from flask.ext.socketio import SocketIO, emit
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/")
def emit_page():
    '''
    Example page used to capture what the user is doing
    '''
    return open('emit.html').read()

@app.route("/watch")
def watch_page():
    '''
    Page used to see what the user is doing
    '''
    return open('watch.html').read()

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
    emit('emit', {'data': capture_info}, broadcast=True)

@socketio.on('connect', namespace='/test')
def test_connect():
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app)