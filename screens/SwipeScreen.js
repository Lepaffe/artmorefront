import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons'
import Swiper from 'react-native-deck-swiper'
import { connect } from 'react-redux'

const SwipeScreen = (props) => {

    const [artworkList, setArtworkList] = useState([])

    const swipeRef = useRef(null);

    useEffect(() => {
        const getArtworkList = async () => {
            const data = await fetch('http://192.168.1.16:3000/get-artwork-list'); //192.168.1.16 ALICE //172.17.1.83 CAPSULE
            const dataJSON = await data.json();
            setArtworkList(dataJSON.artworks);
        }
        getArtworkList();

    }, [])

    const handleLike = (cardIndex) => {
        console.log('like', artworkList[cardIndex])
    }

    const handleDislike = (cardIndex) => {
        console.log('dislike', artworkList[cardIndex])
    }

    const openArtworkDetail = (cardIndex) => {
        console.log('openArtworkDetail', artworkList[cardIndex])
        props.setSelectedArtwork(artworkList[cardIndex])
        props.navigation.navigate('ArtworkScreen')
    }

    const addArtworkToCollection = (cardIndex) => {
        console.log('addArtworkToCollection', artworkList[cardIndex])
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
                        color="rgb(255, 86, 94)"
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

function mapDispatchToProps(dispatch) {
    return {
        setSelectedArtwork: function (artwork) {
            dispatch({ type: "setSelectedArtwork", artwork })
        }
    }
}
export default connect(null, mapDispatchToProps)(SwipeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    swiperContainer: {
        flex: 1,
    },
    card: {
        height: '80%',
        borderRadius: 20
    },
    card: {
        flex: 1,
        borderRadius: 20,
    },
    buttonContainer: {
        height: 75,
        marginBottom: 5,
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