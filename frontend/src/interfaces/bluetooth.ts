export interface IBluetoothDevice {
  Id: string
  Name: string
  isConnected: boolean
}

export interface IBluetoothDeviceList extends Array<IBluetoothDevice> {}

export interface IBluetoothState {
  device: IBluetoothDevice
  deviceList: IBluetoothDeviceList
}
