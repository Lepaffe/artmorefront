import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Switch } from 'react-native-elements'


function MediumScreen(props) {

  const [painting, setPainting] = useState(false);
  const toggleSwitchPainting = () => setPainting(previousState => !previousState);
  const [sculpture, setSculpture] = useState(false);
  const toggleSwitchSculpture = () => setSculpture(previousState => !previousState);
  const [photography, setPhotography] = useState(false);
  const toggleSwitchPhotography = () => setPhotography(previousState => !previousState);
  const [drawing, setDrawing] = useState(false);
  const toggleSwitchDrawing = () => setDrawing(previousState => !previousState);
  const [digitalArt, setDigitalArt] = useState(false);
  const toggleSwitchDigitalArt = () => setDigitalArt(previousState => !previousState);
  const [streetArt, setStreetArt] = useState(false);
  const toggleSwitchStreetArt = () => setStreetArt(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, textAlign: "center", paddingHorizontal: 20 , paddingVertical: 60}} >What are you looking for ?</Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between"
      }}>
        <Text style={{marginLeft: 80}}>Painting</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={painting ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchPainting}
          value={painting}
          style={{marginRight: 80 }}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between"
      }}>
        <Text style={{marginLeft: 80}}>Sculpture</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={sculpture ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchSculpture}
          value={sculpture}
          style={{marginRight: 80 }}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between"
      }}>
        <Text style={{marginLeft: 80 }}>Photography</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={photography ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchPhotography}
          value={photography}
          style={{marginRight: 80 }}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between"
      }}>
        <Text style={{marginLeft: 80 }}>Drawing</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={drawing ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchDrawing}
          value={drawing}
          style={{marginRight: 80 }}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between"
      }}>
        <Text style={{marginLeft: 80 }}>Digital Art</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={digitalArt ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchDigitalArt}
          value={digitalArt}
          style={{marginRight: 80 }}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between"
      }}>
        <Text style={{marginLeft: 80 }}>Street Art</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={streetArt ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchStreetArt}
          value={streetArt}
          style={{marginRight: 80 }}
        />
      </View>
      <View style={{alignItems: 'flex-end'}}> 
      <Button title="Next" buttonStyle={{marginVertical: 80, marginHorizontal:20, paddingHorizontal:20, backgroundColor:"#FF4D4F"}}
        onPress={() => props.navigation.navigate('MovementScreen')} 
      /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#FFFF"
  }
});

export default MediumScreen;