import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native';

const HomeScreen = () => {
    const [name, setName] = useState();
    const [number, setNumber] = useState();
    const [message, setMessage] = useState();

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Button 
                title="Start Session" 
                onPress={() => alert('Session started.')}
            />
            <Text style={styles.title}>Emergency contact name:</Text>
            <TextInput 
                style={styles.contentInput} 
                onChangeText={text => setName(text)}
                value={name}
                placeholder="Enter emergency contact name"

                
            />

<Text style={styles.title}>Emergency contact number:</Text>
            <TextInput 
                style={styles.contentInput} 
                onChangeText={text => setNumber(text)}
                value={number}
                placeholder="Enter emergency contact number"

                />

<Text style={styles.title}>Auto Crash Message:</Text>
            <TextInput 
                style={styles.contentInput} 
                onChangeText={text => setMessage(text)}
                value={message}
                placeholder="Enter auto crash message"

                />
       

            {/* Rest of the content */}

            <Button 
                title="Save Changes" 
                onPress={() => alert('Emergency settings saved successfully.')}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#E7EEF6',
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
    },
    content: {
        fontSize: 16,
        marginBottom: 20,
    },
    contentInput: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        width: '100%',
        marginBottom: 10,
    },
});

export default HomeScreen;