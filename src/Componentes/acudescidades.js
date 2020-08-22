import React from 'react';
import { Button, View, Text, Image, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, WebView } from 'react-native';
import { Header, Item, Input} from 'native-base';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import acudes from './reservatorio.json';
import Modal from "react-native-modal";
import _ from 'lodash';
//import MapView from 'react-native-maps';

//import {contatosUsuarioFetch} from '../actions/AppActions';



export default class Acudescidades extends React.Component {

    static navigationOptions = {
      title: 'Açudes',
      headerStyle: {
        backgroundColor: '#58FAD0',
      },
      drawerIcon: ({ tintColor }) => (
        <Icon name='tint' size={30} color='#00BFFF'/>
      ),
      
     
    }

    constructor(){
      super();
      this.arrayholder = [];
      this.state = {
          dadosLista:[],
          dadosNivelacudes:[],
          isModalVisible: 0,
          
          dados_acude:[],
          nome_acude: 'segunda tela', 
          nivelatual:0,
          volumeatual:0,
          status_nivel:0,
          lat:0,
          long:0

          
      }
  }


 


  componentDidMount(){
    const reservatorio =  require('./reservatorio.json');
    this.setState({ dadosLista: reservatorio });
    this.arrayholder = reservatorio; 
    //console.log("dados json");
    //console.log(acudes);
    
  }



_toggleModal = (cod) =>{
this.setState({ isModalVisible: 1 });
this.dadosdoacude(cod);
}

_toggleModal2 = () =>
this.setState({ isModalVisible: 0 });


terminar = () => {this.setState({ isModalVisible: 0 });}

  dadosdoacude(cod){

    

    axios.get(`http://api.funceme.br/rest/acude/reservatorio?paginator=false&cod=${cod}`)
    .then(response => { const acudedados = _.values(response.data);
     // this.setState({ isModalVisible: !this.state.isModalVisible });
      this.setState({ nome_acude: acudedados[0].nome, dados_acude: acudedados, status_reservatorios:1,lat:acudedados[0].latitude, long:acudedados[0].longitude });

      this.dadosnivelatual(cod); 
      
      
      /*
      if(this.state.status_nivel==0){
      this.dadosnivelatual(cod); }
      else{
        for(let i=0;i<this.state.dadosNivelacudes.length;i++){
          if(this.state.dadosNivelacudes[i].res_cod==cod){
            this.setState({nivelatual: nivelacudes[i].vol_percentual });
            console.log(this.state.dadosNivelacudes);
            console.log(i);
            console.log(cod);
            i=200;
          }
        }
        this.setState({isModalVisible: 2});
        
      }
*/
      
      //alert('dados obtidos!');      
}).catch(() => { alert('Erro ao recuperar os dados'); });}
  


dadosnivelatual(cod){

 

  axios.get(`http://api.funceme.br/rpc/acude/nivel/V1/nivelMaisRecente`)
  .then(response => { const nivelacudes = _.values(response.data);
    this.setState({ dadosNivelacudes:nivelacudes, status_nivel:1 });
    
   //console.log(nivelacudes.length);
    //console.log(this.state.dadosNivelacudes);
    for(let i=0;i<this.state.dadosNivelacudes.length;i++){
      if(this.state.dadosNivelacudes[i].res_cod==cod){
        let aux_volume = nivelacudes[i].vol_valor;
        //aux_volume = aux_volume.toLocaleString('pt-BR');
        
        this.setState({isModalVisible: 2,nivelatual: nivelacudes[i].vol_percentual, volumeatual: aux_volume});
        //console.log(this.state.dadosNivelacudes);
        //console.log(i);
        //console.log(cod);
        i=200;
      }
    }
}).catch(() => { alert('Erro ao recuperar os dados'); });

 
}

searchFilterFunction = text => {    
  const newData = this.arrayholder.filter(item => {      
    const itemData = `${item.nome.toUpperCase()}   
    ${item.municipio.toUpperCase()} `;
     const textData = text.toUpperCase();
      
     return itemData.indexOf(textData) > -1;    
  });    
  this.setState({ dadosLista: newData });  
};


render(){
  return (
    <ImageBackground style={{ flex: 1, width: null}} source={require('../../res/backgroud1.png')}>
    <View style={{width:'100%', height:50,flexDirection:'row', backgroundColor:'#f4511e', paddingLeft:10, paddingVertical:12}}>
    
      <Icon name='bars' size={30} color='white' onPress = {() => this.props.navigation.navigate('DrawerOpen')}/>
      <Text style={{fontSize:23, fontWeight:'bold', color:'#fff', paddingLeft:15}}>Açudes do Ceará</Text>    
    </View>


 <Header searchBar rounded style={{backgroundColor:'#f4511e'}}>
                  <Item>
                    <Icon name="search" size={20}/>
                    <Input 
                    placeholder="Digite o nome do açude ou cidade" 
                    onChangeText={text => this.searchFilterFunction(text)}    
                    />
                    
                  </Item>
                </Header>

      <FlatList
          data={this.state.dadosLista}
          keyExtractor={item => item.cod}
          renderItem={item => (
              <TouchableOpacity
                  onPress={() => {this._toggleModal(item.item.cod)}}
                  style={{width:'100%', height:70, flexDirection:'row', paddingHorizontal:20, borderBottomWidth:1, borderColor:'#0002'}}>
                  <Text style={{alignSelf:'center', marginLeft:10}}>Açude: {item.item.nome} - {item.item.municipio}</Text>
              </TouchableOpacity>
          )}
      />


              
<Modal style={{justifyContent:'center', alignItems:'center'}} isVisible={this.state.isModalVisible==1}>
                   <View style={{justifyContent:'center', alignItems:'center' ,width:'50%', height:'40%', padding:5,borderRadius:8, backgroundColor:'#F5F5F5'}}>
                         <ActivityIndicator size="large" color="dodgerblue" />
                         <Text> Buscando Informações</Text>
                         
                    </View>
                    <View style={{paddingTop:10}}><Button title={"Fechar"} onPress={this._toggleModal2} /></View>
              </Modal>


              <Modal style={{justifyContent:'center', alignItems:'center'}} isVisible={this.state.isModalVisible==2}>
                   <View style={{ alignItems:'center' ,width:'100%', height:'80%',padding:10,borderRadius:8, backgroundColor:'#F5F5F5'}}>
                   
                   <TouchableOpacity
                  onPress={() => {this.setState({ isModalVisible: 0 }), this.props.navigation.navigate('Mapaview', {lat: this.state.lat, long:this.state.long})}}>
                   <Image
          style={{width: 250, height: 250}}
          source={require('./mapa.png')}
        />
             </TouchableOpacity>     
                         
                         <Text>Nome do açude: {this.state.nome_acude}</Text>
                         <Text>Volume: {this.state.nivelatual} %</Text>
                         <Text>Volume: {this.state.volumeatual} hm³</Text>
                         <Text>Latitude: {this.state.lat}</Text>
                         <Text>Longitude: {this.state.long}</Text>
                         
                    </View>
                    <View style={{paddingTop:10}}><Button title={"Fechar"} onPress={this._toggleModal2} /></View>
              </Modal>


    
      </ImageBackground>
  )
}

}


/*
 <MapView style={{width:'50%', height:'50%'}}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />

  <Text>Nome do açude: {this.state.nome_acude}</Text>
                         <Text>Volume(%): {this.state.nivelatual} %</Text>
                         <Text>Volume(m³): {this.state.volumeatual} m³</Text>
*/