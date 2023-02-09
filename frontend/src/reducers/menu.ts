import { PayloadAction } from '@reduxjs/toolkit'
import { SET_LEFT_SIDE_BAR_ACTIVE } from '@Actions/menu'
import { IMenuState } from '@Interfaces/menu'

const initialState: IMenuState = {
  leftSideBarActive: false,
}

const menuReducer = (state = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case SET_LEFT_SIDE_BAR_ACTIVE:
      return { ...state, leftSideBarActive: action.payload }
    default:
      return state
  }
}

export default menuReducer
