import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements'

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

function Movement(props) {
    let [fontsLoaded] = useFonts({
        Heebo_100Thin,
        Heebo_300Light,
        Heebo_400Regular,
        Heebo_500Medium,
        Heebo_700Bold,
        Heebo_800ExtraBold,
        Heebo_900Black
    })

    const handleClickMovement = (name) => {
        props.isSelected ? props.removeMovement(name) : props.addMovement(name)
    }

    let opacityStyle = 1
    if (props.isSelected) {
        opacityStyle = 0.4
    }

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (

        <TouchableOpacity onPress={() => handleClickMovement(props.name)}>
            <Card wrapperStyle={{ border: 0, margin: 0 }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                    source={{ uri: props.img }}
                    style={{ width: 70, height: 70, borderRadius: 50, opacity: opacityStyle }}
                />
                <Text style={{ fontFamily: 'Heebo_300Light', textAlign: "center", opacity: opacityStyle, marginTop: 5 }}>{props.name}</Text>
            </Card>
        </TouchableOpacity >

    )
}

export default Movement
