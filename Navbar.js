import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const NavBar = ({ style }) => {
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    const navigateToLock = () => {
        navigation.navigate('Lock');
    };

    const navigateToSettings = () => {
        navigation.navigate('Setting');
    };

    const navigateToStats = () => {
        navigation.navigate('Statistics');
    };

    return (
        <View style={[styles.navBar, styles.centered, style]}>
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
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E7EEF6',
        paddingHorizontal: 10,
    },
    centered: {
        justifyContent: 'center',
        width: '100%',
    },
    icon: {
        marginHorizontal: 20, 
    },
});

export default NavBar;
