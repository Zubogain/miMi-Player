import {
    BLUETOOTH_SET_DEVICE,
    BLUETOOTH_CLEAR_DEVICE,
    BLUETOOTH_SET_DEVICE_LIST,
    BLUETOOTH_CLEAR_DEVICE_LIST
} from "../actions/bluetooth"

const initialState = {
    device: {
        isConnected: false,
    },
    deviceList: []
};

export default function counter(state = initialState, action) {
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