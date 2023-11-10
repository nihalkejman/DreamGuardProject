import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from './Navbar'; // Import the NavBar component

const HomeScreen = () => {
    const navigation = useNavigation();

    const startSession = () => {
        // Navigate to the "HomeSession" screen when the "Start Session" button is pressed
        navigation.navigate('HomeSession');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Rest of your existing code */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Start Session"
                    onPress={startSession}
                    color={styles.startSessionButton.color}
                />
            </View>

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
        justifyContent: 'space-between', // Change to 'space-between'
        paddingHorizontal: 20,
        paddingBottom: 20, // Add paddingBottom to create space for the NavBar
        backgroundColor: '#E7EEF6',
    },
    buttonContainer: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        marginTop: 150, // Adjust the marginTop value
    },
    startSessionButton: {
        color: 'white',
    },
    squareContainer: {
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
});

export default HomeScreen;
