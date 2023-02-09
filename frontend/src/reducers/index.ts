import { combineReducers } from 'redux'
import header from '@Reducers/header'
import menu from '@Reducers/menu'
import track from '@Reducers/track'
import preloader from '@Reducers/preloader'
import bluetooth from '@Reducers/bluetooth'

export default combineReducers({
  header,
  menu,
  track,
  preloader,
  bluetooth,
})
