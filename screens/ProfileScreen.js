import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'
import { ListItem } from 'react-native-elements';
import MyIcon from '../composants/myIcons';
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

const ProfileScreen = (props) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [image, setImage] = useState(null);

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

        const getInfo = async () => {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/get-username/${props.token}`);
            const dataJSON = await data.json();
            setFirstName(dataJSON.firstName)
            setLastName(dataJSON.lastName)
            setImage(dataJSON.img)
        };
        getInfo();


    }, [])


    const addImage = async () => {
        //on demande l'accès à la caméra
        const checkForCameraRollPermission = async () => {
            const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert("Please grant camera roll permissions inside your system's settings");
            } else {
                console.log('Media Permissions are granted')
            }
        }
        checkForCameraRollPermission()

        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!_image.cancelled) {

            var data = new FormData();

            data.append('avatar', {
                uri: _image.uri,
                type: 'image/jpeg',
                name: 'avatar.jpg',
            });

            const res = await fetch(`${REACT_APP_URL_BACKEND}/update-avatar/${props.token}`, {
                method: 'POST',
                body: data
            })
            const resJSON = await res.json()
            console.log('resJSON.image', resJSON.img);
            resJSON.img && setImage(resJSON.img);
        };
    }

    if (!fontsLoaded) {
        return <AppLoading />
    }

    const logout = () => {
        AsyncStorage.clear()
        props.resetArtistList()
        props.resetArtworkList()
        props.resetCategorySignUp()
        props.resetMediumSignUp()
        props.resetSelectedArtist()
        props.resetSelectedArtwork()
        props.resetToken()
        props.navigation.navigate('LoginScreen')
    }

    return (
        < View style={styles.container}>

            <View style={styles.userHead} >

                <View style={styles.containerImage}>

                    <Image source={{ uri: image}} style={{ width: 150, height: 150 }} />

                    <View style={styles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={styles.uploadBtn} >
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.mainInfoContainer}>
                    <Text style={styles.name}>{firstName} {lastName}</Text>
                </View>

            </View>


            <View style={styles.mainInfoContainer}>

                <View>

                    <ListItem key={'1'} containerStyle={{ paddingTop: 18, backgroundColor: '#FFF' }} onPress={() => props.navigation.navigate('SettingsScreen')}>
                        <MyIcon
                            type='Ionicons'
                            name="ios-settings-outline"
                            size={25}

                            color="rgb(136, 136, 156)"
                        />
                        <ListItem.Title style={styles.list} > {'Settings'} </ListItem.Title>
                    </ListItem>

                    <ListItem key={'2'} containerStyle={{ paddingTop: 14 }} onPress={() => props.navigation.navigate('StatisticsScreen')}>
                        <MyIcon
                            type='Ionicons'
                            name="md-stats-chart"
                            size={25}

                            color="rgb(136, 136, 156)"
                        />
                        <ListItem.Title style={styles.list} > {'Statistics'} </ListItem.Title>
                    </ListItem>

                    <ListItem key={'3'} onPress={() => props.navigation.navigate('TopNav', { screen: 'my Collection' })} >
                        <MyIcon
                            type='AntDesign'
                            name="hearto"
                            size={22}

                            color="rgb(136, 136, 156)"
                        />
                        <ListItem.Title style={styles.list} > {'My Collection'} </ListItem.Title>
                    </ListItem>
                    <ListItem key={'4'} containerStyle={{ paddingTop: 14 }} onPress={() => props.navigation.navigate('TopNav', { screen: 'my Artists' })}>
                        <MyIcon
                            type='MaterialCommunityIcons'
                            name="account-heart-outline"
                            size={25}

                            color="rgb(136, 136, 156)"
                        />
                        <ListItem.Title style={styles.list} > {'My Artists'} </ListItem.Title>
                    </ListItem>
                    <ListItem key={'5'} containerStyle={{ paddingTop: 14 }} onPress={() => props.navigation.navigate('ExhibitionScreen')}>
                        <MyIcon
                            type='AntDesign'
                            name="calendar"
                            size={25}

                            color="rgb(136, 136, 156)"
                        />
                        <ListItem.Title style={styles.list} > {'Exhibitions'} </ListItem.Title>
                    </ListItem>
                    <ListItem key={'6'} containerStyle={{ paddingTop: 14 }} onPress={() => props.navigation.navigate('DailyScreen')} r>
                        <MyIcon
                            type='Ionicons'
                            name="ios-eye-outline"
                            size={25}

                            color="rgb(136, 136, 156)"
                        />
                        <ListItem.Title style={styles.list} > {'Daily Selection'} </ListItem.Title>
                    </ListItem>


                    <ListItem key={'7'} containerStyle={{ paddingTop: 14 }} onPress={() => logout()}>
                        <MyIcon
                            type='Ionicons'
                            name="log-out"
                            size={25}

                            color="rgb(136, 136, 156)"
                        />
                        <ListItem.Title style={styles.list} > {'Log out'} </ListItem.Title>
                    </ListItem>

                </View>

            </View>

        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        paddingTop: 20,
        backgroundColor: "#FFF"
    },
    containerImage: {
        elevation: 2,
        height: 150,
        width: 150,
        borderRadius: 75,
        overflow: 'hidden',
    },
    uploadBtnContainer: {
        opacity: 0.6,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '18%',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    },
    userHead: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainInfoContainer: {
        marginTop: 20,
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
    }
})

function mapStateToProps(state) {
    return ({ token: state.token })
}


function mapDispatchToProps(dispatch) {
    return {
        resetArtworkList: function () {
            dispatch({ type: 'resetArtworkList' })
        },
        resetArtistList: function () {
            dispatch({ type: 'resetArtistList' })
        },
        resetCategorySignUp: function () {
            dispatch({ type: 'resetCategorySignUp' })
        },
        resetMediumSignUp: function () {
            dispatch({ type: 'resetMediumSignUp' })
        },
        resetSelectedArtist: function () {
            dispatch({ type: 'resetSelectedArtist' })
        },
        resetSelectedArtwork: function () {
            dispatch({ type: 'resetSelectedArtwork' })
        },
        resetToken: function () {
            dispatch({ type: 'resetToken' })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);