import React, {useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const StatsScreen = () => {


  //weekly speed values in array
  const [weeklyData, setWeeklyData] = useState([25, 30, 30, 35, 20]);

  //montlhy
  const[monthlyData, setMonthlyData] = useState([25, 32, 30, 35, 20, 25, 33, 30, 35, 24, 25, 30, 26, 35, 27, 25, 23, 30, 35, 20]);

  //av speed
  const averageSpeed = weeklyData.length > 0
      ? weeklyData.reduce((sum, speed) => sum + speed, 0) / weeklyData.length:0;

  //weekly top speed
  const weeklyTopSpeed = weeklyData.length > 0 ? Math.max(...weeklyData) : 0;

  //monthly top speed
  const monthlyTopSpeed = monthlyData.length > 0 ? Math.max(...monthlyData) : 0;

  return (
      <View style={styles.container}>
        {/*Image*/}
        {/* <Image source={require('./DreamGuardLogo.png')} style={styles.image} /> */}

        {/*Title*/}
        <Text style={styles.title}>Dream Guard Statistics Screen</Text>

        {/*Stats*/}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text>Average Speed:</Text>
            <Text>{averageSpeed.toFixed(2)} mph</Text>
          </View>

          <View style={styles.statItem}>
            <Text>Weekly Top Speed:</Text>
            <Text>{weeklyTopSpeed.toFixed(2)} mph</Text>
          </View>

          <View style={styles.statItem}>
            <Text>Monthly Top Speed:</Text>
            <Text>{monthlyTopSpeed.toFixed(2)} mph</Text>
          </View>

          <View style={styles.statItem}>
            <Text>Monthly Sessions:</Text>
            <Text>67</Text>
          </View>

          <View style={styles.statItem}>
            <Text>Total Ride Time:</Text>
            <Text>3 days, 20 hours</Text>
          </View>
          {/*Add more stats here*/}
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
  },


  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default StatsScreen;