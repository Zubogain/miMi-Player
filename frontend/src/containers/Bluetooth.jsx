import React, { useEffect } from "react";
import Bluetooth from "../components/bluetooth";

function BluetoothContainer() {
    useEffect(() => {
        window.runtime.WindowSetSize(480, 260);
    }, []);

    return (
        <React.Fragment>
            <Bluetooth />
        </React.Fragment>
    );
}

export default BluetoothContainer;
