// pages/settings.tsx
import Router from 'next/router'
import React from 'react'
import { mutate, trigger } from 'swr'

import { AUTH_LOCAL_STORAGE_NAME } from 'front'
import SettingsForm from '../front/SettingsForm';

import checkLogin from 'front/checkLogin'
import storage from 'front/localStorageHelper'
import { deleteCookie } from 'front'

const Settings: React.FC = () => {
  // редирект на /login, если юзер не залогинен
  React.useEffect(() => {
    const loggedUser = storage(AUTH_LOCAL_STORAGE_NAME)
    const isLoggedIn = checkLogin(loggedUser)

    if (!isLoggedIn) {
      Router.push('/login')
    }
  }, [])

const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  window.localStorage.removeItem('user')
  deleteCookie('auth')
  mutate('user', null)
  Router.push('/login') // ← было '/', должно быть '/login'
}



  // заголовок страницы (без AppContext/SSR)
  const title = 'Your Settings'
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = title
    }
  }, [title])

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{title}</h1>

            <SettingsForm />

            <hr />

            <button
              className="btn btn-outline-danger"
              data-cy="settings-logout"
              onClick={handleLogout}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
