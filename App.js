import React, { Component } from 'react';
import Home from './screens/Homescreen/index';
import Expo, { AppLoading } from "expo";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import Reducers from './src/reducers/index';
import thunk from "redux-thunk";

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
      <Provider store={createStore(Reducers, applyMiddleware(thunk))}>
        <Home />
      </Provider >
    );
  }
}
