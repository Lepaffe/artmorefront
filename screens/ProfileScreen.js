import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { Avatar, ListItem, Divider } from 'react-native-elements';
import MyIcon from '../composants/myIcons';

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

const ProfileScreen = (props) => {

    let [fontsLoaded] = useFonts({
        Heebo_100Thin,
        Heebo_300Light,
        Heebo_400Regular,
        Heebo_500Medium,
        Heebo_700Bold,
        Heebo_800ExtraBold,
        Heebo_900Black
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        < View style={styles.container}>
            <View style={styles.userHead} >
                <View >
                    <Avatar rounded size={115} source={{ uri: 'https://res.cloudinary.com/lepaffe/image/upload/v1638785691/Artmore/IMG_5535_uu5xwh.png' }} />
                </View>
                <View style={styles.mainInfoContainer}>
                    <Text style={styles.name}>Alice AySyl </Text>
                </View>
            </View>

            <Divider style={{ marginBottom: 30 }} orientation="horizontal" inset={true} insetType="center" />

            <View style={styles.mainInfoContainer}>
                <View>
                    <ListItem key={'0'} onPress={() => props.navigation.navigate('TopNav', { screen: 'my Collection' })} >
                        <MyIcon
                            type='AntDesign'
                            name="hearto"
                            size={22}

                            color="rgb(136, 136, 156)"
                        />
                        <ListItem.Title style={styles.list} > {'My Collection'} </ListItem.Title>

                    </ListItem>
                    <ListItem key={'1'} containerStyle={{ marginTop: 10 }} onPress={() => props.navigation.navigate('TopNav', { screen: 'my Artists' })}>
                        <MyIcon
                            type='MaterialCommunityIcons'
                            name="account-heart-outline"
                            size={25}

                            color="rgb(136, 136, 156)"
                        />
                        <ListItem.Title style={styles.list} > {'My Artists'} </ListItem.Title>

                    </ListItem>
                    <ListItem key={'2'} containerStyle={{ marginTop: 10 }} onPress={() => props.navigation.navigate('ExhibitionScreen')}>
                        <MyIcon
                            type='AntDesign'
                            name="calendar"
                            size={25}

                            color="rgb(136, 136, 156)"
                        />
                        <ListItem.Title style={styles.list} > {'Exhibitions'} </ListItem.Title>
                        {/* <ListItem.Chevron /> */}
                    </ListItem>
                    <ListItem key={'3'} containerStyle={{ marginTop: 10 }} onPress={() => props.navigation.navigate('DailyScreen')} r>
                        <MyIcon
                            type='Ionicons'
                            name="ios-eye-outline"
                            size={25}

                            color="rgb(136, 136, 156)"
                        />
                        <ListItem.Title style={styles.list} > {'Daily Selection'} </ListItem.Title>

                    </ListItem>
                    <ListItem containerStyle={{ marginTop: 10 }} key={'4'} onPress={() => props.navigation.navigate('SettingsScreen')}>
                        <MyIcon
                            type='Ionicons'
                            name="ios-settings-outline"
                            size={25}

                            color="rgb(136, 136, 156)"
                        />
                        <ListItem.Title style={styles.list} > {'Settings'} </ListItem.Title>

                    </ListItem>
                </View>

            </View>


        </View >


    )
}



export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        paddingTop: 50,
        backgroundColor: "white"

    },
    menuItem: {
        backgroundColor: 'transparent',
    },
    userHead: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: "100%",
        height: 500
    },

    mainInfoContainer: {
        margin: 20,
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
        fontFamily: 'Heebo_700Bold'

    },
    list: {
        fontSize: 17,
        color: 'grey',
        fontFamily: 'Heebo_300Light'

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
        justifyContent: 'center',
        alignItems: 'center',

        height: 200,

        margin: 5,
    },
    avatar: {
        width: 100,
        height: 100,

    }
})