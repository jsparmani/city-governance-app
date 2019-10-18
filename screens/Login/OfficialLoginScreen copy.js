import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Platform, StatusBar, Text, Image, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { Button, Item } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";

class LoginScren extends Component {

  static navigationOptions = {
    drawerLockMode: 'locked-closed'
  }

  state = {
    isLoading: true,
    visibility: true,
    passIcon: 'md-eye-off'
  }


  renderNotch = () => {
    if (Platform.OS === "android") {
      return (
        <View style={styles.notch} />
      )
    }
  }

  viewPassword = () => {
    if (this.state.visibility)
      this.setState({
        visibility: false,
        passIcon: 'md-eye'
      })
    else
      this.setState({
        visibility: true,
        passIcon: 'md-eye-off'
      })
  }

  renderButton = () => {
    if (!this.props.loading) {
      return (
        <View
          style={{ margin: 10, marginTop: 10, padding: 5, backgroundColor: '#72efef', alignItems: 'center', alignContent: 'center' }}
        >
          <TouchableWithoutFeedback
            onPress={() => { this.loginpress() }}
          >
            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: '600' }}>  LOGIN </Text>
          </TouchableWithoutFeedback>
        </View>
      )
    }
    else {
      return (
        <AnimatedLoader
          visible
          //source={require("../assets/192-swipe-right-indicator.json")}
          animationStyle={{ width: 100, height: 100, marginTop: 100 }}
          speed={1}
        />
      )
    }
  }
  renderButton2 = () => {
    if (!this.props.loading) {
      return (
        <View
          style={{ margin: 10, marginTop: 10, padding: 5, backgroundColor: '#72efef', alignItems: 'center', alignContent: 'center' }}
        >
          <TouchableWithoutFeedback
            onPress={() => { this.loginpress() }}
          >
            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: '600' }}>  Sign Up </Text>
          </TouchableWithoutFeedback>
        </View>
      )
    }
    else {
      return (
        <AnimatedLoader
          visible
          //source={require("../assets/192-swipe-right-indicator.json")}
          animationStyle={{ width: 100, height: 100, marginTop: 100 }}
          speed={1}
        />
      )
    }
  }

  render() {

    return (
      <TouchableWithoutFeedback style={styles.container}
        onPress={Keyboard.dismiss}>

        <LinearGradient
          colors={['#bdc3c7', '#2c3e50']}
          style={{ flex: 1 }}
        >
          {this.renderNotch()}
          <View style={styles.login}>
            <Image
              source={{ uri: 'http://ccmspb.gov.in/images/logo.png' }}

              style={{
                height: 200,
                width: "50%",
                resizeMode: 'contain',
                justifyContent: 'center',
                alignSelf: 'center'
              }}
            />
            <TextInput
              placeholder="   email id"
              style={styles.textinput}
              value={this.props.email}
              //onChangeText={(text) => { this.props.onEmailChange(text) }}
              autoCapitalize='none'
              autoCorrect={false}
            />
            <Item >
              <TextInput
                placeholder="  Password"
                style={styles.textinput}
                value={this.props.password}
                //onChangeText={(text) => this.props.onPasswordChange(text)}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={this.state.visibility}
              />
              <Ionicons name={this.state.passIcon} size={30} style={{ color: 'black', position: 'relative', marginRight: 20, marginLeft: 'auto' }} onPress={() => this.viewPassword()} />
            </Item>

            <Text style={{ fontSize: 16, color: "yellow", marginLeft: 'auto', marginRight: 'auto' }}> {this.props.error} </Text>
            {this.renderButton2()}
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32, 53, 70)',
    alignContent: 'center',
    justifyContent: 'center'
  },
  notch: {
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight
  },
  login: {
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 80
  },
  textinput: {
    borderWidth: 2,
    borderRadius: 3,
    margin: 10,
    padding: 6,
    width: '94%',
    backgroundColor: '#ffffff',
    fontSize: 17
  },
  lottie: {
    width: 100,
    height: 100
  }
})


const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    user: state.auth.user
  }
}


export default LoginScren;