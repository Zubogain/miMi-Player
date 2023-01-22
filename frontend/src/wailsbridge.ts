import { Dispatch } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { EventsOn } from "../wailsjs/runtime/runtime";
import { trackSetDuration, trackSetDurationMs, trackSetPosition, trackSetPositionMs } from "./actions/track";
import { msToMinutesAndSeconds } from "./utils/utils";

const eventPlayerTrackPosition = ({ dispatch }: { dispatch: Dispatch }) => {
    EventsOn("player:track:position", (ms: number) => {
        const minutesAndSecods = msToMinutesAndSeconds(ms);

        dispatch(trackSetPositionMs(ms));
        dispatch(trackSetPosition(minutesAndSecods));
    });
};

const eventPlayerTrackDuration = ({ dispatch }: { dispatch: Dispatch }) => {
    EventsOn("player:track:duration", (ms: number) => {
        const minutesAndSecods = msToMinutesAndSeconds(ms);

        dispatch(trackSetDurationMs(ms));
        dispatch(trackSetDuration(minutesAndSecods));

        dispatch(trackSetPositionMs(0));
        dispatch(trackSetPosition(msToMinutesAndSeconds(0)));
    });
}

const init = (store: ToolkitStore) => {
    eventPlayerTrackPosition(store);
    eventPlayerTrackDuration(store);
}

export default init