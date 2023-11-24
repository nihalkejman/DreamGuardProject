import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBLEContext } from './services/BLEContext';

const SettingScreen = ({ navigation }) => {

    const { disconnect, connectedDevice } = useBLEContext();

    const handlePress = (item) => {
        if (item.screenName) {
            return navigation.navigate(item.screenName)
        }
        if (item.onClick) {
            return item.onClick();
        }
    }

    const handleDisconnect = () => {
        disconnect();
    }

    const settingsOptions = [
        { title: 'Account', screenName: 'Account' },
        { title: 'Emergency Contact', screenName: 'EmergencyContact' },
        { title: 'Data Privacy' },
        { title: 'Help Centre' },
        { title: 'Privacy Policy' },
        { title: 'Disconnect', onClick: handleDisconnect },
    ];

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handlePress(item)} style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', padding: 25 }}>
                <Text style={styles.titleText}>Settings</Text>
                <Text style={styles.subtitleText}>{ connectedDevice?.localName }</Text>
            </View>
            <FlatList
                data={settingsOptions}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7EEF6'
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
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 20,
        paddingHorizontal: 25,
        backgroundColor: 'white'
    },
    itemText: {
        fontSize: 18,
    },
    navBarSettings: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    centered: {
        justifyContent: 'center',
        width: '100%',
    },
});

export default SettingScreen;
