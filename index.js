import React from 'react';
import { AppRegistry, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import Router from './src/routes';
import { name as appName } from './app.json';


const store = configureStore()

const NYTimes = () => (
  <Provider store={store}>
    <SafeAreaView style={{flex: 1, backgroundColor: '#2089DC'}}>
      <Router />
    </SafeAreaView>
  </Provider>
)

AppRegistry.registerComponent(appName, () => NYTimes);

