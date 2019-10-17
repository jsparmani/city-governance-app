import { REHYDRATE } from "redux-persist/es/constants";

const INITIAL_STATE = {
    email: '',
    password: '',
    fname: '',
    lname: '',
    type: '',
    token: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REHYDRATE:
            return action.payload.token || [];
        case "LOGOUT_USER":
            return { ...INITIAL_STATE };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                lname: action.lname,
                fname: action.fname,
                typee: action.typee,
                user: action.data,
                token: action.token
            }
        case "LOGIN_USER":
            return {
                ...state,
                email: action.email
            };



    }
}