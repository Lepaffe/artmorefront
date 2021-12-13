import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView } from 'react-native'
import MasonryList from '@react-native-seoul/masonry-list';
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

function CollectionScreen(props) {

    let [fontsLoaded] = useFonts({
        Heebo_100Thin,
        Heebo_300Light,
        Heebo_400Regular,
        Heebo_500Medium,
        Heebo_700Bold,
        Heebo_800ExtraBold,
        Heebo_900Black
    })


    const [collection, setCollection] = useState([])

    useEffect(() => {

        const getCollection = async () => {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/get-collection/${props.token}`); //192.168.1.16 ALICE //172.17.1.83 CAPSULE
            const dataJSON = await data.json();
            setCollection(dataJSON.collection.artworkList);

        }
        getCollection();
    }, [props.artworkList])

    let list = [...collection]




    // renderItem to use in the MasonryList componment to render a grid with two colum to display
    // the artworks of the artists (instead of a map, which does not work with flatlist and masonryList)
    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity key={item._id} onPress={() => openArtworkDetail(item)}>
                < Image
                    source={{ uri: item.cloudinary }}
                    style={styles.minipicture}

                />
            </TouchableOpacity>
        )
    };

    // Récupère donnée du artwork pour le store et redirige vers le ArtworkScreen de l'oeuvre cliquée
    const openArtworkDetail = artwork => {

        props.setSelectedArtwork(artwork);
        props.navigation.navigate('ArtworkScreen');
    }


    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <ScrollView style={{ backgroundColor: '#FFF' }}>
            <View style={{ flex: 1, alignItems: 'center', paddingBottom: 15, backgroundColor: '#FFF', }}>
                <Text style={{ fontFamily: 'Heebo_300Light', marginTop: 25 }} > My personnal collection</Text>
            </View>
            <View>

                <MasonryList
                    data={list}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingHorizontal: 0,
                        alignSelf: 'stretch'
                    }}

                />
            </View>
        </ScrollView>
    );
}

function mapStateToProps(state) {
    return { token: state.token, selectedArtwork: state.selectedArtwork, selectedArtist: state.selectedArtist, artworkList: state.artworkList }
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

export default connect(mapStateToProps, mapDispatchToProps)(CollectionScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 22,
        marginTop: 20,
        backgroundColor: '#FFF'
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

