
export const Login = ({ email, password }, props) => {

    return dispatch => {

        dispatch({
            type: "LOGIN_USER",
            email: email
        })


    }
}


onLoginSuccess = (dispatch, user, props, token) => {

    dispatch({
        type: "LOGIN_SUCCESS",
        fname: snapshot.val().fname,
        lname: snapshot.val().lname,
        typee: 'admin',
        token: token
    })

}

export const onLogout = (props) => {

    return dispatch => {

       
                props.navigation.navigate('Login')
                dispatch({
                    type: "LOGOUT_USER"
                })
}

}