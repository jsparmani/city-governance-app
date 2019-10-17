import React, { Component } from 'react';
import Home from './screens/Homescreen';
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import Reducers from './src/Reducers';
import thunk from "redux-thunk";

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

    store = createStore(Reducers,
      {},
      compose(
        applyMiddleware(thunk),
        autoRehydrate)
    );

    persistStore(store, { storage: AsyncStorage, whitelist: ['token'] })

    return (
      <Provider store>
        <Home />
      </Provider >
    );
  }
}
