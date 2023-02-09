import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OutsideClickHandler from 'react-outside-click-handler'

import { setMenuLeftSideBarActive } from '@Actions/menu'

import bluetooth from '@Assets/images/bluetooth.svg'
import fileAudio from '@Assets/images/file-audio.svg'
import cog from '@Assets/images/cog.svg'
import { Link } from 'react-router-dom'

import { asyncTrackOpenFile } from '@Actions/track'

import { IRootState, AppDispatch } from '@Src/store'

const SIDE_BAR_CLASS_NAME = 'side-bar side-bar__left z-index-4'
const SIDE_BAR_ACTIVE_CLASS_NAME =
  'side-bar side-bar__left z-index-4 side-bar__hide'

const LeftSideBarComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const {
    menu: { leftSideBarActive },
  } = useSelector((state: IRootState) => state)
  const [sideBarClassNames, setSideBarClassNames] =
    useState(SIDE_BAR_CLASS_NAME)

  useEffect(() => {
    console.log(leftSideBarActive)
    if (leftSideBarActive) {
      setSideBarClassNames(SIDE_BAR_CLASS_NAME)
    } else {
      setSideBarClassNames(SIDE_BAR_ACTIVE_CLASS_NAME)
    }
  }, [leftSideBarActive])

  const closeLeftSideMenu = () => {
    leftSideBarActive && dispatch(setMenuLeftSideBarActive(false))
  }

  const openFile = () => {
    dispatch(asyncTrackOpenFile())
  }

  return (
    <>
      {leftSideBarActive && (
        <div className="side-bar__outside draggable z-index-3" />
      )}

      <OutsideClickHandler onOutsideClick={closeLeftSideMenu}>
        <div className={sideBarClassNames}>
          <div className="side-bar__list">
            <button
              className="btn side-bar__list-item side-bar__list-item-link"
              onClick={openFile}
            >
              <img className="side-bar__list-item-img" src={fileAudio} />
              Open File
            </button>
            <Link
              to="/bluetooth"
              className="side-bar__list-item side-bar__list-item-link"
            >
              <img className="side-bar__list-item-img" src={bluetooth} />
              Bluetooth
            </Link>
            <Link
              to="/settings"
              className="side-bar__list-item side-bar__list-item-link"
            >
              <img className="side-bar__list-item-img" src={cog} />
              Settings
            </Link>
          </div>
        </div>
      </OutsideClickHandler>
    </>
  )
}

export default LeftSideBarComponent
