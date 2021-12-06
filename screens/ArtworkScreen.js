import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'

const ArtworkScreen = (props) => {

    /*useEffect(() => {
        aller chercher l'artiste lié à l'oeuvre en BDD et le mettre dans le store
        const data = fetch('/getArtist/:artworkId')
    }, [])*/


    return (
        <ScrollView style={styles.container}>

            <View style={styles.imageContainer}>
                <Image source={{ uri: props.selectedArtwork.urlCloudinary }} style={styles.image} />
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
                <Text style={styles.artist}>{props.selectedArtist.name}</Text>
                <Text style={styles.instagram}>{props.selectedArtist.instagram}</Text>
            </View>

            <Text style={styles.info}>
                {props.selectedArtwork.year}  {"\n"}
                {props.selectedArtwork.size} {"\n"}
                {props.selectedArtwork.location} {"\n"}
                {props.selectedArtwork.mediums} {"\n"}
                {props.selectedArtwork.technics}
            </Text>

            <Text style={styles.description}>
                {props.selectedArtwork.description}
            </Text>

            <Text style={styles.moreArtworks}>
                MORE ARTWORKS
            </Text>

            <ScrollView horizontal={true} style={styles.minipicturesContainer}>

                {/*{props.selectedArtist.artworks.map((artwork, i) => {
                    <Image source={{ uri: artwork.url }} style={styles.minipicture}/>
                })}*/}

                <Image source={{ uri: "https://picsum.photos/1080/1080?random=1" }} style={styles.minipicture} />
                <Image source={{ uri: "https://picsum.photos/1080/1080?random=3" }} style={styles.minipicture} />
                <Image source={{ uri: "https://picsum.photos/1080/1080?random=4" }} style={styles.minipicture} />
                <Image source={{ uri: "https://picsum.photos/1080/1080?random=5" }} style={styles.minipicture} />
                <Image source={{ uri: "https://picsum.photos/1080/1080?random=6" }} style={styles.minipicture} />
                <Image source={{ uri: "https://picsum.photos/1080/1080?random=7" }} style={styles.minipicture} />

            </ScrollView>

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