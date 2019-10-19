import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER,
    LOGIN_CHECK
} from "../actions/types";

const INITIAL_STATE = {
    type: "",
    token: null,
    username: "",
    error: "",
    loading: false,
    isLoggedIn: false,
    routes: ["Settings", "Complaints"],
    dept_id: null,
    user_type: "",
    user_id: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...INITIAL_STATE,
                loading: true
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                token: action.payload[0],
                user_type: action.payload[1],
                dept_id: action.payload[2],
                loading: false,
                error: "",
                isLoggedIn: true,
                user_id: action.payload[3]
            };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                error: "Authentication Error!",
                loading: false
            };
        case LOGOUT_USER:
            return {
                ...INITIAL_STATE
            };
        case LOGIN_CHECK:
            return {
                ...state,
                token: action.payload[0],
                user_type: action.payload[1],
                dept_id: action.payload[2],
                isLoggedIn: true,
                user_id: action.payload[3]
            };
        default:
            return state;
    }
};
