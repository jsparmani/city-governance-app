import React, { Component } from 'react';
import { View, StatusBar, Image, StyleSheet, TextInput } from 'react-native';
import { Item } from 'native-base';
import { Ionicons } from "@expo/vector-icons";

export default class OfficialLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
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

  render() {
    return (
      <View
        style={{ marginTop: StatusBar.currentHeight, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', flex: 1 }}
      >
        <Image
          source={{ uri: 'https://cdn.s3waas.gov.in/s38cb22bdd0b7ba1ab13d742e22eed8da2/uploads/2019/05/2019052938.jpg' }}
          style={{
            height: 200,
            width: "50%",
            resizeMode: 'contain',
            justifyContent: 'center',
            alignSelf: 'center'
          }}
        />
        {/* <TextInput
          style={Styles.Input}
          placeholder={'USERNAME'}
        />
        <TextInput
          style={Styles.Input}
          placeholder={'PASSWORD'}
          secureTextEntry={this.state.visible}
        /> */}
        <TextInput
          placeholder="   email id"
          style={styles.textinput}
          value={this.props.email}
          //onChangeText={(text) => { this.props.onEmailChange(text) }}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <View style={{ width: '100%' , flexDirection:'row'}}>
          <TextInput
            placeholder="  Password"
            style={styles.textinput}
            value={this.props.password}
            // onChangeText={(text) => this.props.onPasswordChange(text)}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={this.state.visibility}
          />
          <Ionicons name={this.state.passIcon} size={30} style={{ color: 'black', position: 'relative', marginRight: 20, marginLeft: 'auto' }} onPress={() => this.viewPassword()} />
        </View>

      </View>
    );
  }
}

styles = StyleSheet.create({
  textinput: {
    borderWidth: 2,
    borderRadius: 3,
    margin: 10,
    padding: 6,
    width: '94%',
    backgroundColor: '#ffffff',
    fontSize: 17
  },
})
