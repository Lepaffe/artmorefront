import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList} from 'react-native'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { Avatar, ListItem, Divider } from 'react-native-elements';
import MyAppBar from '../composants/MyAppBar';


const ArtistScreen = (props) => {

    let moreArtworks;
    if (props.selectedArtist) {
        moreArtworks = props.selectedArtist.artistArtwork.map((artwork) =>
            artwork.cloudinary !== props.selectedArtwork.cloudinary &&
           
                < Image
                    source={{ uri: artwork.cloudinary }}
                    style={styles.minipicture}
                    key={artwork._id}
                />
            
        )

    }

    const Item = ({ cloudinary }) => (
        < Image
                    source={{ uri: cloudinary }}
                    style={styles.minipicture}
                    
                />
      );
    /*useEffect(() => {
        aller chercher l'artiste lié à l'oeuvre en BDD et le mettre dans le store
        const data = fetch('/getArtist/:artworkId')
    }, [])*/
    const [dataSource, setDataSource] = useState([]);

   

    return (
        <ScrollView style={styles.container}>

            <View >
            <ListItem containerStyle={{flex: 1, marginLeft: 110, backgroundColor: "none"}}> 
                  
            <Avatar  rounded size="large" source={{    uri:      props.selectedArtist.img  }}/>
            <ListItem.Content>   
                 <ListItem.Title style={styles.artist}> {props.selectedArtist.name}</ListItem.Title> 
                    <ListItem.Subtitle> {props.selectedArtist.instagram} </ListItem.Subtitle> 
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
                {props.selectedArtist.bio}

            </Text>

            <Text style={styles.moreArtworks}>
                ARTWORKS
            </Text>

    
                <SafeAreaView style={styles.container}>
      
          <View 
            style={{
              flex: 1,
              flexDirection: 'column',
            }}>
                
               {moreArtworks}
        
          </View>
      
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

