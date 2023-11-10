import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-web';


const stats = () => {
  return (
      <ScrollView style = {styles.entry}>
        <View className="date">
          <View className="day">31st October</View>
          <View className="time">13:00-13:55</View>
        </View>
        <View className="distance">
          <Text className="km_readout">16km</Text> ride
        </View>
        <View className="details">
          <View>Top speed: 28mph</View>
          <View>Average speed: 15mph</View>
          <View>Ride time: 55 mins</View>
        </View>
      </ScrollView>
  );
};



const styles = StyleSheet.create({
  entry:{
    paddingBottom: 20,
    paddingLeft: 15,
    paddingTop: 10,
    width: 200,
    height: 200,  //this wont work cause it's a scroll view
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
  

})

export default stats;