import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { CheckBox, Card, ListItem, Avatar } from 'react-native-elements'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { REACT_APP_URL_BACKEND } from "@env";


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

function ExhibitionScreen(props) {

  let [fontsLoaded] = useFonts({
    Heebo_100Thin,
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_800ExtraBold,
    Heebo_900Black
  })

  const [checkedDate, setCheckedDate] = useState(false);
  const [checkedPref, setCheckedPref] = useState(false);
  const [checkedNearMe, setCheckedNearMe] = useState(true);
  const [listExpo, setListExpo] = useState([])


  useEffect(() => {
    async function loadExpo() {
      var rawResponse = await fetch(`${REACT_APP_URL_BACKEND}/get-exhibitions/${props.token}`);
      var response = await rawResponse.json();
      // console.log("reponsefetch:", response.data);

      var listExpoCopy = []

      for (var i = 0; i < response.data.length; i++) {
        listExpoCopy.push({
          img: response.data[i].fields.image,
          title: response.data[i].fields.title,
          city: response.data[i].fields.city,
          place : response.data[i].fields.placename,
          address : response.data[i].fields.address,
          date_start: response.data[i].fields.date_start,
          date_end: response.data[i].fields.date_end
        })

        if (response.data[i].fields.image == null) {
          response.data[i].fields.image = '../assets/category/abstract.jpg';
        }
      }
      setListExpo(listExpoCopy);
    }
    console.log(listExpo);
    loadExpo();
  }, []);

  var exhibitionsList = <Text style={{ fontSize: 20 }}>Aucun évènement prévu dans votre ville</Text>
  if (listExpo.length > 0) {

    exhibitionsList = listExpo.map((expo, i) => (
      <ListItem key={i} bottomDivider>
        <Avatar style={{ width: 90, height: 130 }} source={{ uri: expo.img }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontFamily: 'Heebo_400Regular' }}>{expo.title}</ListItem.Title>
          <ListItem.Subtitle style={{ fontFamily: 'Heebo_300Light', marginVertical: 5 }}>{expo.place}</ListItem.Subtitle>
          <ListItem.Subtitle style={{ fontFamily: 'Heebo_300Light', marginVertical: 5 }}>{expo.address}</ListItem.Subtitle>
          <ListItem.Subtitle style={{ fontFamily: 'Heebo_400Regular', fontSize: 12 }}>From {expo.date_start} to {expo.date_end}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))
    {/*exhibitionsList = listExpo.map((u, i) => {
      return (
        // <View key={i}>
        //   <Card >
        //     <View><Text>{expo.title}</Text>
        //     <Text>{expo.city}</Text>
        //     <Text>{expo.date_start}</Text>
        //     <Text>{expo.date_end}</Text></View>
        //     <View>
        //     <Card.Image source={{ uri: expo.img }}></Card.Image></View>
        //b   </Card>
        // </View>

        <View key={i} style={styles.user}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: u.img }}
          />
          <Text style={styles.name}>{u.title}{"\n"}{u.city}{"\n"}{u.date_start}{"\n"}{u.date_end}</Text>
        </View>
      );
    })*/}
  }

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ borderBottomWidth: 1, marginHorizontal: 40, borderBottomColor: "grey", marginBottom: 20 }}>
          <Text style={{ borderBottomColor: "red", textAlign: "center", fontSize: 15, padding: 20 }}> Exhibitions </Text>
        </View>
        <View style={{ flexDirection: "row" }} >
          <CheckBox
            title='Near me'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={checkedNearMe}
            onPress={() => setCheckedNearMe(!checkedNearMe)}
            containerStyle={styles.checkbox}
            textStyle={{ fontSize: 10, color: 'black' }}
          />

          <CheckBox
            title='By date'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={checkedDate}
            onPress={() => setCheckedDate(!checkedDate)}
            containerStyle={styles.checkbox}
            textStyle={{ fontSize: 10, color: 'black' }}
          />
          <CheckBox
            title='By preferences'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={checkedPref}
            onPress={() => setCheckedPref(!checkedPref)}
            containerStyle={styles.checkbox}
            textStyle={{ fontSize: 10, color: 'black' }}

          />

        </View>
        {exhibitionsList}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#FFFF",
  },
  checkbox: {
    backgroundColor: "transparent",
    padding: 0,
    paddingBottom: 20,
    borderColor: 0,
    marginHorizontal: 0,
    width: 100,
    alignItems: "center",
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 90,
    height: 90,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 15,
    marginTop: 5,
    fontFamily: 'Heebo_300Light'
  },
});


function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(mapStateToProps, null)(ExhibitionScreen);
