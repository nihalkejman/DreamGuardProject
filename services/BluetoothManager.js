import { BleErrorCode, BleManager, Device } from 'react-native-ble-plx';
import { EventEmitter } from 'events';
import { Buffer } from 'buffer';
import { PermissionsAndroid } from 'react-native';

const BLE_IDS = Object.freeze({
    SERVICE: 'dcc67863-e2f0-43a3-b86a-4048285a7437',
    SPEED: 'bd34ee7a-c56b-4fa1-a633-d2933276e7d4',
    AVERAGE_SPEED: '86badc9c-3549-49f4-8619-5f452bda294f',
    SESSION_STATUS: '4d46fd27-d2bd-4b45-9de7-4e13bb266033',
    SESSIONS_LIST: '81e555da-c363-465c-a8c6-b2a60455f747',
    TOTAL_RIDE_TIME: "ad335ed2-f8a9-45c1-a8d8-4c8aec38bc3c",
    TOTAL_AVG_SPEED: "3b4c64f8-0024-4add-b04f-24da98e54440",
    TOP_SPEED: "521bc2b9-f56d-47a7-9a1d-5eff32bef48c",
    EMERGENCY_CONTACT: "6b4c7851-114d-47e2-ad88-9c358d970dcf",
    USER_NAME: "2cc21a98-6dac-4dbc-a84e-992f7b16ca74"
});

export class BluetoothManager extends EventEmitter {
    ble;
    poweredOn = false;
    isDisconnected = false;
    connectedDevice = null;
    
    #waitingToStartScan = false;

    constructor() {
        super();
        this.requestPermission();
        this.ble = new BleManager();

        let subscription = this.ble.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.poweredOn = true;
                subscription.remove();
                
                if (this.#waitingToStartScan) {
                    this.#waitingToStartScan = false;
                    this.startScan();
                }
            }
        });
    }

    async requestPermission() {
        if (Platform.OS === 'ios') {
            return true
        }
        if (Platform.OS === 'android' && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
            const apiLevel = parseInt(Platform.Version.toString(), 10)
    
            if (apiLevel < 31) {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                return granted === PermissionsAndroid.RESULTS.GRANTED
            }
            if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT) {
                const result = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                ])
    
                // return (
                //     result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
                //     result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
                //     result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
                // )
                return true;
            }
        }
    
        throw new Error('Bluetooth permissions not granted!');
    }

    startScan() {
        if (this.poweredOn = false) {
            return this.#waitingToStartScan = true;
        }
        this.ble.startDeviceScan(null, null, async (error, device) => {
            if (error) {
                // Handle error (scanning will be stopped automatically)
                console.error("Scan error: ", error);
                return
            }
            if (!device?.name || !device?.localName) return;
    
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            if (device.name.toLowerCase().endsWith('bike box')) {
                this.emit('device-scan', device);
            }
        })
    }
    stopScan() {
        this.ble.stopDeviceScan();
    }

    /**
     * @param {Device} device 
     */
    async connectToDevice(device) {
        try {
            // Proceed with connection.
            this.emit('device-connect', device);
            this.connectedDevice = await device.connect();
            this.connectedDevice.localName = device.localName;

            await this.connectedDevice.discoverAllServicesAndCharacteristics();
            this.emit('device-connected', this.connectedDevice);
            this.isDisconnected = false;

            const subscription = this.connectedDevice.onDisconnected((error, dev) => {
                this.isDisconnected = true;
                this.emit('device-disconnect', error, dev);
                subscription.remove();
            });
            return this.connectedDevice;
        }
        catch(err) {
            if (err.errorCode === BleErrorCode.DeviceAlreadyConnected) {
                this.connectedDevice = device;
                await this.connectedDevice.discoverAllServicesAndCharacteristics();
                this.emit('device-connected', this.connectedDevice);
                this.isDisconnected = false;
                return;
            }
            throw err;
        }
    }
    
    /**
     * @param {keyof typeof BLE_IDS} characteristic
     */
    async readChar(characteristic) {
        if (this.isDisconnected) {
            await this.connectToDevice(this.connectedDevice);
        }
        try {
            const dev = await this.connectedDevice.readCharacteristicForService(BLE_IDS.SERVICE, BLE_IDS[characteristic]);
            return Buffer.from(dev.value, 'base64').toString('utf-8');
        }
        catch(err) {
            this.handleError(err);
        }
    }
    /**
     * @param {keyof typeof BLE_IDS} characteristic
     * @param {string} value
     */
    async writeChar(characteristic, value) {
        if (this.isDisconnected) {
            this.connectToDevice(this.connectedDevice);
        }
        try {
            const buf = Buffer.from(value).toString('base64');
            await this.connectedDevice.writeCharacteristicWithResponseForService(BLE_IDS.SERVICE, BLE_IDS[characteristic], buf);
        }
        catch(err) {
            this.handleError(err);
        }
    }

    handleError(err) {
        this.emit('device-disconnect', err);
        throw err;
    }
}
