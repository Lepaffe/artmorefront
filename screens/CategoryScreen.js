import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import Category from '../composants/Category';
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

function CategoryScreen(props) {

  let [fontsLoaded] = useFonts({
    Heebo_100Thin,
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_800ExtraBold,
    Heebo_900Black
  })

  const [categoryPreferences, setCategoryPreferences] = useState([])

  const addCategory = (name) => {
    setCategoryPreferences([...categoryPreferences, name])
  }

  const removeCategory = (name) => {
    setCategoryPreferences(categoryPreferences.filter(el => el !== name))
  }

  const goToPersonalInfoScreen = () => {

    props.setCategoryPreferencesSignUp(categoryPreferences)
    props.navigation.navigate('PersonalInfoScreen')
  }

  const categories = [
    {
      name: 'Abstract',
      img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639557979/pexels-photo-2693212_fjvesn.jpg'
    },
    {
      name: 'Landscape',
      img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558028/pexels-photo-2356059_nonufa.jpg'
    },
    {
      name: 'Portrait',
      img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558067/pexels-photo-3657140_sb1u6d.jpg'
    },
    {
      name: 'Animal',
      img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558110/pexels-photo-1076758_ah9dyf.jpg'
    },
    {
      name: 'EverydayLife',
      img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558134/pexels-photo-6127025_fbi7vr.jpg'
    },
    {
      name: 'PopArt',
      img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558186/pop-art-2706464_960_720_s704vd.jpg'
    },
    {
      name: 'Nude',
      img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558246/pexels-photo-230675_smp64w.jpg'
    },
    {
      name: 'Nature',
      img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558276/pexels-photo-3225517_cvgkgg.jpg'
    },
    {
      name: 'Urban',
      img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558306/pexels-photo-417023_oa6nlg.jpg'
    },
    {
      name: 'StillLife',
      img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558361/Nature_morte__28Paul_C_C3_A9zanne_29__283332859798_29_zoil8w.jpg'
    },
    {
      name: 'Monumental',
      img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558392/pexels-photo-5308359_po3xrh.jpg'
    },
    {
      name: 'Digital',
      img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639575121/pexels-photo-3977529_yhslxr.jpg'
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

          {categories.map(category => {

            let isSelected = categoryPreferences.some(el => category.name == el)
            return (
              <Category
                key={category.name}
                name={category.name}
                img={category.img}
                addCategory={addCategory}
                removeCategory={removeCategory}
                isSelected={isSelected}
              />
            )
          })}

        </View >

        <View style={{ alignItems: 'flex-end' }}>

          <Button
            title="Next"
            buttonStyle={{ borderColor: "black", borderWidth: 1, borderRadius: 20, marginVertical: 40, marginRight: 60, paddingHorizontal: 20, backgroundColor: "white" }}
            titleStyle={{ fontFamily: 'Heebo_300Light', color: 'black', fontSize: 15 }}
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
    backgroundColor: "#FFF"
  }
});

function mapDispatchToProps(dispatch) {
  return {
    setCategoryPreferencesSignUp: function (category) {
      dispatch({ type: "setCategoryPreferencesSignUp", category })
    }
  }
}

export default connect(null, mapDispatchToProps)(CategoryScreen);

