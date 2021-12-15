import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { SliderBox } from "react-native-image-slider-box";


var images = [
  require('../assets/screen1.jpg'),
  require('../assets/screen2.jpg'),
  require('../assets/screen3.jpg'),
  require('../assets/screen4.jpg')
]
import {
  Heebo_100Thin,
  Heebo_300Light,
  Heebo_400Regular,
  Heebo_500Medium,
  Heebo_700Bold,
  Heebo_800ExtraBold,
  Heebo_900Black
} from '@expo-google-fonts/heebo'

import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'

function LoginScreen(props) {

  let [fontsLoaded] = useFonts({
    Heebo_100Thin,
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_800ExtraBold,
    Heebo_900Black
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <View style={styles.container}>

      <View>
        <Image style={styles.logo} source={require('../assets/logo2.jpg')} />
      </View>

      <View style={{
        flex: 0.7,
      }}>
        <SliderBox images={images}
          sliderBoxHeight={400}

          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          circleLoop


          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(128, 128, 128, 0.92)"
          }}
          ImageComponentStyle={{ borderRadius: 15, width: '97%', marginTop: 0, marginBottom: 0 }}
          imageLoadingColor="#2196F3" />

      </View>



      <Button
        title="SIGN UP / SIGN IN"
        type="outline"
        buttonStyle={{ margin: 5, width: 250, padding: 15, borderColor: "gray", borderRadius: 20, marginTop: 20 }}
        titleStyle={{ fontFamily: 'Heebo_400Regular', color: 'black' }}
        onPress={() => props.navigation.navigate('MediumScreen')}
        icon={
          <Icon style={styles.icon}
            name="google"
            size={25}
            color="grey"
            padding="20px"
          />
        }
      />

      <Button
        title="SIGN UP"
        type="outline"
        buttonStyle={{ margin: 5, width: 250, padding: 15, borderColor: "gray", borderRadius: 20 }}
        titleStyle={{ fontFamily: 'Heebo_400Regular', color: 'black' }}
        onPress={() => props.navigation.navigate('MediumScreen')}
      />

      <Button
        title="SIGN IN"
        type="outline"
        buttonStyle={{ margin: 5, width: 250, padding: 15, borderColor: "grey", borderRadius: 20 }}
        titleStyle={{ fontFamily: 'Heebo_400Regular', color: 'black' }}
        onPress={() => props.navigation.navigate('SignInScreen')}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFF",

  },
  logo: {
    width: 120,
    height: 60,
  },
  icon: {
    paddingEnd: 20
  }
});

export default LoginScreen;
