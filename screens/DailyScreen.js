import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { connect } from 'react-redux'
//import Carousel from 'react-native-snap-carousel';

function DailyScreen(props) {

  const [dailyList, setDailyList] = useState([]);

  useEffect(() => {

    const getDailySelection = async () => {
      const data = await fetch(`http://192.168.1.16:3000/get-daily-selection/${props.token}`); //192.168.1.16 ALICE //172.17.1.83 CAPSULE
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

  const addToCollection = async (artwork) => {
    //fetch route saveArtwork
    console.log('add to collection', artwork)
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
                    <Text style={{ fontWeight: 'bold' }}>{el.artist.name} </Text>
                    <Text>{el.artist.instagram} </Text>
                  </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => addToCollection(el.artwork)}>
                  <AntDesign
                    name="hearto"
                    size={25}
                    color="rgb(255, 86, 94)"
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
    marginBottom: 8
  },
  forYouText: {
    fontWeight: 'bold',
    fontSize: 15
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
    }
  }
}

function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyScreen);