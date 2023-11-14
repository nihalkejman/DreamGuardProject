import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from './Navbar'; // Import the NavBar 
import { useBLEContext } from './services/BLEContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAverageSpeed, useCurrentSpeed, useSessionStatus, useTotalAverageSpeed, useTotalRideTime } from './services/BikeboxHooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
    const insets = useSafeAreaInsets();

    const { connectedDevice } = useBLEContext();
    const speed = useCurrentSpeed();
    const averageSpeed = useAverageSpeed();
    const { status, toggleStatus, getRideTime } = useSessionStatus();
    const totalRideTime = useTotalRideTime();
    const totalAverageSpeed = useTotalAverageSpeed();

    return (
        <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right, paddingBottom: insets.bottom }]}>
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

            <View style={styles.statsContainer}>
                <View style={styles.statsSquare}>
                    <Text style={styles.squareText}>{ speed }</Text>
                    <Text style={styles.mphText}>mph</Text>
                    <Text style={styles.currentSpeedText}>Current Speed</Text>
                </View>
                {
                    status && (
                        <>
                            <View style={styles.statsSquare}>
                                <Text style={styles.squareText}>{ averageSpeed }</Text>
                                <Text style={styles.mphText}>mph</Text>
                                <Text style={styles.averageSpeedText}>Average Speed</Text>
                            </View>
                            <View style={styles.statsSquare}>
                                <Text style={styles.squareText}>{ getRideTime() }</Text>
                                <Text style={styles.mphText}>minutes</Text>
                                <Text style={styles.averageSpeedText}>Ride time</Text>
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
                    <Text style={styles.averageSpeedText}>Total Ride Time</Text>
                </View>
                <View style={styles.statsSquare}>
                    <Text style={styles.squareText}>{ totalAverageSpeed }</Text>
                    <Text style={styles.mphText}>mph</Text>
                    <Text style={styles.averageSpeedText}>Average Speed</Text>
                </View>
            </View>
        
            <NavBar style={styles.navBar} />
        </ScrollView>
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
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#E7EEF6',
    },
    buttonContainer: {
        borderRadius: 10,
        padding: 13,
        marginBottom: 20,
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
    squareContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    },
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 5,
    },
    squareText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    mphText: {
        fontSize: 12,
        color: 'grey',
    },
    milesText: {
        fontSize: 12,
        color: 'grey',
    },
    currentSpeedText: {
        fontSize: 14,
        color: 'black',
        marginTop: 5,
    },
    totalDistanceText: {
        fontSize: 14,
        color: 'black',
        marginTop: 5,
    },
    averageSpeedText: {
        fontSize: 14,
        color: 'black',
        marginTop: 5,
    },
    lifetimeStatsText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    statsSquare: {
        width: 100,
        height: 100,
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
    navBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});

export default HomeScreen;
