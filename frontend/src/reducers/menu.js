import { SET_LEFT_SIDE_BAR_ACTIVE } from "../actions/menu"

const initialState = {
    leftSideBarActive: false,
};

export default function counter(state = initialState, action) {
    switch (action.type) {
        case SET_LEFT_SIDE_BAR_ACTIVE:
            return { ...state, leftSideBarActive: action.payload };
        default:
            return state
    }
}