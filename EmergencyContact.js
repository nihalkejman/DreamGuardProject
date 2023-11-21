import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, Button, TextInput, Alert } from 'react-native';
import sharedStyles from './Styles'; // Import shared styles
import { useBLEContext } from './services/BLEContext';
import { useNavigation } from '@react-navigation/native';

const EmergencyContactScreen = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();
  const { getEmergencyContact, setEmergencyContact } = useBLEContext();

  useEffect(() => {
    (async() => {
      const values = await getEmergencyContact();
      setName(values.emc_name || '');
      setNumber(values.emc_phone || '');
      setMessage(values.emc_msg || '');
    })();
  }, []);

  const handleNameChange = (text) => {
    if (text.length > 20) {
      return Alert.alert('Invalid text', 'Emergency name cannot be longer than 20 characters');
    }
    setName(text);
  };
  const handleNumberChange = (text) => {
    if (text.length > 15) {
      return Alert.alert('Invalid text', 'Emergency contact number cannot be longer than 15 characters');
    }
    setNumber(text);
  };
  const handleMsgChange = (text) => {
    if (text.legnth > 300) {
      return Alert.alert('Invalid text', 'Emergency message cannot be longer than 300 characters');
    }
    setMessage(text);
  };

  const handleSave = async() => {
    const result = await setEmergencyContact({
      emc_name: name,
      emc_phone: number,
      emc_msg: message
    });
    if (result) {
      Alert.alert('Saved successfully');
      navigation.navigate('SettingHome');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={sharedStyles.title}>Emergency contact name</Text>
      <TextInput 
        style={sharedStyles.contentInput} 
        onChangeText={handleNameChange}
        value={name}
        placeholder="Enter emergency contact name"
      />

      <Text style={sharedStyles.title}>Emergency contact number</Text>
      <TextInput 
        style={sharedStyles.contentInput} 
        onChangeText={handleNumberChange}
        value={number}
        placeholder="Enter emergency contact number"
      />

      <Text style={sharedStyles.title}>Emergency Message</Text>
      <TextInput 
        style={sharedStyles.contentInput} 
        onChangeText={handleMsgChange}
        value={message}
        placeholder="Enter message to send on crash"
      />

      <Button 
        title="Save Changes" 
        onPress={handleSave}
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
