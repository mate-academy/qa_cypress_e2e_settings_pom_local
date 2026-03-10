import React, { useState } from 'react'

interface UserInfo {
  image?: string
  username: string
  bio?: string
  email: string
  password?: string
}

interface Props {
  initialUser: UserInfo
  isLoading: boolean
  onSubmit: (data: UserInfo) => void
}

const SettingsForm: React.FC<Props> = ({
  initialUser,
  isLoading,
  onSubmit,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUser)

  const updateState =
    (field: keyof UserInfo) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUserInfo({
        ...userInfo,
        [field]: event.target.value,
      })
    }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(userInfo)
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isLoading}>
        <fieldset className="form-group">
          <input
            data-cy="image-input"
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            value={userInfo.image || ''}
            onChange={updateState('image')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            data-cy="username-input"
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={userInfo.username}
            onChange={updateState('username')}
          />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            data-cy="bio-input"
            className="form-control form-control-lg"
            rows={8}
            placeholder="Short bio about you"
            value={userInfo.bio || ''}
            onChange={updateState('bio')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            data-cy="email-input"
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={updateState('email')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            data-cy="password-input"
            className="form-control form-control-lg"
            type="password"
            placeholder="New Password"
            value={userInfo.password || ''}
            onChange={updateState('password')}
            autoComplete="new-password"
          />
        </fieldset>

        <button
          data-cy="update-settings-btn"
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
        >
          Update Settings
        </button>
      </fieldset>
    </form>
  )
}

export default SettingsForm
