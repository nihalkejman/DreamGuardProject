import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from './Navbar'; // Import the NavBar component

const HomeSession = () => {
    const [name, setName] = useState();
    const [number, setNumber] = useState();
    const [message, setMessage] = useState();
    const navigation = useNavigation();

    const stopSession = () => {
        // Navigate to the "HomeSession" screen when the "Start Session" button is pressed
        navigation.navigate('Home');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
                style={styles.stopButton}
                onPress={stopSession} // Add the navigation function here
            >
                <Text style={styles.stopButtonText}>Stop Session</Text>
            </TouchableOpacity>

            <View style={styles.squareContainer}>
                <View style={styles.square}>
                    <Text style={styles.squareText}>10</Text>
                    <Text style={styles.mphText}>mph</Text>
                    <Text style={styles.currentSpeedText}>Current Speed</Text>
                </View>
            </View>

            <Text style={styles.lifetimeStatsText}>Lifetime Stats</Text>

            <View style={styles.statsContainer}>
                <View style={styles.statsSquare}>
                    <Text style={styles.squareText}>67</Text>
                    <Text style={styles.milesText}>miles</Text>
                    <Text style={styles.totalDistanceText}>Total Distance</Text>
                </View>
                <View style={styles.statsSquare}>
                    <Text style={styles.squareText}>20</Text>
                    <Text style={styles.mphText}>mph</Text>
                    <Text style={styles.averageSpeedText}>Average Speed</Text>
                </View>
            </View>

            {/* Include the NavBar component at the bottom */}
            <NavBar />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between', // Adjusted to 'space-between'
        paddingHorizontal: 20,
        paddingBottom: 20, // Add paddingBottom to create space for the NavBar
        backgroundColor: '#E7EEF6',
    },
    stopButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        marginTop: 150,
    },
    stopButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    squareContainer: {
        alignItems: 'center',
    },
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
        marginTop: 20,
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
});

export default HomeSession;
