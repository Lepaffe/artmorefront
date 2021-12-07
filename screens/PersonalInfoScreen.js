import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input } from 'react-native-elements'


function PersonalInfoScreen(props) {

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, textAlign: "center", padding: 20, marginBottom: 30 }} >Almost there </Text>
      <Input
        containerStyle={{ marginBottom: 20, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='name'
        onChangeText={(val) => setName(val)}
      />
      <Input
        containerStyle={{ marginBottom: 20, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='birthday'
        onChangeText={(val) => setBirthday(val)}
      />
      <Input
        containerStyle={{ marginBottom: 20, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='localisation'
        onChangeText={(val) => setLocalisation(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='email'
        onChangeText={(val) => setEmail(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: '70%' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder='password'
        onChangeText={(val) => setEmail(val)}
      />
      <Button title="Create account"
        buttonStyle={{ marginVertical: 50, marginHorizontal: 20, paddingHorizontal: 20, backgroundColor: "#FF4D4F" }}
        onPress={() => props.navigation.navigate('BottomNav', { screen: 'DailyScreen' })}
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
  }
});


export default PersonalInfoScreen;