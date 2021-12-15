import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import MyIcon from '../composants/myIcons';

const DailyArtwork = (props) => {

    const [isFav, setIsFav] = useState(props.isFav)

    const handleClick = (artwork) => {

        if (isFav) {
            props.removeFromCollection(artwork)
        } else {
            props.addToCollection(artwork)
        }

        setIsFav(!isFav)
    }

    let color = 'black'
    if (isFav) {
        color = '#FF565E'
    }

    return (
        <>
            <View style={styles.itemDaily}>

                <TouchableOpacity
                    style={styles.pictureArtwork}
                    onPress={() => props.openArtworkDetail(props.artwork)}
                >
                    < Image
                        source={{ uri: props.artwork.cloudinary }}
                        style={styles.pictureArtwork}
                    />
                </TouchableOpacity>

                <View style={styles.bottomPicture}>

                    <TouchableOpacity
                        style={styles.artistInfo}
                        onPress={() => props.openArtistDetail(props.artist)}
                    >
                        < Image
                            source={{ uri: props.artist.img }}
                            style={styles.pictureArtist}
                        />

                        <View>
                            <Text style={{ fontFamily: 'Heebo_700Bold' }}>{props.artist.name} </Text>
                            <Text style={{ fontFamily: 'Heebo_300Light' }}>{props.artist.instagram} </Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleClick(props.artwork)}>
                        <MyIcon
                            type='AntDesign'
                            name="hearto"
                            size={25}
                            color={color}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
}


const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    itemDaily: {
        width: windowWidth - 20,
        alignItems: 'center',
        height: '85%',
        marginTop: 30,
        marginLeft: 10
    },
    pictureArtwork: {
        flex: 1,
        width: '100%'
    },
    pictureArtist: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    artistInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomPicture: {
        marginTop: 10,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default DailyArtwork
