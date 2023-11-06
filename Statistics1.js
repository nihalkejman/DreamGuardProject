import React, {useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const StatsScreen = () => {
  return (
    
      <View style={styles.container}>
        {/*Image*/}
        {/* <Image source={require('./DreamGuardLogo.png')} style={styles.image} /> */}

        {/*Title*/}
        <Text style={styles.title}>Sessions</Text>

        {/*Stats*/}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text>Date</Text>
            <Text>Time Began&Ended</Text>
            <Text>Distance</Text>
            <Text>Top Speed</Text>
            <Text>Average Speed</Text>
            <Text>Ride Time</Text>
          </View>

        </View>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },


  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },


  title: {
    fontSize: 24,
    marginTop: 20,
  },


  statsContainer: {
    marginTop: 20,
    backgroundColor: 'white'
  },


  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default StatsScreen;