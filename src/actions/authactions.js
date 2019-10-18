import {
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    LOGIN_CHECK
} from "./types";
import axios from "axios";
import {AsyncStorage} from "react-native";

axios.defaults.baseURL = "http://192.168.137.1:8000/api/";

export const loginUser = ({username, password}, props) => async dispatch => {
    console.log("Inside action");
    dispatch({type: LOGIN_USER});

    axios
        .post("user/token/", {
            username: username,
            password: password
        })
        .then(res => {
            loginUserSuccess(dispatch, res.data.token, props);
        })

        .catch(() => {
            loginUserFail(dispatch);
        });
};

const loginUserSuccess = async (dispatch, token, props) => {
    await AsyncStorage.setItem("auth_token", `Token ${token}`);

    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: token
    });

    props.navigation.navigate("Home");
};

const loginUserFail = dispatch => {
    dispatch({type: LOGIN_USER_FAIL});
};

export const logoutUser = navigation => async dispatch => {
    await AsyncStorage.removeItem("auth_token");
    dispatch({type: LOGOUT_USER});
    navigation.navigate("Login");
};

export const loginCheck = navigation => async dispatch => {
    token = await AsyncStorage.getItem("auth_token");
    if (token) {
        dispatch({
            type: LOGIN_CHECK,
            payload: `Token ${token}`
        });

        navigation.navigate("Home");
    }
};
