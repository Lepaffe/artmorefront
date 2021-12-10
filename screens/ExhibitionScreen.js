import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native'
import { CheckBox, ListItem, Avatar, LinearProgress } from 'react-native-elements'
import { connect } from 'react-redux'
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

  const [checkedAllExpo, setCheckedAllExpo] = useState(true);
  const [checkedMyExpo, setCheckedMyExpo] = useState(false);
  const [checkedExpoNearMe, setCheckedExpoNearMe] = useState(false);
  const [listExpo, setListExpo] = useState([])

  var dateFormat = function (date) {
    var newDate = new Date(date)
    var format = (newDate.getMonth() + 1) + "." + newDate.getDate() + "." + newDate.getFullYear()
    return format;
  };

  const getAllExpoNearMe = async () => {
    console.log("hello")
    if (checkedExpoNearMe) {
      setCheckedExpoNearMe(false)
    } else {
      setCheckedExpoNearMe(true), setCheckedAllExpo(false), setCheckedMyExpo(false)
    }
    var rawResponse = await fetch(`${REACT_APP_URL_BACKEND}/get-exhibitions/:token`);
    var response = await rawResponse.json();
    console.log("data near me", response)
  }

  useEffect(() => {
    async function loadExpo() {
      var rawResponse = await fetch(`${REACT_APP_URL_BACKEND}/get-exhibitions`);
      var response = await rawResponse.json();
      console.log(response.listExpoBack)

      // var listExpoCopy = []

      // for (var i = 0; i < response.data.length; i++) {
      //   listExpoCopy.push({
      //     img: response.data[i].fields.image,
      //     title: response.data[i].fields.title,
      //     city: response.data[i].fields.city,
      //     place : response.data[i].fields.placename,
      //     address : response.data[i].fields.address,
      //     date_start: dateFormat(response.data[i].fields.date_start),
      //     date_end: dateFormat(response.data[i].fields.date_end)
      //   })

      // if (response.data[i].fields.image == null) {
      //   response.data[i].fields.image = '../assets/category/abstract.jpg';
      // }
      setListExpo(response.listExpoBack);
    }

    //
    loadExpo();
  }, []);

  var exhibitionsList = <LinearProgress style={{ margin: 30, width: 300 }} color="rgba(213, 208, 205, 0.7)" />
  if (listExpo.length > 0) {

    exhibitionsList = listExpo.map((expo, i) => (
      <ListItem key={i} bottomDivider>
        <Avatar style={{ width: 100, height: 160 }} source={{ uri: expo.img }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontFamily: 'Heebo_400Regular' }}>{expo.title}</ListItem.Title>
          <ListItem.Subtitle style={{ fontFamily: 'Heebo_300Light', marginVertical: 5 }}>{expo.place}</ListItem.Subtitle>
          <ListItem.Subtitle style={{ fontFamily: 'Heebo_300Light', marginVertical: 5 }}>{expo.address}</ListItem.Subtitle>
          <ListItem.Subtitle style={{ fontFamily: 'Heebo_400Regular', fontSize: 12 }}>From {expo.date_start} to {expo.date_end}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))
  }

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (

    <View style={styles.container}>
      <View style={{ borderBottomWidth: 0.7, marginHorizontal: 40, borderBottomColor: "rgba(213, 208, 205, 0.7)", marginBottom: 20 }}>
        <Text style={{ fontFamily: 'Heebo_300Light', borderBottomColor: "red", textAlign: "center", fontSize: 18, padding: 20 }}> Exhibitions </Text>
      </View>
      <View style={{ flexDirection: "row" }} >
        <CheckBox
          title='All'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={checkedAllExpo}
          checkedColor='rgba(38, 50, 56, 0.8)'
          uncheckedColor='rgb(213, 208, 205)'
          onPress={checkedAllExpo ? () => setCheckedAllExpo(false) : () => [setCheckedAllExpo(true), setCheckedExpoNearMe(false), setCheckedMyExpo(false)]}
          containerStyle={styles.checkbox}
          textStyle={{ fontSize: 10, color: 'black' }}
        />

        <CheckBox
          title='Near me'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={checkedExpoNearMe}
          checkedColor='rgba(38, 50, 56, 0.8)'
          uncheckedColor='rgb(213, 208, 205)'
          onPress={() => {
            getAllExpoNearMe()
          }}
          containerStyle={styles.checkbox}
          textStyle={{ fontSize: 10, color: 'black' }}
        />

        <CheckBox
          title='My exhibitions'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={checkedMyExpo}
          checkedColor='rgba(38, 50, 56, 0.8)'
          uncheckedColor='rgb(213, 208, 205)'
          onPress={checkedMyExpo ? () => setCheckedMyExpo(false) : () => [setCheckedMyExpo(true), setCheckedAllExpo(false), setCheckedExpoNearMe(false)]}
          containerStyle={styles.checkbox}
          textStyle={{ fontSize: 10, color: 'black' }}
        />
      </View>

      <ScrollView>
        {exhibitionsList}
      </ScrollView>
    </View>

  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
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
