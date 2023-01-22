export const HEADER_SET_TITLE = "HEADER_SET_TITLE";

export const headerSetTitle = (title: string) => ({
    type: HEADER_SET_TITLE,
    payload: title,
});