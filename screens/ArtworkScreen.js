import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';

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

const ArtworkScreen = (props) => {

    let [fontsLoaded] = useFonts({
        Heebo_100Thin,
        Heebo_300Light,
        Heebo_400Regular,
        Heebo_500Medium,
        Heebo_700Bold,
        Heebo_800ExtraBold,
        Heebo_900Black
    })

    const [likedArtwork, setLikedArtwork] = useState(false)
    const [colorLike, setColorLike] = useState("black")

    //on récupère l'artiste associé à l'artwork et on le met dans le store
    useEffect(() => {
        const getArtistDetail = async () => {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/get-artist-detail/${props.selectedArtwork._id}`); //192.168.1.16 ALICE //172.17.1.83 CAPSULE
            const dataJSON = await data.json();
            props.setSelectedArtist(dataJSON.artist);
        }
        getArtistDetail();
    }, [])

    //petites images de MoreArtworks
    let moreArtworks;
    if (props.selectedArtist) {
        moreArtworks = props.selectedArtist.artistArtwork.map((artwork, i) =>
            artwork.cloudinary !== props.selectedArtwork.cloudinary &&
            <TouchableOpacity key={i} onPress={() => openArtworkDetailFromSameArtist(artwork)}>
                < Image
                    source={{ uri: artwork.cloudinary }}
                    style={styles.minipicture}
                    key={artwork._id}
                />
            </TouchableOpacity>
        )

    }

    // Récupère donnée du artwork pour le store et redirige vers le ArtworkScreen de l'oeuvre cliquée
    const openArtworkDetailFromSameArtist = artwork => {
        console.log(artwork)
        props.setSelectedArtwork(artwork);
        props.navigation.navigate('ArtworkScreen');
    }

    // Toggle qui add et delete des oeuvres dans la artworklist sur le store quand on press sur le coeur du like + changement de couleur
    let addToCollection = async (id) => {
        if (likedArtwork == false) {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/add-artworklist/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.token}&artworkId=${id}`
            });

            const dataJSON = await data.json();
            setColorLike('#FF565E');
        } else {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/delete-artworklist/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.token}&artworkId=${id}`
            });
            const dataJSON = await data.json();
            setColorLike('black');
        }

        setLikedArtwork(!likedArtwork);
    }

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            {props.selectedArtist && //sans cette condition, le UseEffect ne se charge pas car direct un message d'erreur comme quoi "props.selectedArtist = null"
                <>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: props.selectedArtwork.cloudinary }} style={styles.image} />
                        <TouchableOpacity style={styles.button}>
                            <AntDesign
                                name="heart"
                                size={35}
                                color={colorLike}
                                onPress={() => addToCollection(props.selectedArtwork._id)}
                            />
                        </TouchableOpacity>
                    </View>


                    <View style={styles.mainInfoContainer}>
                        <Text style={styles.name}>{props.selectedArtwork.name}</Text>

                        <View style={styles.artistinfo}>
                            <Text onPress={() => props.navigation.navigate('ArtistScreen')} style={styles.artist}>{props.selectedArtist.name}</Text>
                            <Text style={styles.instagram}>{props.selectedArtist.instagram}</Text>
                        </View>

                    </View>

                    <Text style={styles.info}>
                        {props.selectedArtwork.year}  {"\n"}
                        {props.selectedArtwork.size} {"\n"}
                        {props.selectedArtwork.location} {"\n"}
                        {props.selectedArtwork.medium} {"\n"}
                        {props.selectedArtwork.technic}
                    </Text>

                    <Text style={styles.description}>
                        {props.selectedArtwork.desc}
                    </Text>

                    <Text style={styles.moreArtworks}>
                        MORE ARTWORKS
                    </Text>

                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.minipicturesContainer}>
                        {moreArtworks}
                    </ScrollView>
                </>
            }
        </ScrollView >

    )
}

function mapStateToProps(state) {
    return { selectedArtwork: state.selectedArtwork, selectedArtist: state.selectedArtist, token: state.token }
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

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 22,
        paddingTop: 40,
        paddingBottom: 50,
        backgroundColor: '#FFF',
        height: windowHeight
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
        marginTop: 20,
        marginBottom: 25,
        alignItems: 'center'
    },
    name: {
        fontSize: 25,
        fontFamily: 'Heebo_700Bold'
    },
    artist: {
        fontSize: 20,
        fontFamily: 'Heebo_300Light'
    },
    instagram: {
        fontFamily: 'Heebo_300Light'
    },
    artistinfo: {
        alignItems: 'center'
    },
    info: {
        marginBottom: 25,
        fontFamily: 'Heebo_400Regular',

    },
    description: {
        marginBottom: 25,
        textAlign: 'justify',
        fontFamily: 'Heebo_300Light'
    },
    moreArtworks: {
        fontWeight: 'bold',
        marginBottom: 12
    },
    minipicturesContainer: {
        flexDirection: 'row'
    },
    minipicture: {
        width: 80,
        height: 80,
        marginRight: 10,
        marginBottom: 70
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkScreen);