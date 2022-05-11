import {take, put, call, cancelled, cancel, takeLatest, takeLeading} from "redux-saga/effects";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

export const actions = {
    SET_MAP: "SET_MAP",
    SET_SIZE: "SET_SIZE",
    SET_ALIVE: "SET_ALIVE",
    NEW_GAME: "NEW_GAME",
    OPEN_CELL: "OPEN_CELL",
    WS_UNSUBSCRIBE: "WS_UNSUBSCRIBE",
    WS_SEND_MESSAGE: "WS_SEND_MESSAGE"
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators({openCell, newGame, setSize}, dispatch);
};

const openCell = (index1: number, index2: number) => (dispatch: any) =>  {
    console.log(`openCellDispatch`)
    dispatch({
        type: actions.OPEN_CELL,
        payload: `open ${index1} ${index2}`
    });
};

const newGame = (size: number = 1) => (dispatch: any) => {
      dispatch({
          type: actions.NEW_GAME,
          payload: `new ${size}`
      });
};

const setSize = (size: number) => (dispatch: any) =>  {
    dispatch({
        type: actions.SET_SIZE,
        payload: size
    });
};

export function* openCellWatcher(socket: any) {
    yield takeLeading(actions.OPEN_CELL, openCellGenerator, socket);
}

function* openCellGenerator(channel: any, {payload}: any): Generator {
    //console.log(`from openCellGenerator, ${payload}`);
    yield call([channel, 'send'], payload);
    yield cancel();
}

export function* newGameWatcher(socket: any) {
    yield takeLeading(actions.NEW_GAME, newGameGenerator, socket);
}

function* newGameGenerator(channel: any, {payload}: any): Generator {
    //console.log(`from newGameGenerator, ${payload}`);
    yield call([channel, 'send'], payload);
    yield cancel();
}