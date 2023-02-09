import { PayloadAction } from '@reduxjs/toolkit'
import { PRELOADER_SET_IS_ACTIVE } from '@Actions/preloader'
import { IPreloaderState } from '@Interfaces/preloader'

const initialState: IPreloaderState = {
  isActive: false,
}

const preloaderReducer = (state = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case PRELOADER_SET_IS_ACTIVE:
      return { ...state, isActive: action.payload }
    default:
      return state
  }
}

export default preloaderReducer
