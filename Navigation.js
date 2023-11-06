import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App'; //  login screen
import SettingsScreen from './Setting'; //  "Settings" screen

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="App">
                <Stack.Screen name="App" component={App} options={{ title: 'Login' }} />
                <Stack.Screen name="Setting" component={SettingsScreen} options={{ title: 'Setting' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
