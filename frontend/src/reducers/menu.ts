import { PayloadAction } from '@reduxjs/toolkit';
import { SET_LEFT_SIDE_BAR_ACTIVE } from "../actions/menu"
import { IMenuState } from "../interfaces/menu";

const initialState: IMenuState = {
    leftSideBarActive: false,
};

const menuReducer = (state = initialState, action: PayloadAction<any>) => {
    switch (action.type) {
        case SET_LEFT_SIDE_BAR_ACTIVE:
            return { ...state, leftSideBarActive: action.payload };
        default:
            return state
    }
}

export default menuReducer;