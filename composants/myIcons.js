import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MyIcon = ({type, name, size, style, color}) => {
    switch (type) {
        case "AntDesign": return <AntDesignIcon name={name} size={size || 24} style={style} color={color || 'white'} />
        case "Ionicons": return <IoniconsIcon name={name} size={size || 24} style={style} color={color || 'white'} />
        case "FontAwesome": return <FontAwesomeIcon name={name} size={size || 24} style={style} color={color || 'white'} />
        case "FontAwesome5": return <FontAwesome5Icon name={name} size={size || 24} style={style} color={color || 'white'} />
        case 'MaterialCommunityIcons': return <MaterialCommunityIcons name={name} size={size || 24} style={style} color={color || 'white'} />
        default: return <IoniconsIcon name={name} size={size || 24} style={style} color={color || 'white'} />
    }
}

export default MyIcon