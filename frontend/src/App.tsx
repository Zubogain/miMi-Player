import { Routes, Route } from 'react-router-dom'

import HeaderComponent from '@Components/header'
import LeftSideBarComponent from '@Components/left-side-bar'

import PlayerContainer from '@Containers/Player'
import BluetoothContainer from '@Containers/Bluetooth'
import SettingsContainer from '@Containers/Settings'
import PreloaderComponent from '@Components/preloader'

const App = () => {
  return (
    <div id="App">
      <PreloaderComponent />
      <HeaderComponent />
      <Routes>
        <Route index element={<PlayerContainer />} />
        <Route path="/bluetooth" element={<BluetoothContainer />} />
        <Route path="/settings" element={<SettingsContainer />} />
      </Routes>
      <LeftSideBarComponent />
    </div>
  )
}

export default App
