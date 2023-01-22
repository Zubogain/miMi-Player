export interface IBluetoothDevice {
    id: string,
    name: string,
    isConnected: boolean
}

export interface IBluetoothDeviceList extends Array<IBluetoothDevice> { }

interface IBluetoothState {
    device: IBluetoothDevice
    deviceList: IBluetoothDeviceList
}