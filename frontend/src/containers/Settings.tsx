import React from "react";
import { useEffect } from "react";

import { WindowSetSize } from "../../wailsjs/runtime/runtime";

import SettingsComponent from "../components/settings";

const SettingsContainer = () => {
    useEffect(() => {
        WindowSetSize(480, 260);
    }, []);

    return (
        <React.Fragment>
            <SettingsComponent />
        </React.Fragment>
    );
}

export default SettingsContainer;