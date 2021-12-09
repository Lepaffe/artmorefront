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
    console.log(categoryPreferences)
    props.setCategoryPreferencesSignUp(categoryPreferences)
    props.navigation.navigate('PersonalInfoScreen')
  }

  //ATTENTION correspond à "category" en BDD
  const categorys = [
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
          {categorys.map(category => {
            let isSelected = categoryPreferences.some(el => category.name == el)
            return (<Category key={category.name} name={category.name} img={category.img} addCategory={addCategory} removeCategory={removeCategory} isSelected={isSelected} />)
          })}
        </View >

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
    setCategoryPreferencesSignUp: function (category) {
      dispatch({ type: "setCategoryPreferencesSignUp", category })
    }
  }
}
export default connect(null, mapDispatchToProps)(CategoryScreen);

