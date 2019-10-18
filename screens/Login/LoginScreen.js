import React, { Component } from "react";
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
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Button, Item } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { loginUser, loginCheck } from "../../src/actions";

class LoginScreen extends Component {
  // static navigationOptions = {
  //   drawerLockMode: "locked-closed"
  // };


  async componentWillMount() {
    this.props.loginCheck(this.props.navigation);
    // AsyncStorage.clear();
  }

  state = {
    isLoading: true,
    visibility: true,
    passIcon: "md-eye-off",
    username: "",
    password: ""
  };

  renderNotch = () => {
    if (Platform.OS === "android") {
      return <View style={styles.notch} />;
    }
  };

  loginPress = async () => {
    this.props.loginUser(
      { username: this.state.username, password: this.state.password },
      this.props
    );
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
            LOGIN{" "}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <ActivityIndicator
          style={{ width: 100, height: 100, marginTop: 100 }}
        />
      );
    }
  };

  renderLogin = () => {

    return (
      <View style={styles.login}>
        <Image
          source={{ uri: "http://ccmspb.gov.in/images/logo.png" }}
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
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Item>
          <TextInput
            placeholder="  Password"
            style={styles.textinput}
            value={this.state.password}
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            autoCorrect={false}
            secureTextEntry={this.state.visibility}
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
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate('SignUpScreen')
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "300",
              color: "white"
            }}
          >
            {" "}
            Not Registered ? Sign Up{" "}
          </Text>
        </TouchableWithoutFeedback>
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
          style={{ flex: 1 }}
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
  { loginUser, loginCheck }
)(LoginScreen);
