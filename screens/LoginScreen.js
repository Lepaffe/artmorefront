import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


function LoginScreen(props) {
  return (
    <View style={styles.container}>
      {/*<Image style={styles.logo} source={require('../assets/logo.jpg')} ></Image>*/}
      <Text style={{ fontSize: 50, textAlign: "center", fontWeight: 'bold' }} >Art + More</Text>
      <Text style={{ fontSize: 18, textAlign: "center", margin: 35, paddingBottom: 50 }} >Discover your curated daily selection</Text>
      <Button title="SIGN UP / SIGN IN" type="outline" buttonStyle={{ margin: 5, width: 240, padding: 15, borderColor: "gray", borderRadius: 10 }}
        onPress={() => props.navigation.navigate('MediumScreen')} icon={
          <Icon style={styles.icon}
            name="google"
            size={25}
            color="grey"
            padding="20px"
          />
        }
      />
      <Button title="SIGN UP" type="outline" buttonStyle={{ margin: 5, width: 240, padding: 15, borderColor: "gray", borderRadius: 10 }}
        onPress={() => props.navigation.navigate('MediumScreen')}
      />
      <Button title="SIGN IN" type="outline" buttonStyle={{ margin: 5, width: 240, padding: 15, borderColor: "gray", borderRadius: 10 }}
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
    backgroundColor: "#FFFF"
  },
  logo: {
    width: 320,
    height: 150,
  },
  icon: {
    paddingEnd: 20
  }
});

export default LoginScreen;