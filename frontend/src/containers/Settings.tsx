import React, { useEffect } from 'react'

import { WindowSetSize } from '@Wails/runtime/runtime'

import SettingsComponent from '@Components/settings'

const SettingsContainer = () => {
  useEffect(() => {
    WindowSetSize(480, 260)
  }, [])

  return (
    <>
      <SettingsComponent />
    </>
  )
}

export default SettingsContainer
