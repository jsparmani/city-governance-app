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

    axios
        .post("user/check-user/", {
            token: token
        })
        .then(res => {
            type = res.data.type;

            if (res.data.department) {
                dept_id = res.data.department_id;
            }

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: [`Token ${token}`, type, dept_id]
            });

            props.navigation.navigate("Home");
        });
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
        const raw_token = token.split(" ")[1];
        axios
            .post("user/check-user/", {
                token: raw_token
            })
            .then(res => {
                if (res.status === 200) {
                    type = res.data.type;

                    if (res.data.department) {
                        dept_id = res.data.department_id;
                    }
                    dispatch({
                        type: LOGIN_CHECK,
                        payload: [`${token}`, type, dept_id]
                    });

                    navigation.navigate("Home");
                } else {
                    alert("Not 200");
                }
            })
            .catch(err => {});
    }
};
