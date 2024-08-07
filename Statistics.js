import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSessions } from './services/BikeboxHooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBLEContext } from './services/BLEContext';

const StatsScreen = () => {
  const data = useSessions();
  const { connectedDevice } = useBLEContext();
  
  const getTitle = (session) => {
    let diff = new Date().valueOf() - (session.end_time * 1000);
    diff /= (1000*60);
    
    return `${Math.trunc(diff)} minutes ago`
  }
  const getRideTime = (session) => {
    const dur = session.end_time - session.start_time;
    return `${(dur / 60).toFixed(1)} minutes`;
  }
  const getTimeText = (session) => {
    const start = new Date(session.start_time * 1000);
    const end = new Date(session.end_time * 1000);

    const startStr = `${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`;
    const endStr = `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;

    if (startStr === endStr) return `at ${endStr}`;
    return `${startStr} - ${endStr}`
  }
  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(date * 1000).toLocaleDateString(undefined, options);
  };

  const renderItem = ({ item }) => (
    <View style={styles.stats}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{formatDate(item.start_time)}</Text>
      </View>
      <Text style={styles.kmReadout}>{getTitle(item)}</Text>
      <View style={styles.details}>
        <Text>Top speed: {item.top_speed} mph</Text>
        <Text>Average speed: {item.average_speed || 0} mph</Text>
        <Text>Ride time: {getRideTime(item)}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.timeText}>{getTimeText(item)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', padding: 25 }}>
        <Text style={styles.titleText}>Sessions</Text>
        <Text style={styles.subtitleText}>{ connectedDevice?.localName }</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
    //nihal
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left'
  },
  subtitleText: {
      color: '#BCC1CA'
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#E7EEF6'
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
    borderRadius: 8,
    marginBottom: 10,
    padding: 16,

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
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  timeText: {
    fontWeight: 'bold',
  }
});

export default StatsScreen;
