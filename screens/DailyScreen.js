import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { connect } from 'react-redux'
//import Carousel from 'react-native-snap-carousel';
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
  const [likedArtwork, setLikedArtwork] = useState(false)
  const [colorLike, setColorLike] = useState(["black","black","black","black" ])

  useEffect(() => {

    const getDailySelection = async () => {
      const data = await fetch(`${REACT_APP_URL_BACKEND}/get-daily-selection/${props.token}`);
      const dataJSON = await data.json();
      const dailyListBack = dataJSON.artworksWithArtists
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

  const addToCollection = async (artwork, i) => {
    if (likedArtwork == false) {
      const data = await fetch(`${REACT_APP_URL_BACKEND}/add-artworklist/`, {
          method: "POST",
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `token=${props.token}&artworkId=${artwork._id}`
      });

      const dataJSON = await data.json();
      copyColorLike= [...colorLike]
      copyColorLike.splice(i,1, '#FF565E')
      setColorLike(copyColorLike)
       
       props.addArtwork(artwork._id)
       

} else {
  const data = await fetch(`${REACT_APP_URL_BACKEND}/delete-artworklist/`,{
      method: "POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`token=${props.token}&artworkId=${artwork._id}`
  });
      const dataJSON = await data.json();
      copyColorLike= [...colorLike]
      copyColorLike.splice(i,1, 'black')
      props.deleteArtwork(artwork._id)
      setColorLike(copyColorLike)
}

  setLikedArtwork(!likedArtwork);

    console.log('add to collection', artwork)
  }

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.dailyText}>Daily selection</Text>
      <Text style={styles.forYouText}>WHAT'S FOR YOU TODAY ?</Text>

      <ScrollView
        horizontal={true}
      >
        {dailyList.map((el, i) => {
          return (
            <View key={el.artwork._id} style={styles.itemDaily}>

              <TouchableOpacity
                style={styles.pictureArtwork}
                onPress={() => openArtworkDetail(el.artwork)}
              >
                < Image
                  source={{ uri: el.artwork.cloudinary }}
                  style={styles.pictureArtwork}
                />
              </TouchableOpacity>

              <View style={styles.bottomPicture}>

                <TouchableOpacity
                  style={styles.artistInfo}
                  onPress={() => openArtistDetail(el.artist)}
                >
                  < Image
                    source={{ uri: el.artist.img }}
                    style={styles.pictureArtist}
                  />

                  <View>
                    <Text style={{ fontFamily: 'Heebo_700Bold' }}>{el.artist.name} </Text>
                    <Text style={{ fontFamily: 'Heebo_300Light' }}>{el.artist.instagram} </Text>
                  </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => addToCollection(el.artwork, i)}>
                  <AntDesign
                    name="hearto"
                    size={25}
                    color={colorLike[i]}
                  />
                </TouchableOpacity>
              </View>

            </View>)
        })}

      </ScrollView>
    </SafeAreaView >
  );
}

const windowWidth = Dimensions.get('window').width;

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
  },
  itemDaily: {
    width: windowWidth - 20,
    alignItems: 'center',
    height: '85%',
    marginTop: 30,
    marginLeft: 10
  },
  pictureArtwork: {
    flex: 1,
    width: '100%'
  },
  pictureArtist: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  artistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomPicture: {
    marginTop: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
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