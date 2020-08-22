import React from 'react';
import {View, Text, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, CheckBox, Button } from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {indicadorescheck} from '../actions/AutenticacaoActions';
import Icon from 'react-native-vector-icons/FontAwesome';

class indicadores  extends React.Component {

    static navigationOptions = {
        title: 'Lista de indicadores',
        headerStyle: {
        backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        }
  
      }
  constructor() {
    super();
    this.state = {
      data: [],
      stickyHeaderIndices: [],
      dadosLista:[],
      loading: true,
      refreshing: false,
      indicadores_salvos:[]
    };
  }
  componentDidMount() {

    var refdados = firebase.database().ref(`/Indicadores-check`);
          refdados.once('value', (snapshot) =>{


            this.setState({ dadosLista: snapshot.val() });
           // this.setState({loading: false});
            //console.log(this.state.dadosLista);

            var arr = [];
            this.state.dadosLista.map(obj => {
              if (obj.header) {
                arr.push(this.state.dadosLista.indexOf(obj));
              }
            });
            arr.push(0);
            this.setState({
              stickyHeaderIndices: arr
            });
        
            this.setState({loading: false});
    
            
           
          });


   
  }






  renderItem = ({ item }) => {
    if (item.header) {
      return (
        <View
        style={{justifyContent: 'center',
        alignItems: 'center', borderBottomWidth:1, borderColor:'#0002', backgroundColor: '#f4511e'}}>
        
       

        <Text style={{padding: 10, fontSize:25, fontWeight:'bold', color:'#FFFFFF'}}>{item.name}</Text> 
        <Text></Text>
    </View>
      );
    } else if (!item.header) {
      return (
        <View
                      style={{flexDirection:'row', paddingLeft:10,paddingVertical:20, borderBottomWidth:1, borderColor:'#0002'}}>
                      
                      
                      <Icon name='angle-double-right' size={25} color='#f4511e' />
                      <View style={{width:'80%', alignSelf:'center', marginLeft:5}}>
                      <Text style={{fontSize:15, fontWeight:'bold'}}>{item.name}</Text> 
                      </View>
                  </View>
      );
    }
  };


/* estava dentro da função render acima
<CheckBox
                            value={item.check}
                            onChange={()=> this.mudavalor(item.id, item.dimensao)}
                            />

*/



  mudavalor(id, dim){
    
    let mudadados1 = this.state.dadosLista;

    if(dim == "amb"){
      let pos = id + 1;
        if(mudadados1[pos].check == true){
            mudadados1[pos].check= false; 
        }else{
            mudadados1[pos].check= true;  
        }
        
      } else if(dim == "soc"){
        let pos = id + 2;
          if(mudadados1[pos].check == true){
              mudadados1[pos].check= false; 
          }else{
              mudadados1[pos].check= true;  
          }
          
        } else if(dim == "eco"){
          let pos = id + 3;
            if(mudadados1[pos].check == true){
                mudadados1[pos].check= false; 
            }else{
                mudadados1[pos].check= true;  
            }
            
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
            let salva = this.state.indicadores_salvos;
            
            
            let i=0;
            let j=0;
            while(i<percorre.length){
                if(percorre[i].check==true){
                    salva[j] = percorre[i].id;
                    //console.log(salva[j]);
                    j++;
                }
                i++;
            }
            this.setState({indicadores_salvos : salva});
            //console.log(this.state.salvacheck);

            this.props.indicadorescheck(salva);
            
        }

  render() {

    if (this.state.loading) {
        return (

          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size="large" color="dodgerblue" />
          </View>
        )
      }


    return (
        <ImageBackground style={{ flex: 1, width: null}} source={require('../../res/backgroud1.png')}>

        <View style={{ flex: 5, width: null}}>
      <FlatList
        data={this.state.dadosLista}
        refreshing={this.state.refreshing}
        renderItem={this.renderItem}
        keyExtractor={item => item.name}
       
      />
        </View>


      <View style={{ flex: 1, width: null, justifyContent:'center'}}>
              <Button
                      title={"Continuar"}
                      onPress={()=> {this.salvacheck();this.props.navigation.navigate('Cidadescheck')}}
                      />   
              </View>

                 </ImageBackground>
    );
  }
}

const mapStateToProps = state => (
    {
        bacia: state.AutenticacaoReducer.bacia
    }

)


export default connect(mapStateToProps, {indicadorescheck})(indicadores);
