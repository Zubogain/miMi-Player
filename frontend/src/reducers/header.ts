import { PayloadAction } from '@reduxjs/toolkit';
import { HEADER_SET_TITLE } from "../actions/header"

interface IHeaderState {
    title: string
}
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