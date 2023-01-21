import React from "react";
import { useEffect } from "react";
import SettingsComponent from "../components/settings";

function SettingsContainer() {
    useEffect(() => {
        window.runtime.WindowSetSize(480, 260);
    }, []);

    return (
        <React.Fragment>
            <SettingsComponent />
        </React.Fragment>
    );
}

export default SettingsContainer;