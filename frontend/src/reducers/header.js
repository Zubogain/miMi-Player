import { HEADER_SET_TITLE } from "../actions/header"

const initialState = {
    title: "Select Device"
};

export default function counter(state = initialState, action) {
    switch (action.type) {
        case HEADER_SET_TITLE:
            return { ...state, title: action.payload };
        default:
            return state
    }
}