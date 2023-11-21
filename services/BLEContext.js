import { createContext, useEffect, useContext, useState, useCallback } from "react";
import { BluetoothManager } from "./BluetoothManager";
import { MockBluetoothManager } from "./MockBluetoothManager";
import { sendSMS } from "./SMS";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BLEContext = createContext(undefined);

export function useBLEContext() {
    const value = useContext(BLEContext);

    if (!value) {
        throw new Error('BLEContext used outside of provider!');
    }
    return value;
}

const ble = new BluetoothManager();
// const ble = new MockBluetoothManager();

export default function BLEContextProvider({ children }) {
    /**
     * Device information
     */
    const [ scannedDevices, setScannedDevices ] = useState([]);
    const [ isConnecting, setIsConnecting ] = useState(false);
    
    const [ connectedDevice, setConnectedDevice ] = useState();
    const [ connectionError, setConnectionError ] = useState();
    const [ lastConnectedDevice, setLastConnectedDevice ] = useState();

    /**
     * Emergency contact states
     */
    const [ hasSMSSent, setHasSMSSent ] = useState(false);
    const [ emergencyInfo, setEmergencyInfo ] = useState();

    const reconnect = useCallback((deviceId, timeoutInSec, error) => {
        let timeout;

        const deviceListener = async (device) => {
            if (device.id !== deviceId) return;

            clearTimeout(timeout);
            ble.removeListener('device-scan', deviceListener);
            await connectToDevice(device);
        };

        // Try to reconnect
        setConnectionError(error?.reason || undefined);
        setIsConnecting(true);

        ble.addListener('device-scan', deviceListener);
        timeout = setTimeout(() => {
            stopScan();
            ble.removeListener('device-scan', deviceListener);

            setIsConnecting(false);
            setConnectionError(undefined);
        }, timeoutInSec * 1000);

        startScan();
    }, [])

    useEffect(() => {
        (async() => {
            const obj = await AsyncStorage.getItem('@last-connected-device');
            if (obj) {
                const device = JSON.parse(obj);
                setLastConnectedDevice(device);
                reconnect(device.id, 5, null);
            }
        })();
    }, []);

    useEffect(() => {
        const disconnectCb = (error) => {
            return reconnect(lastConnectedDevice?.id, 10, error);
        }

        ble.addListener('device-disconnect', disconnectCb);
        return () => {
            ble.removeListener('device-disconnect', disconnectCb);
        }
    }, [ lastConnectedDevice ]);

    useEffect(() => {
        const deviceScanCb = (device) => {
            setScannedDevices(prev => {
                const idx = prev.findIndex(d => d.id === device.id);
                if (idx !== -1) {
                    if (device.rssi) prev[idx].rssi = device.rssi;
                    return [ ...prev ];
                };

                return [
                    ...prev,
                    device
                ];
            });
        };

        const connectCb = (device) => {
            setIsConnecting(true);
            setConnectedDevice(device);
        }
        const connectedCb = (device) => {
            setIsConnecting(false);
            setConnectedDevice(device);
            updateLastConnectedDevice(device);
        }
        
        
        ble.addListener('device-scan', deviceScanCb);
        ble.addListener('device-connect', connectCb);
        ble.addListener('device-connected', connectedCb);

        return () => {
            ble.removeListener('device-scan', deviceScanCb);
            ble.removeListener('device-connect', connectCb);
            ble.removeListener('device-connected', connectedCb);
        }
    }, []);

    const updateLastConnectedDevice = async(device) => {
        try {
            const obj = {
                id: device.id,
                name: device.name,
                localName: device.localName
            };
            setLastConnectedDevice(obj);
            await AsyncStorage.setItem('@last-connected-device', JSON.stringify(obj));
        } catch(err) {
            console.error(err);
        }
    }

    const startScan = () => {
        ble.startScan();
    };
    
    const stopScan = () => {
        ble.stopScan();
    }

    const connectToDevice = async (device) => {
        try  {
            stopScan();
            await ble.connectToDevice(device);
            setConnectionError(undefined);
            getEmergencyContact();
            setScannedDevices([]);
        }
        catch(err) {
            setConnectionError(err.reason);
        }
    }
    
    const getSpeed = async() => {
        try {
            return await ble.readChar('SPEED');
        } catch(err) {
            console.error(err);
            return null;
        }
    }
    const getAverageSpeed = async() => {
        try {
            return await ble.readChar('AVERAGE_SPEED');
        } catch(err) {
            console.error(err);
            return null;
        }
    }
    const getSessionStatus = async() => {
        try {
            return await ble.readChar('SESSION_STATUS');
        } catch(err) {
            console.error(err);
            return null;
        }
    }
    const getSessions = async() => {
        try {
            const s = await ble.readChar('SESSIONS_LIST');
            return JSON.parse(s);
        } catch(err) {
            console.error(err);
            return null;
        }
    }
    const getTotalRideTime = async() => {
        try {
            return await ble.readChar('TOTAL_RIDE_TIME');
        } catch(err) {
            console.error(err);
            return null;
        }
    }
    const getTotalAverageSpeed = async() => {
        try {
            return await ble.readChar('TOTAL_AVG_SPEED');
        } catch(err) {
            console.error(err);
            return null;
        }
    }
    const getTopSpeed = async() => {
        try {
            return await ble.readChar('TOP_SPEED');
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const getEmergencyContact = async() => {
        try {
            const s = await ble.readChar('EMERGENCY_CONTACT');
            const sos = JSON.parse(s);

            setEmergencyInfo(sos);
            return sos;
        } catch(err) {
            console.error(err);
            return null;
        }
    }
    const setEmergencyContact = async(data) => {
        try {
            await ble.writeChar('EMERGENCY_CONTACT', JSON.stringify(data));
            getEmergencyContact();
            return true;
        } catch(err) {
            console.error(err);
            return false;
        }
    }
    
    const setSessionStatus = async(enabled) => {
        try {
            await ble.writeChar('SESSION_STATUS', enabled ? '1' : '0');
            return true;
        } catch(err) {
            console.error(err);
            return false;
        }
    }

    const getUserName = async() => {
        try {
            return await ble.readChar('USER_NAME');
        } catch(err) {
            console.error(err);
            return null;
        }
    }
    const setUserName = async(value) => {
        try {
            await ble.writeChar('USER_NAME', value);
            connectedDevice.localName = `${value}'s BikeBox`;
            setScannedDevices(p => [...p]);
            return true;
        } catch(err) {
            console.error(err);
            return false;
        }
    }

    const sendSOS = () => {
        if (!hasSMSSent && emergencyInfo.emc_phone && emergencyInfo.emc_msg) {
            sendSMS(emc_phone, emc_msg);
            setHasSMSSent(true);
        }
    }

    return (
        <BLEContext.Provider value={{
            startScan,
            stopScan,
            connectToDevice,
            isConnecting,
            connectedDevice,
            scannedDevices,
            connectionError,
            lastConnectedDevice,
            getSpeed,
            getAverageSpeed,
            getSessionStatus,
            getSessions,
            setSessionStatus,
            getTotalRideTime,
            getTotalAverageSpeed,
            getTopSpeed,
            getEmergencyContact,
            setEmergencyContact,
            getUserName,
            setUserName,
            sendSOS
        }}>
            {children}
        </BLEContext.Provider>
    )
}