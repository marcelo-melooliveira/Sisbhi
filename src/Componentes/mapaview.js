import React from 'react';
import { Button, View, Text, Image, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, WebView } from 'react-native';
//import axios from 'axios';
//import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import { StackNavigator, DrawerNavigator } from 'react-navigation'; // Version can be specified in package.json
//import {contatosUsuarioFetch} from '../actions/AppActions';



 export default class Pageinfo extends React.Component {

    static navigationOptions = {
      title: 'Local do açude',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        }
    }

    constructor(){
      super();

      this.state = {
          
          loading: true,
          site: "",
          lat:0,
          long:0
      }
  }
 
 
  

  componentDidMount(){
      aux1=this.props.navigation.state.params.lat;
      aux2=this.props.navigation.state.params.long;
      aux3 = `https://www.google.com.br/maps/@${aux1},${aux2},5791m/data=!3m1!1e3`;
      this.setState({site: aux3});
    this.setState({loading:false});
  
      
}


  

  
render(){
    if (this.state.loading) {
        return (
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}} >
            <ActivityIndicator size="large" color="dodgerblue" />
          </View>
        )
      }
      
    
  return(
    <View style={{ flex: 1, width: null}}>
      <WebView
      
        source={{uri: this.state.site}}
        
      />
      </View>
    
  )
}

}

