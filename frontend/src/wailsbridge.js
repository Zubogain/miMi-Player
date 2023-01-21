import { trackSetDuration, trackSetDurationMs, trackSetPosition, trackSetPositionMs } from "./actions/track";
import { millisToMinutesAndSeconds } from "./utils/utils";

function eventPlayerTrackPosition({ dispatch }) {
    window.runtime.EventsOn("player:track:position", (milliseconds) => {
        const minutesAndSecods = millisToMinutesAndSeconds(milliseconds);

        dispatch(trackSetPositionMs(milliseconds));
        dispatch(trackSetPosition(minutesAndSecods));
    });
};

function eventPlayerTrackDuration({ dispatch }) {
    window.runtime.EventsOn("player:track:duration", (milliseconds) => {
        const minutesAndSecods = millisToMinutesAndSeconds(milliseconds);

        dispatch(trackSetDurationMs(milliseconds));
        dispatch(trackSetDuration(minutesAndSecods));

        dispatch(trackSetPositionMs(0));
        dispatch(trackSetPosition(millisToMinutesAndSeconds(0)));
    });
}

function init(store) {
    eventPlayerTrackPosition(store);
    eventPlayerTrackDuration(store);
}

export default init