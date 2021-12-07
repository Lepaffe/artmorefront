
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import MyIcon from './myIcons'; // impot composant MyIcon

const MyAppBar = (props) => {
  console.log('condition', props.route.name);
  if (props.route.name === 'ArtworkScreen' || props.route.name === 'ArtistScreen') {

    return (
      <Appbar.Header style={{ backgroundColor: 'white', color: 'black' }} >
        <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />
        <Appbar.Content style={{ color: 'black', fontweigth: 'strong', fontsize: 25 }} title="Art + More" subtitle="" />
        <Appbar.Action style={{ color: 'black' }} onPress={() => console.log("wait to be able to share")}
          icon='share'
        // icon={
        //     <MyIcon 
        //     type='Ionicons'
        //     name='ios-share'
        //     size={25}
        //     style={{ margin: 0, marginBottom: 0 }}
        //     color='white'
        //   />} 
        />
      </Appbar.Header>
    )
  } else {
    return (
      <Appbar.Header style={{ backgroundColor: 'white', color: 'black' }} >
        <Appbar.BackAction onPress={() => {
          console.log('toto', props.name, props.navigation.getState());
          props.navigation.goBack()
        }} />
        <Appbar.Content style={{ color: 'black', fontweigth: 'strong', fontsize: 25 }} title="Art + More" subtitle=" " />

        <Appbar.Action icon="account" style={{ color: 'black' }} onPress={() => props.navigation.navigate('ProfileScreen')} />
      </Appbar.Header>
    )
  }
}
export default MyAppBar;