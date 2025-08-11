// front/SettingsForm.tsx
import axios from 'axios'
import Router from 'next/router'
import React from 'react'

import { apiPath } from 'front/config'
import ListErrors from 'front/ListErrors'
import useLoggedInUser from 'front/useLoggedInUser'

type Errors = Record<string, string[]>

const SettingsForm: React.FC = () => {
  const [isLoading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<Errors>({})
  const [userInfo, setUserInfo] = React.useState({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  })

  const loggedInUser: any = useLoggedInUser()

  // подтянуть текущие данные пользователя в форму
  React.useEffect(() => {
    if (!loggedInUser) return
    setUserInfo(prev => ({
      ...prev,
      image: loggedInUser.image || '',
      username: loggedInUser.username || '',
      bio: loggedInUser.bio || '',
      email: loggedInUser.email || '',
    }))
  }, [loggedInUser])

  const updateState =
    (field: keyof typeof userInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUserInfo({ ...userInfo, [field]: e.target.value })
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    // формируем payload; пустой пароль не отправляем
    const user: any = { ...userInfo }
    if (!user.password) {
      delete user.password
    }

    try {
      const { data, status } = await axios.put(
        `${apiPath}/user`,
        JSON.stringify({ user }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${loggedInUser?.token}`,
          },
        }
      )

      // удачно сохранили — редирект на профиль (новый username учитываем)
      if (status >= 200 && status < 300) {
        const nextUsername = data?.user?.username || userInfo.username
        Router.push(`/profile/${nextUsername}`)
      }
    } catch (err: any) {
      const apiErrors: Errors =
        err?.response?.data?.errors || { error: ['Unable to save'] }
      setErrors(apiErrors)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ListErrors errors={errors} />

      <fieldset>
        {/* URL of profile picture (без data-cy — не нужно для теста) */}
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            value={userInfo.image}
            onChange={updateState('image')}
          />
        </fieldset>

        {/* Username */}
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={userInfo.username}
            onChange={updateState('username')}
            data-cy="settings-username"
          />
        </fieldset>

        {/* Bio */}
        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows={8}
            placeholder="Short bio about you"
            value={userInfo.bio}
            onChange={updateState('bio')}
            data-cy="settings-bio"
          />
        </fieldset>

        {/* Email */}
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={updateState('email')}
            data-cy="settings-email"
          />
        </fieldset>

        {/* New Password */}
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="New Password"
            value={userInfo.password}
            onChange={updateState('password')}
            data-cy="settings-password"
          />
        </fieldset>

        {/* Save */}
        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={isLoading}
          data-cy="settings-save"
        >
          Update Settings
        </button>
      </fieldset>
    </form>
  )
}

export default SettingsForm
