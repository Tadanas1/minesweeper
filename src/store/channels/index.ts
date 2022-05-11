import {eventChannel} from "redux-saga";
import {actions, newGameWatcher, openCellWatcher} from "../actions";
import {take, put, call, fork, takeLeading, takeEvery, takeLatest, all, cancel} from 'redux-saga/effects';

//need to move into .env
const wsUrl = `wss://hometask.eg1236.com/game1/`;

function createWebSocketConnection() {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(wsUrl);
        socket.onopen = function() {
            socket.send(`new 1`);
            resolve(socket);
        };
        socket.onerror = function(evt) {
            reject(evt);
        };
    });
}

function createSocketChannel(socket: any) {
    return eventChannel(emitter => {
        socket.onmessage = (e: any) => {
            //console.log(e);
            const msg = e.data;
            if (msg) {
                const msgs = msg.split(':');
                switch (msgs[0]) {
                    case 'map':
                        const linesArray = msg.slice(5, msg.length - 1).split('\n');
                        const result = linesArray.map((line: string) => line.split(''));
                        return emitter({ type: actions.SET_MAP, payload: result });
                    case 'new':
                        emitter({ type: actions.SET_ALIVE, payload: true });
                        socket.send(`map`);
                        break;
                    case 'open':
                        if (msgs[1] === ' OK') {
                            return socket.send(`map`);
                        } else {
                            return emitter({ type: actions.SET_ALIVE, payload: false });
                        }
                    default:
                    // nothing to do
                }
            }
        };
        return () => {
            socket.close();
            return emitter({type: actions.WS_UNSUBSCRIBE});
        };
    });
}


export function* wsSagas(): Generator {
    const socket = yield call(createWebSocketConnection);
    const socketChannel: any = yield call(createSocketChannel, socket);
    while (true) {
        const action: any = yield take(socketChannel);
        yield put(action);
        yield fork(openCellWatcher, socket);
        yield fork(newGameWatcher, socket);
    }
}

export function* rootSaga() {
    yield all([
        wsSagas(),
    ]);
}