import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements'

function Movement(props) {

    const handleClickMovement = (name) => {
        props.isSelected ? props.removeMovement(name) : props.addMovement(name)
    }

    let opacityStyle = 1
    if (props.isSelected) {
        opacityStyle = 0.4
    }

    return (

        <TouchableOpacity onPress={() => handleClickMovement(props.name)}>
            <Card wrapperStyle={{ border: 0, margin: 0 }} containerStyle={{ borderWidth: 0, borderColor: 'transparent', elevation: 0 }}>
                <Card.Image
                    source={{ uri: props.img }}
                    style={{ width: 70, height: 70, borderRadius: 50, opacity: opacityStyle }}
                />
                <Text style={{ textAlign: "center", opacity: opacityStyle }}>{props.name}</Text>
            </Card>
        </TouchableOpacity >

    )
}

export default Movement
