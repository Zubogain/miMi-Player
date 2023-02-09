import { PayloadAction } from '@reduxjs/toolkit'
import {
  TRACK_SET_PAUSE,
  TRACK_SET_PLAY,
  TRACK_SET_PATH,
  TRACK_SET_NAME,
  TRACK_SET_TIME_POSITION_MS,
  TRACK_SET_TIME_DURATION_MS,
  TRACK_SET_TIME_POSITION,
  TRACK_SET_TIME_DURATION,
  TRACK_SET_VOLUME_MUTED,
  TRACK_SET_VOLUME,
} from '@Actions/track'
import { ITrackState } from '@Interfaces/track'

const initialState: ITrackState = {
  name: '',
  path: '',
  isPlay: false,
  isPause: false,
  position: '--',
  duration: '--',
  positionMs: 0,
  durationMs: 0,
  precent: 0,
  volume: 0,
  volumeMuted: false,
}

const trackReducer = (state = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case TRACK_SET_PLAY:
    case TRACK_SET_PAUSE:
      return {
        ...state,
        isPlay: action.payload.isPlay,
        isPause: action.payload.isPause,
      }
    case TRACK_SET_PATH:
      return { ...state, path: action.payload }
    case TRACK_SET_NAME:
      return { ...state, name: action.payload }
    case TRACK_SET_TIME_POSITION_MS:
      return { ...state, positionMs: action.payload }
    case TRACK_SET_TIME_DURATION_MS:
      return { ...state, durationMs: action.payload }
    case TRACK_SET_TIME_POSITION:
      return { ...state, position: action.payload }
    case TRACK_SET_TIME_DURATION:
      return { ...state, duration: action.payload }
    case TRACK_SET_VOLUME_MUTED:
      return { ...state, volumeMuted: action.payload }
    case TRACK_SET_VOLUME: {
      return { ...state, volume: action.payload }
    }
    default:
      return state
  }
}

export default trackReducer
