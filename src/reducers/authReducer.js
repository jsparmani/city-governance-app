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
    routes: ["Settings"]
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {
        case LOGIN_USER:
            return {
                ...INITIAL_STATE,
                loading: true
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                token: action.payload,
                loading: false,
                error: "",
                isLoggedIn: true
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
                token: action.payload,
                isLoggedIn: true
            };
        default:
            return state;
    }
};
