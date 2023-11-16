import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
<<<<<<< HEAD
import NavBar from './NavBar'; 
=======
import { useBLEContext } from './services/BLEContext';
import { SafeAreaView } from 'react-native-safe-area-context';
>>>>>>> e8d422666bfed658fad6034cd3cf4a10e49e4586

const BikeLockScreen = ({ navigation }) => {
    const handleUnlockPress = () => {
        navigation.navigate('Unlock');
    };

    const { connectedDevice } = useBLEContext();

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%' }}>
                <Text style={styles.titleText}>Lock</Text>
                <Text style={styles.subtitleText}>{ connectedDevice.localName }</Text>
            </View>
            <TouchableOpacity onPress={handleUnlockPress} style={{ marginTop: '25%' }}>
                <Image source={require('./assets/lockImage.png')} style={styles.lockImage} />
            </TouchableOpacity>
            <Text style={styles.infoText}>Your bike is:</Text>
            <Text style={styles.statusText}>Locked in place</Text>
            <Text style={styles.trigger}>
                Attempting to move it will trigger an alarm which can only be stopped from the app
            </Text>
<<<<<<< HEAD

            {/* Add NavBar at the bottom of the screen */}
            <View style={styles.navBarLock}>
                <NavBar style={styles.centered} />
            </View>
        </View>
=======
        </SafeAreaView>
>>>>>>> e8d422666bfed658fad6034cd3cf4a10e49e4586
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E7EEF6',
        padding: 25
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'left'
    },
    subtitleText: {
        color: '#BCC1CA'
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
        marginTop: 25
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
