import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';

import { setMenuLeftSideBarActive } from "../actions/menu";

import logo from "../assets/images/universal-logo.png";
import bars from "../assets/images/bars.svg";
import music from "../assets/images/music.svg";
import cog from "../assets/images/cog.svg";
import bluetoothSVG from "../assets/images/bluetooth.svg";
import windowExit from "../assets/images/window-exit.svg";
import windowRollUp from "../assets/images/window-roll-up.svg";

import { useLocation } from "react-router-dom";

function HeaderComponentNavBar({ leftSideBarActive }) {
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <button
                className="btn logo z-index-1"
                onClick={() => {
                    dispatch(setMenuLeftSideBarActive(!leftSideBarActive));
                }}
            >
                <img src={bars} />
            </button>
            <button
                className="btn logo z-index-1"
                onClick={() => {
                    window.runtime.BrowserOpenURL("https://github.com/Zubogain");
                }}
            >
                <img src={logo} style={{ height: "18px" }} />
            </button>
        </React.Fragment>
    )
}


function HeaderComponentWindowDraggable({ headerTitle, icon }) {
    return (
        <div className="draggable">
            <div className="bar-container">
                <div className="bar">
                    {icon && <img className="bar-icon" src={icon} />}
                    <p className="bar-title" title={headerTitle}>{headerTitle}</p>
                </div>
            </div>
        </div>
    )
}

function HeaderComponentWindowControls() {
    return (
        <React.Fragment>
            <button
                className="btn btn-roll-up z-index-1"
                onClick={window.runtime.WindowMinimise}
            >
                <img src={windowRollUp} />
            </button>
            <button className="btn btn-exit z-index-1" onClick={window.runtime.Quit}>
                <img src={windowExit} />
            </button>
        </React.Fragment>
    )
}

function HeaderComponent() {
    const { header, track, menu, bluetooth } = useSelector(({ header: { title }, track, menu: { leftSideBarActive }, bluetooth: { device } }) => ({ header: { title }, track, menu: { leftSideBarActive }, bluetooth: { device } }));

    const location = useLocation();
    const [icon, setIcon] = useState();
    const [headerTitle, setHeaderTitle] = useState("");

    useEffect(() => {
        currentLocationSetup(location.pathname);
    }, [location]);

    useEffect(() => {
        if (track.path) {
            if (track.name) {
                setHeaderTitle(track.name);
                setIcon(music);
            }
        } else {
            currentLocationSetup(location.pathname);
        }
    }, [track.path])

    function currentLocationSetup(pathname) {
        switch (pathname) {
            case "/bluetooth":
                setHeaderTitle(header.title);
                setIcon(bluetoothSVG);
                break;
            case "/settings":
                setHeaderTitle("Settings");
                setIcon(cog);
                break;
            default:

                if (bluetooth.device.isConnected) {
                    setHeaderTitle(bluetooth.device.Name);
                    setIcon(bluetoothSVG);
                    return
                }

                // basic
                if (track.name) {
                    setHeaderTitle(track.name);
                    setIcon(music);
                } else {
                    setHeaderTitle("miMi Player");
                    setIcon();
                }
        }

    }

    return (
        <div className="header">
            <HeaderComponentNavBar leftSideBarActive={menu.leftSideBarActive} />

            <HeaderComponentWindowDraggable headerTitle={headerTitle} icon={icon} />

            <HeaderComponentWindowControls />
        </div>
    );
}

export default HeaderComponent;
