import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux'
import DailyArtwork from '../composants/DailyArtwork';

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

import { REACT_APP_URL_BACKEND } from "@env";

function DailyScreen(props) {

  let [fontsLoaded] = useFonts({
    Heebo_100Thin,
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_800ExtraBold,
    Heebo_900Black
  })

  const [dailyList, setDailyList] = useState([]);

  useEffect(() => {

    const getDailySelection = async () => {
      const data = await fetch(`${REACT_APP_URL_BACKEND}/get-daily-selection/${props.token}`);
      const dataJSON = await data.json();
      const dailyListBack = dataJSON.artworksWithArtists;
      setDailyList(dailyListBack);
      
    }

    getDailySelection();

  }, [])

  const openArtworkDetail = (artwork) => {
    props.setSelectedArtwork(artwork)
    props.navigation.navigate('ArtworkScreen')
  }

  const openArtistDetail = (artist) => {
    props.setSelectedArtist(artist)
    props.navigation.navigate('ArtistScreen')

  }

  const addToCollection = async (artwork) => {

    const data = await fetch(`${REACT_APP_URL_BACKEND}/add-artworklist/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.token}&artworkId=${artwork._id}`
    });

    props.addArtwork(artwork._id)
  }

  const removeFromCollection = async (artwork) => {

    const data = await fetch(`${REACT_APP_URL_BACKEND}/delete-artworklist/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.token}&artworkId=${artwork._id}`
    });

    props.deleteArtwork(artwork._id)
  }

  if (!fontsLoaded) {
    return <AppLoading />
  }
  console.log('dailyList',dailyList)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.dailyText}>Daily selection</Text>
      <Text style={styles.forYouText}>WHAT'S FOR YOU TODAY ?</Text>

      <ScrollView horizontal={true} >

        {dailyList.map(el => {

          return (
            <DailyArtwork
              key={el.artwork._id}
              openArtworkDetail={openArtworkDetail}
              openArtistDetail={openArtistDetail}
              addToCollection={addToCollection}
              removeFromCollection={removeFromCollection}
              artwork={el.artwork}
              artist={el.artist}
              isFav={el.isFav}
            />
          )
        })}

      </ScrollView>
    </SafeAreaView >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  dailyText: {
    fontSize: 30,
    marginTop: 25,
    marginBottom: 8,
    fontFamily: 'Heebo_300Light'
  },
  forYouText: {
    fontSize: 15,
    fontFamily: 'Heebo_700Bold'
  }
})

function mapDispatchToProps(dispatch) {
  return {
    setSelectedArtwork: function (artwork) {
      dispatch({ type: 'setSelectedArtwork', artwork })
    },
    setSelectedArtist: function (artist) {
      dispatch({ type: 'setSelectedArtist', artist })
    },
    addArtwork: function (artworkId) {
      dispatch({ type: 'addArtwork', artworkId })
    },
    deleteArtwork: function (artworkId) {
      dispatch({ type: 'deleteArtwork', artworkId })
    },

  }
}

function mapStateToProps(state) {
  return { token: state.token, artworkList: state.artworkList }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyScreen);