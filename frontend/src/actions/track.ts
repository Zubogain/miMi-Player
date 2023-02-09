import {
  Dispatch,
  ReducersMapObject,
  StateFromReducersMapObject,
  CombinedState,
  $CombinedState,
  ThunkAction,
  ThunkDispatch,
  AnyAction,
  createAsyncThunk,
} from '@reduxjs/toolkit'
// import { ThunkDispatch } from "redux-thunk";
import {
  OpenFile,
  PlayerChangeVolume,
  PlayerPause,
  PlayerResume,
  PlayerToggleMute,
} from '@Wails/go/player/Player'
import { getFileName } from '@Utils/utils'

export const TRACK_SET_PAUSE = 'TRACK_SET_PAUSE'
export const TRACK_SET_PLAY = 'TRACK_SET_PLAY'
export const TRACK_SET_PATH = 'TRACK_SET_PATH'
export const TRACK_SET_NAME = 'TRACK_SET_NAME'
export const TRACK_SET_TIME_POSITION = 'TRACK_SET_TIME_POSITION'
export const TRACK_SET_TIME_DURATION = 'TRACK_SET_TIME_DURATION'
export const TRACK_SET_TIME_POSITION_MS = 'TRACK_SET_TIME_POSITION_MS'
export const TRACK_SET_TIME_DURATION_MS = 'TRACK_SET_TIME_DURATION_MS'
export const TRACK_SET_VOLUME_MUTED = 'TRACK_SET_VOLUME_MUTED'
export const TRACK_SET_VOLUME = 'TRACK_SET_VOLUME'

const trackSetPause = () => ({
  type: TRACK_SET_PAUSE,
  payload: { isPlay: false, isPause: true },
})

const trackSetPlay = () => ({
  type: TRACK_SET_PLAY,
  payload: { isPlay: true, isPause: false },
})

const trackSetName = (name: string) => ({
  type: TRACK_SET_NAME,
  payload: name,
})

const trackSetPath = (path: string) => ({
  type: TRACK_SET_PATH,
  payload: path,
})

export const trackSetPositionMs = (ms: number) => ({
  type: TRACK_SET_TIME_POSITION_MS,
  payload: ms,
})

export const trackSetDurationMs = (ms: number) => ({
  type: TRACK_SET_TIME_DURATION_MS,
  payload: ms,
})

export const trackSetPosition = (position: string) => ({
  type: TRACK_SET_TIME_POSITION,
  payload: position,
})

export const trackSetDuration = (position: string) => ({
  type: TRACK_SET_TIME_DURATION,
  payload: position,
})

const trackSetVolumeMuted = (muted: boolean) => ({
  type: TRACK_SET_VOLUME_MUTED,
  payload: muted,
})

const trackSetVolume = (volume: number) => ({
  type: TRACK_SET_VOLUME,
  payload: volume,
})

export const asyncTrackOpenFile =
  () => async (dispatch: Dispatch, getState: () => any) => {
    const { track } = getState()

    OpenFile(track.path).then((path) => {
      if (path) {
        const name = getFileName(path)

        dispatch(trackSetPause())
        dispatch(trackSetPath(path))
        dispatch(trackSetName(name))
      }
    })
  }

export const asyncTrackToggle = () => {
  return async (
    dispatch: ThunkDispatch<any, any, AnyAction>,
    getState: () => any,
  ) => {
    console.log('asyncTrackToggle')

    const { track } = getState()

    if (track.isPlay) {
      dispatch(asyncTrackPause())
    } else if (track.isPause) {
      dispatch(asyncTrackPlay())
    }
  }
}

// FIXME: нет проверки на прошлое значение звука с текущем перед тем как отрпавить запрос в бекенд
//     PlayerChangeVolume(volume);
export const asyncTrackPlay =
  () => (dispatch: Dispatch, getState: () => any) => {
    console.log('asyncTrackPlay')
    PlayerResume()

    dispatch(trackSetPlay())
  }

export const asyncTrackPause =
  () => (dispatch: Dispatch, getState: () => any) => {
    console.log('asyncTrackPause')
    PlayerPause()
    dispatch(trackSetPause())
  }

export const asyncTrackVolumeMutedToggle = (muted: boolean) => {
  return async (
    dispatch: ThunkDispatch<any, any, AnyAction>,
    getState: () => any,
  ) => {
    PlayerToggleMute(muted).then(() => {
      dispatch(trackSetVolumeMuted(muted))
    })
  }
}

export const asyncTrackSetVolume =
  (volume: number) => (dispatch: Dispatch, getState: () => any) => {
    PlayerChangeVolume(volume).then(() => {
      dispatch(trackSetVolume(volume))
    })
  }
