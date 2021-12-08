import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Image, TouchableOpacity , Text, ScrollView,} from 'react-native'
import { Card, ListItem, Button, Icon , Avatar} from 'react-native-elements'
import {REACT_APP_URL_BACKEND} from "@env";


function MyArtistsScreen(props) {

  const [artistCollection, setArtistCollection] = useState([])

  useEffect(() => {
    const getArtistCollection = async () => {
        const data = await fetch(`${REACT_APP_URL_BACKEND}/get-artist-collection/`); //192.168.1.16 ALICE //172.17.1.83 CAPSULE
        const dataJSON = await data.json();
        setArtistCollection(dataJSON.artistCollection.artistList);
        console.log("data", dataJSON.artistCollection.artistList)
    }
    getArtistCollection();
}, [])

let list = [...artistCollection]


 return (
<ScrollView>
   <View style={{ flex: 1, alignItems: 'center', marginTop: 25, marginBottom: 15 }}>
     <Text> My Artists</Text>
   </View>
   <View>  
     {    list.map((artist, i) => ( 
          <ListItem key={i} bottomDivider> 
                 <Avatar source={{uri: artist.img}} /> 
                        <ListItem.Content>        
                            <ListItem.Title>{artist.name}</ListItem.Title>   
                                   <ListItem.Subtitle>{artist.city}</ListItem.Subtitle>  
                                         </ListItem.Content>  
                                             </ListItem>  
                                               ))  }
                                               </View>
   </ScrollView>
 );
}

export default MyArtistsScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      margin: 22,
      marginTop: 20,
      
      
  },
  imageContainer: {
      alignItems: 'center',
      padding: 10,
  },
  image: {
      width: "100%",
      height: 500
  },
  button: {
      position: 'absolute',
      bottom: -8,
      right: 0
  },
  mainInfoContainer: {
      marginTop: 10,
      marginBottom: 20,
      alignItems: 'center'
  },
  name: {
      fontSize: 25,
      fontWeight: 'bold'
  },
  artist: {
      fontSize: 20
  },
  info: {
      marginBottom: 25
  },
  description: {
      marginBottom: 25,
      textAlign: 'justify'
  },
  moreArtworks: {
      fontWeight: 'bold',
      marginBottom: 12
  },
  minipicturesContainer: {
      flexDirection: 'row'
  },
  minipicture: {
      justifyContent: 'center',
      alignItems: 'center',
      height:300 ,
      
      margin: 3,
  },
  avatar: {
      width: 80,
      height: 80,
      
  },
  grid: {
      marginTop: 12,
      width: '33%',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingStart: 16,
      paddingEnd: 16,
      paddingTop: 8,
      marginRight: 10,
      paddingBottom: 8,
      borderRadius: 8,
    },
})