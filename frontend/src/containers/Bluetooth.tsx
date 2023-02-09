import React, { useEffect } from 'react'
import { WindowSetSize } from '@Wails/runtime/runtime'

import Bluetooth from '@Components/bluetooth'

const BluetoothContainer = () => {
  useEffect(() => {
    WindowSetSize(480, 260)
  }, [])

  return (
    <>
      <Bluetooth />
    </>
  )
}

export default BluetoothContainer
