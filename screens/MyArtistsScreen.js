import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, ScrollView, } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
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
            const data = await fetch(`${REACT_APP_URL_BACKEND}/get-artist-collection/${props.token}`);
            const dataJSON = await data.json();
            setArtistCollection(dataJSON.artistCollection);
        }
        getArtistCollection();

    }, [props.artistList])

    const openArtistDetail = (artist) => {
        props.setSelectedArtist(artist)
        props.navigation.navigate('ArtistScreen')
    }

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <ScrollView style={{ backgroundColor: '#FFF' }}>

            <View style={{ flex: 1, alignItems: 'center', paddingTop: 25, paddingBottom: 15, backgroundColor: '#FFF', }}>
                <Text style={{ fontFamily: 'Heebo_300Light' }}>My Artists</Text>
            </View>

            <View>
                {artistCollection.map((artist, i) => (
                    <TouchableOpacity key={i} onPress={() => openArtistDetail(artist)}>
                        <ListItem bottomDivider>
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
    return { token: state.token, artistList: state.artistList }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedArtist: function (artist) {
            dispatch({ type: 'setSelectedArtist', artist })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyArtistsScreen);
