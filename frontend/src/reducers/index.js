import { combineReducers } from 'redux'
import header from './header'
import menu from './menu'
import track from './track'
import preloader from "./preloader"
import bluetooth from "./bluetooth"

export default combineReducers({
    header,
    menu,
    track,
    preloader,
    bluetooth
})