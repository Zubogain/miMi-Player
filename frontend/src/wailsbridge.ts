import { Dispatch } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { EventsOn } from "../wailsjs/runtime/runtime";
import { trackSetDuration, trackSetDurationMs, trackSetPosition, trackSetPositionMs } from "./actions/track";
import { millisToMinutesAndSeconds } from "./utils/utils";

function eventPlayerTrackPosition({ dispatch }: { dispatch: Dispatch }) {
    EventsOn("player:track:position", (ms: number) => {
        const minutesAndSecods = millisToMinutesAndSeconds(ms);

        dispatch(trackSetPositionMs(ms));
        dispatch(trackSetPosition(minutesAndSecods));
    });
};

function eventPlayerTrackDuration({ dispatch }: { dispatch: Dispatch }) {
    EventsOn("player:track:duration", (ms: number) => {
        const minutesAndSecods = millisToMinutesAndSeconds(ms);

        dispatch(trackSetDurationMs(ms));
        dispatch(trackSetDuration(minutesAndSecods));

        dispatch(trackSetPositionMs(0));
        dispatch(trackSetPosition(millisToMinutesAndSeconds(0)));
    });
}

function init(store: ToolkitStore) {
    eventPlayerTrackPosition(store);
    eventPlayerTrackDuration(store);
}

export default init