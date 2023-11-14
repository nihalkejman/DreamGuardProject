import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login'; //  login screen
import SettingScreen from './Setting'; //  "Settings" screen
import Account from './Account'// Account screen
import Lock from './Lock'
import EmergencyContactScreen from './EmergencyContact';
import HomeScreen from './Home';
import HomeSession from './HomeSession';
import Statistics from './Statistics';
import Unlock from './Unlock';
import DeviceDiscovery from "./screens/DeviceDiscovery";
import BLEContextProvider, { useBLEContext } from './services/BLEContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DeviceConnecting from './screens/DeviceConnecting';

function Routes() {

    const { connectedDevice, isConnecting } = useBLEContext();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                {
                    connectedDevice === undefined ? (
                        <Stack.Screen name="DeviceDiscovery" component={DeviceDiscovery} />
                    ) :
                    isConnecting ? (
                        <Stack.Screen name="DeviceConnecting" component={DeviceConnecting} />
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
                            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
                            <Stack.Screen name="HomeSession" component={HomeSession} options={{ title: 'Home Session' }} />
                            <Stack.Screen name="Unlock" component={Unlock} options={{ title: 'Unlocked' }} />
                            <Stack.Screen name="Setting" component={SettingScreen} options={{ title: 'Setting' }} />
                            <Stack.Screen name="Lock" component={Lock} options={{ title: 'Lock' }} />
                            <Stack.Screen name="EmergencyContact" component={EmergencyContactScreen} options={{ title: 'Emergency Contact' }} />
                            <Stack.Screen name="Account" component={Account} options={{ title: 'Account' }} />
                            <Stack.Screen name="Statistics" component={Statistics} options={{ title: 'Statistics' }} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const Stack = createStackNavigator();

export default function App() {
    return (
        <BLEContextProvider>
            <SafeAreaProvider>
                <Routes />
            </SafeAreaProvider>
        </BLEContextProvider>
    );
}
