import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
//Nihal 
export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSaveChanges = () => {
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setName(text)}
                value={name}
                placeholder="Enter your name"
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setPhone(text)}
                value={phone}
                placeholder="Enter your phone number"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder="Enter your password"
            />

            <Button title="Save Changes" onPress={handleSaveChanges} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
});
