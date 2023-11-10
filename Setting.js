import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const SettingScreen = ({ navigation }) => {
    const settingsOptions = [
        { title: 'Account', screenName: 'Account' },
        { title: 'Emergency Contact', screenName: 'EmergencyContact' },
        { title: 'Data Privacy'  },
        { title: 'Help Centre' },
        { title: 'Privacy Policy' },
        { title: 'Logout' },
        { title: 'Home', screenName: 'Home' },
    ];
//nihal 
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate(item.screenName)} style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>
            <FlatList
                data={settingsOptions}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 16,
    },
    itemText: {
        fontSize: 18,
    },
});

export default SettingScreen;
