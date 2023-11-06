import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login'; //  login screen
import SettingScreen from './Setting'; //  "Settings" screen
import Account from './Account'// Account screen
import Lock from './Lock';
import Statistics from './Statistics1';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
                <Stack.Screen name="Setting" component={SettingScreen} options={{ title: 'Setting' }} />
                <Stack.Screen name="Account" component={Account} options={{ title: 'Account' }} />
                <Stack.Screen name="Lock" component={Lock} options={{ title: 'Lock' }} />
                <Stack.Screen name="Statistics" component={Statistics} options={{ title: 'Statistics' }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
