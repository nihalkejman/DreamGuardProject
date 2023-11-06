import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login'; //  login screen
import SettingScreen from './Setting'; //  "Settings" screen
import Account from './Account'// Account screen
import Lock from './Lock'
import EmergencyContactScreen from './EmergencyContact';
import HomeScreen from './Home';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
                <Stack.Screen name="Setting" component={SettingScreen} options={{ title: 'Setting' }} />
                <Stack.Screen name="Account" component={Account} options={{ title: 'Account' }} />
                <Stack.Screen name="Lock" component={Lock} options={{ title: 'Lock' }} />
                <Stack.Screen name="EmergencyContact" component={EmergencyContactScreen} options={{ title: 'Emergency Contact' }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />


            </Stack.Navigator>
        </NavigationContainer>
    );
}
