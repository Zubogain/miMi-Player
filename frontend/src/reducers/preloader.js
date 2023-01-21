import { PRELOADER_SET_IS_ACTIVE } from "../actions/preloader"

const initialState = {
    isActive: false
};

export default function counter(state = initialState, action) {
    switch (action.type) {
        case PRELOADER_SET_IS_ACTIVE:
            return { ...state, isActive: action.payload };
        default:
            return state
    }
}