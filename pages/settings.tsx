import React from 'react'
import { useNavigate } from 'react-router-dom'
import SettingsForm from '../front/SettingsForm'

const SettingsPage = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleSubmit = (data: any) => {
    console.log('Updated settings:', data)
  }

  const initialUser = {
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <SettingsForm
              initialUser={initialUser}
              isLoading={false}
              onSubmit={handleSubmit}
            />

            <hr />

            <button
              data-cy="logout-btn"
              className="btn btn-outline-danger"
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

export default SettingsPage
