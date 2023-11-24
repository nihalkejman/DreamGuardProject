import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useBLEContext } from './services/BLEContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import unlockImg from './assets/unlockButton.png';
import lockImg from './assets/lockImage.png';
import { EvilIcons } from '@expo/vector-icons';

const BikeLockScreen = ({ navigation }) => {
    const { connectedDevice, toggleLock, isLocked } = useBLEContext();

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%' }}>
                <Text style={styles.titleText}>Lock</Text>
                <Text style={styles.subtitleText}>{ connectedDevice?.localName }</Text>
            </View>
            <TouchableOpacity onPress={toggleLock} style={styles.lockBtn}>
                <EvilIcons
                    size={100}
                    color={isLocked ? 'crimson' : 'green'}
                    name={isLocked ? 'lock' : 'unlock'}
                />
            </TouchableOpacity>
            <Text style={styles.infoText}>Your bike is</Text>
            <Text style={[styles.statusText, { color: isLocked ? 'crimson' : 'green' }]}>
                {isLocked ? 'Locked in place' : 'Free to move'}
            </Text>
            {
                isLocked && (
                    <Text style={styles.noteText}>
                        Attempting to move it will trigger a notification on your phone
                    </Text>
                )
            }
        </SafeAreaView>
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
    lockBtn: {
        marginTop: '15%',
        marginBottom: '25%',
        height: 130,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: 'rgba(0,0,0, 0.25)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5
    },
    infoText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    statusText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    noteText: {
        fontSize: 15,
        fontStyle: 'italic',
        color: 'grey',
        marginTop: 35
    }
});

export default BikeLockScreen;
