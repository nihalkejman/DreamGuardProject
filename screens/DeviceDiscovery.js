import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { useBLEContext } from '../services/BLEContext';
import { useEffect } from 'react';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeviceDiscovery() {

    const { startScan, connectToDevice, scannedDevices } = useBLEContext();

    useEffect(() => {
        startScan();
    }, []);

    const handleDevicePress = (device) => {
        connectToDevice(device);
    }

    const calculateDistance = (device) => {
        const dist = Math.trunc(Math.pow(10, (( -31 - device.rssi ) / 40)));
        
        if (dist <= 5) {
            return '<5m';
        }
        return `${dist}m`
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleDevicePress(item)} style={styles.deviceItem}>
                <Text style={styles.itemText}>{item.localName}</Text>
                <Text style={styles.itemSub}>{ calculateDistance(item) }</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/logo.png')} style={[styles.headerImage, scannedDevices.length === 0 ? styles.bigMargin : styles.smallMargin]} />
            <Text style={styles.header}>
                { scannedDevices.length === 0 ? 'Welcome' : 'Select your Bike Box' }
            </Text>

            {
                scannedDevices.length > 0 && (
                    <FlatList
                        style={styles.deviceContainer}
                        data={scannedDevices}
                        renderItem={renderItem}
                        keyExtractor={(dev) => dev.id}
                    />
                )
            }

            <View style={styles.spinner}>
                <ActivityIndicator size='large' color='' />
                <Text style={styles.spinnerText}>Searching for your Bike Box...</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#E7EEF6',
        height: '100%'
    },
    bigMargin: {
        marginTop: 100
    },
    smallMargin: {
        marginTop: 20
    },
    headerImage: {
        marginBottom: 16,
        width: 75,
        height: 75,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    spinner: {
        marginTop: 100
    },
    spinnerText: {
        fontSize: 15,
        marginTop: 16
    },
    deviceContainer: {
        width: '100%',
        padding: 20
    },
    deviceItem: {
        marginLeft: 10,
        marginRight: 10,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    itemText: {
        fontSize: 16
    },
    itemSub: {
        color: '#BCC1CA'
    }
});

