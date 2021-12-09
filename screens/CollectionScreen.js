import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Image, TouchableOpacity , Text, ScrollView} from 'react-native'
import MasonryList from '@react-native-seoul/masonry-list';
import {REACT_APP_URL_BACKEND} from "@env";
import { connect } from 'react-redux'


function CollectionScreen(props) {

  const [collection, setCollection] = useState([])

  useEffect(() => {
    const getCollection = async () => {
        const data = await fetch(`${REACT_APP_URL_BACKEND}/get-collection/${props.token}`); //192.168.1.16 ALICE //172.17.1.83 CAPSULE
        const dataJSON = await data.json();
        setCollection(dataJSON.collection.artworkList);
        console.log("data", dataJSON.collection.artworkList)
    }
    getCollection();
}, [])

let list = [...collection]

console.log("list", list)
const renderItem = ({ item }) => { console.log(item)
    return (
    < Image
                source={{ uri: item.cloudinary }}
                style={styles.minipicture}
                key={item._id}
            />
  )};


    
     //   moreArtworks = props.selectedArtist.artistArtwork.map((artwork) =>
           
       //         < Image
         //           source={{ uri: artwork.cloudinary }}
          //          style={styles.minipicture}
           //         key={artwork._id}
            //    />
            
       // )

    //}
 return (
     <ScrollView>
   <View style={{ flex: 1, alignItems: 'center', marginBottom:15 }}>
     <Text style={{ marginTop: 25 }} > My personnal collection</Text>
     </View>
     <View style={{flex: 1}}>

     <MasonryList
  data={list}
  keyExtractor={item => item.id}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  renderItem={renderItem}
  contentContainerStyle={{
    paddingHorizontal: 0,
    alignSelf: 'stretch',
  }}
 
                />





   </View>
   </ScrollView>
 );
}

function mapStateToProps(state) {
    return { token: state.token }
}

export default connect(mapStateToProps, null)(CollectionScreen);

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

