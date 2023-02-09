import React from 'react'
import BackComponent from '@Components/back'

const SettingsComponent = () => {
  return (
    <>
      <div className="settings">
        <section className="settings__section">
          <h3 className="settings__section-title">Basic</h3>
          <div className="settings__item">
            <label className="settings__item checkbox__container btn">
              <p className="checkbox__text">
                parallel music playback in bluetooth mode
              </p>
              <input type="checkbox" />
              <span className="checkbox__checkmark"></span>
            </label>
          </div>

          <div className="settings__item">
            <label className="settings__item checkbox__container btn">
              <p className="checkbox__text">add to automatic startup</p>
              <input type="checkbox" />
              <span className="checkbox__checkmark"></span>
            </label>
          </div>
        </section>
      </div>

      <section className="settings__footer">
        <div className="btn__container btn__container--horizontal">
          <BackComponent to="/" />
          <button
            className="btn btn__normal"
            title="Temporarily unavailable"
            disabled
          >
            Get PRO
          </button>
        </div>
        <div className="settings__group">
          <div className="settings__group-item">
            <h2 className="settings__version">Lite - v1.1.0a</h2>
          </div>
          <div className="settings__group-item">
            <h2 className="settings__copyright">© Emil Shergali</h2>
          </div>
          <div className="settings__group-item">
            <h2 className="settings__code-name">Awkward Baroness</h2>
          </div>
        </div>
      </section>
    </>
  )
}

export default SettingsComponent
