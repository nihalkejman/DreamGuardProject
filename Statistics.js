import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './Navbar';

const Stats = () => {
  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <View style={styles.date}>
          <Text style={{ fontWeight: 'bold' }}>31st October</Text>
          <Text>13:00-13:55</Text>
        </View>
        <View style={styles.distance}>
          <Text style={styles.km_readout}>16km ride</Text>
        </View>
        <View style={styles.details}>
          <Text>Top speed: 28mph</Text>
          <Text>Average speed: 15mph</Text>
          <Text>Ride time: 55 mins</Text>
        </View>
      </View>
      <View style={styles.navBar}>
        <NavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  details: {
    paddingTop: 10,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 20,
  },
});

export default Stats;
