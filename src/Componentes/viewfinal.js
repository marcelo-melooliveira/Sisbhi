import React from 'react';
import {View, Text, ImageBackground, ActivityIndicator,ScrollView, Button } from 'react-native';
import {connect} from 'react-redux';
import {Bar} from 'react-native-pathjs-charts';

import Icon from 'react-native-vector-icons/FontAwesome';
import {resetar} from '../actions/AutenticacaoActions';
import { NavigationActions } from 'react-navigation';

class finalview extends React.Component {
    

      constructor(){
        super();
        this.state = {
          tamanho: 1000,
          active: false,
       }
        
    }
    componentDidMount(){
      let valor = this.props.tamanho;
      this.setState({tamanho: valor});     
  }

  finalizar(){
    

    
      this.props.resetar();

      const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'RootStack' })],
        });
this.props.navigation.dispatch(resetAction);
   // this.props.navigation.navigate('PageCalcular')
   



  }
  
    render(){

        let data2 = [this.props.final];
        let options = {
            width: this.state.tamanho,
            height: 300,
            margin: {
              top: 30,
              left: 35,
              bottom: 50,
              right: 20
            },
            color: '#2980B9',
            gutter: 40,
            animate: {
              type: 'oneByOne',
              duration: 200,
              fillTransition: 3
            },
            axisX: {
              showAxis: true,
              showLines: true,
              showLabels: true,
              showTicks: true,
              zeroAxis: false,
              orient: 'bottom',
              label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#34495E',
                rotate: 0
              }
            },
            axisY: {
              showAxis: true,
              showLines: true,
              showLabels: true,
              showTicks: true,
              zeroAxis: false,
              orient: 'left',
              label: {
                fontFamily: 'Arial',
                fontSize: 15,
                fontWeight: true,
                fill: '#34495E'
              }
            }
          }

                
            return (

              <View style={{ flex: 1, width: null, paddingBottom:10}}>

 <View style={{width:'100%', height:50,flexDirection:'row', backgroundColor:'#f4511e', paddingLeft:10, paddingTop:12}}>
   <Text style={{fontSize:23, fontWeight:'bold', color:'#fff', paddingLeft:15, }}>Resultado Final</Text>
  </View>
 
              <ScrollView style={{ flex: 1, width: null, paddingBottom: 15, paddingTop: 10}}>
          
              <ScrollView style={{ flex: 3, width: null, paddingBottom: 15}} horizontal={true}>
               
              <Bar data={data2} options={options} accessorKey='v'/>
        
              </ScrollView>
            
            <View style={{flex: 1}}>

            <View  style={{flexDirection: 'row', padding:10}}>
              <View style={{width: 20, height: 20,borderRadius:10, backgroundColor: '#008000'}} />
              <Text> Sustentável (0,81 - 1,0)</Text>
              </View>

               <View  style={{flexDirection: 'row', padding:10}}>
              <View style={{width: 20, height: 20,borderRadius:10, backgroundColor: '#00FF7F'}} />
              <Text> Potêncialmente Sustentável (0,61 - 0,8)</Text>
              </View>

               <View  style={{flexDirection: 'row', padding:10}}>
              <View style={{width: 20, height: 20,borderRadius:10, backgroundColor: '#FFFF00'}} />
              <Text> Sustentabilidade Média (0,41 - 0,6)</Text>
              </View>

               <View  style={{flexDirection: 'row', padding:10}}>
              <View style={{width: 20, height: 20,borderRadius:10, backgroundColor: '#FFA500'}} />
              <Text> Potêncialmente Insustentável (0,21 - 0,4)</Text>
              </View>

               <View  style={{flexDirection: 'row', padding:10}}>
              <View style={{width: 20, height: 20,borderRadius:10, backgroundColor: '#FF0000'}} />
              <Text> Insustentável (0,0 - 0,2)</Text>
              </View>


              <View style={{paddingVertical:15, paddingHorizontal:15}}>
                     <Button title="Finalizar" onPress={() => this.finalizar()}/>
              </View>
              
            </View>
            
              </ScrollView>
                
              </View>
             
            )
           
          

    }

} 
mapStateToProps = state =>(
    {
      
       
        
        final: state.AutenticacaoReducer.final,
        tamanho: state.AutenticacaoReducer.tamanho,
        
    }
)

export default connect(mapStateToProps, {resetar})(finalview)