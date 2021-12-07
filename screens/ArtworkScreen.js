import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'

const ArtworkScreen = (props) => {

    //on récupère l'artiste associé à l'artwork et on le met dans le store
    useEffect(() => {
        const getArtistDetail = async () => {
            const data = await fetch(`http://172.17.1.83:3000/get-artist-detail/${props.selectedArtwork._id}`);
            const dataJSON = await data.json();
            props.setSelectedArtist(dataJSON.artist);
        }
        getArtistDetail();
    }, [])

    //petites images de MoreArtworks
    let moreArtworks;
    if (props.selectedArtist) {
        moreArtworks = props.selectedArtist.artistArtwork.map((artwork) =>
            artwork.cloudinary !== props.selectedArtwork.cloudinary &&
            <TouchableOpacity onPress={() => openArtworkDetailFromSameArtist(artwork)}>
                < Image
                    source={{ uri: artwork.cloudinary }}
                    style={styles.minipicture}
                    key={artwork._id}
                />
            </TouchableOpacity>
        )

    }
    const openArtworkDetailFromSameArtist = artwork => {
        console.log(artwork)
        props.setSelectedArtwork(artwork);
        props.navigation.navigate('ArtworkScreen');
    }

    return (

        <ScrollView style={styles.container}>
            {props.selectedArtist && //sans cette condition, le UseEffect ne se charge pas car direct un message d'erreur comme quoi "props.selectedArtist = null"
                <>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: props.selectedArtwork.cloudinary }} style={styles.image} />
                        <TouchableOpacity style={styles.button}>
                            <AntDesign
                                name="heart"
                                size={35}
                                color="rgb(255, 86, 94)"
                                onPress={() => console.log('addToCollection')}
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

                    <ScrollView horizontal={true} style={styles.minipicturesContainer}>
                        {moreArtworks}
                    </ScrollView>
                </>
            }
        </ScrollView >
    )
}

function mapStateToProps(state) {
    return { selectedArtwork: state.selectedArtwork, selectedArtist: state.selectedArtist }
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 22,
        marginTop: 50
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
        fontWeight: 'bold'
    },
    artist: {
        fontSize: 20
    },
    artistinfo: {
        alignItems: 'center'
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
        width: 80,
        height: 80,
        marginRight: 10
    }
})