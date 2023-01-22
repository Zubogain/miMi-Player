import { PayloadAction } from '@reduxjs/toolkit';
import { SET_LEFT_SIDE_BAR_ACTIVE } from "../actions/menu"

interface IMenuState {
    leftSideBarActive: boolean
}
const initialState: IMenuState = {
    leftSideBarActive: false,
};

export default function menuReducer(state = initialState, action: PayloadAction<any>) {
    switch (action.type) {
        case SET_LEFT_SIDE_BAR_ACTIVE:
            return { ...state, leftSideBarActive: action.payload };
        default:
            return state
    }
}