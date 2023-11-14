import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import sharedStyles from './Styles'; // Import shared styles

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSaveChanges = () => {
  
  };

  return (
    <View style={styles.container}>
      <Text style={sharedStyles.title}>Name</Text>
      <TextInput
        style={sharedStyles.contentInput}
        onChangeText={text => setName(text)}
        value={name}
        placeholder="Enter your name"
      />

      <Text style={sharedStyles.title}>Phone</Text>
      <TextInput
        style={sharedStyles.contentInput}
        onChangeText={text => setPhone(text)}
        value={phone}
        placeholder="Enter your phone number"
      />

      <Text style={sharedStyles.title}>Password</Text>
      <TextInput
        style={sharedStyles.contentInput}
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
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    padding: 20,
  },
});
