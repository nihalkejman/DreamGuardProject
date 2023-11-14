import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import NavBar from './NavBar'; 

const BikeLockScreen = ({ navigation }) => {
    const handleUnlockPress = () => {
        navigation.navigate('Unlock');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lock</Text>
            <Text style={styles.subtitle}>Nihal's Dream Guard</Text>
            <TouchableOpacity onPress={handleUnlockPress}>
                <Image source={require('./assets/lockImage.png')} style={styles.lockImage} />
            </TouchableOpacity>
            <Text style={styles.infoText}>Your bike is:</Text>
            <Text style={styles.statusText}>Locked in place</Text>
            <Text style={styles.trigger}>
                Attempting to move it will trigger an alarm which can only be stopped from the app
            </Text>

            {/* Add NavBar at the bottom of the screen */}
            <View style={styles.navBarLock}>
                <NavBar style={styles.centered} />
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
    lockImage: {
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
        color: 'red',
    },
    trigger: {
        fontSize: 15,
        fontStyle: 'italic',
        color: 'grey',
    },
    navBarLock: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    centered: {
        justifyContent: 'center',
        width: '100%',
    },
});

export default BikeLockScreen;
