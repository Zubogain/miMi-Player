import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from 'react-outside-click-handler';

import { setMenuLeftSideBarActive } from "../actions/menu";

import bluetooth from "../assets/images/bluetooth.svg";
import fileAudio from "../assets/images/file-audio.svg";
import cog from "../assets/images/cog.svg";
import { Link } from "react-router-dom";

import { asyncTrackOpenFile } from "../actions/track";

const SIDE_BAR_CLASS_NAME = "side-bar side-bar__left z-index-4";
const SIDE_BAR_ACTIVE_CLASS_NAME = "side-bar side-bar__left z-index-4 side-bar__hide";

function LeftSideBarComponent() {
    const dispatch = useDispatch();
    const { menu: { leftSideBarActive }, track } = useSelector(({ menu: { leftSideBarActive }, track }) => ({ menu: { leftSideBarActive }, track }));
    const [sideBarClassNames, setSideBarClassNames] = useState(SIDE_BAR_CLASS_NAME);

    useEffect(() => {
        console.log(leftSideBarActive)
        if (leftSideBarActive) {
            setSideBarClassNames(SIDE_BAR_CLASS_NAME);
        } else {
            setSideBarClassNames(SIDE_BAR_ACTIVE_CLASS_NAME);
        }

    }, [leftSideBarActive])

    function closeLeftSideMenu() {
        leftSideBarActive && dispatch(setMenuLeftSideBarActive(false));
    }


    function openFile(event) {
        event.preventDefault();

        dispatch(asyncTrackOpenFile());
    }

    return (
        <React.Fragment>
            {leftSideBarActive && <div className="side-bar__outside draggable z-index-3" />}

            <OutsideClickHandler onOutsideClick={closeLeftSideMenu}>
                <div className={sideBarClassNames}>

                    <div className="side-bar__list">
                        <Link className="side-bar__list-item side-bar__list-item-link" onClick={openFile}>

                            <img className="side-bar__list-item-img" src={fileAudio} />
                            Open File

                        </Link>
                        <Link to="/bluetooth" className="side-bar__list-item side-bar__list-item-link">

                            <img className="side-bar__list-item-img" src={bluetooth} />
                            Bluetooth

                        </Link>
                        <Link to="/settings" className="side-bar__list-item side-bar__list-item-link">

                            <img className="side-bar__list-item-img" src={cog} />
                            Settings
                        </Link>
                    </div>
                </div>
            </OutsideClickHandler>
        </React.Fragment>
    );
}

export default LeftSideBarComponent;
