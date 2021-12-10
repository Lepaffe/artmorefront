import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView, } from 'react-native'
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
import { REACT_APP_URL_BACKEND } from "@env";
import { connect } from 'react-redux'

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

function MyArtistsScreen(props) {

    let [fontsLoaded] = useFonts({
        Heebo_100Thin,
        Heebo_300Light,
        Heebo_400Regular,
        Heebo_500Medium,
        Heebo_700Bold,
        Heebo_800ExtraBold,
        Heebo_900Black
    })

    const [artistCollection, setArtistCollection] = useState([])

    useEffect(() => {
        const getArtistCollection = async () => {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/get-artist-collection/${props.token}`); //192.168.1.16 ALICE //172.17.1.83 CAPSULE
            const dataJSON = await data.json();
            setArtistCollection(dataJSON.artistCollection.artistList);
            console.log("data", dataJSON.artistCollection.artistList)
        }
        getArtistCollection();
    }, [props.artistList])

    let list = [...artistCollection]
    console.log("artist", list )

    if (!fontsLoaded) {
        return <AppLoading />
    }

    const openArtistDetail = (artist) => {
        props.setSelectedArtist(artist)
       
        props.navigation.navigate('ArtistScreen')
        
    
      }

    return (
        <ScrollView style={{ backgroundColor: '#FFF' }}>
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 25, paddingBottom: 15, backgroundColor: '#FFF', }}>
                <Text style={{ fontFamily: 'Heebo_300Light' }}> My Artists</Text>
            </View>
            <View>
                {list.map((artist, i) => (
                    <TouchableOpacity onPress={() => openArtistDetail(artist)}>
                    <ListItem key={i} bottomDivider>
                        <Avatar source={{ uri: artist.img }} />
                        <ListItem.Content>
                            <ListItem.Title>{artist.name}</ListItem.Title>
                            <ListItem.Subtitle>{artist.instagram}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}


function mapStateToProps(state) {
    return { token: state.token, artistList: state.artistList, selectedArtist: state.selectedArtist}
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedArtist: function (artist) {
            dispatch({ type: 'setSelectedArtist', artist })
        },
        setSelectedArtwork: function (artwork) {
            dispatch({ type: "setSelectedArtwork", artwork })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyArtistsScreen);

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
        height: 300,

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