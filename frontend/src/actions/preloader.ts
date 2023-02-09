export const PRELOADER_SET_IS_ACTIVE = 'PRELOADER_SET_IS_ACTIVE'

export const preloaderSetIsActive = (isActive: boolean) => ({
  type: PRELOADER_SET_IS_ACTIVE,
  payload: isActive,
})
