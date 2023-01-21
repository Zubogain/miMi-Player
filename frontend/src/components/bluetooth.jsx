import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
    GetDeviceList,
    ConnectToDevice,
    GetConnectedDevice
} from "../../wailsjs/go/bluetooth/Bluetooth";
import { bluetoothSetDevice } from "../actions/bluetooth";
import { preloaderSetIsActive } from "../actions/preloader";
import BackComponent from "./back";

function BluetoothComponentDevicesList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isConnected, setIsConnected] = useState(false);
    const [deviceList, setDeviceList] = useState([]);

    const back = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (!deviceList.length) {
            getDeviceList();
        }
    }, []);

    useEffect(() => {
        isConnected && navigate("/");
    }, [isConnected]);

    function getDeviceList() {
        GetDeviceList().then(deviceList => {
            setDeviceList(deviceList);
        })
    }

    function connectToDevice(deviceId) {
        dispatch(preloaderSetIsActive(true));
        ConnectToDevice(deviceId).then(res => {
            dispatch(preloaderSetIsActive(false));
            getConnectedDevice();
        })
    }

    function getConnectedDevice() {
        GetConnectedDevice().then(deviceObj => {
            dispatch(bluetoothSetDevice(deviceObj));
            setIsConnected(true);
        })
    }
    return (
        <React.Fragment>
            <div className="bt-devices-container">
                <ul className="bt-devices">
                    {deviceList.map(({ Id, Name }, i) =>
                        <li
                            key={Id}
                            className="bt-devices-item btn"
                            onClick={connectToDevice.bind(null, Id)}>
                            {Name}
                        </li>
                    )}
                </ul>
            </div>

            <div className="btn__container mb-15">
                <BackComponent to="/" />
            </div>
        </React.Fragment>
    );
}

export default BluetoothComponentDevicesList;
