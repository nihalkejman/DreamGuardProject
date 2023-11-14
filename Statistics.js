import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import NavBar from './NavBar';

const StatsScreen = () => {
  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const data = [
    {
      id: '1',
      date: '2023-10-21',
      distance: '16km ride',
      topSpeed: '28mph',
      averageSpeed: '15mph',
      rideTime: '55 mins',
      time: '13:00-13:55',
    },
    {
      id: '2',
      date: '2023-10-22',
      distance: '20km ride',
      topSpeed: '30mph',
      averageSpeed: '18mph',
      rideTime: '45 mins',
      time: '14:00-14:45',
    },
    {
      id: '3',
      date: '2023-10-23',
      distance: '12km ride',
      topSpeed: '25mph',
      averageSpeed: '12mph',
      rideTime: '60 mins',
      time: '12:30-13:30',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.stats}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{formatDate(item.date)}</Text>
      </View>
      <Text style={styles.kmReadout}>{item.distance}</Text>
      <View style={styles.details}>
        <Text>Top speed: {item.topSpeed}</Text>
        <Text>Average speed: {item.averageSpeed}</Text>
        <Text>Ride time: {item.rideTime}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topSpace} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      
      <View style={styles.navBarStats}>

        <NavBar />
      </View>
    </View>
    //nihal
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',


  },
  stats: {
    paddingBottom: 20,
    paddingLeft: 15,
    paddingTop: 10,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    margin: 10,
  },
  distance: {
    fontSize: 20,
  },
  km_readout: {
    fontWeight: 'bold',
  },
  date: {
    paddingRight: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  topSpace: {
    height: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  stats: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    marginBottom: 10,
    padding: 16,
    alignSelf: 'stretch',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  dateText: {
    fontWeight: 'bold',
  },
  kmReadout: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,

  },
  details: {
    paddingTop: 10,
  },

  navBar: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  timeText: {
    fontWeight: 'bold',
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default StatsScreen;

