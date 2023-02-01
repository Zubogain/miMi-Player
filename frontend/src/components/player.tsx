import React, { useEffect, useState } from "react";

import play from "../assets/images/play.svg";
import pause from "../assets/images/pause.svg";
import angleDoubleLeft from "../assets/images/angle-double-left.svg";
import angleDoubleRight from "../assets/images/angle-double-right.svg";
import volumeMute from "../assets/images/volume-mute.svg";
import volumeOff from "../assets/images/volume-off.svg";
import bluetoothSVG from "../assets/images/bluetooth.svg";

import InputRangeComponent from "./input";
import { useDispatch, useSelector } from "react-redux";
import { asyncTrackSetVolume, asyncTrackToggle, asyncTrackVolumeMutedToggle } from "../actions/track";
import { msToPrecent } from "../utils/utils";
import { IRootState, AppDispatch } from "../store";

// // // // // // // 
import CustomPlayer from "./custom-player";

const PlayerComponentSeeker = ({ trackPrecent, deviceIsConnected }: { trackPrecent: number, deviceIsConnected: boolean }) => {
    return (
        <div className={deviceIsConnected ? "controls__seek-container relative disabled" : "controls__seek-container relative"}>
            <InputRangeComponent
                className="controls__seek"
                min={0}
                max={100}
                step={0.02}
                value={trackPrecent}
                disabled={deviceIsConnected}
            />
        </div>
    )
}

const PlayerComponentControls = ({ isPlay, duration, position, volumeMuted, volume }: { isPlay: boolean, duration: number, position: number, volumeMuted: boolean, volume: number }) => {
    const dispatch: AppDispatch = useDispatch();

    const toggleTrackVolumeMuted = () => {
        dispatch(asyncTrackVolumeMutedToggle(!volumeMuted));
    }

    const asyncChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {

        dispatch(asyncTrackSetVolume(event.target.valueAsNumber));
    }

    return (
        <div className="footer relative">
            <div className="controls">
                <div className="controls-item timer">
                    {duration}/{position}
                </div>
            </div>

            <div className="controls absolute absolute-center">
                <div className="controls-item play disabled">
                    <img src={angleDoubleLeft} />
                </div>
                <div className="controls-item play" onClick={() => {
                    dispatch(asyncTrackToggle());
                }}>
                    <img src={isPlay ? pause : play} />
                </div>
                <div className="controls-item play disabled">
                    <img src={angleDoubleRight} />
                </div>
            </div>

            <div className="controls">
                <div className="controls-item sound" onClick={toggleTrackVolumeMuted}>
                    <img src={volumeMuted ? volumeMute : volumeOff} />
                </div>
                <InputRangeComponent
                    hidden={volumeMuted}
                    className="volume-range"
                    min={-8}
                    max={0}
                    step={0.02}
                    defaultValue={volume}
                    onChange={asyncChangeVolume}
                />
            </div>
        </div>
    )
}


const PlayerComponentBluetoothControls = () => {
    return (
        <div className="footer relative">
            <div className="controls">
                <div className="controls-item timer disabled">
                    --/--
                </div>
            </div>

            <div className="controls absolute absolute-center">
                <div className="controls-item play disabled">
                    <img src={angleDoubleLeft} />
                </div>
                <div className="controls-item play">
                    <img src={bluetoothSVG} />
                </div>
                <div className="controls-item play disabled">
                    <img src={angleDoubleRight} />
                </div>
            </div>

            <div className="controls">
                <div className="controls-item sound disabled">
                    <img src={volumeOff} />
                </div>
                <InputRangeComponent
                    className="volume-range"
                    min={-8}
                    max={0}
                    step={0.02}
                    defaultValue={0}
                />
            </div>
        </div>
    )
}

const PlayerComponent = () => {
    // const { bluetooth, track } = useSelector(({ bluetooth: { device }, track }) => ({ bluetooth: { device }, track }));
    const { bluetooth, track } = useSelector((state: IRootState) => ({ bluetooth: state.bluetooth, track: state.track }));

    const [trackPrecent, setTrackPrecent] = useState(0);

    useEffect(() => {
        setTrackPrecent(msToPrecent(track.positionMs, track.durationMs));
    }, [track.positionMs])

    return (
        <React.Fragment>
            <CustomPlayer />
            <PlayerComponentSeeker
                trackPrecent={trackPrecent}
                deviceIsConnected={bluetooth.device.isConnected} />

            <div className="divider" />

            {bluetooth.device.isConnected
                ?
                <PlayerComponentBluetoothControls />
                :
                <PlayerComponentControls isPlay={track.isPlay} duration={track.duration} position={track.position} volumeMuted={track.volumeMuted} volume={track.volume} />
            }
        </React.Fragment>
    );
}

export default PlayerComponent;
