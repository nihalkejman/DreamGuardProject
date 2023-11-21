import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useBLEContext } from '../services/BLEContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeviceConnecting() {

    const { connectedDevice, lastConnectedDevice } = useBLEContext();

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.headerImage} />
            <Text style={styles.header}>
                { connectedDevice?.localName ?? lastConnectedDevice?.localName }
            </Text>

            <View style={styles.spinner}>
                <ActivityIndicator size='large' color='' />
                <Text style={styles.spinnerText}>Connecting...</Text>
            </View>
        </SafeAreaView>
    )
}

export function DeviceReconnecting() {
    const { lastConnectedDevice, connectionError } = useBLEContext();

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.headerImage} />
            <Text style={styles.header}>
                { lastConnectedDevice?.localName }
            </Text>

            <View style={styles.spinner}>
                <ActivityIndicator size='large' color='' />
                <Text style={styles.spinnerText}>Trying to reconnect...</Text>
                <Text style={styles.errorText}>Error: { connectionError }</Text>
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
    headerImage: {
        marginTop: 100,
        marginBottom: 16,
        width: 75,
        height: 75,
        borderRadius: 12
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
    errorText: {
        color: 'crimson',
        marginTop: 40,
        textAlign: 'center'
    }
});

