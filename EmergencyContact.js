import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
import sharedStyles from './Styles'; // Import shared styles

const EmergencyContactScreen = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={sharedStyles.title}>Emergency contact name</Text>
      <TextInput 
        style={sharedStyles.contentInput} 
        onChangeText={text => setName(text)}
        value={name}
        placeholder="Enter emergency contact name"
      />

      <Text style={sharedStyles.title}>Emergency contact number</Text>
      <TextInput 
        style={sharedStyles.contentInput} 
        onChangeText={text => setNumber(text)}
        value={number}
        placeholder="Enter emergency contact number"
      />

      <Text style={sharedStyles.title}>Auto Crash Message</Text>
      <TextInput 
        style={sharedStyles.contentInput} 
        onChangeText={text => setMessage(text)}
        value={message}
        placeholder="Enter auto crash message"
      />

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
});

export default EmergencyContactScreen;
