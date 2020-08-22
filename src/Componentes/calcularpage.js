import React from 'react';
import { Button,View , ScrollView, Text, TextInput, Image, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {modificaEmail} from '../actions/AutenticacaoActions';
import Icon from 'react-native-vector-icons/FontAwesome';




class Calcular extends React.Component {


  constructor(){
    super();

    this.state = { num1:'', 
    listaInput:[],
     valores:[],
     loading: true
    
    }
}


    

  

componentDidMount(){

   
    //requisção HTTPh
		axios.get('https://firebasestorage.googleapis.com/v0/b/pibiti-7d87c.appspot.com/o/imgs_bacias%2Fimgs_bacias2.html?alt=media&token=0bf1f84c-7476-4946-8370-2ca7843e99c4')
    .then(response => { this.setState({ listaInput: response.data, loading:false });
     })
    .catch(() => { console.log('Erro ao recuperar os dados'); });
}


    static navigationOptions = {
      title: 'Índices de sustentabilidade',
      headerStyle: {
      backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      drawerIcon: ({ tintColor }) => (
        <Icon name='envira' size={20} color='#00BFFF'/>
      ),

    }
    render() {

      if (this.state.loading) {
        return (
    
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size="large" color="dodgerblue" />
            <Text>Carregando Bacias hidrográficas</Text>
          </View>
        )
      }

      return (
        <ImageBackground style={{ flex: 1, width: null}} source={require('../../res/backgroud1.png')}>

   <View style={{width:'100%', height:50,flexDirection:'row', backgroundColor:'#f4511e', paddingLeft:10, paddingTop:12}}>
    
    <Icon name='bars' size={30} color='white' onPress = {() => this.props.navigation.navigate('DrawerOpen')}/>
    <Text style={{fontSize:23, fontWeight:'bold', color:'#fff', paddingLeft:15}}>Índices de Sustentabilidade</Text>
  
  </View>

        <View style={{flex:1}}>

      <View style={{ flex: 1 }}>
        <ScrollView>

        <FlatList
          data={this.state.listaInput}
          keyExtractor={item => item.id}
          renderItem={item => (
            <View style={{flex: 1}}>
              <View>
              <TouchableOpacity
                    onPress={() => {this.props.modificaEmail(item.item.id), this.props.navigation.navigate('Indicadorescheck')}}
                  style={{width:'100%', height:70, flexDirection:'row', paddingHorizontal:20, borderBottomWidth:1, borderColor:'#0002'}}>
                  <Image style={{alignSelf:'center', resizeMode:'cover', width:60, height:60, borderRadius:15}} source={{uri:item.item.pic}} />
                  <Text style={{alignSelf:'center', marginLeft:10}}>{item.item.name}</Text>
                  
                  
              </TouchableOpacity>
              </View>


              </View>

              

          )}
      />
      

        </ScrollView>
      </View>  

        </View>
        </ImageBackground>

      );
    }
  }

  const mapStateToProps = state => (
    {
        bacia: state.AutenticacaoReducer.bacia,
       
    }

)

export default connect(mapStateToProps, {modificaEmail})(Calcular);

 