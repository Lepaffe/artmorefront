/*import React from 'react';
import { View, Button } from 'react-native';


function LandingScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
      <Button title="Go LoginScreen"
        onPress={() => props.navigation.navigate('LoginScreen')}
      />
    </View>
  );
}

export default LandingScreen;*/

import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, Image } from 'react-native';

const FadeInView = (props) => {

  const fadeAnim = useRef(new Animated.Value(0)).current
  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default (props) => {

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('LoginScreen')
    }, 3000)
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', flexDirection: 'row' }}>

      <FadeInView >
        <Image style={{
          width: 300,
          height: 140,
        }} source={require('../assets/logo.jpg')} />
      </FadeInView>

    </View >
  )
}