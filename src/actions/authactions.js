import {
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    LOGIN_CHECK
} from "./types";
import axios from "axios";
import { AsyncStorage } from "react-native";
import { Toast } from "native-base";

axios.defaults.baseURL = "https://citygovernance.pythonanywhere.com/api/";

export const loginUser = ({ username, password }, props) => async dispatch => {
    dispatch({ type: LOGIN_USER });

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

            let dept_id = null;

            if (type !== "citizen") {
                dept_id = res.data.department_id;
            }

            routes = [];

            if (type === "citizen") {
                routes = [
                    "HomeMain",
                    "Complaints",
                    "PayBill",
                    "Downloads",
                    "Departments",
                    "New_Connection",
                    "Settings"
                ];
            } else if (type === "department") {
                routes = ["HomeMain", "Add_Scheme", "Department_Schemes", "View_Complaints", "Settings"];
            } else if (type === "superuser") {
                routes = ["HomeMain", "AddDepartment", "Settings"];
            }

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: [`Token ${token}`, type, dept_id, res.data.id, routes]
            });

            Toast.show({
                text: "Successfully Logged In!",
                buttonText: "Okay",
                type: "success"
            });

            props.navigation.navigate("HomeMain");
        });
};

const loginUserFail = dispatch => {
    dispatch({ type: LOGIN_USER_FAIL });
};

export const logoutUser = navigation => async dispatch => {
    await AsyncStorage.removeItem("auth_token");

    dispatch({ type: LOGOUT_USER });

    Toast.show({
        text: "Successfully Logged Out!",
        buttonText: "Okay",
        type: "success"
    });
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

                    let dept_id = null;
                    if (type !== "citizen") {
                        dept_id = res.data.department_id;
                    }

                    routes = [];

                    if (type === "citizen") {
                        routes = [
                            "HomeMain",
                            "Complaints",
                            "PayBill",
                            "Downloads",
                            "Departments",
                            "New_Connection",
                            "Settings"
                        ];
                    } else if (type === "department") {
                        routes = ["HomeMain", "Add_Scheme", "Department_Schemes", "View_Complaints", "Settings"];
                    } else if (type === "superuser") {
                        routes = ["HomeMain", "AddDepartment", "Settings"];
                    }

                    dispatch({
                        type: LOGIN_CHECK,
                        payload: [
                            `${token}`,
                            type,
                            dept_id,
                            res.data.id,
                            routes
                        ]
                    });

                    navigation.navigate("HomeMain");
                    Toast.show({
                        text: "Successfully Logged In!",
                        buttonText: "Okay",
                        type: "success"
                    });
                } else {
                    alert("Not 200");
                }
            })
            .catch(err => { });
    }
};
