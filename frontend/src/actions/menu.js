export const SET_LEFT_SIDE_BAR_ACTIVE = "SET_LEFT_SIDE_BAR_ACTIVE";

export const setMenuLeftSideBarActive = (bool) => (
    {
        type: SET_LEFT_SIDE_BAR_ACTIVE,
        payload: bool
    })