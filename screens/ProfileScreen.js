import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList} from 'react-native'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { Avatar, ListItem, Divider } from 'react-native-elements';
import MyIcon from '../composants/myIcons';


const ProfileScreen = (props) => {

   

    return (
        < View style={styles.container}>
            <View style={styles.userHead} >
                <View >    
                    <Avatar  rounded size="large" source={{ uri:'https://res.cloudinary.com/lepaffe/image/upload/v1638785691/Artmore/IMG_5535_uu5xwh.png'  }}/>
                </View>
                <View style={styles.mainInfoContainer}>
                    <Text style={styles.name}>Alice AySyl </Text>
                </View>
            </View>
            
            <Divider  orientation="horizontal" inset={true} insetType="center"   />

            <View style={styles.mainInfoContainer}>
                <View>
                    <ListItem key={'0'} onPress={()=> props.navigation.navigate('TopNav',{screen:'my Collection'})} >
                        <MyIcon
                            type='AntDesign'
                            name="hearto"
                            size={30}
                            style={{ margin: 10, marginBottom: 0 }}
                            color="#88889C"
                        />
                        <ListItem.Title style={styles.name} > {'My Collection'} </ListItem.Title>
                        
                    </ListItem>
                    <ListItem key={'1'} onPress={()=> props.navigation.navigate('TopNav',{screen:'my Artists'})}>
                        <MyIcon
                            type='MaterialCommunityIcons'
                            name="account-heart-outline"
                            size={35}
                            style={{ margin: 10, marginBottom: 0 }}
                            color="#88889C"
                        />
                        <ListItem.Title style={styles.name} > {'My Artists'} </ListItem.Title>
                      
                    </ListItem>
                    <ListItem key={'2'} onPress={()=> props.navigation.navigate('ExhibitionScreen')}>
                        <MyIcon
                            type='AntDesign'
                            name="calendar"
                            size={35}
                            style={{ margin: 10, marginBottom: 0 }}
                            color="#88889C"
                        />
                        <ListItem.Title style={styles.name} > {'Exhibitions'} </ListItem.Title>
                        {/* <ListItem.Chevron /> */}
                    </ListItem>
                    <ListItem key={'3'} onPress={()=> props.navigation.navigate('DailyScreen')}r>
                        <MyIcon
                            type='Ionicons'
                            name="ios-eye-outline"
                            size={35}
                            style={{ margin: 10, marginBottom: 0 }}
                            color="#88889C"
                        />
                        <ListItem.Title style={styles.name} > {'Daily Selection'} </ListItem.Title>
                     
                    </ListItem>
                    <ListItem key={'4'} onPress={()=> props.navigation.navigate('SettingsScreen')}>
                        <MyIcon
                            type='Ionicons'
                            name="ios-settings-outline"
                            size={35}
                            style={{ margin: 10, marginBottom: 0 }}
                            color="#88889C"
                        />
                        <ListItem.Title style={styles.name} > {'Settings'} </ListItem.Title>
                      
                    </ListItem>
                </View>

            </View>
  

            </View>

        
    )
}



export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        paddingTop: 50, 
        backgroundColor:"white"  
        
    },
    menuItem : {
        backgroundColor: 'transparent',
    },
    userHead : {
        alignItems:'center',
        justifyContent:'center',
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
        margin: 20,
        alignItems: 'center'
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        
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