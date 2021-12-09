import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList} from 'react-native'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { Avatar, ListItem, Divider } from 'react-native-elements';
import MyAppBar from '../composants/MyAppBar';
// masonryList to display the images in a grid
import MasonryList from '@react-native-seoul/masonry-list';
import {REACT_APP_URL_BACKEND} from "@env";



const ArtistScreen = (props) => {

    //let moreArtworks;
    //if (props.selectedArtist) {
     //   moreArtworks = props.selectedArtist.artistArtwork.map((artwork) =>
           
       //         < Image
         //           source={{ uri: artwork.cloudinary }}
          //          style={styles.minipicture}
           //         key={artwork._id}
            //    />
            
       // )

    //}

    // renderItem to use in the MasonryList componment to render a grid with two colum to display
    // the artworks of the artists (instead of a map, which does not work with flatlist and masonryList)

    const renderItem = ({ item }) => { console.log(item)
        return (
        < Image
                    source={{ uri: item.cloudinary }}
                    style={styles.minipicture}
                    key={item._id}
                />
      )};

   

    
    /*useEffect(() => {
        aller chercher l'artiste lié à l'oeuvre en BDD et le mettre dans le store
        const data = fetch('/getArtist/:artworkId')
    }, [])*/
    const [dataSource, setDataSource] = useState([]);
    const [likedArtist, setLikedArtist] = useState(false);
    const [colorLike, setColorLike] = useState("black")

   



let addToCollection = async (id) => { 
    if (likedArtist == false ){
     const data = await fetch(`${REACT_APP_URL_BACKEND}/add-artistlist/`,{
         method: "POST",
         headers: {'Content-Type':'application/x-www-form-urlencoded'},
         body:`token=${props.token}&artistId=${id}`
     });
     
      //192.168.1.16 ALICE //172.17.1.83 CAPSULE
         const dataJSON = await data.json();
          setColorLike('#FF565E');
 } else {
     const data = await fetch(`${REACT_APP_URL_BACKEND}/delete-artistlist/`,{
         method: "POST",
         headers: {'Content-Type':'application/x-www-form-urlencoded'},
         body:`token=${props.token}&artistId=${id}`
     });
      //192.168.1.16 ALICE //172.17.1.83 CAPSULE
         const dataJSON = await data.json();
         setColorLike('black');
 }

 setLikedArtist(!likedArtist); 
}


   

    return (
        <ScrollView >
            <View style={styles.container}>

            <View >
            <ListItem containerStyle={{flex: 1, marginLeft: 110, backgroundColor: "none"}}> 
                  
            <Avatar  rounded size="large" source={{    uri:      props.selectedArtist.img  }}/>
            <ListItem.Content>   
                 <ListItem.Title style={styles.artist}> {props.selectedArtist.name}</ListItem.Title> 
                    <ListItem.Subtitle> {props.selectedArtist.instagram} </ListItem.Subtitle> 
                     </ListItem.Content>  
                     </ListItem>
            </View>
            
            
            <Divider  orientation="horizontal" inset={true} insetType="left"   />
            <View style={styles.mainInfoContainer}>

                <Text >{props.selectedArtist.city},{props.selectedArtist.country} </Text>
                <TouchableOpacity style={styles.button}>
                    <AntDesign
                        name="heart"
                        size={20}
                        color={colorLike}
                        onPress={ () => addToCollection(props.selectedArtist._id) }
                    />
                </TouchableOpacity>
            </View>

    
            <Text style={styles.moreArtworks}>
                BIO
            </Text>
            <Text style={styles.description}>
                {props.selectedArtist.bio}

            </Text>
            

            <Text style={styles.moreArtworks}>
                ARTWORKS
            </Text>

            </View>
                <View style={{flex: 1}}>


                <MasonryList
  data={props.selectedArtist.artistArtwork}
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

        
    )
}

function mapStateToProps(state) {
    return { selectedArtwork: state.selectedArtwork, selectedArtist: state.selectedArtist, token: state.token }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedArtist: function (artist) {
            dispatch({ type: 'setSelectedArtist', artist })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistScreen);

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

