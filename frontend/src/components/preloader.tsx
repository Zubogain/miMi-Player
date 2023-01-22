import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import logo from "../assets/images/universal-logo.png";
import { RootState, IRootState } from "../store";

const PRELOADER_CONTAINER_CLASS_NAME = "preloader__container draggable d-none";
const PRELOADER_CONTAINER_ACTIVE_CLASS_NAME = "preloader__container draggable";




const PreloaderComponent = () => {
    const { preloader } = useSelector((state: IRootState) => ({ preloader: state.preloader }));
    const [preloaderClassName, setPreloaderClassName] = useState(PRELOADER_CONTAINER_CLASS_NAME);

    useEffect(() => {
        if (preloader.isActive) {
            setPreloaderClassName(PRELOADER_CONTAINER_ACTIVE_CLASS_NAME);
        } else {
            setPreloaderClassName(PRELOADER_CONTAINER_CLASS_NAME);
        }
    }, [preloader.isActive]);

    return (
        <div className={preloaderClassName}>
            <div className="preloader">
                <img className="rotate" src={logo} />
            </div>
        </div>
    );
}

export default PreloaderComponent;
