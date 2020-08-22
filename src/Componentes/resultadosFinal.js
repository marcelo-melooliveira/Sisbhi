import React from 'react';
import {View, Text, ImageBackground, ActivityIndicator, Button, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import {Bar} from 'react-native-pathjs-charts';

import viewAmbiental from './viewAmbiental';
import viewSocial from './viewSocial';
import viewEconomica from './viewEconomica';
import viewFinal from './viewfinal';

import { TabNavigator, TabBarBottom } from 'react-navigation'; 

import Icon from 'react-native-vector-icons/FontAwesome';





 export default TabNavigator(
    {
      Ambiental: { screen: viewAmbiental,  navigationOptions: {
        header: false,
    } },
      Social: { screen: viewSocial,  navigationOptions: {
        header: false,
    } },
      Economica: {screen: viewEconomica,  navigationOptions: {
        header: false,
    }},
    Final: {screen: viewFinal,  navigationOptions: {
      header: false,
  }}
      
    },
    {

      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Ambiental') {
            iconName = `pagelines`;
          } else if (routeName === 'Social') {
            iconName = `users`;
          } else if (routeName === 'Economica') {
            iconName = `credit-card`;
          }else if (routeName === 'Final') {
            iconName = `calculator`;
          }
  
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Icon name={iconName} size={25} color={tintColor} />;
        },
      }),
     
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
      animationEnabled: false,
      swipeEnabled: false,
    }
  );

