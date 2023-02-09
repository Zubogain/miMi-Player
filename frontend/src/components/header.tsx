import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { BrowserOpenURL, WindowMinimise, Quit } from '@Wails/runtime/runtime'

import { IRootState } from '@Src/store'

import { setMenuLeftSideBarActive } from '@Actions/menu'

import logo from '@Assets/images/universal-logo.png'
import bars from '@Assets/images/bars.svg'
import music from '@Assets/images/music.svg'
import cog from '@Assets/images/cog.svg'
import bluetoothSVG from '@Assets/images/bluetooth.svg'
import windowExit from '@Assets/images/window-exit.svg'
import windowRollUp from '@Assets/images/window-roll-up.svg'

import { useLocation } from 'react-router-dom'

const HeaderComponentNavBar = ({
  leftSideBarActive,
}: {
  leftSideBarActive: boolean
}) => {
  const dispatch = useDispatch()

  return (
    <>
      <button
        className="btn logo z-index-1"
        onClick={() => {
          dispatch(setMenuLeftSideBarActive(!leftSideBarActive))
        }}
      >
        <img src={bars} />
      </button>
      <button
        className="btn logo z-index-1"
        onClick={() => {
          BrowserOpenURL('https://github.com/Zubogain')
        }}
      >
        <img src={logo} style={{ height: '18px' }} />
      </button>
    </>
  )
}

const HeaderComponentWindowDraggable = ({
  headerTitle,
  icon,
}: {
  headerTitle: string
  icon: string | undefined
}) => {
  return (
    <div className="draggable">
      <div className="bar-container">
        <div className="bar">
          {icon && <img className="bar-icon" src={icon} />}
          <p className="bar-title" title={headerTitle}>
            {headerTitle}
          </p>
        </div>
      </div>
    </div>
  )
}

const HeaderComponentWindowControls = () => {
  return (
    <>
      <button className="btn btn-roll-up z-index-1" onClick={WindowMinimise}>
        <img src={windowRollUp} />
      </button>
      <button className="btn btn-exit z-index-1" onClick={Quit}>
        <img src={windowExit} />
      </button>
    </>
  )
}

const HeaderComponent = () => {
  const { header, track, menu, bluetooth } = useSelector(
    (state: IRootState) => state,
  )

  const location = useLocation()
  const [icon, setIcon] = useState<string | undefined>()
  const [headerTitle, setHeaderTitle] = useState('')

  useEffect(() => {
    currentLocationSetup(location.pathname)
  }, [location])

  useEffect(() => {
    if (track.path) {
      if (track.name) {
        setHeaderTitle(track.name)
        setIcon(music)
      }
    } else {
      currentLocationSetup(location.pathname)
    }
  }, [track.path])

  const currentLocationSetup = (pathname: string) => {
    switch (pathname) {
      case '/bluetooth':
        setHeaderTitle(header.title)
        setIcon(bluetoothSVG)
        break
      case '/settings':
        setHeaderTitle('Settings')
        setIcon(cog)
        break
      default:
        if (bluetooth.device.isConnected) {
          setHeaderTitle(bluetooth.device.Name)
          setIcon(bluetoothSVG)
          return
        }

        // basic
        if (track.name) {
          setHeaderTitle(track.name)
          setIcon(music)
        } else {
          setHeaderTitle('miMi Player')
          setIcon(undefined)
        }
    }
  }

  return (
    <div className="header">
      <HeaderComponentNavBar leftSideBarActive={menu.leftSideBarActive} />

      <HeaderComponentWindowDraggable headerTitle={headerTitle} icon={icon} />

      <HeaderComponentWindowControls />
    </div>
  )
}

export default HeaderComponent
