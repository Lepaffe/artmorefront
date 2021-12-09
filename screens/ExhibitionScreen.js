import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { CheckBox, Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { REACT_APP_URL_BACKEND } from "@env";

// var listExpo = [
//   {
//     name: "Spring Targets",
//     artist: "Emili Plater 11",
//     city: "Warsaw",
//     date: "Jan 2021 - Fev 2022",
//     photos: "https://www.pexels.com/fr-fr/photo/femme-sur-le-plan-d-eau-3405555/" 
//   },
//   {
//     name: "Spring Targets",
//     artist: "Emili Plater 11",
//     city: "Warsaw",
//     date: "Jan 2021 - Fev 2022",
//     photos: "https://www.pexels.com/fr-fr/photo/femme-sur-le-plan-d-eau-3405555/"
//   },
// ]


function ExhibitionScreen(props) {

  const [checkedDate, setCheckedDate] = useState(false);
  const [checkedPref, setCheckedPref] = useState(false);
  const [checkedNearMe, setCheckedNearMe] = useState(false);
  const [listExpo, setListExpo] = useState([])

  // var newListExpo = listExpo.((movie,i) => {
  //   return (
  //     <Cards>
  //       <img width="25%" src={movie.img} /> {movie.name}
  //       </ListGroupItemText>
  //     </ListGroupItem>
  //   )
  // })

  useEffect(() => {
    async function loadExpo() {
      var rawResponse = await fetch(`${REACT_APP_URL_BACKEND}/exhibitions`);
      var response = await rawResponse.json();
      // console.log("reponsefetch:", response.data);

      var listExpoCopy = []

      for (var i = 0; i < response.data.length; i++) {
        listExpoCopy.push({
          img: response.data[i].fields.image,
          title: response.data[i].fields.title,
          city: response.data[i].fields.city,
          date_start: response.data[i].fields.date_start,
          date_end: response.data[i].fields.date_end
        })

        if (response.data[i].fields.image_thumb == null) {
          response.data[i].fields.image_thumb = '../assets/category/abstract.jpg';
        }
      }
      setListExpo(listExpoCopy);
    }
    console.log(listExpo);
    loadExpo();
  }, []);



  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ borderBottomWidth: 1, marginHorizontal: 40, borderBottomColor: "grey", marginBottom: 20 }}>
          <Text style={{ borderBottomColor: "red", textAlign: "center", fontSize: 15, padding: 20 }}> Exhibitions </Text>
        </View>
        <View style={{ flexDirection: "row" }} >
          <CheckBox
            title='By date'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={checkedDate}
            onPress={() => setCheckedDate(!checkedDate)}
            containerStyle={styles.checkbox}
            textStyle={{ fontSize: 10, color: 'black' }}
          />
          <CheckBox
            title='By preferences'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={checkedPref}
            onPress={() => setCheckedPref(!checkedPref)}
            containerStyle={styles.checkbox}
            textStyle={{ fontSize: 10, color: 'black' }}

          />
          <CheckBox
            title='Near me'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={checkedNearMe}
            onPress={() => setCheckedNearMe(!checkedNearMe)}
            containerStyle={styles.checkbox}
            textStyle={{ fontSize: 10, color: 'black' }}
          />
        </View>

        {
          listExpo.map((u, i) => {
            return (
              <View key={i}>
                <Card>
                  {/* <Image
                  resizeMode="cover"
                  source={{ uri: "https://www.pexels.com/fr-fr/photo/femme-sur-le-plan-d-eau-3405555" }}
                /> */}
                  <Text>{u.title}</Text>
                  <Text>{u.city}</Text>
                  <Text>{u.date_start}</Text>
                  <Text>{u.date_end}</Text>
                  <Card.Image source={{ uri: u.img }}></Card.Image>
                </Card>
              </View>
            );
          })
        }

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#FFFF"
  },
  checkbox: {
    backgroundColor: "transparent",
    padding: 0,
    borderColor: 0,
    marginHorizontal: 0,
    width: 100,
    alignItems: "center",
  },
  input: {
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgb(213, 208, 205)",
    borderRadius: 15,
    padding: 10,
  },
  label: {
    marginTop: 15
  }
});


export default ExhibitionScreen;