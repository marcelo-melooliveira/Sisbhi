import React from 'react';
import { Button, View, Text } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation'; // Version can be specified in package.json
import Comites from './Componentes/comitespage';
import  Calcular from './Componentes/calcularpage';
import pagefoto from './Componentes/pagefoto';
import pageinputs from './Componentes/pageinputs';
import pageinfo from './Componentes/PageinfoBacias';
import pagecheckbox from './Componentes/Pagecheckbox';
import cidadeschecks from './Componentes/cidadescheck';
import editarPage from './Componentes/editarPage';
import resultadosPage from './Componentes/resultadosPage';
import resultadosFinal from './Componentes/resultadosFinal';
import acudescidades from './Componentes/acudescidades';
import dadosacude from './Componentes/dadosacude';
import Mapaview from './Componentes/mapaview';


const doNotShowHeaderOption = {
  navigationOptions: {
    header: null,
  },
};

export const RootStack = DrawerNavigator(
  
    {
      //Menuhamb: {screen: Menuhamb},
      PageCalcular: {screen: Calcular},
      PageComites: { screen: Comites },
      Acudescidades: {screen: acudescidades}},
      
      
      {

      initialRouteName: 'PageCalcular',
      
        });

    export const Menuhamb = StackNavigator(
      {
      RootStack: {screen: RootStack, doNotShowHeaderOption},
      PageInputs: {screen: pageinputs},
      Pageinfo: {screen: pageinfo},
      Indicadorescheck: { screen: pagecheckbox},
      Cidadescheck: {screen: cidadeschecks},
      EditarPage: {screen: editarPage},
      ResultadosPage: {screen: resultadosPage},
      resultadosFinal: {screen: resultadosFinal},
      dadosacude: {screen: dadosacude},
      Mapaview: {screen: Mapaview},
      
     
     
    },{
      initialRouteName: 'RootStack',
      //headerMode: "none"
    });


    
    
    RootStack.navigationOptions = {
      title: 'teste',
      header: null
  }

    

   
  
  
    