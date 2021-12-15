import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView } from 'react-native'
import MasonryList from '@react-native-seoul/masonry-list';
import { REACT_APP_URL_BACKEND } from "@env";
import { connect } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';

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
    const isFocused = useIsFocused();

    useEffect(() => {

        const getCollection = async () => {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/get-collection/${props.token}`);
            const dataJSON = await data.json();
            setCollection(dataJSON.collection.artworkList);

        }
        getCollection();

    }, [isFocused])


    // renderItem to use in the MasonryList componment to render a grid with two colum to display
    // the artworks of the artists (instead of a map, which does not work with flatlist and masonryList)
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity key={item._id} onPress={() => openArtworkDetail(item)}>
                < Image
                    source={{ uri: item.cloudinary }}
                    style={styles.picture}
                />
            </TouchableOpacity>
        )
    };

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
                    data={collection}
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

const styles = StyleSheet.create({
    picture: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        margin: 3,
    }
})

function mapStateToProps(state) {
    return { token: state.token }
}
function mapDispatchToProps(dispatch) {
    return {
        setSelectedArtwork: function (artwork) {
            dispatch({ type: "setSelectedArtwork", artwork })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionScreen);