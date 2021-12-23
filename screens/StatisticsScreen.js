import React, { useEffect, useState } from 'react'
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { REACT_APP_URL_BACKEND } from "@env";
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


const StatisticsScreen = (props) => {

    const [categoriesPourcentage, setCategoriesPourcentage] = useState([])
    const [movementsPourcentage, setMovementsPourcentage] = useState([])
    const [hasUserAlreadyLiked, setHasUserAlreadyLiked] = useState(false)

    const isFocused = useIsFocused();

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

        const getStats = async () => {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/get-statistics/${props.token}`);
            const dataJSON = await data.json();
            if (!dataJSON.noArtworksLiked) {
                setCategoriesPourcentage(dataJSON.categoriesPourcentage)
                setMovementsPourcentage(dataJSON.movementsPourcentage)
                setHasUserAlreadyLiked(true)
            }
        };
        getStats();

    }, [isFocused])


    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        < ScrollView style={styles.container}>
            <Text style={styles.title} >Statistics</Text>

            <Text style={styles.whatILiked} >MOVEMENTS I LIKED</Text>

            {hasUserAlreadyLiked ?

                <View style={styles.categoriesContainer}>

                    {movementsPourcentage.length > 0 &&
                        movementsPourcentage.map((movement, i) => {
                            if (movement.pourcentage != 0) {
                                return (
                                    <View key={i} style={styles.category}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={styles.image} source={{ uri: movement.img }} />
                                            <Text style={styles.categoryText}>{movement.name}</Text>
                                        </View>
                                        <Text style={styles.pourcentageText}>{movement.pourcentage} %</Text>
                                    </View>)
                            }
                        })}

                </View>

                :

                <Text style={styles.noArtworks}>No artworks liked yet</Text>}

            <Text style={styles.whatILiked} >CATEGORIES I LIKED</Text>

            {hasUserAlreadyLiked ?

                <View style={styles.categoriesContainer}>

                    {categoriesPourcentage.length > 0 &&
                        categoriesPourcentage.map((category, i) => {
                            if (category.pourcentage != 0) {
                                return (<View key={i} style={styles.category}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={styles.image} source={{ uri: category.img }} />
                                        <Text style={styles.categoryText}>{category.name}</Text>
                                    </View>
                                    <Text style={styles.pourcentageText}>{category.pourcentage} %</Text>
                                </View>)
                            }

                        })}

                </View>

                :

                <Text style={styles.noArtworks}>No artworks liked yet</Text>}

        </ScrollView >

    )
}

function mapStateToProps(state) {
    return ({ token: state.token })
}

export default connect(mapStateToProps, null)(StatisticsScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    title: {
        fontFamily: 'Heebo_300Light',
        fontSize: 20,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 5
    },
    whatILiked: {
        fontFamily: 'Heebo_700Bold',
        fontSize: 16,
        textAlign: "center",
        marginTop: 25
    },
    categoriesContainer: {
        marginTop: 25,
        marginHorizontal: 60
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    categoryText: {
        fontFamily: 'Heebo_300Light',
        fontSize: 17,
        marginLeft: 8
    },
    pourcentageText: {
        fontFamily: 'Heebo_700Bold',
        fontSize: 16,
    },
    noArtworks: {
        fontFamily: 'Heebo_300Light',
        fontSize: 15,
        textAlign: 'center',
        margin: 20
    }
})
