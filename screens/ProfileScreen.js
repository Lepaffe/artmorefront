import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList} from 'react-native'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { Avatar, ListItem, Divider } from 'react-native-elements';
import MyIcon from './composants/myIcons';

const ProfileScreen = () => {

   

    return (
        <ScrollView style={styles.container}>

            <View >    
            <Avatar  rounded size="large" source={{    uri:      'https://res.cloudinary.com/lepaffe/image/upload/v1638785691/Artmore/IMG_5535_uu5xwh.png'  }}/>
            </View>
            <View style={styles.mainInfoContainer}>
                <Text style={styles.name}>Alice AySyl </Text>
            </View>
            
            <Divider  orientation="horizontal" inset={true} insetType="left"   />
            <View style={styles.mainInfoContainer}>

            <Text style={styles.name}> <MyIcon
              type='AntDesign'
              name="hearto"
              size={25}
              style={{ margin: 10, marginBottom: 0 }}
              color="#88889C"
            />My Collection </Text>
            <Text style={styles.name}><MyIcon
              type='AntDesign'
              name="hearto"
              size={25}
              style={{ margin: 10, marginBottom: 0 }}
              color="#88889C"
            />My Artists </Text>  
            <Text style={styles.name}><MyIcon
              type='AntDesign'
              name="hearto"
              size={25}
              style={{ margin: 10, marginBottom: 0 }}
              color="#88889C"
            />Exhibitions </Text>  
            <Text style={styles.name}><MyIcon
              type='AntDesign'
              name="hearto"
              size={25}
              style={{ margin: 10, marginBottom: 0 }}
              color="#88889C"
            />Daily Selection</Text>  
            <Text style={styles.name}><MyIcon
              type='AntDesign'
              name="hearto"
              size={25}
              style={{ margin: 10, marginBottom: 0 }}
              color="#88889C"
            />Parameters</Text>  
            </View>
  

            </ScrollView>

        
    )
}



export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 22,
        marginTop: 20,
        
        
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
        bottom: -8,
        right: 0
    },
    mainInfoContainer: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center'
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold'
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
        width: 80,
        height: 80,
        
    }
})