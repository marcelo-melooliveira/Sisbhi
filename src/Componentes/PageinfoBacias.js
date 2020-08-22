import React from 'react';
import { Button, View, Text, Image, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, WebView } from 'react-native';
//import axios from 'axios';
//import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import { StackNavigator, DrawerNavigator } from 'react-navigation'; // Version can be specified in package.json
//import {contatosUsuarioFetch} from '../actions/AppActions';
import Modal from "react-native-modal";



 export default class Pageinfo extends React.Component {

    static navigationOptions = {
      title: 'Informações',
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
          dadosLista:[],
          loading: 1,
          site: ""
      }
  }
 
 
  

  componentDidMount(){
    this.setState({site: this.props.navigation.state.params.site})
        
}




  
render(){ 
     return(
    <View style={{ flex: 1, width: null}}>

<Modal style={{justifyContent:'center', alignItems:'center'}} isVisible={this.state.loading==1}>
                   <View style={{justifyContent:'center', alignItems:'center' ,width:'50%', height:'40%', padding:5,borderRadius:8, backgroundColor:'#F5F5F5'}}>
                         <Text>Aguarde</Text>
                         <Text>Carregando Página</Text>
                         
                    </View>
              </Modal>

      <WebView
      scalesPageToFit
        source={{uri: this.state.site}}
        //onLoadStart={()=>{ this.setState({ loading: true });}}
        onLoad={()=>{ this.setState({ loading: 0 });}}
      />
      </View>
    
  )
}

}




/*
source={{uri: this.state.site}}
mapStateToProps = state => {
  const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
      return { ...val, uid }
  })
  return { contatos }
}
export default connect(mapStateToProps, { contatosUsuarioFetch })(Pageinfo);




    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Page 1</Text>
          <Button
            title="ir para detail"
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          />
        </View>
      );
    }
  }

  const homestack = StackNavigator({

    Home: { screen: HomeScreen },
    Details: {screen: DetailsScreen},


  });

  export default homestack
  */