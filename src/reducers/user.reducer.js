import { userConstants } from "../actions/constants"

const intiState = {
    users: [],
    speeches: []
}

export default (state = intiState, action) => {
    switch(action.type){
        case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
            break;
        case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
            state = {
                ...state,
                users: action.payload.users
            }
            break;
        case userConstants.GET_REALTIME_MESSAGES:
                state = {
                    ...state,
                    speeches: action.payload.speeches
                }
                break;
        // case `${userConstants.GET_REALTIME_MESSAGES}_FAILURE`:
        //             state = {
        //                 ...state,
        //                 speeches: []
        //             }
        //             break;
}
return state;
}