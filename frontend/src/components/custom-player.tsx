import React, { useRef } from "react";

import Slider from "rc-slider";


const CustomPlayer = () => {
    const refRail = React.useRef<HTMLDivElement>(null);
    const refTrack = React.useRef<HTMLDivElement>(null);
    const refHandler = React.useRef<HTMLDivElement>(null);



    return <React.Fragment>
        <div className="pr-container">
            <Slider className="pr" />
        </div>
    </React.Fragment>
};


export default CustomPlayer;