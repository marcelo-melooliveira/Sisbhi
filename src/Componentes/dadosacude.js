import React from 'react';
import { Button, View, Text, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
//import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";


//import {contatosUsuarioFetch} from '../actions/AppActions';



export default class Acudescidades extends React.Component {

    static navigationOptions = {
      title: 'Açudes',
      header: null,
    }
    
    

    constructor(){
      super();

      this.state = {
        isModalVisible: false
      }
  }


  componentDidMount(){
    
  }
  _toggleModal = () =>
  this.setState({ isModalVisible: !this.state.isModalVisible });

render(){
  return (
    <ImageBackground style={{ flex: 1, width: null}} source={require('../../res/backgroud1.png')}>
    <View style={{width:'100%', height:50,flexDirection:'row', backgroundColor:'#f4511e', paddingLeft:10, paddingVertical:12}}>
    
      <Icon name='bars' size={30} color='white' onPress = {() => null}/>
      <Text style={{fontSize:23, fontWeight:'bold', color:'#fff', paddingLeft:15}}>Nível do açude</Text>
    
    </View>


 <Button
                      title={"Exibir"}
                      onPress={this._toggleModal}
                      />
    <TouchableOpacity  onPress={this._toggleModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        <Modal style={{justifyContent:'center', alignItems:'center'}} isVisible={this.state.isModalVisible}>

          <View style={{justifyContent:'center', alignItems:'center' ,width:'100%', height:'100%', backgroundColor:'#DCDCDC'}}>
            <Text>Hello!</Text>

            <Button
                      title={"Exibir"}
                      onPress={this._toggleModal}
                      />
            
          </View>
        </Modal>
      
      </ImageBackground>
  )
}

}


