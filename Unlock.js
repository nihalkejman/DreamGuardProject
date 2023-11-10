import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import NavBar from './Navbar'; // Import the NavBar component

const BikeUnlockScreen = ({ navigation }) => {
    const handleLockPress = () => {
        // Navigate to the "Lock" screen when the lock button is pressed
        navigation.navigate('Lock');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Unlock</Text>
            <Text style={styles.subtitle}>Nihal's Dream Guard</Text>
            <TouchableOpacity onPress={handleLockPress}>
                <Image source={require('./assets/unlockButton.png')} style={styles.unlockButton} />
            </TouchableOpacity>
            <Text style={styles.infoText}>Your bike is:</Text>
            <Text style={styles.statusText}>Free to move</Text>
            
            {/* Move the NavBar component to the bottom */}
            <View style={styles.bottomNavBar}>
                <NavBar />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: 'gray',
    },
    unlockButton: {
        width: 100,
        height: 100,
        marginTop: 20,
    },
    infoText: {
        fontSize: 20,
        marginTop: 20,
    },
    statusText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
    },
    bottomNavBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});

export default BikeUnlockScreen;
