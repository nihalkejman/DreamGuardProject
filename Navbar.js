import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavBar = () => {
    return (
        <View style={styles.navBar}>
            <View style={styles.iconContainer}>
                <Icon name="home" size={30} color="black" style={styles.icon} />
            </View>
            <View style={styles.iconContainer}>
                <Icon name="lock" size={30} color="black" style={styles.icon} />
            </View>
            <View style={styles.iconContainer}>
                <Icon name="bar-chart" size={30} color="black" style={styles.icon} />
            </View>
            <View style={styles.iconContainer}>
                <Icon name="cog" size={30} color="black" style={styles.icon} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row', // Arrange theitems horizontally
        alignItems: 'center',
        backgroundColor: '#E7EEF6',
        paddingHorizontal: 10,
    },
    iconContainer: {
        marginHorizontal: 10, //space between theicons 
    },
    icon: {
    },
});

export default NavBar;

