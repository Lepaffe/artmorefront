import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-elements'
import { connect } from 'react-redux'


function MovementScreen(props) {

  const [nude, setNude] = useState(false);
  const [abstract, setAbstract] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const [urban, setUrban] = useState(false);
  const [animal, setAnimal] = useState(false);
  const [popArt, setPopArt] = useState(false);
  const [streetArt, setStreetArt] = useState(false);
  const [everydayLife, setEverydayLife] = useState(false);
  const [natureMorte, setNatureMorte] = useState(false);
  const [nature, setNature] = useState(false);
  const [monumental, setMonumental] = useState(false);
  const [digital, setDigital] = useState(false);

  const [movementPreferences, setMovementPreferences] = useState([])

  const goToPersonalInfoScreen = () => {
    console.log(movementPreferences)
    props.setMovementPreferencesSignUp(movementPreferences)
    props.navigation.navigate('PersonalInfoScreen')
  }

  // const movements = [
  //   {
  //     name: 'Abstract',
  //     img: '../assets/category/abstract.jpg'
  //   },
  //   {
  //     name: 'Portrait',
  //     img: '../assets/category/portrait.jpg'
  //   },
  //   {
  //     name: 'Animal',
  //     img: '../assets/category/animals.jpg'
  //   },
  //   {
  //     name: 'Everyday Life',
  //     img: '../assets/category/everydaylife.jpg'
  //   },
  //   {
  //     name: 'Pop Art',
  //     img: '../assets/category/popart.jpg'
  //   },
  //   {
  //     name: 'Landscape',
  //     img: '../assets/category/landscape.jpg'
  //   },
  //   {
  //     name: 'Nude',
  //     img: '../assets/category/nude.jpg'
  //   },
  //   {
  //     name: 'Nature',
  //     img: '../assets/category/nature.jpg'
  //   },
  //   {
  //     name: 'Urban',
  //     img: '../assets/category/urban.jpg'
  //   },
  //   {
  //     name: 'Nature Morte',
  //     img: '../assets/category/naturemorte.jpg'
  //   },
  //   {
  //     name: 'Monumental',
  //     img: '../assets/category/monumental.jpg'
  //   },
  //   {
  //     name: 'Digital',
  //     img: '../assets/category/digital.jpg'
  //   },
  // ]

  // const newMovement = movements.map((u, i) => {
  //   return (
  //     <View key={i} style={{
  //       flexDirection: "row",
  //     }}>
  //       <Card wrapperStyle={{ border: 0, margin: 0 }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
  //         <Card.Image
  //           source={{ uri: u.img }}
  //           style={{ width: 70, height: 70, borderRadius: 50 }}
  //         />
  //         <Text style={{ textAlign: "center" }}>{u.name}</Text>

  //       </Card>
  //     </View>
  //   );
  // })

  return (

    <View style={styles.container}>

      <ScrollView>
        <Text style={{ fontSize: 25, textAlign: "center", padding: 20 }} >What do you like ?</Text>
        <View>

          <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={() => { setAnimal(true); setMovementPreferences([...movementPreferences, "animal"]) }}>
              <Card wrapperStyle={{ border: 0, margin: 0, alignItems: "center", justifyContent: "center" }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                  source={require('../assets/category/animals.jpg')}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>Animal</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setLandscape(true);; setMovementPreferences([...movementPreferences, "landscape"]) }}>
              <Card wrapperStyle={{ border: 0, margin: 0, alignItems: "center", justifyContent: "center" }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                  source={require('../assets/category/landscape.jpg')}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>Landscape</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setEverydayLife(true); setMovementPreferences([...movementPreferences, "everydayLife"]) }}>
              <Card wrapperStyle={{ border: 0, margin: 0, alignItems: "center", justifyContent: "center" }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                  source={require('../assets/category/everyday.jpg')}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>Everyday Life</Text>
              </Card>
            </TouchableOpacity>


          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>

            <TouchableOpacity onPress={() => { setPopArt(true);; setMovementPreferences([...movementPreferences, "popArt"]) }}>
              <Card wrapperStyle={{ border: 0, margin: 0, alignItems: "center", justifyContent: "center" }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                  source={require('../assets/category/popart.jpg')}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>Pop Art</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setNude(true);; setMovementPreferences([...movementPreferences, "nude"]) }}>
              <Card wrapperStyle={{ border: 0, margin: 0, alignItems: "center", justifyContent: "center" }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                  source={require('../assets/category/nude.jpg')}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>Nude</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setNature(true);; setMovementPreferences([...movementPreferences, "nature"]) }}>
              <Card wrapperStyle={{ border: 0, margin: 0 }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                  source={require('../assets/category/nature.jpg')}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>Nature</Text>
              </Card>
            </TouchableOpacity>


          </View>

          <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>


            <TouchableOpacity onPress={() => { setAbstract(true);; setMovementPreferences([...movementPreferences, "abstract"]) }}>
              <Card wrapperStyle={{ border: 0, margin: 0, alignItems: "center", justifyContent: "center" }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                  source={require('../assets/category/abstract.jpg')}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>Abstract</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setNatureMorte(true);; setMovementPreferences([...movementPreferences, "natureMorte"]) }}>
              <Card wrapperStyle={{ border: 0, margin: 0, alignItems: "center", justifyContent: "center" }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                  source={require('../assets/category/naturemorte.jpg')}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>Nature Morte</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setUrban(true);; setMovementPreferences([...movementPreferences, "urban"]) }}>
              <Card wrapperStyle={{ border: 0, margin: 0, alignItems: "center", justifyContent: "center" }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                  source={require('../assets/category/urban.jpg')}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>Urban</Text>
              </Card>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>


            <TouchableOpacity onPress={() => { setPortrait(true);; setMovementPreferences([...movementPreferences, "portrait"]) }}>
              <Card wrapperStyle={{ border: 0, margin: 0, alignItems: "center", justifyContent: "center" }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                  source={require('../assets/category/portrait.jpg')}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>Portrait</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setMonumental(true);; setMovementPreferences([...movementPreferences, "monumental"]) }}>
              <Card wrapperStyle={{ border: 0, margin: 0, alignItems: "center", justifyContent: "center" }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                  source={require('../assets/category/monumental.jpg')}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>Monumental</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setDigital(true);; setMovementPreferences([...movementPreferences, "digital"]) }}>
              <Card wrapperStyle={{ border: 0, margin: 0, alignItems: "center", justifyContent: "center" }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                  source={require('../assets/category/digital.jpg')}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <Text style={{ textAlign: "center" }}>Digital</Text>
              </Card>
            </TouchableOpacity>

          </View>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Button title="Next" buttonStyle={{ marginVertical: 50, marginHorizontal: 20, paddingHorizontal: 20, backgroundColor: "#FF4D4F" }}
            onPress={() => goToPersonalInfoScreen()}
          />
        </View>

      </ScrollView>
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
    setMovementPreferencesSignUp: function (movement) {
      dispatch({ type: "setMovementPreferencesSignUp", movement })
    }
  }
}
export default connect(null, mapDispatchToProps)(MovementScreen);