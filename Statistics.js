import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import NavBar from './Navbar';

const Stats = () => {
  return (
    <View style={styles.container}>
      <ScrollView style = {styles.entry}>
        <View className="date">
          <View className="day">31st October</View>
          <View className="time">13:00-13:55</View>
        </View>
        <View className="distance">
          <Text className="km_readout">16km ride</Text>
        </View>
        <View className="details">
          <View>Top speed: 28mph</View>
          <View>Average speed: 15mph</View>
          <View>Ride time: 55 mins</View>
        </View>
      </ScrollView>
      <View style={styles.bottomNavBar}>
                <NavBar />
            </View>
    </View>

  );
};



const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  entry:{
    paddingBottom: 20,
    paddingLeft: 15,
    paddingTop: 10,
    align: 'center',
    backgroundColor: 'white',
    border: 2,    //neither will these border settings :)
    borderColor: 'black',
    borderRadius: 10,
    margin: 10,
    fontFamily: 'GillSans, GillSansMT, Calibri, TrebuchetMS, sansSerif',
  },

  inner:{
    padding: 5,
  },

  distance:{
    fontSize: 2,
  },

  km_readout:{
    fontWeight: 'bold',
  },

  date:{
    float: 'right',
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 10,
  },

  details:{
    paddingTop: 10,
  },

  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
},
  

})

export default Stats;