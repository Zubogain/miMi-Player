export const PRELOADER_SET_IS_ACTIVE = "PRELOADER_SET_IS_ACTIVE";

export const preloaderSetIsActive = (isActive) => ({
    type: PRELOADER_SET_IS_ACTIVE,
    payload: isActive,
});