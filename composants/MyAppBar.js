
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import MyIcon from './myIcons'; // impot composant MyIcon

const MyAppBar = (props) => {
  console.log('condition', props.route.name);

  return (

    <Appbar.Header style={{ backgroundColor: 'white', color: 'black' }} >
      {(props.route.name === 'ArtworkScreen'
        || props.route.name === 'ArtistScreen'
        || props.route.name === 'SignInScreen'
        || props.route.name === 'CategoryScreen'
        || props.route.name === 'MediumScreen'
        || props.route.name === 'PersonalInfoScreen'
      ) &&
        <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />}
      {/* <Appbar.BackAction onPress={()=>{console.log('toto', props.name, props.navigation.getState());
                                       props.navigation.goBack()}} /> */}
      <Appbar.Content titleStyle={{ color: 'black', textAlign: 'center', fontWeight: 'bold', fontSize: 30 }} title="Art + More" subtitle=" " />
      {props.route.name !== 'ProfileScreen' && <Appbar.Action icon="account" style={{ color: 'black' }} onPress={() => props.navigation.navigate('ProfileScreen')} />}

    </Appbar.Header>
  )
  //  }
}
export default MyAppBar;