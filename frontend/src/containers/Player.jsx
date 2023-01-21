import React from "react";
import { useEffect } from "react";
import Player from "../components/player";

function BluetoothContainer() {
    useEffect(() => {
        window.runtime.WindowSetSize(480, 146);
    }, []);

    return (
        <React.Fragment>
            <Player />
        </React.Fragment>
    );
}

export default BluetoothContainer;
