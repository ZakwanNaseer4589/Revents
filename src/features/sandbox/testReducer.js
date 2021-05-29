import { toast } from "react-toastify";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../../app/async/asyncReducer"
import { delay } from "../../app/common/util/util";

const INCREMENT_OPERATOR = 'INCREMENT_OPERATOR'
const DECREMENT_OPERATOR = 'DECREMENT_OPERATOR'

export function increment(amount){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            dispatch({type: INCREMENT_OPERATOR, payload: amount});
            dispatch(asyncActionFinish());
        } catch(error){
            dispatch(asyncActionError(error))
        }
    }
}

export function decrement(amount){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            throw 'oops'
            dispatch({type: DECREMENT_OPERATOR, payload: amount});
            dispatch(asyncActionFinish());
        } catch(error){
            dispatch(asyncActionError(error));
            toast.error(error);
        }
    }
}


const initialState = {
    data:45
}

export default function testReducer(state = initialState, action) {
    switch (action.type){
        case INCREMENT_OPERATOR:
            return{
                ...state,
                data: state.data + action.payload ,
            };
        case DECREMENT_OPERATOR:
            return{
                ...state,
                data: state.data - action.payload ,
            };
        default:
            return state;
    }
}   