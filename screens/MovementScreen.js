import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import Movement from '../composants/Movement';
import { connect } from 'react-redux'

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

function MovementScreen(props) {

  let [fontsLoaded] = useFonts({
    Heebo_100Thin,
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_800ExtraBold,
    Heebo_900Black
  })

  const [movementPreferences, setMovementPreferences] = useState([])

  const addMovement = (name) => {
    setMovementPreferences([...movementPreferences, name])
  }

  const removeMovement = (name) => {
    setMovementPreferences(movementPreferences.filter(el => el !== name))
  }

  const goToPersonalInfoScreen = () => {
    console.log(movementPreferences)
    props.setMovementPreferencesSignUp(movementPreferences)
    props.navigation.navigate('PersonalInfoScreen')
  }

  //ATTENTION correspond à "category" en BDD
  const movements = [
    {
      name: 'Abstract',
      img: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'Landscape',
      img: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'Portrait',
      img: 'https://images.pexels.com/photos/3657140/pexels-photo-3657140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'Animal',
      img: 'https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'EverydayLife',
      img: 'https://images.pexels.com/photos/6127025/pexels-photo-6127025.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'PopArt',
      img: 'https://cdn.pixabay.com/photo/2017/09/02/06/26/pop-art-2706464_960_720.jpg'
    },
    {
      name: 'Nude',
      img: 'https://images.pexels.com/photos/230675/pexels-photo-230675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'Nature',
      img: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'Urban',
      img: 'https://images.pexels.com/photos/417023/pexels-photo-417023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'StillLife',
      img: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Nature_morte_%28Paul_C%C3%A9zanne%29_%283332859798%29.jpg'
    },
    {
      name: 'Monumental',
      img: 'https://images.pexels.com/photos/5308359/pexels-photo-5308359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'Digital',
      img: 'https://images.pexels.com/photos/7859782/pexels-photo-7859782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
  ]

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (

    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ fontFamily: 'Heebo_300Light', fontSize: 25, textAlign: "center", marginTop: 30, marginBottom: 10 }} >What do you like?</Text>

        <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center' }}>
          {movements.map(movement => {
            let isSelected = movementPreferences.some(el => movement.name == el)
            return (<Movement key={movement.name} name={movement.name} img={movement.img} addMovement={addMovement} removeMovement={removeMovement} isSelected={isSelected} />)
          })}
        </View >

        {/* 
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
         */}

        <View style={{ alignItems: 'flex-end' }}>
          <Button
            title="Next"
            buttonStyle={{ borderRadius: 25, marginVertical: 40, marginRight: 60, paddingHorizontal: 20, backgroundColor: "rgba(38, 50, 56, 0.8)" }}
            titleStyle={{ fontFamily: 'Heebo_300Light' }}
            onPress={() => goToPersonalInfoScreen()}
          />
        </View>

      </ScrollView >
    </View >
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

function mapDispatchToProps(dispatch) {
  return {
    setMovementPreferencesSignUp: function (movement) {
      dispatch({ type: "setMovementPreferencesSignUp", movement })
    }
  }
}
export default connect(null, mapDispatchToProps)(MovementScreen);

