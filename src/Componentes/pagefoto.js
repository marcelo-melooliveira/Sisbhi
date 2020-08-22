import React from 'react'
import {FlatList, View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

export default class pagefoto extends React.Component{

    static navigationOptions = {
        title: 'Mapa',
        headerStyle: {
        backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
  
      }

    render(){
        return (
            <View style={{flex:1, backgroundColor:'#1C1C1C'}}>
                <View style={{backgroundColor:'black'}}>
                    <TouchableOpacity style={{paddingTop:1}} onPress={() => this.props.navigation.navigate('PageComites')}>
                        <Image
                        source={require('../../res/back.png')}
                        
                        />
                        
                    </TouchableOpacity>
                </View>

                
                <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={350}
                       imageHeight={350}>
                <Image style={{width:350, height:350}}
                       source={{uri:'https://firebasestorage.googleapis.com/v0/b/pibiti-7d87c.appspot.com/o/imgs_bacias%2Fmetropolitana.png?alt=media&token=26cf5cdc-f4bf-4294-b3e0-8a7a64f41cb4'}}/>
            </ImageZoom>


            </View>
        )
    }
}