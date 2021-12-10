import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Button, ListItem, Avatar, Divider } from 'react-native-elements';
import Category from '../composants/Category';
import { connect } from 'react-redux';

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

import { REACT_APP_URL_BACKEND } from "@env";

const categories = [
    {
        name: 'Abstract',
        img: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        name: 'Landscape',
        img: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        name: 'Portrait',
        img: 'https://images.pexels.com/photos/3657140/pexels-photo-3657140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        name: 'Animal',
        img: 'https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        name: 'EverydayLife',
        img: 'https://images.pexels.com/photos/6127025/pexels-photo-6127025.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        name: 'PopArt',
        img: 'https://cdn.pixabay.com/photo/2017/09/02/06/26/pop-art-2706464_960_720.jpg'
    },
    {
        name: 'Nude',
        img: 'https://images.pexels.com/photos/230675/pexels-photo-230675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        name: 'Nature',
        img: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        name: 'Urban',
        img: 'https://images.pexels.com/photos/417023/pexels-photo-417023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        name: 'StillLife',
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Nature_morte_%28Paul_C%C3%A9zanne%29_%283332859798%29.jpg'
    },
    {
        name: 'Monumental',
        img: 'https://images.pexels.com/photos/5308359/pexels-photo-5308359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        name: 'Digital',
        img: 'https://images.pexels.com/photos/7859782/pexels-photo-7859782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
]

const mediums = [
    {
        name: 'painting',
        img: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?cs=srgb&dl=pexels-steve-johnson-1585325.jpg&fm=jpg'
    },
    {
        name: 'sculpture',
        img: 'https://images.pexels.com/photos/5665104/pexels-photo-5665104.jpeg?cs=srgb&dl=pexels-miggy-rivera-5665104.jpg&fm=jpg'
    },
    {
        name: 'photography',
        img: 'https://images.pexels.com/photos/1787235/pexels-photo-1787235.jpeg?cs=srgb&dl=pexels-luis-quintero-1787235.jpg&fm=jpg'
    },
    {
        name: 'drawing',
        img: 'https://images.pexels.com/photos/3778179/pexels-photo-3778179.jpeg?cs=srgb&dl=pexels-cottonbro-3778179.jpg&fm=jpg'
    },
    {
        name: 'digitalArt',
        img: 'https://images.pexels.com/photos/4238489/pexels-photo-4238489.jpeg?cs=srgb&dl=pexels-ivan-samkov-4238489.jpg&fm=jpg'
    },
    {
        name: 'streetArt',
        img: 'https://images.pexels.com/photos/2235182/pexels-photo-2235182.jpeg?cs=srgb&dl=pexels-braven-nguyen-2235182.jpg&fm=jpg'
    }
]

function SettingsScreen(props) {

    let [fontsLoaded] = useFonts({
        Heebo_100Thin,
        Heebo_300Light,
        Heebo_400Regular,
        Heebo_500Medium,
        Heebo_700Bold,
        Heebo_800ExtraBold,
        Heebo_900Black
    })

    const [city, setCity] = useState('');
    const [password, setPassword] = useState('**********');
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [messageMail, setMessageMail] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [messagePassword, setMessagePassword] = useState('');
    const [categoryPreferences, setCategoryPreferences] = useState([])
    //const [mediumPreferences, setMediumPreferences] = useState([])

    useEffect(() => {

        const getUserInfo = async () => {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/get-user-info/${props.token}`);
            const dataJSON = await data.json();
            setCity(dataJSON.city)
            setEmail(dataJSON.email)
            //setMediumPreferences(dataJSON.mediums)
            setCategoryPreferences(dataJSON.categories)
        }

        getUserInfo();

    }, [])

    const validateEmail = (value) => {
        const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w\w+)+$/
        const email = value;
        setEmail(value)

        if (emailRegex.test(email)) {
            setIsEmailValid(true);
            setMessageMail('Valid e-mail');
        } else {
            setIsEmailValid(false);
            setMessageMail('Invalid e-mail');
        }
    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        const password = value;
        setPassword(value)

        if (passwordRegex.test(password)) {
            setIsPasswordValid(true);
            setMessagePassword('Valid password');
        } else {
            setIsPasswordValid(false);
            setMessagePassword('Your password must contain at least 8 characters, one number and one letter.');
        }
    };

    const changeCity = async () => {

        const data = await fetch(`${REACT_APP_URL_BACKEND}/update-city/${props.token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `city=${city}`
        })
        const dataJSON = await data.json();
        setCity(dataJSON.city)
    }

    const changeEmail = async () => {

        if (isEmailValid) {

            const data = await fetch(`${REACT_APP_URL_BACKEND}/update-email/${props.token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `email=${email}`
            })
            const dataJSON = await data.json();
            if (dataJSON.email) {
                setEmail(dataJSON.email)
                setMessageMail('')
            }
        }
    }

    const changePassword = async () => {

        if (isPasswordValid) {

            const data = await fetch(`${REACT_APP_URL_BACKEND}/update-password/${props.token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `password=${password}`
            })
            const dataJSON = await data.json();
            dataJSON.result && setMessagePassword('')
        }
    }

    const changeCategories = async () => {
        let categories = JSON.stringify(categoryPreferences)

        const data = await fetch(`${REACT_APP_URL_BACKEND}/update-categories/${props.token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `categories=${categories}`
        })
        const dataJSON = await data.json();
        console.log('données récupérées du back', dataJSON.categories)
        dataJSON.categories && setCategoryPreferences(dataJSON.categories)
        console.log(categoryPreferences)

    }

    const addCategory = (name) => {
        setCategoryPreferences([...categoryPreferences, name])
    }

    const removeCategory = (name) => {
        setCategoryPreferences(categoryPreferences.filter(el => el !== name))
    }

    let colorMessageMail = "rgba(255, 86, 94,0.8)"
    if (isEmailValid) colorMessageMail = "rgba(58, 187, 109, 0.6)";

    let colorMessagePassword = "rgba(255, 86, 94,0.8)"
    if (isPasswordValid) colorMessagePassword = "rgba(58, 187, 109, 0.6)";


    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={{ fontFamily: 'Heebo_300Light', fontSize: 20, textAlign: "center", marginBottom: 30, marginTop: 30 }} >Settings</Text>

                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => setCity(val)}
                        value={city}
                    />

                    <Button title="Change my city"
                        buttonStyle={{ width: 120, borderRadius: 25, paddingHorizontal: 20, backgroundColor: "rgba(38, 50, 56, 0.8)" }}
                        titleStyle={{
                            fontFamily: 'Heebo_300Light',
                            fontSize: 10
                        }}
                        onPress={() => changeCity()}
                    />


                </View>

                <View style={{ alignItems: 'center', marginTop: 60 }}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => validateEmail(value)}
                        value={email}
                    />

                    {messageMail ? <Text style={{ color: colorMessageMail, textAlign: 'center', marginBottom: 8 }} >{messageMail}</Text> : null}


                    <Button title="Change my e-mail"
                        buttonStyle={{ width: 150, borderRadius: 25, paddingHorizontal: 20, backgroundColor: "rgba(38, 50, 56, 0.8)" }}
                        titleStyle={{
                            fontFamily: 'Heebo_300Light',
                            fontSize: 10
                        }}
                        onPress={() => changeEmail()}
                    />
                </View>


                <View style={{ alignItems: 'center', marginTop: 60 }}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => validatePassword(value)}
                        secureTextEntry={true}
                        value={password}
                    />

                    {messagePassword ? <Text style={{ color: colorMessagePassword, textAlign: 'center', marginBottom: 8 }} >{messagePassword}</Text> : null}

                    <Button title="Change my password"
                        buttonStyle={{ width: 150, borderRadius: 25, paddingHorizontal: 20, backgroundColor: "rgba(38, 50, 56, 0.8)" }}
                        titleStyle={{
                            fontFamily: 'Heebo_300Light',
                            fontSize: 10
                        }}
                        onPress={() => changePassword()}
                    />
                </View>

                <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 30 }}>
                    <Text style={{ fontFamily: 'Heebo_300Light', fontSize: 18 }}>Category preferences</Text>

                    <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center' }}>
                        {categories.map(category => {
                            let isSelected = categoryPreferences.some(el => category.name == el)
                            return (<Category key={category.name} name={category.name} img={category.img} addCategory={addCategory} removeCategory={removeCategory} isSelected={isSelected} />)
                        })}
                    </View >

                    <Button title="Change my categories"
                        buttonStyle={{ width: 150, borderRadius: 25, paddingHorizontal: 20, backgroundColor: "rgba(38, 50, 56, 0.8)" }}
                        titleStyle={{
                            fontFamily: 'Heebo_300Light',
                            fontSize: 10
                        }}
                        onPress={() => changeCategories()}
                    />
                </View>


                {/*<View style={{ alignItems: 'center', marginTop: 60 }}>
                    <Text style={{ fontFamily: 'Heebo_300Light', fontSize: 18 }}>Medium preferences</Text>

                    <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center' }}>
                        {mediums.map(medium => {
                            let isSelected = mediumPreferences.some(el => medium.name == el)
                            return (<Category key={medium.name} name={medium.name} img={medium.img} addCategory={addCategory} removeCategory={removeCategory} isSelected={isSelected} />)
                        })}
                    </View >

                    <Button title="Change my mediums"
                        buttonStyle={{ width: 150, borderRadius: 25, paddingHorizontal: 20, backgroundColor: "rgba(38, 50, 56, 0.8)" }}
                        titleStyle={{
                            fontFamily: 'Heebo_300Light',
                            fontSize: 10
                        }}
                        onPress={() => changeMediums()}
                    />
                    </View>*/}


            </ScrollView>
        </KeyboardAvoidingView >
    )
};


const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#FFFF"
    },
    input: {
        height: 40,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "rgb(213, 208, 205)",
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
        width: windowWidth - 150
    },
    label: {
        fontFamily: 'Heebo_300Light'
    }
});

function mapStateToProps(state) {
    return ({ token: state.token })
}

export default connect(mapStateToProps, null)(SettingsScreen);