import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const BikeLockScreen = ({ navigation }) => {
    const handleUnlockPress = () => {
        // Navigate to the "Unlock" screen when the unlock button is pressed
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
});

export default BikeLockScreen;
