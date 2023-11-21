import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import sharedStyles from './Styles'; // Import shared styles
import { useBLEContext } from './services/BLEContext';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [name, setName] = useState('');

  const { getUserName, setUserName } = useBLEContext();
  const navigation = useNavigation();

  useEffect(() => {
    (async() => {
      const user = await getUserName() || '';
      setName(user);
    })();
  }, []);

  const handleSaveChanges = async () => {
    const result = await setUserName(name);
    if (result) {
      Alert.alert('Saved successfully!');
      navigation.navigate('SettingHome');
    }
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
