import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

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

function Expo(props) {

    let [fontsLoaded] = useFonts({
        Heebo_100Thin,
        Heebo_300Light,
        Heebo_400Regular,
        Heebo_500Medium,
        Heebo_700Bold,
        Heebo_800ExtraBold,
        Heebo_900Black
    })

    const handleClickAddExpo = (title, place, address, date_start, date_end, img, city, _id) => {
        props.isFav ? props.deleteExpo(title) : props.addExpo(title, place, address, date_start, date_end, img, city)
    }

    let color = "black"
    if (props.isFav) {
        color = "orange"
    }

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (

        <View>
            <ListItem bottomDivider>
                <Avatar style={{ width: 100, height: 160 }} source={{ uri: props.img }} />
                <ListItem.Content>
                    <ListItem.Title style={{ fontFamily: 'Heebo_400Regular' }}>{props.title}</ListItem.Title>
                    <ListItem.Subtitle style={{ fontFamily: 'Heebo_300Light', marginVertical: 5 }}>{props.place}</ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontFamily: 'Heebo_300Light', marginVertical: 5 }}>{props.address}</ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontFamily: 'Heebo_400Regular', fontSize: 12 }}>From {props.date_start} to {props.date_end}</ListItem.Subtitle>
                    <View style={{ alignSelf: 'flex-end' }} >
                        <TouchableOpacity>
                            <Icon style={{ marginEnd: 10 }}
                                name="plus"
                                size={20}
                                color={color}
                                contentStyle={{ margin: 20 }}
                                onPress={() => handleClickAddExpo(props.title, props.place, props.address, props.date_start, props.date_end, props.img, props.city)}
                            >
                            </Icon>
                        </TouchableOpacity>
                    </View>
                </ListItem.Content>
            </ListItem>
        </View >

    )
}

export default Expo