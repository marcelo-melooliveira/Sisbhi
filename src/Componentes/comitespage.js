import React from 'react';
import { Button, View, Text, Image, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

//import {contatosUsuarioFetch} from '../actions/AppActions';



export default class Comites extends React.Component {

    static navigationOptions = {
      title: 'Comitês de bacias',    
      drawerIcon: ({ tintColor }) => (
        <Icon name='users' size={20} color='#00BFFF'/>
      ),
    }

    constructor(){
      super();

      this.state = {
          dadosLista:[],
          loading: true
      }
  }


  componentDidMount(){
    
    var refdados = firebase.database().ref(`/Comites/Dadoscomites`);
    refdados.once('value', (snapshot) =>{
      this.setState({ dadosLista: snapshot.val(), loading:false });
       
     
    });

}


render(){

  if (this.state.loading) {
    return (

      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" color="dodgerblue" />
        <Text>Buscando Comitês de Bacias</Text>
      </View>
    )
  }


  return (
    <ImageBackground style={{ flex: 1, width: null}} source={require('../../res/backgroud1.png')}>
    <View style={{width:'100%', height:50,flexDirection:'row', backgroundColor:'#f4511e', paddingLeft:10, paddingVertical:12}}>
    
      <Icon name='bars' size={30} color='white' onPress = {() => this.props.navigation.navigate('DrawerOpen')}/>
      <Text style={{fontSize:23, fontWeight:'bold', color:'#fff', paddingLeft:15}}>Comitês de bacias</Text>
    
    </View>
      <FlatList
          data={this.state.dadosLista}
          keyExtractor={item => item.id}
          renderItem={item => (
              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Pageinfo', {site: item.item.site})}
                  style={{width:'100%', height:70, flexDirection:'row', paddingHorizontal:20, borderBottomWidth:1, borderColor:'#0002'}}>
                  <Image style={{alignSelf:'center', resizeMode:'stretch', width:85, height:60, borderRadius:5}} source={{uri:item.item.pic}} />
                  <Text style={{alignSelf:'center', marginLeft:10}}>{item.item.name}</Text>
              </TouchableOpacity>
          )}
      />
      </ImageBackground>
  )
}

}


