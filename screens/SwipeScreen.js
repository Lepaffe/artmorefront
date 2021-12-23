import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons'
import Swiper from 'react-native-deck-swiper'
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';


import { REACT_APP_URL_BACKEND } from "@env";

const SwipeScreen = (props) => {

    const [artworkList, setArtworkList] = useState([])
    //const [favArtwork, setFavArtwork] = useState(false)

    const isFocused = useIsFocused();
    const swipeRef = useRef(null);

    useEffect(() => {
        const getArtworkList = async () => {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/get-artwork-list/${props.token}`);
            const dataJSON = await data.json();
            setArtworkList(dataJSON.artworks);
        }
        getArtworkList();

    }, [isFocused])

    const handleLike = async (cardIndex) => {

        const data = await fetch(`${REACT_APP_URL_BACKEND}/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${props.token}&artworkId=${artworkList[cardIndex]._id}`
        });

    }

    const handleDislike = async (cardIndex) => {

        const data = await fetch(`${REACT_APP_URL_BACKEND}/dislike`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${props.token}&artworkId=${artworkList[cardIndex]._id}`
        });

    }

    const openArtworkDetail = (cardIndex) => {
        props.setSelectedArtwork(artworkList[cardIndex])
        props.navigation.navigate('ArtworkScreen')
    }

    const addArtworkToCollection = async (cardIndex) => {

        const data = await fetch(`${REACT_APP_URL_BACKEND}/add-artworklist/`, {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${props.token}&artworkId=${artworkList[cardIndex]._id}`
        });

        const dataJSON = await data.json();

        if (dataJSON.result) {
            props.addArtwork(artworkList[cardIndex]._id)
            //setFavArtwork(!favArtwork); 
        }
    }

    return (

        <View style={styles.container}>

            <View style={styles.swiperContainer}>

                {artworkList.length > 1 &&
                    (<Swiper
                        ref={swipeRef}
                        cards={artworkList}
                        renderCard={(artwork) => {
                            return (
                                <Image
                                    source={{ uri: artwork.cloudinary }}
                                    style={styles.card}
                                />
                            )
                        }}
                        onSwipedLeft={cardIndex => handleDislike(cardIndex)}
                        onSwipedRight={cardIndex => handleLike(cardIndex)}
                        onSwipedBottom={cardIndex => addArtworkToCollection(cardIndex)}
                        onTapCard={cardIndex => openArtworkDetail(cardIndex)}
                        disableTopSwipe={true}
                        cardIndex={0}
                        backgroundColor={'transparent'}
                        stackSize={5}
                        animateCardOpacity
                        marginTop={-50}

                    />)}

            </View >

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button}>
                    <Entypo
                        name="cross"
                        size={24}
                        color="rgba(255, 86, 94, 0.7)"
                        onPress={() => swipeRef.current.swipeLeft()}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <AntDesign
                        name="hearto"
                        size={20}
                        color='#FF565E'
                        onPress={() => swipeRef.current.swipeBottom()}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <AntDesign
                        name="check"
                        size={24}
                        color="rgba(58, 187, 109, 0.7)"
                        onPress={() => swipeRef.current.swipeRight()}
                    />
                </TouchableOpacity>

            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    swiperContainer: {
        flex: 1,
    },
    card: {
        height: '90%',
        borderRadius: 20,
    },
    buttonContainer: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7
    }
})

function mapStateToProps(state) {
    return { token: state.token }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedArtwork: function (artwork) {
            dispatch({ type: "setSelectedArtwork", artwork })
        },
        addArtwork: function (artworkId) {
            dispatch({ type: 'addArtwork', artworkId })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SwipeScreen);

