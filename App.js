import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
//import { Button, View, Text } from 'react-native';
//import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import {RootStack, Menuhamb} from './src/routes';
import reducers from './src/reducers/index';




export default class App extends Component {

  componentDidMount(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBHs-gSdeiImBIgqe_nEYBJOp693CkSWZk",
    authDomain: "pibiti-7d87c.firebaseapp.com",
    databaseURL: "https://pibiti-7d87c.firebaseio.com",
    projectId: "pibiti-7d87c",
    storageBucket: "pibiti-7d87c.appspot.com",
    messagingSenderId: "351814136139"
  };
  firebase.initializeApp(config);
}



  render() {
    
    return(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
      
      <Menuhamb />
      </Provider>
    
    );
  }
}