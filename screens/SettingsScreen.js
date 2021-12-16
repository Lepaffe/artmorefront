import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Dimensions, ScrollView } from 'react-native';
import { Button, Switch } from 'react-native-elements';
import Category from '../composants/Category';
import { connect } from 'react-redux';
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
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


const categories = [
    {
        name: 'Abstract',
        img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639557979/pexels-photo-2693212_fjvesn.jpg'
      },
      {
        name: 'Landscape',
        img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558028/pexels-photo-2356059_nonufa.jpg'
      },
      {
        name: 'Portrait',
        img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558067/pexels-photo-3657140_sb1u6d.jpg'
      },
      {
        name: 'Animal',
        img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558110/pexels-photo-1076758_ah9dyf.jpg'
      },
      {
        name: 'EverydayLife',
        img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558134/pexels-photo-6127025_fbi7vr.jpg'
      },
      {
        name: 'PopArt',
        img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558186/pop-art-2706464_960_720_s704vd.jpg'
      },
      {
        name: 'Nude',
        img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558246/pexels-photo-230675_smp64w.jpg'
      },
      {
        name: 'Nature',
        img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558276/pexels-photo-3225517_cvgkgg.jpg'
      },
      {
        name: 'Urban',
        img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558306/pexels-photo-417023_oa6nlg.jpg'
      },
      {
        name: 'StillLife',
        img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558361/Nature_morte__28Paul_C_C3_A9zanne_29__283332859798_29_zoil8w.jpg'
      },
      {
        name: 'Monumental',
        img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639558392/pexels-photo-5308359_po3xrh.jpg'
      },
      {
        name: 'Digital',
        img: 'https://res.cloudinary.com/artplusmore/image/upload/v1639590336/pexels-photo-2783848_jyddpn.jpg'
      },
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
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [categoryPreferences, setCategoryPreferences] = useState([])
    const [mediumPreferences, setMediumPreferences] = useState([]);

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [messageMail, setMessageMail] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [messagePassword, setMessagePassword] = useState('');

    const [painting, setPainting] = useState(false);
    const [sculpture, setSculpture] = useState(false);
    const [photography, setPhotography] = useState(false);
    const [drawing, setDrawing] = useState(false);
    const [digitalArt, setDigitalArt] = useState(false);
    const [streetArt, setStreetArt] = useState(false);

    useEffect(() => {

        const getUserInfo = async () => {
            const data = await fetch(`${REACT_APP_URL_BACKEND}/get-user-info/${props.token}`);
            const dataJSON = await data.json();

            setCity(dataJSON.city)
            setEmail(dataJSON.email)
            setMediumPreferences(dataJSON.mediums)
            setCategoryPreferences(dataJSON.categories)

            dataJSON.mediums.forEach(el => {
                el === "painting" && setPainting(true)
                el === "sculpture" && setSculpture
                el === "photography" && setPhotography(true)
                el === "drawing" && setDrawing(true)
                el === "digitalArt" && setDigitalArt(true)
                el === "streetArt" && setStreetArt(true)
            })
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
        dataJSON.categories && setCategoryPreferences(dataJSON.categories)

    }

    const changeMediums = async () => {
        let mediums = JSON.stringify(mediumPreferences)

        const data = await fetch(`${REACT_APP_URL_BACKEND}/update-mediums/${props.token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `mediums=${mediums}`
        })
        const dataJSON = await data.json();
        dataJSON.mediums && setMediumPreferences(dataJSON.mediums)

    }

    const addCategory = (name) => {
        setCategoryPreferences([...categoryPreferences, name])
    }

    const removeCategory = (name) => {
        setCategoryPreferences(categoryPreferences.filter(el => el !== name))
    }

    const toggleSwitchPainting = () => {
        setPainting(previousState => !previousState);
        if (mediumPreferences.includes("painting")) {
            setMediumPreferences(mediumPreferences.filter(el => el != "painting"))
        } else {
            setMediumPreferences([...mediumPreferences, "painting"])
        }
    }

    const toggleSwitchSculpture = () => {
        setSculpture(previousState => !previousState);
        if (mediumPreferences.includes("sculpture")) {
            setMediumPreferences(mediumPreferences.filter(el => el != "sculpture"))
        } else {
            setMediumPreferences([...mediumPreferences, "sculpture"])
        }
    }

    const toggleSwitchPhotography = () => {
        setPhotography(previousState => !previousState);
        if (mediumPreferences.includes("photography")) {
            setMediumPreferences(mediumPreferences.filter(el => el != "photography"))
        } else {
            setMediumPreferences([...mediumPreferences, "photography"])
        }
    }

    const toggleSwitchDrawing = () => {
        setDrawing(previousState => !previousState);
        if (mediumPreferences.includes("drawing")) {
            setMediumPreferences(mediumPreferences.filter(el => el != "drawing"))
        } else {
            setMediumPreferences([...mediumPreferences, "drawing"])
        }
    }

    const toggleSwitchDigitalArt = () => {
        setDigitalArt(previousState => !previousState);
        if (mediumPreferences.includes("digitalArt")) {
            setMediumPreferences(mediumPreferences.filter(el => el != "digitalArt"))
        } else {
            setMediumPreferences([...mediumPreferences, "digitalArt"])
        }
    }

    const toggleSwitchStreetArt = () => {
        setStreetArt(previousState => !previousState);
        if (mediumPreferences.includes("streetArt")) {
            setMediumPreferences(mediumPreferences.filter(el => el != "streetArt"))
        } else {
            setMediumPreferences([...mediumPreferences, "streetArt"])
        }
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
                        placeholder='***********'
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
                    <Text style={{ fontFamily: 'Heebo_300Light', fontSize: 20 }}>Category preferences</Text>

                    <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center' }}>

                        {categories.map(category => {
                            let isSelected = categoryPreferences.some(el => category.name == el)
                            return (
                                <Category
                                    key={category.name}
                                    name={category.name}
                                    img={category.img}
                                    addCategory={addCategory}
                                    removeCategory={removeCategory}
                                    isSelected={isSelected}
                                />)
                        })}
                    </View >

                    <Button title="Change my categories"
                        buttonStyle={{ marginTop: 10, width: 150, borderRadius: 25, paddingHorizontal: 20, backgroundColor: "rgba(38, 50, 56, 0.8)" }}
                        titleStyle={{
                            fontFamily: 'Heebo_300Light',
                            fontSize: 10
                        }}
                        onPress={() => changeCategories()}
                    />
                </View>

                <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 30 }}>

                    <Text style={{ fontFamily: 'Heebo_300Light', fontSize: 20, marginBottom: 25 }}>Medium preferences</Text>

                    <View style={{ width: '90%', justifyContent: 'space-around' }}>
                        <View style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: "space-between" }}>
                            <Text style={{ fontFamily: 'Heebo_300Light', marginLeft: 80, marginRight: 60, marginBottom: 8, fontSize: 16 }}>Painting</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "rgba(58, 187, 109, 0.2)" }}
                                thumbColor={painting ? "rgb(58, 187, 109)" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchPainting}
                                value={painting}
                                style={{ marginRight: 80, marginBottom: 8, }}
                            />
                        </View>

                        <View style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: "space-between" }}>
                            <Text style={{ fontFamily: 'Heebo_300Light', marginLeft: 80, marginBottom: 8, fontSize: 16 }}>Sculpture</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "rgba(58, 187, 109, 0.2)" }}
                                thumbColor={sculpture ? "rgb(58, 187, 109)" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchSculpture}
                                value={sculpture}
                                style={{ marginRight: 80, marginBottom: 8 }}
                            />
                        </View>

                        <View style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: "space-between" }}>
                            <Text style={{ fontFamily: 'Heebo_300Light', marginLeft: 80, marginBottom: 8, fontSize: 16 }}>Photography</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "rgba(58, 187, 109, 0.2)" }}
                                thumbColor={photography ? "rgb(58, 187, 109)" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchPhotography}
                                value={photography}
                                style={{ marginRight: 80, marginBottom: 8 }}
                            />
                        </View>

                        <View style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: "space-between" }}>
                            <Text style={{ fontFamily: 'Heebo_300Light', marginLeft: 80, marginBottom: 8, fontSize: 16 }}>Drawing</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "rgba(58, 187, 109, 0.2)" }}
                                thumbColor={drawing ? "rgb(58, 187, 109)" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchDrawing}
                                value={drawing}
                                style={{ marginRight: 80, marginBottom: 8 }}
                            />
                        </View>

                        <View style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: "space-between" }}>
                            <Text style={{ fontFamily: 'Heebo_300Light', marginLeft: 80, marginBottom: 8, fontSize: 16 }}>Digital Art</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "rgba(58, 187, 109, 0.2)" }}
                                thumbColor={digitalArt ? "rgb(58, 187, 109)" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchDigitalArt}
                                value={digitalArt}
                                style={{ marginRight: 80, marginBottom: 8 }}
                            />
                        </View>

                        <View style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: "space-between" }}>
                            <Text style={{ fontFamily: 'Heebo_300Light', marginLeft: 80, fontSize: 16, marginBottom: 15 }}>Street Art</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "rgba(58, 187, 109, 0.2)" }}
                                thumbColor={streetArt ? "rgb(58, 187, 109)" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchStreetArt}
                                value={streetArt}
                                style={{ marginRight: 80, marginBottom: 15 }}
                            />
                        </View>

                    </View>

                    <Button title="Change my mediums"
                        buttonStyle={{ marginTop: 10, width: 150, borderRadius: 25, paddingHorizontal: 20, backgroundColor: "rgba(38, 50, 56, 0.8)" }}
                        titleStyle={{
                            fontFamily: 'Heebo_300Light',
                            fontSize: 10
                        }}
                        onPress={() => changeMediums()}
                    />

                </View>

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