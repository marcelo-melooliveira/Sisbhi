import React from 'react';
import { Button,View , ScrollView, Text, TextInput, Image, FlatList, ImageBackground } from 'react-native';
import {connect} from 'react-redux';
import {salva_indicadoresfinal} from '../actions/AutenticacaoActions';



class Pageinputs extends React.Component {

  static navigationOptions = {
    title: 'Alterar indicadores',
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
                  listaInput: [],
                  cidades:[],
                  refreshing: false,
    
    }
}

componentDidMount(){
    //console.log("Dentro do Inputs");
    this.setState({listaInput : this.props.navigation.state.params.indicadores_salvos});
    //console.log(this.state.listaInput);

}


alteravalor(id, valor){
  dadosalterados = this.state.listaInput;
  dadosalterados[id].valor = valor;
  this.setState({listaInput : dadosalterados});

  if(this.state.refreshing == true){
    this.setState({refreshing: false});
}else{
    this.setState({refreshing: true}); 
} 
}

salvar(){

  atualiza = this.props.dados_indicadores;
  posicao = this.props.navigation.state.params.posicaomudada;

  atualiza[posicao] = this.state.listaInput;

  this.props.salva_indicadoresfinal(atualiza);
  //console.log(this.props.dados_indicadores);
  
  
}


    render() {
      return (
       
<ImageBackground style={{ flex: 1, width: null}} source={require('../../res/backgroud1.png')}>

     
        <View style={{ flex: 5, width: null}}>

        <FlatList
          data={this.state.listaInput}
          keyExtractor={item => item.id}
          refreshing={this.state.refreshing}
          renderItem={item => (
            
              
              
              <View style={{paddingHorizontal:20, paddingTop:30, borderBottomWidth:7, borderColor:'#0002'}}>



                  <Text style={{marginLeft:10, fontWeight:'bold', fontSize:20}}>{item.item.name}</Text>
                  
                  
              <TextInput
          style={{height: 40}}
          keyboardType='phone-pad'
          value= {item.item.valor}
          onChangeText={text => this.alteravalor(item.item.id, text)}
          />
          <Text style={{alignSelf:'center', marginLeft:10}}>Fonte: {item.item.fonte}</Text>
        
        
              </View>

            

              

          )}
      />
      

        </View>

                      <View style={{ flex: 1, width: null, justifyContent:'center'}}>
              <Button
                      title={"Salvar"}
                      onPress={()=> {this.salvar(), this.props.navigation.navigate('EditarPage')}}
                      />   
              </View>
    

        </ImageBackground>

      );
    }
  }

  mapStateToProps = state =>(

    {
      dados_indicadores: state.AutenticacaoReducer.dados_indicadores
    }
  )
  

  export default connect(mapStateToProps ,{salva_indicadoresfinal})(Pageinputs)

