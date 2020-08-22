import React from 'react';
import {View, Text, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, CheckBox, Button } from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {salva_dadosindicadores} from '../actions/AutenticacaoActions';



 class editarPage extends React.Component {
    static navigationOptions = {
        title: 'Edição de indicadores',
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
            
        }
    }

    componentDidMount(){

          if(this.props.verificar == 0){
              //console.log("indicadores salvos");
           //console.log(this.props.navigation.state.params.indicadores_salvos);
          
          var refdados = firebase.database().ref(`/Comites/Bacias/${this.props.bacia}/Cidades`);
          refdados.once('value', (snapshot) =>{


            this.setState({ dadosLista: snapshot.val() });
            this.atualizadados();
            this.inserevalortotal();
            this.setState({loading: false});
            //console.log(this.state.dados_indicadores);   
           
          });
              
          } else if(this.props.verificar == 1){

            var refdados = firebase.database().ref(`/Comites/Bacias/${this.props.bacia}/Cidades`);
            refdados.once('value', (snapshot) =>{
  
  
              this.setState({ dadosLista: snapshot.val() });
              this.atualizadados();
              this.setState({loading: false});
              //console.log(this.state.dados_indicadores);   
             
            });
          }
                      
    }


    //console.log(this.props.navigation.state.params.bacia);

indicadores_alterados(){
    alteracao = this.props.navigation.state.params.indicadores_alterados;
    posicao = this.props.navigation.state.params.posicaoalterada;
    dados = this.state.dados_indicadores;
    dados[posicao] = alteracao;
    this.setState({dados_indicadores: dados});

    console.log(dados);
}






    
    inserevalortotal(){
        buscavalor = this.props.cidades_escolhidas;
        inserevalor = this.props.dados_indicadores;
       let  dados=[];
        indicadores_escolhidos = this.props.indicadores_check;

        for(let i=0; i<buscavalor.length;i++){
        var refdados = firebase.database().ref(`/Indicadores-valorfinal/${buscavalor[i]}`);

        refdados.once('value', (snapshot) =>{

          dados.push(snapshot.val());
          }); 
         
    }

   /*

    if(dados[0].length > indicadores_escolhidos.lenght){
        let x=0;
        let y=0;
        while(y<indicadores_escolhidos.lenght){

            if(x == indicadores_escolhidos[y]){
                x++;
                y++;
            }else{
                dados.splice(x,1);
                x++;
            }
        
        }

    }
   
*/
    this.props.salva_dadosindicadores(dados);


    }


    atualizadados(){
        //console.log("entrou na função atualiza dados");
        atualiza = this.state.dadosLista;
        salvos = this.props.cidades_escolhidas;
        veri=0;
        let i =0;
        let j = 0;
      


        while(i<atualiza.length){
            for(j=0; j<salvos.length;j++){
                if(atualiza[i].Cod_IBGE == salvos[j]){
                    veri=1;
                    i++;
                }
            }
            if(veri==0){
                //retirar[i]= atualiza[i].Cod_IBGE;
                //console.log(atualiza[i].name);
                atualiza.splice(i,1);
               for(j=i; j<atualiza.length;j++){
                atualiza[j].id = (atualiza[j].id) - 1;

               }
               
            }else{veri=0;
                //atualiza[i].id = i;
            
            }
            //atualiza.splice(i,1);
           // console.log(i);
        }
              
        
       

//console.log(atualiza);
       //atualiza.splice(i,1);
       //console.log(atualiza);
       this.setState({ dadosLista: atualiza });

    }




 /*

        mostrarreducer(){

            console.log(this.props.bacia);
            console.log(this.props.indicadores_check);
            console.log(this.props.cidades_escolhidas);
            console.log(this.props.dados_indicadores);
        }

*/


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
              keyExtractor={item => item.name}
              renderItem={item => (
                  <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('PageInputs', {indicadores_salvos: this.props.dados_indicadores[item.item.id], posicaomudada: item.item.id})}
                      style={{flexDirection:'row', paddingHorizontal:20,paddingVertical:20, borderBottomWidth:1, borderColor:'#0002'}}>
                      
                      

                      <Text style={{alignSelf:'center', marginLeft:10, fontSize:20}}>{item.item.Cod_IBGE} - {item.item.name}</Text> 
                     
                  </TouchableOpacity>
              )}
          />

          </View>

              <View style={{ flex: 1, width: null, justifyContent:'center'}}>
              <Button
                      title={"Continuar"}
                      onPress={()=>  this.props.navigation.navigate('ResultadosPage')}
                      />   
              </View>

          </ImageBackground>
        
      )

    }

    


}

mapStateToProps = state =>(
    {
        bacia: state.AutenticacaoReducer.bacia,
        indicadores_check: state.AutenticacaoReducer.indicadores_check,
        cidades_escolhidas: state.AutenticacaoReducer.cidades_escolhidas,
        dados_indicadores: state.AutenticacaoReducer.dados_indicadores,
        verificar: state.AutenticacaoReducer.verificar
    }
)

export default connect(mapStateToProps, {salva_dadosindicadores})(editarPage)



/* 


<Button
                      title={"testando"}
                      onPress={()=> alert(this.state.dadosLista[item.item.id].name)}
                      />
                      */