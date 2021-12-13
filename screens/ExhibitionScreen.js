import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { ListItem, Avatar, LinearProgress } from 'react-native-elements'
import { connect } from 'react-redux'
import { REACT_APP_URL_BACKEND } from "@env";
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

const listTab = [
  {
    name: "All"
  },
  {
    name: "Near me"
  },
  {
    name: "My exhibitions"
  }
]


function ExhibitionScreen(props) {

  let [fontsLoaded] = useFonts({
    Heebo_100Thin,
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_800ExtraBold,
    Heebo_900Black
  })

  const [listExpo, setListExpo] = useState([])
  const [status, setStatus] = useState('')
  const [datalist, setDatalist] = useState(listExpo)
  const [likedExpo, setLikedExpo] = useState('')
  const [myExpoList, setMyExpoList] = useState([]);
  const [userCity, setUserCity] = useState('')
  const [colorIconAddExpo, setColorIconAddExpo] = useState("black")

  useEffect(() => {
    async function loadExpo() {
      var rawResponse = await fetch(`${REACT_APP_URL_BACKEND}/get-exhibitions/${props.token}`);
      var response = await rawResponse.json();
      setListExpo(response.listExpoBack);
      setUserCity(response.userCity)
    }
    loadExpo();
  }, []);

  var exhibitionsList = <LinearProgress style={{ margin: 30, width: 300 }} color="rgba(213, 208, 205, 0.7)" />
  if (listExpo.length > 0) {

    exhibitionsList = <FlatList
      data={datalist}
      keyExtractor={(index) => index.toString()}
      renderItem={({ item, index }) => {
        return <View>
          <ListItem bottomDivider>
            <Avatar style={{ width: 100, height: 160 }} source={{ uri: item.img }} />
            <ListItem.Content>
              <ListItem.Title style={{ fontFamily: 'Heebo_400Regular' }}>{item.title}</ListItem.Title>
              <ListItem.Subtitle style={{ fontFamily: 'Heebo_300Light', marginVertical: 5 }}>{item.place}</ListItem.Subtitle>
              <ListItem.Subtitle style={{ fontFamily: 'Heebo_300Light', marginVertical: 5 }}>{item.address}</ListItem.Subtitle>
              <ListItem.Subtitle style={{ fontFamily: 'Heebo_400Regular', fontSize: 12 }}>From {item.date_start} to {item.date_end}</ListItem.Subtitle>
              <View style={{ alignSelf: 'flex-end' }} >
                <TouchableOpacity>
                  <Icon style={{ marginEnd: 10 }}
                    name="plus"
                    size={20}
                    color={colorIconAddExpo}
                    contentStyle={{ margin: 20 }}
                    onPress={() => addToMyExpo()}
                  >
                  </Icon>
                </TouchableOpacity>
              </View>
            </ListItem.Content>
          </ListItem>
        </View >
      }}
    />
  }

  if (!fontsLoaded) {
    return <AppLoading />
  }

  const setStatusFilter = status => {
    if (status === 'All') {
      setDatalist(listExpo)
    }
    else if (status === 'Near me') {
      setDatalist([...listExpo.filter(e => e.city === userCity)])
    }
    else if (status === 'My exhibitions') {
      setDatalist(myExpoList)
    }
    setStatus(status)
  }


  const addToMyExpo = async () => {
    console.log('hello')
    for (let i = 0; i < datalist.length; i++) {
      console.log("datalist boucle :",datalist)
    if (likedExpo == false) {
      const data = await fetch(`${REACT_APP_URL_BACKEND}/add-exhibitions`, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.token}&title=${datalist[i].title}&place=${datalist[i].place}&address=${datalist[i].address}&date_start=${datalist[i].date_start}&date_end=${datalist[i].date_end}`
      });
      const dataJSON = await data.json();
      setColorIconAddExpo('orange');
      // props.addArtist(props.selectedArtist._id)
    } else {
      const data = await fetch(`${REACT_APP_URL_BACKEND}/delete-exhibitions`, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.token}&title=${datalist[i].title}`
      });
      const dataJSON = await data.json();
      setColorLike('black');
      // props.deleteArtist(props.selectedArtist._id)
    }

    setLikedExpo(!likedArtist);
  }
  }
  return (

    <View style={styles.container}>
      <View style={{ borderBottomWidth: 0.7, marginHorizontal: 40, borderBottomColor: "rgba(213, 208, 205, 0.7)", marginBottom: 20 }}>
        <Text style={{ fontFamily: 'Heebo_300Light', borderBottomColor: "red", textAlign: "center", fontSize: 18, padding: 20 }}> Exhibitions </Text>
      </View>
      <View style={{ flexDirection: "row" }} >
        {listTab.map(e => (
          <TouchableOpacity style={[styles.btnTab, status === e.name && styles.btnTabActive]} onPress={() => setStatusFilter(e.name)}>
            <Text style={styles.textTab}>{e.name}</Text>
          </TouchableOpacity>
        ))
        }
      </View>

      {exhibitionsList}

    </View>

  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    backgroundColor: "#FFFF",
  },
  checkbox: {
    backgroundColor: "transparent",
    padding: 0,
    paddingBottom: 20,
    borderColor: 0,
    marginHorizontal: 0,
    width: 100,
    alignItems: "center",
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 90,
    height: 90,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 15,
    marginTop: 5,
    fontFamily: 'Heebo_300Light'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  btnTab: {
    padding: 10,
    justifyContent: 'center',
    borderWidth: 0.5,
    width: Dimensions.get('window').width / 3,
    borderColor: '#D5D8DC'
  },
  textTab: {
    textAlign: 'center'
  },
  btnTabActive: {
    backgroundColor: '#82E0AA'
  },
});


function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(mapStateToProps, null)(ExhibitionScreen);
