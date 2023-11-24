import { EventEmitter } from 'events';

export class MockBluetoothManager extends EventEmitter {
    startScan() {
        setTimeout(() => {
            this.emit('device-scan', {
                id: '134',
                name: 'Bike Box',
                localName: "Thura's BikeBox",
                rssi: -18,
                txPowerLevel: 31
            });
        }, 3000)
    }

    stopScan() {}

    connectToDevice(device) {
        this.emit('device-connect', device);
        setTimeout(() => {
            this.emit('device-connected', device);
        }, 3000)
    }

    /**
     * Mock Values
     */
    getRandomSpeed() {
        return Math.random() * 25;
    }
    getRandomTime() {
        return Math.random() * 500;
    }

    status = 0;
    MOCK_CHARS = {
        SPEED: () => this.getRandomSpeed(),
        AVERAGE_SPEED: () => this.getRandomSpeed(),
        TOTAL_AVG_SPEED: () => this.getRandomSpeed(), 
        TOP_SPEED: () => this.getRandomSpeed(),
        TOTAL_RIDE_TIME: () => this.getRandomTime(),
        SESSION_STATUS: () => this.status,
        SESSIONS_LIST: () => {
            // this.emit('device-disconnect', { reason: 'Device not found' })
            return JSON.stringify(({
                11: {"top_speed": 0, "avg_speed": 0, "start_time": 1699985085, "end_time": 1699985188},
                10: {"top_speed": 0, "avg_speed": 0, "start_time": 1699985033, "end_time": 1699985080},
                9: {"top_speed": 0, "avg_speed": 0, "start_time": 1699984922, "end_time": 1699984946}
            }));
        },
        EMERGENCY_CONTACT: () => JSON.stringify({ emc_name: '', emc_phone: '', emc_msg: '' })
    };

    readChar(characteristic) {
        return this.MOCK_CHARS[characteristic]?.();
    }
    writeChar(characteristic, value) {
        if (characteristic === 'SESSION_STATUS') this.status = Number(value);
    }
}
