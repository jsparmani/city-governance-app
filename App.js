import React, { Component } from 'react';
// import Home from './screens/Homescreen';
// import { AppLoading } from "expo";
// import * as Font from "expo-font";
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from 'redux';
// import { persistStore, autoRehydrate } from 'redux-persist';
// import { AsyncStorage, StyleSheet } from 'react-native';
// import Reducers from './src/reducers';

import Home from './screens/Homescreen/index';
import Expo, { AppLoading } from "expo";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import Reducers from './src/reducers/index';

import thunk from "redux-thunk";
// import { View } from 'native-base';
// import SettingScreen from './screens/SettingScreen';
// import Police from './screens/Department/Police';
// import Tourism from './screens/Department/Tourism';
// import Expo, { AppLoading } from "expo";

console.disableYellowBox = true;

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }


  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  
  
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (

      /*
      <View style={styles.screen}>
        {/* <Home /> */}
        {/* <SettingScreen /> */}
        {/* <Police /> */}
        <Tourism />
      </View> 
      */

      <Provider store={createStore(Reducers, applyMiddleware(thunk))}>
        <Home />
      </Provider >

    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  }
});
