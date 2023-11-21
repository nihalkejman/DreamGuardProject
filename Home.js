import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useBLEContext } from './services/BLEContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAverageSpeed, useCurrentSpeed, useSessionStatus, useTopSpeed, useTotalAverageSpeed, useTotalRideTime } from './services/BikeboxHooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
    const { connectedDevice } = useBLEContext();
    const speed = useCurrentSpeed();
    const averageSpeed = useAverageSpeed();
    const { status, toggleStatus, getRideTime } = useSessionStatus();
    const totalRideTime = useTotalRideTime();
    const totalAverageSpeed = useTotalAverageSpeed();
    const topSpeed = useTopSpeed();

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={{ width: '100%', padding: 25 }}>
                <Text style={styles.titleText}>Home</Text>
                <Text style={styles.subtitleText}>{ connectedDevice.localName }</Text>
            </View>
    
            <TouchableOpacity
                style={[styles.buttonContainer, status ? styles.enabledButton : styles.disabledButton]}
                onPress={toggleStatus}
            >
                <MaterialCommunityIcons name={status ? "stop-circle-outline" : "bike-fast"} size={24} color={status ? styles.enabledButton.color : styles.disabledButton.color} />
                <Text style={[styles.startSessionText, status ? styles.enabledButton : styles.disabledButton]}>{status ? 'Stop' : 'Start'} Session</Text>
            </TouchableOpacity>

            <ScrollView>
                <View style={styles.statsContainer}>
                    <View style={styles.statsSquare}>
                        <Text style={styles.squareText}>{ speed }</Text>
                        <Text style={styles.mphText}>mph</Text>
                        <Text style={styles.unitText}>Current Speed</Text>
                    </View>
                    {
                        status && (
                            <>
                                <View style={styles.statsSquare}>
                                    <Text style={styles.squareText}>{ averageSpeed }</Text>
                                    <Text style={styles.mphText}>mph</Text>
                                    <Text style={styles.unitText}>Average Speed</Text>
                                </View>
                                <View style={styles.statsSquare}>
                                    <Text style={styles.squareText}>{ topSpeed }</Text>
                                    <Text style={styles.mphText}>mph</Text>
                                    <Text style={styles.unitText}>Top Speed</Text>
                                </View>
                                <View style={styles.statsSquare}>
                                    <Text style={styles.squareText}>{ getRideTime() }</Text>
                                    <Text style={styles.mphText}>minutes</Text>
                                    <Text style={styles.unitText}>Ride time</Text>
                                </View>
                            </>
                        )
                    }
                </View>

                <Text style={styles.lifetimeStatsText}>Lifetime Stats</Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statsSquare}>
                        <Text style={styles.squareText}>{ totalRideTime }</Text>
                        <Text style={styles.mphText}>minutes</Text>
                        <Text style={styles.unitText}>Total Ride Time</Text>
                    </View>
                    <View style={styles.statsSquare}>
                        <Text style={styles.squareText}>{ totalAverageSpeed }</Text>
                        <Text style={styles.mphText}>mph</Text>
                        <Text style={styles.unitText}>Average Speed</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#E7EEF6',
    },
    buttonContainer: {
        borderRadius: 10,
        padding: 13,
        marginBottom: 10,
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2
    },
    enabledButton: {
        backgroundColor: 'transparent',
        borderColor: 'crimson',
        color: 'crimson'
    },
    disabledButton: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white'
    },
    startSessionText: {
        marginLeft: 15,
        fontSize: 18,
    },
    squareText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    mphText: {
        fontSize: 12,
        color: 'grey',
    },
    unitText: {
        fontSize: 14,
        color: 'black',
        marginTop: 15,
    },
    lifetimeStatsText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center'
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
        flexWrap: 'wrap',
        gap: 30
    },
    statsSquare: {
        width: 120,
        height: 120,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 5,
    },
});

export default HomeScreen;
