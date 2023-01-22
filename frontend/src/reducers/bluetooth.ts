import { PayloadAction } from '@reduxjs/toolkit';
import {
    BLUETOOTH_SET_DEVICE,
    BLUETOOTH_CLEAR_DEVICE,
    BLUETOOTH_SET_DEVICE_LIST,
    BLUETOOTH_CLEAR_DEVICE_LIST
} from "../actions/bluetooth"

export interface IBluetoothDevice {
    Id: string,
    Name: string,
    isConnected: boolean
}

export interface IBluetoothDeviceList extends Array<IBluetoothDevice> { }

interface IBluetoothState {
    device: IBluetoothDevice
    deviceList: IBluetoothDeviceList
}

const initialState: IBluetoothState = {
    device: {
        Id: "",
        Name: "",
        isConnected: false,
    },
    deviceList: []
};

export default function bluetoothReducer(state = initialState, action: PayloadAction<any>) {
    switch (action.type) {
        case BLUETOOTH_SET_DEVICE:
        case BLUETOOTH_CLEAR_DEVICE:
            return { ...state, device: action.payload };
        case BLUETOOTH_SET_DEVICE_LIST:
        case BLUETOOTH_CLEAR_DEVICE_LIST:
            return { ...state, deviceList: action.payload };
        default:
            return state
    }
}