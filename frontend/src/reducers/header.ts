import { PayloadAction } from '@reduxjs/toolkit';
import { HEADER_SET_TITLE } from "../actions/header"
import { IHeaderState } from "../interfaces/header"

const initialState: IHeaderState = {
    title: "Select Device"
};

const headerReducer = (state = initialState, action: PayloadAction<any>) => {
    switch (action.type) {
        case HEADER_SET_TITLE:
            return { ...state, title: action.payload };
        default:
            return state
    }
}




export default headerReducer;