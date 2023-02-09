import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BrowserOpenURL } from '@Wails/runtime/runtime'
import {
  GetDeviceList,
  ConnectToDevice,
  GetConnectedDevice,
} from '@Wails/go/bluetooth/Bluetooth'
import { bluetoothSetDevice } from '@Actions/bluetooth'
import { preloaderSetIsActive } from '@Actions/preloader'

import { IBluetoothDeviceList } from '@Interfaces/bluetooth'
import BackComponent from '@Components/back'

const BluetoothComponentDevicesList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isConnected, setIsConnected] = useState(false)
  const [deviceList, setDeviceList] = useState<IBluetoothDeviceList>([])
  const [noDevicesFound, setNoDevicesFound] = useState<boolean>(false)

  useEffect(() => {
    console.log(deviceList.length)
    if (!deviceList.length) {
      getDeviceList()
    }
  }, [])

  useEffect(() => {
    isConnected && navigate('/')
  }, [isConnected])

  const getDeviceList = () => {
    GetDeviceList().then((deviceList) => {
      console.log('GetDeviceList:', deviceList)

      if (deviceList === null) {
        setNoDevicesFound(true)
      } else {
        setDeviceList(deviceList)
        setNoDevicesFound(false)
      }
    })
  }

  const connectToDevice = (deviceId: string) => {
    dispatch(preloaderSetIsActive(true))
    ConnectToDevice(deviceId).then((res) => {
      dispatch(preloaderSetIsActive(false))
      getConnectedDevice()
    })
  }

  const getConnectedDevice = () => {
    GetConnectedDevice().then((deviceObj) => {
      dispatch(bluetoothSetDevice(deviceObj))
      setIsConnected(true)
    })
  }
  return (
    <>
      {noDevicesFound ? (
        <div className="warning">
          <h3 className="warning__text">
            No devices found or bluetooth module not enabled
          </h3>
        </div>
      ) : (
        <div className="bt-devices-container">
          <ul className="bt-devices">
            {deviceList.map(({ Id, Name }, i) => (
              <li
                key={Id}
                className="bt-devices-item btn"
                onClick={connectToDevice.bind(null, Id)}
              >
                {Name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="btn__container btn__container--horizontal mb-15">
        <BackComponent to="/" />
        <button
          className="btn btn__normal"
          onClick={() => {
            BrowserOpenURL('ms-settings:bluetooth')
          }}
        >
          Bluetooth Settings
        </button>
        <button className="btn btn__normal" onClick={getDeviceList}>
          Update
        </button>
      </div>
    </>
  )
}

export default BluetoothComponentDevicesList
