import React from 'react';
import {View, Text, ImageBackground, ActivityIndicator, Button, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import {Bar} from 'react-native-pathjs-charts';

class resultadosFinal2 extends React.Component {
    

      constructor(){
        super();
        this.state = {
          tamanho: 1000,
       }
  
        
    }

    componentDidMount(){
      let valor = this.props.tamanho;
      this.setState({tamanho: valor});     
  }


    render(){

        let data2 = [this.props.dimensao_economica];
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
   <Text style={{fontSize:23, fontWeight:'bold', color:'#fff', paddingLeft:15, }}>Dimensão Econômica</Text>
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
              <View style={{width: 20, height: 20, borderRadius:10, backgroundColor: '#00FF7F'}} />
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


            </View>
              </ScrollView>

              </View>
             
            )
           
          

    }

} 
mapStateToProps = state =>(
    {
      
       
        
        dimensao_economica: state.AutenticacaoReducer.economico,
        tamanho: state.AutenticacaoReducer.tamanho,
        
    }
)

export default connect(mapStateToProps, null)(resultadosFinal2)