import { Routes, Route } from "react-router-dom";

import HeaderComponent from "./components/header";
import LeftSideBarComponent from "./components/left-side-bar";

import PlayerContainer from "./containers/Player";
import BluetoothContainer from "./containers/Bluetooth";
import SettingsContainer from "./containers/Settings";
import PreloaderComponent from "./components/preloader";

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
  );
}

export default App;
