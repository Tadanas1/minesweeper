import {actions} from "../actions";

export const DEFAULT_STATE = {
    map: [],
    size: 1,
    wsConnection: true,
    alive: true
}

export default (state = DEFAULT_STATE, action: any) => {
    switch (action.type) {
        case actions.SET_MAP:
            return {
                ...state,
                map: action.payload
            }
        case actions.SET_SIZE:
            return {
                ...state,
                size: action.payload
            }
        case actions.WS_UNSUBSCRIBE:
            return {
                ...state,
                wsConnection: false
            }
        case actions.SET_ALIVE:
            return {
                ...state,
                alive: action.payload
            }
        default:
            //console.log(action)
            return state;
    }
}
