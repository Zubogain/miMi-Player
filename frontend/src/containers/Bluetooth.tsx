import React, { useEffect } from "react";
import { WindowSetSize } from "../../wailsjs/runtime/runtime";

import Bluetooth from "../components/bluetooth";

const BluetoothContainer = () => {
    useEffect(() => {
        WindowSetSize(480, 260);
    }, []);

    return (
        <React.Fragment>
            <Bluetooth />
        </React.Fragment>
    );
}

export default BluetoothContainer;
