import { createContext, useEffect, useContext, useRef, useState } from "react";
import { BluetoothManager } from "./BluetoothManager";

const BLEContext = createContext(undefined);

export function useBLEContext() {
    const value = useContext(BLEContext);

    if (!value) {
        throw new Error('BLEContext used outside of provider!');
    }
    return value;
}

const ble = new BluetoothManager();

export default function BLEContextProvider({ children }) {

    const [ scannedDevices, setScannedDevices ] = useState([]);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ isConnecting, setIsConnecting ] = useState(false);

    const [ connectedDevice, setConnectedDevice ] = useState();
    const [ connectionError, setConnectionError ] = useState();

    useEffect(() => {
        const deviceScanCb = (device) => {
            setScannedDevices(prev => {
                const exists = prev.findIndex(d => d.id === device.id) !== -1;
                if (exists) return prev;

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

    const startScan = () => {
        setIsLoading(true);
        ble.startScan();
    };
    
    const stopScan = () => {
        setIsLoading(false);
        ble.stopScan();
    }

    const connectToDevice = async (device) => {
        try {
            setConnectionError(undefined);
            await ble.connectToDevice(device);
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
            return await ble.readChar('SESSIONS_LIST');
        } catch(err) {
            console.error(err);
            return null;
        }
    }
    
    const setSessionStatus = async(enabled) => {
        await ble.writeChar('SESSION_STATUS', enabled ? '1' : '0');
    }

    return (
        <BLEContext.Provider value={{
            startScan,
            stopScan,
            connectToDevice,
            isLoading,
            isConnecting,
            connectedDevice,
            scannedDevices,
            connectionError,
            getSpeed,
            getAverageSpeed,
            getSessionStatus,
            getSessions,
            setSessionStatus
        }}>
            {children}
        </BLEContext.Provider>
    )
}