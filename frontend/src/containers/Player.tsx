import React, { useEffect } from "react";
import { WindowSetSize } from "../../wailsjs/runtime/runtime";

import Player from "../components/player";

const BluetoothContainer = () => {
    useEffect(() => {
        WindowSetSize(480, 146);
    }, []);

    return (
        <React.Fragment>
            <Player />
        </React.Fragment>
    );
}

export default BluetoothContainer;
