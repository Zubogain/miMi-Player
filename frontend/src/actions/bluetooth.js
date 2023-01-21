export const BLUETOOTH_SET_DEVICE = "BLUETOOTH_SET_DEVICE";
export const BLUETOOTH_CLEAR_DEVICE = "BLUETOOTH_CLEAR_DEVICE";

export const BLUETOOTH_SET_DEVICE_LIST = "BLUETOOTH_SET_DEVICE_LIST";
export const BLUETOOTH_CLEAR_DEVICE_LIST = "BLUETOOTH_CLEAR_DEVICE_LIST";

export const bluetoothSetDevice = (device) => (
    { type: BLUETOOTH_SET_DEVICE, payload: { ...device, isConnected: true } }
);

export const bluetoothClearDevice = () => (
    { type: BLUETOOTH_CLEAR_DEVICE, payload: { isConnected: false } }
);

export const bluetoothSetDeviceList = (deviceList) => (
    { type: BLUETOOTH_SET_DEVICE_LIST, payload: deviceList }
);

export const bluetoothClearDeviceList = () => (
    { type: BLUETOOTH_CLEAR_DEVICE_LIST, payload: [] }
); 