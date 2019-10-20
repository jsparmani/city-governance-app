import React, {Component} from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Platform,
    StatusBar,
    Text,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import {Button, Item, Toast} from "native-base";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import {connect} from "react-redux";
import {loginUser, loginCheck} from "../../src/actions";
import axios from "axios";

axios.defaults.baseURL = "https://citygovernance.pythonanywhere.com/api/";

class LoginScreen extends Component {
    static navigationOptions = {
        drawerLockMode: "locked-closed"
    };

    async componentWillMount() {
        this.props.loginCheck(this.props.navigation);
        axios.defaults.headers.common["Authorization"] = this.props.token;
    }

    state = {
        isLoading: true,
        visibility: true,
        passIcon: "md-eye-off",
        username: "",
        password: "",
        email: ""
    };

    renderNotch = () => {
        if (Platform.OS === "android") {
            return <View style={styles.notch} />;
        }
    };

    loginPress = () => {
        const {username, password, email} = this.state;

        axios
            .post("user/create/", {
                username,
                password,
                email
            })
            .then(res => {
                if (res.status === 201) {
                    axios
                        .post("user/citizen-users/", {
                            user: res.data.id
                        })
                        .then(res => {
                            Toast.show({
                                text: "User Successfully Created!"
                            });
                            this.props.navigation.navigate("LoginScreen");
                        })
                        .catch(() => {
                            alert("Error");
                        });
                }
            })
            .catch(() => {
                alert("Error");
            });
    };

    viewPassword = () => {
        if (this.state.visibility)
            this.setState({
                visibility: false,
                passIcon: "md-eye"
            });
        else
            this.setState({
                visibility: true,
                passIcon: "md-eye-off"
            });
    };

    renderButton = () => {
        if (!this.props.loading) {
            return (
                <TouchableOpacity
                    style={{
                        margin: 10,
                        marginTop: 10,
                        padding: 5,
                        backgroundColor: "#72efef",
                        alignItems: "center",
                        alignContent: "center"
                    }}
                    onPress={() => {
                        this.loginPress();
                    }}
                >
                    <Text
                        style={{
                            alignSelf: "center",
                            fontSize: 25,
                            fontWeight: "600"
                        }}
                    >
                        {" "}
                        SIGN UP{" "}
                    </Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <ActivityIndicator
                    style={{width: 100, height: 100, marginTop: 20}}
                    size={20}
                />
            );
        }
    };

    renderLogin = () => {
        return (
            <View style={styles.login2}>
                <Image
                    source={{uri: "http://ccmspb.gov.in/images/logo.png"}}
                    style={{
                        height: 200,
                        width: "50%",
                        resizeMode: "contain",
                        justifyContent: "center",
                        alignSelf: "center"
                    }}
                />
                <TextInput
                    placeholder="   Username"
                    style={styles.textinput}
                    value={this.props.email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={username => this.setState({username})}
                />
                <TextInput
                    placeholder="   Email"
                    style={styles.textinput}
                    value={this.props.email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={email => this.setState({email})}
                />

                <Item>
                    <TextInput
                        placeholder="  Password"
                        style={styles.textinput}
                        value={this.props.password}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={this.state.visibility}
                        onChangeText={password => this.setState({password})}
                    />
                    <Ionicons
                        name={this.state.passIcon}
                        size={30}
                        style={{
                            color: "black",
                            position: "relative",
                            marginRight: 20,
                            marginLeft: "auto"
                        }}
                        onPress={() => this.viewPassword()}
                    />
                </Item>

                <Text
                    style={{
                        fontSize: 16,
                        color: "yellow",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    {" "}
                    {this.props.error}{" "}
                </Text>
                {this.renderButton()}
            </View>
        );
    };

    render() {
        return (
            <TouchableWithoutFeedback
                style={styles.container}
                onPress={Keyboard.dismiss}
            >
                <LinearGradient
                    colors={["#bdc3c7", "#2c3e50"]}
                    style={{flex: 1}}
                >
                    {this.renderNotch()}
                    {this.renderLogin()}
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(32, 53, 70)",
        alignContent: "center",
        justifyContent: "center"
    },
    notch: {
        backgroundColor: "#000",
        paddingTop: StatusBar.currentHeight
    },
    login: {
        alignContent: "center",
        justifyContent: "center",
        marginTop: 80
    },
    login2: {
        alignContent: "center",
        justifyContent: "center",
        marginTop: 80
    },
    textinput: {
        borderWidth: 2,
        borderRadius: 3,
        margin: 10,
        padding: 6,
        width: "94%",
        backgroundColor: "#ffffff",
        fontSize: 17
    },
    lottie: {
        width: 100,
        height: 100
    }
});

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        token: state.auth.token
    };
};

export default connect(
    mapStateToProps,
    {loginUser, loginCheck}
)(LoginScreen);
