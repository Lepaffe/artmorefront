import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons'
import Swiper from 'react-native-deck-swiper'
//import { connect } from 'react-redux'

const SwipeScreen = () => {

    const [artworkList, setArtworkList] = useState([{ name: "Artwork 1", picture: "https://picsum.photos/1080/1080?random=1" }, { name: "Artwork 2", picture: "https://picsum.photos/1080/1080?random=2" }, { name: "Artwork 3", picture: "https://picsum.photos/1080/1080?random=3" }, { name: "Artwork 4", picture: "https://picsum.photos/1080/1080?random=4" }, { name: "Artwork 5", picture: "https://picsum.photos/1080/1080?random=5" }, { name: "Artwork 6", picture: "https://picsum.photos/1080/1080?random=6" }, { name: "Artwork 7", picture: "https://picsum.photos/1080/1080?random=7" }, { name: "Artwork 8", picture: "https://picsum.photos/1080/1080?random=8" }, { name: "Artwork 9", picture: "https://picsum.photos/1080/1080?random=9" }, { name: "Artwork 10", picture: "https://picsum.photos/1080/1080?random=10" }])

    const swipeRef = useRef(null);

    /*useEffect(() => {
        const getArtworkList = async () => {
            const data = await fetch('/getArtworkList');
            const dataJSON = await data.json();
            setArtworkList(dataJSON);
            getArtworkList();
     
    }, [])*/

    const handleLike = (cardIndex) => {
        console.log('like', artworkList[cardIndex])
    }

    const handleDislike = (cardIndex) => {
        console.log('dislike', artworkList[cardIndex])
    }

    const openArtworkDetail = (cardIndex) => {
        console.log('openArtworkDetail', artworkList[cardIndex])
        //props.setSelectedArtwork(artworkList[cardIndex])
        //props.navigation.navigate('ArtworkDetail)
    }

    const addArtworkToCollection = (cardIndex) => {
        console.log('addArtworkToCollection', artworkList[cardIndex])
    }

    return (

        <View style={styles.container}>

            <View style={styles.swiperContainer}>

                <Swiper
                    ref={swipeRef}
                    cards={artworkList}
                    renderCard={(artwork) => {
                        return (
                            <Image
                                source={{ uri: artwork.picture }}
                                style={styles.card}
                            />
                        )
                    }}
                    onSwipedLeft={cardIndex => handleDislike(cardIndex)}
                    onSwipedRight={cardIndex => handleLike(cardIndex)}
                    //onSwipedTop={cardIndex => openArtworkDetail(cardIndex)}
                    onSwipedBottom={cardIndex => addArtworkToCollection(cardIndex)}
                    onTapCard={cardIndex => openArtworkDetail(cardIndex)}
                    disableTopSwipe={true}
                    //verticalSwipe={false}
                    cardIndex={0}
                    backgroundColor={'transparent'}
                    stackSize={5}
                    animateCardOpacity
                />

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

export default SwipeScreen;

/*function mapDispatchToProps(dispatch) {
    return {
        setSelectedArtwork: function (artwork) {
            dispatch({ type: "setSelectedArtwork", artwork })
        }
    }
}
export default connect(null, mapDispatchToProps)(SwipeScreen);*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    swiperContainer: {
        flex: 1,
        marginTop: 6
    },
    card: {
        flex: 1,
        borderRadius: 20
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