import { OpenFile, PlayerChangeVolume, PlayerPause, PlayerResume, PlayerToggleMute } from "../../wailsjs/go/player/Player";
import { getFileName } from "../utils/utils";

export const TRACK_SET_PAUSE = "TRACK_SET_PAUSE";
export const TRACK_SET_PLAY = "TRACK_SET_PLAY";
export const TRACK_SET_PATH = "TRACK_SET_PATH";
export const TRACK_SET_NAME = "TRACK_SET_NAME";
export const TRACK_SET_TIME_POSITION = "TRACK_SET_TIME_POSITION";
export const TRACK_SET_TIME_DURATION = "TRACK_SET_TIME_DURATION";
export const TRACK_SET_TIME_POSITION_MS = "TRACK_SET_TIME_POSITION_MS";
export const TRACK_SET_TIME_DURATION_MS = "TRACK_SET_TIME_DURATION_MS";
export const TRACK_SET_VOLUME_MUTED = "TRACK_SET_VOLUME_MUTED";
export const TRACK_SET_VOLUME = "TRACK_SET_VOLUME";

const trackSetPause = () => ({
    type: TRACK_SET_PAUSE,
    payload: { isPlay: false, isPause: true }
});

const trackSetPlay = () => ({
    type: TRACK_SET_PLAY,
    payload: { isPlay: true, isPause: false }
});

const trackSetName = (name) => ({
    type: TRACK_SET_NAME,
    payload: name
});

const trackSetPath = (path) => ({
    type: TRACK_SET_PATH,
    payload: path
});

export const trackSetPositionMs = (milliseconds) => ({
    type: TRACK_SET_TIME_POSITION_MS,
    payload: milliseconds
});

export const trackSetDurationMs = (milliseconds) => ({
    type: TRACK_SET_TIME_DURATION_MS,
    payload: milliseconds
});

export const trackSetPosition = (str) => ({
    type: TRACK_SET_TIME_POSITION,
    payload: str
});

export const trackSetDuration = (str) => ({
    type: TRACK_SET_TIME_DURATION,
    payload: str
});

const trackSetVolumeMuted = (bool) => ({
    type: TRACK_SET_VOLUME_MUTED,
    payload: bool
});

const trackSetVolume = (float) => ({
    type: TRACK_SET_VOLUME,
    payload: float
});

export const asyncTrackOpenFile = () => async (dispatch, getState) => {
    const { track } = getState();

    OpenFile(track.path).then(path => {
        if (path) {
            const name = getFileName(path);

            dispatch(trackSetPause());
            dispatch(trackSetPath(path));
            dispatch(trackSetName(name));
        }
    });
};

export const asyncTrackToggle = () => (dispatch, getState) => {
    console.log("asyncTrackToggle")

    const { track } = getState();

    if (track.isPlay) {
        dispatch(asyncTrackPause());
    } else if (track.isPause) {
        dispatch(asyncTrackPlay());
    }
}

// FIXME: нет проверки на прошлое значение звука с текущем перед тем как отрпавить запрос в бекенд
//     PlayerChangeVolume(volume);
export const asyncTrackPlay = () => (dispatch, getState) => {
    console.log("asyncTrackPlay")
    PlayerResume();

    dispatch(trackSetPlay());
}

export const asyncTrackPause = () => (dispatch, getState) => {
    console.log("asyncTrackPause")
    PlayerPause();
    dispatch(trackSetPause());
}

export const asyncTrackVolumeMutedToggle = (bool) => (dispatch, getState) => {
    PlayerToggleMute(bool).then(() => {
        dispatch(trackSetVolumeMuted(bool));
    });
}

export const asyncTrackSetVolume = (float) => (dispatch, getState) => {
    PlayerChangeVolume(float).then(() => {
        dispatch(trackSetVolume(float));
    });
}