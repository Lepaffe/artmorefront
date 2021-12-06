import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList} from 'react-native'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { Avatar, ListItem, Divider } from 'react-native-elements';

const ArtistScreen = (props) => {

    /*useEffect(() => {
        aller chercher l'artiste lié à l'oeuvre en BDD et le mettre dans le store
        const data = fetch('/getArtist/:artworkId')
    }, [])*/
    const [dataSource, setDataSource] = useState([]);

    useState(() => {
        let items = Array.apply(null, Array(60)).map((v, i) => {
          return { id: i, src: 'http://placehold.it/200x200?text=' + (i + 1) };
        });
        setDataSource(items);
      }, []);

    return (
        <ScrollView style={styles.container}>

            <View >
            <ListItem containerStyle={{flex: 1, marginLeft: 110, backgroundColor: "none"}}> 
                  
            <Avatar  rounded size="large" source={{    uri:      'https://res.cloudinary.com/lepaffe/image/upload/v1638785691/Artmore/IMG_5535_uu5xwh.png'  }}/>
            <ListItem.Content>   
                 <ListItem.Title style={styles.artist}> Tim Zdey</ListItem.Title> 
                    <ListItem.Subtitle> @timzdey  </ListItem.Subtitle> 
                     </ListItem.Content>  
                     </ListItem>
            </View>
            <View></View>
            
            <Divider  orientation="horizontal" inset={true} insetType="left"   />
            <View style={styles.mainInfoContainer}>

                <Text >{props.selectedArtist.city},{props.selectedArtist.country} </Text>
                <TouchableOpacity style={styles.button}>
                    <AntDesign
                        name="heart"
                        size={20}
                        color="rgb(255, 86, 94)"
                        onPress={() => console.log('addToCollection')}
                    />
                </TouchableOpacity>
            </View>

    
            <Text style={styles.moreArtworks}>
                BIO
            </Text>
            <Text style={styles.description}>
                {props.selectedArtist.bio} "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

            </Text>

            <Text style={styles.moreArtworks}>
                ARTWORKS
            </Text>

                {/*{props.selectedArtist.artistArtwork.map((artwork, i) => {
                    <Image source={{ uri: artwork.url }} style={styles.minipicture}/>
                })}*/}
                <SafeAreaView style={styles.container}>
      <FlatList
        data={dataSource}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}>
            <Image source={{ uri: "https://picsum.photos/1080/1080?random=1" }} style={styles.minipicture} />
                <Image source={{ uri: "https://picsum.photos/1080/1080?random=3" }} style={styles.minipicture} />
                <Image source={{ uri: "https://picsum.photos/1080/1080?random=4" }} style={styles.minipicture} />
                <Image source={{ uri: "https://picsum.photos/1080/1080?random=5" }} style={styles.minipicture} />
                <Image source={{ uri: "https://picsum.photos/1080/1080?random=6" }} style={styles.minipicture} />
                <Image source={{ uri: "https://picsum.photos/1080/1080?random=7" }} style={styles.minipicture} />

          </View>
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>



               

            </ScrollView>

        
    )
}

function mapStateToProps(state) {
    return { selectedArtwork: state.selectedArtwork, selectedArtist: state.selectedArtist }
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
        
        height: 200,
       
        margin: 5,
    },
    avatar: {
        width: 80,
        height: 80,
        
    }
})