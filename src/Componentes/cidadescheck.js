import React from 'react';
import {View, Text, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, CheckBox, Button } from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {salvacidades, salva_dadoscidades} from '../actions/AutenticacaoActions';



class cidadescheck extends React.Component {
    static navigationOptions = {
        title: 'Escolher cidades',
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
            loading: true,
            refreshing: false,
            salvacheck:[],
            dados_indicadores: [ [],
                                []
                                ]
        }
    }

    componentDidMount(){
        //this.salvarid();
        //alert(this.props.navigation.state.params.bacia);
        //requisção HTTPh
            //this.props.contatosUsuarioFetch();
          var refdados = firebase.database().ref(`/Comites/Bacias/${this.props.bacia}/Cidades`);
          refdados.once('value', (snapshot) =>{


            this.setState({ dadosLista: snapshot.val() });
            this.setState({loading: false});
            //console.log(this.state.dadosLista);
    
            
           
          });          
    }


    //console.log(this.props.navigation.state.params.bacia);


  


mudavalor(id){
    
    let mudadados1 = this.state.dadosLista;

        if(mudadados1[id].check == true){
            mudadados1[id].check= false; 
        }else{
            mudadados1[id].check= true;  
        }       
        this.setState({dadosLista : mudadados1});

        if(this.state.refreshing == true){
            this.setState({refreshing: false});
        }else{
            this.setState({refreshing: true}); 
        } 
}

        salvacheck(){
            let percorre = this.state.dadosLista;
            let salva = this.state.salvacheck;
            let salva2 = [];
            
            
            let i=0;
            let j=0;
            while(i<percorre.length){
                if(percorre[i].check==true){
                    salva[j] = percorre[i].Cod_IBGE;
                    salva2[j] = percorre[i].name;
                    //console.log(salva[j]);
                    j++;
                }
                i++;
            }
            this.setState({salvacheck : salva});
            //console.log(this.state.salvacheck);

            this.props.salvacidades(salva);
            this.props.salva_dadoscidades(salva2);
            
        }


    render(){
        
        if (this.state.loading) {
            return (
 
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size="large" color="dodgerblue" />
              </View>
            )
          }
          
        
      return(
        <ImageBackground style={{ flex: 1, width: null}} source={require('../../res/backgroud1.png')}>

        <View style={{ flex: 5, width: null}}>
          <FlatList
              data={this.state.dadosLista}
              refreshing={this.state.refreshing}
              keyExtractor={item => item.id}
              renderItem={item => (
                  <TouchableOpacity
                      onPress={() => null}
                      style={{flexDirection:'row', paddingHorizontal:20,paddingVertical:20, borderBottomWidth:1, borderColor:'#0002'}}>
                      
                      <CheckBox
                            value={item.item.check}
                            onChange={()=> this.mudavalor(item.item.id)}
                            />

                      <Text style={{alignSelf:'center', marginLeft:10, fontSize:20}}>{item.item.Cod_IBGE} - {item.item.name}</Text> 
                      <Text></Text>
                  </TouchableOpacity>
              )}
          />

          </View>

              <View style={{ flex: 1, width: null, justifyContent:'center'}}>
              <Button
                      title={"Continuar"}
                      onPress={()=> {this.salvacheck(); this.props.navigation.navigate('EditarPage')}}
                      />   
              </View>

          </ImageBackground>
        
      )

    }

    


}
mapStateToProps = state =>(

    {
        bacia: state.AutenticacaoReducer.bacia
    }
)

export default connect (mapStateToProps, {salvacidades, salva_dadoscidades})(cidadescheck)


/* 


<Button
                      title={"testando"}
                      onPress={()=> alert(this.state.dadosLista[item.item.id].name)}
                      />
                      */