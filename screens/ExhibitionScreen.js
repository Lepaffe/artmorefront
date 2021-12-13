import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { LinearProgress } from 'react-native-elements'
import { connect } from 'react-redux'
import { REACT_APP_URL_BACKEND } from "@env";
import { useIsFocused } from '@react-navigation/native';
import Expo from '../composants/Expo'

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

const listTab = [
  {
    name: "All"
  },
  {
    name: "Near me"
  },
  {
    name: "My exhibitions"
  }
]


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

  const [listExpo, setListExpo] = useState([])
  const [status, setStatus] = useState('')
  const [datalist, setDatalist] = useState([])
  const [myExpoList, setMyExpoList] = useState([]);
  const [userCity, setUserCity] = useState('')
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadAllExpo() {
      var rawResponse = await fetch(`${REACT_APP_URL_BACKEND}/get-exhibitions/${props.token}`);
      var response = await rawResponse.json();

      if (response.listExpoBack && response.userCity) {
        setListExpo(response.listExpoBack);
        setUserCity(response.userCity)
        setDatalist(response.listExpoBack)
        setStatus('All')
      }

    }
    loadAllExpo();

    async function loadMyExpo() {
      var rawResponse = await fetch(`${REACT_APP_URL_BACKEND}/get-my-exhibitions/${props.token}`);
      var response = await rawResponse.json();
      response.userExpoList && setMyExpoList(response.userExpoList);
    }
    loadMyExpo();


  }, [isFocused]);


  const addExpo = async (title, place, address, date_start, date_end, img, city) => {

    const data = await fetch(`${REACT_APP_URL_BACKEND}/add-exhibitions/${props.token}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.token}&title=${title}&place=${place}&address=${address}&date_start=${date_start}&date_end=${date_end}&img=${img}&city=${city}`
    });

    const dataJSON = await data.json();
    dataJSON.result && setMyExpoList([...myExpoList, dataJSON.addedExpo])

  }

  const deleteExpo = async (title) => {

    const data = await fetch(`${REACT_APP_URL_BACKEND}/delete-exhibitions/${props.token}/${title}`, {
      method: "DELETE"
    });
    const dataJSON = await data.json();
    if (dataJSON.result) {
      setMyExpoList(myExpoList.filter(expo => expo.title != title))
      setDatalist(myExpoList.filter(expo => expo.title != title))
    }
  };


  const setStatusFilter = status => {
    if (status === 'All') {
      setDatalist(listExpo)
    }
    else if (status === 'Near me') {
      setDatalist([...listExpo.filter(e => e.city === userCity)])
    }
    else if (status === 'My exhibitions') {
      setDatalist(myExpoList)
    }
    setStatus(status)
  }

  var exhibitionsList = <LinearProgress style={{ margin: 30, width: 300 }} color="rgba(213, 208, 205, 0.7)" />

  if (datalist.length > 0) {
    exhibitionsList = datalist.map(item => {
      let isFav = myExpoList.some(expo => item.title === expo.title)
      return (
        < Expo key={item.title} isFav={isFav} addExpo={addExpo} deleteExpo={deleteExpo} title={item.title} place={item.place} img={item.img} date_start={item.date_start} date_end={item.date_end} address={item.address} city={item.city} />
      )
    })
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

        {listTab.map(e => (
          <TouchableOpacity style={[styles.btnTab, status === e.name && styles.btnTabActive]} onPress={() => setStatusFilter(e.name)}>
            <Text style={styles.textTab}>{e.name}</Text>
          </TouchableOpacity>
        ))
        }
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  btnTab: {
    padding: 10,
    justifyContent: 'center',
    borderWidth: 0.5,
    width: Dimensions.get('window').width / 3,
    borderColor: 'rgba(213, 208, 205, 0.3)'
  },
  textTab: {
    textAlign: 'center'
  },
  btnTabActive: {
    backgroundColor: 'rgba(213, 208, 205, 0.3)'
  },
});


function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(mapStateToProps, null)(ExhibitionScreen);
