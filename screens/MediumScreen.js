import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Switch } from 'react-native-elements'
import { connect } from 'react-redux'

function MediumScreen(props) {

  const [mediumPreferences, setMediumPreferences] = useState([]);

  const [painting, setPainting] = useState(false);
  const [sculpture, setSculpture] = useState(false);
  const [photography, setPhotography] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [digitalArt, setDigitalArt] = useState(false);
  const [streetArt, setStreetArt] = useState(false);

  const toggleSwitchPainting = () => {
    setPainting(previousState => !previousState);
    if (mediumPreferences.includes("painting")) {
      setMediumPreferences(mediumPreferences.filter(el => el != "painting"))
    } else {
      setMediumPreferences([...mediumPreferences, "painting"])
    }
  }

  const toggleSwitchSculpture = () => {
    setSculpture(previousState => !previousState);
    if (mediumPreferences.includes("sculpture")) {
      setMediumPreferences(mediumPreferences.filter(el => el != "sculpture"))
    } else {
      setMediumPreferences([...mediumPreferences, "sculpture"])
    }
  }

  const toggleSwitchPhotography = () => {
    setPhotography(previousState => !previousState);
    if (mediumPreferences.includes("photography")) {
      setMediumPreferences(mediumPreferences.filter(el => el != "photography"))
    } else {
      setMediumPreferences([...mediumPreferences, "photography"])
    }
  }

  const toggleSwitchDrawing = () => {
    setDrawing(previousState => !previousState);
    if (mediumPreferences.includes("Drawing")) {
      setMediumPreferences(mediumPreferences.filter(el => el != "Drawing"))
    } else {
      setMediumPreferences([...mediumPreferences, "Drawing"])
    }
  }

  const toggleSwitchDigitalArt = () => {
    setDigitalArt(previousState => !previousState);
    if (mediumPreferences.includes("digital art")) {
      setMediumPreferences(mediumPreferences.filter(el => el != "digital art"))
    } else {
      setMediumPreferences([...mediumPreferences, "digital art"])
    }
  }

  const toggleSwitchStreetArt = () => {
    setStreetArt(previousState => !previousState);
    if (mediumPreferences.includes("street art")) {
      console.log(mediumPreferences)
      setMediumPreferences(mediumPreferences.filter(el => el != "street art"))
    } else {
      setMediumPreferences([...mediumPreferences, "street art"])
    }
  }

  const goToMovementScreen = () => {
    props.setMediumPreferencesSignUp(mediumPreferences)
    props.navigation.navigate('MovementScreen')
    console.log(mediumPreferences)
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, textAlign: "center", paddingHorizontal: 20, paddingVertical: 60 }} >What are you looking for ?</Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
      }}>
        <Text style={{ marginLeft: 80 }}>Painting</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={painting ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchPainting}
          value={painting}
          style={{ marginRight: 80 }}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
      }}>
        <Text style={{ marginLeft: 80 }}>Sculpture</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={sculpture ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchSculpture}
          value={sculpture}
          style={{ marginRight: 80 }}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
      }}>
        <Text style={{ marginLeft: 80 }}>Photography</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={photography ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchPhotography}
          value={photography}
          style={{ marginRight: 80 }}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
      }}>
        <Text style={{ marginLeft: 80 }}>Drawing</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={drawing ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchDrawing}
          value={drawing}
          style={{ marginRight: 80 }}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
      }}>
        <Text style={{ marginLeft: 80 }}>Digital Art</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={digitalArt ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchDigitalArt}
          value={digitalArt}
          style={{ marginRight: 80 }}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
      }}>
        <Text style={{ marginLeft: 80 }}>Street Art</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={streetArt ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchStreetArt}
          value={streetArt}
          style={{ marginRight: 80 }}
        />
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Button title="Next" buttonStyle={{ marginVertical: 80, marginHorizontal: 20, paddingHorizontal: 20, backgroundColor: "#FF4D4F" }}
          onPress={() => goToMovementScreen()}
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

function mapDispatchToProps(dispatch) {
  return {
    setMediumPreferencesSignUp: function (medium) {
      dispatch({ type: "setMediumPreferencesSignUp", medium })
    }
  }
}
export default connect(null, mapDispatchToProps)(MediumScreen);