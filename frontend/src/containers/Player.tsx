import React, { useEffect } from 'react'
import { WindowSetSize } from '@Wails/runtime/runtime'

import Player from '@Components/player'

const BluetoothContainer = () => {
  useEffect(() => {
    WindowSetSize(480, 146)
  }, [])

  return (
    <>
      <Player />
    </>
  )
}

export default BluetoothContainer
