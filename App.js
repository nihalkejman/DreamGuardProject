import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingScreen from './Setting'; //  "Settings" screen
import Account from './Account'// Account screen
import Lock from './Lock'
import EmergencyContactScreen from './EmergencyContact';
import HomeScreen from './Home';
import Statistics from './Statistics';
import Unlock from './Unlock';
import DeviceDiscovery from "./screens/DeviceDiscovery";
import BLEContextProvider, { useBLEContext } from './services/BLEContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DeviceConnecting from './screens/DeviceConnecting';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Sub views
const SettingStack = createStackNavigator();
const LockStack = createStackNavigator();

function Routes() {

    const { connectedDevice, isConnecting } = useBLEContext();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
                {
                    connectedDevice === undefined ? (
                        <Stack.Screen name="DeviceDiscovery" component={DeviceDiscovery} />
                    ) :
                    isConnecting ? (
                        <Stack.Screen name="DeviceConnecting" component={DeviceConnecting} />
                    ) : (
                        <Stack.Screen name="MainTabs" component={MainTabs} />
                    )
                }

            </Stack.Navigator>
        </NavigationContainer>
    );
}

function MainTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'black',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    }
                    else if (route.name === 'Lock') {
                        iconName = focused ? 'lock-closed' : 'lock-closed-outline';
                    }
                    else if (route.name === 'Statistics') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    }
                    else if (route.name === 'Setting') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Tab.Screen name="Lock" component={LockView} options={{ title: 'Lock' }} />
            <Tab.Screen name="Statistics" component={Statistics} options={{ title: 'Statistics' }} />
            <Tab.Screen name="Setting" component={SettingView} options={{ title: 'Setting' }} />
        </Tab.Navigator>
    )
}

function SettingView() {
    return (
        <SettingStack.Navigator initialRouteName="SettingMain" screenOptions={{ headerShown: false }}>
            <SettingStack.Screen name="SettingMain" component={SettingScreen} />
            <SettingStack.Screen name="EmergencyContact" component={EmergencyContactScreen} options={{ title: 'Emergency Contact' }} />
            <SettingStack.Screen name="Account" component={Account} options={{ title: 'Account' }} />
        </SettingStack.Navigator>
    )
}

function LockView() {
    return (
        <LockStack.Navigator initialRouteName='LockMain' screenOptions={{ headerShown: false }}>
            <LockStack.Screen name="LockMain" component={Lock} />
            <LockStack.Screen name="Unlock" component={Unlock} />
        </LockStack.Navigator>
    )
}

export default function App() {
    return (
        <BLEContextProvider>
            <SafeAreaProvider>
                <Routes />
            </SafeAreaProvider>
        </BLEContextProvider>
    );
}
