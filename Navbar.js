import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home');    //Navigate to the "Home" screen
    };

    const navigateToLock = () => {
        navigation.navigate('Lock');    //Navigate to the "Lock" screen
    };

    const navigateToSettings = () => {
        navigation.navigate('Setting');
    };

    const navigateToStats = () => {
        navigation.navigate('Statistics');  //Nav to stats
    }


    return (
        <View style={styles.navBar}>
            <TouchableOpacity onPress={navigateToHome}>
                <Icon name="home" size={40} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToLock}>
                <Icon name="lock" size={40} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToStats}>
                <Icon name="bar-chart" size={40} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToSettings}>
                <Icon name="cog" size={40} color="black" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#E7EEF6',
        width: '100%'
    },
});

export default NavBar;
