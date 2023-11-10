import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavBar = () => {
    return (
        <View style={styles.navBar}>
            <View style={styles.iconContainer}>
                <Icon name="home" size={40} color="black" style={styles.icon} />
                <Icon name="lock" size={40} color="black" style={styles.icon} />
                <Icon name="bar-chart" size={40} color="black" style={styles.icon} />
                <Icon name="cog" size={40} color="black" style={styles.icon} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row', // Arrange the items horizontally
        alignItems: 'center',
        backgroundColor: '#E7EEF6',
        paddingHorizontal: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        backgroundColor: '#ededed', // Apply grey background to the container
        padding: 10,
        borderRadius: 20,
    },
    icon: {
        marginHorizontal: 35, // Space between the icons
    },
});

export default NavBar;
