import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { Avatar, ListItem, Divider } from 'react-native-elements';
// masonryList to display the images in a grid
import MasonryList from '@react-native-seoul/masonry-list';
import { REACT_APP_URL_BACKEND } from "@env";

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

const ArtistScreen = (props) => {

    let [fontsLoaded] = useFonts({
        Heebo_100Thin,
        Heebo_300Light,
        Heebo_400Regular,
        Heebo_500Medium,
        Heebo_700Bold,
        Heebo_800ExtraBold,
        Heebo_900Black
    })
    useEffect(() => {


        if (props.artistList.includes(props.selectedArtist._id)) {
            setLikedArtist(true);
            setColorLike('#FF565E')
        }


    }, [])

    // renderItem to use in the MasonryList componment to render a grid with two colum to display
    // the artworks of the artists (instead of a map, which does not work with flatlist and masonryList)

    const renderItem = ({ item }) => {
        console.log(item)
        return (
            <TouchableOpacity onPress={() => openArtworkDetail(item)}>
                < Image
                    source={{ uri: item.cloudinary }}
                    style={styles.minipicture}
                    key={item._id}
                    onPress={() => openArtworkDetail(item)}
                />
            </TouchableOpacity>
        )
    };




    /*useEffect(() => {
        aller chercher l'artiste lié à l'oeuvre en BDD et le mettre dans le store
        const data = fetch('/getArtist/:artworkId')
    }, [])*/
    const [dataSource, setDataSource] = useState([]);
    const [likedArtist, setLikedArtist] = useState(false);
    const [colorLike, setColorLike] = useState("black")



    // Toggle qui add et delete des oeuvres dans la artistlist sur le store quand on press sur le coeur du like + changement de couleur

    let addToCollection = async (id) => {
        if (likedArtist == false) {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/add-artistlist/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.token}&artistId=${id}`
            });
            const dataJSON = await data.json();
            setColorLike('#FF565E');
            props.addArtist(props.selectedArtist._id)
        } else {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/delete-artistlist/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.token}&artistId=${id}`
            });
            const dataJSON = await data.json();
            setColorLike('black');
            props.deleteArtist(props.selectedArtist._id)
        }

        setLikedArtist(!likedArtist);
    }


    // Récupère donnée du artwork pour le store et redirige vers le ArtworkScreen de l'oeuvre cliquée
    const openArtworkDetail = artwork => {
        console.log(artwork)
        props.setSelectedArtwork(artwork);
        props.navigation.navigate('ArtworkScreen');
    }


    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <ScrollView >
            <View style={styles.container}>

                <View >
                    <ListItem containerStyle={{ flex: 1, marginLeft: 110, backgroundColor: "none" }}>

                        <Avatar rounded size="large" source={{ uri: props.selectedArtist.img }} />
                        <ListItem.Content>
                            <ListItem.Title style={styles.artist}>{props.selectedArtist.name}</ListItem.Title>
                            <ListItem.Subtitle style={styles.instagram}>{props.selectedArtist.instagram} </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>


                <Divider orientation="horizontal" inset={true} insetType="left" />
                <View style={styles.mainInfoContainer}>

                    <Text style={{ fontFamily: 'Heebo_700Bold' }}>{props.selectedArtist.city}, {props.selectedArtist.country} </Text>
                    <TouchableOpacity style={styles.button}>
                        <AntDesign
                            name="hearto"
                            size={20}
                            color={colorLike}
                            onPress={() => addToCollection(props.selectedArtist._id)}
                        />
                    </TouchableOpacity>
                </View>


                <Text style={styles.moreArtworks}>
                    BIO
                </Text>
                <Text style={styles.description}>
                    {props.selectedArtist.bio}

                </Text>


                <Text style={styles.moreArtworks}>
                    ARTWORKS
                </Text>

            </View>
            <View style={{ flex: 1, backgroundColor: '#FFF', }}>


                <MasonryList
                    data={props.selectedArtist.artistArtwork}
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


    )
}

function mapStateToProps(state) {
    return { selectedArtwork: state.selectedArtwork, selectedArtist: state.selectedArtist, token: state.token, artistList: state.artistList }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedArtist: function (artist) {
            dispatch({ type: 'setSelectedArtist', artist })
        },
        setSelectedArtwork: function (artwork) {
            dispatch({ type: "setSelectedArtwork", artwork })
        },
        addArtist: function (artistId) {
            dispatch({ type: 'addArtist', artistId })
        },
        deleteArtist: function (artistId) {
            dispatch({ type: 'deleteArtist', artistId })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 22,
        paddingTop: 20,
        backgroundColor: '#FFF',


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
        right: 0
    },
    mainInfoContainer: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center'
    },
    artist: {
        fontSize: 20,
        fontFamily: 'Heebo_700Bold'
    },
    instagram: {
        fontFamily: 'Heebo_300Light'
    },
    info: {
        marginBottom: 25
    },
    description: {
        marginBottom: 25,
        textAlign: 'justify',
        fontFamily: 'Heebo_300Light'
    },
    moreArtworks: {
        fontFamily: 'Heebo_700Bold',
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

