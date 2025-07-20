import axios from 'axios'
import Router from 'next/router'
import React from 'react'

import { setupUserLocalStorage } from 'front'
import { apiPath } from 'front/config'
import ListErrors from 'front/ListErrors'
import useLoggedInUser from 'front/useLoggedInUser'
import { useCtrlEnterSubmit } from 'front/ts'

const SettingsForm = () => {
  const [isLoading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState([])
  const [userInfo, setUserInfo] = React.useState({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  })
  const loggedInUser = useLoggedInUser()

  React.useEffect(() => {
    if (loggedInUser && Object.keys(loggedInUser).length > 0) { // Перевіряємо, що loggedInUser існує і не порожній об'єкт
      setUserInfo((prev) => ({
        ...prev, // Зберігаємо попередній стан
        image: loggedInUser.image || '', // Встановлюємо значення або порожній рядок, якщо воно undefined
        username: loggedInUser.username || '',
        bio: loggedInUser.bio || '',
        email: loggedInUser.email || '',
        // password не має бути тут, бо ми не хочемо заповнювати поле пароля поточним паролем
        // loggedInUser не містить password, тому його не потрібно присвоювати.
      }));
    } else {
      // Якщо користувач не залогінений, очищаємо форму або встановлюємо значення за замовчуванням
      setUserInfo({
        image: '',
        username: '',
        bio: '',
        email: '',
        password: '',
      });
    }
  }, [loggedInUser]); // Залежність тільки від loggedInUser

  const updateState = (field) => (e) => {
    setUserInfo({ ...userInfo, [field]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const user = { ...userInfo }
    if (!user.password) {
      delete user.password
    }
    try { // Додаємо try-catch для обробки помилок axios
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
        setLoading(false)
        if (status !== 200) {
            setErrors(data.errors.body)
        } else if (data?.user) {
            await setupUserLocalStorage(data, setErrors)
            Router.push(`/profile/${user.username}`)
        }
    } catch (error) {
        setLoading(false);
        if (error.response && error.response.data && error.response.data.errors) {
            setErrors(error.response.data.errors.body);
        } else {
            setErrors(['An unexpected error occurred.']);
        }
        console.error("Error updating user:", error); // Логуємо помилку для налагодження
    }
  }

  // Функція для обробки виходу з системи
  const handleLogout = async () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    Router.push('/')
  }

  useCtrlEnterSubmit(handleSubmit)
  return (
    <React.Fragment>
      <ListErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={userInfo.image || ''} // Використовуємо || '' для безпеки
              onChange={updateState('image')}
              data-cy="settings-image-input"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={userInfo.username || ''} // Використовуємо || '' для безпеки
              onChange={updateState('username')}
              data-cy="settings-username-input"
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              value={userInfo.bio || ''} // Використовуємо || '' для безпеки
              onChange={updateState('bio')}
              data-cy="settings-bio-textarea"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={userInfo.email || ''} // Використовуємо || '' для безпеки
              onChange={updateState('email')}
              data-cy="settings-email-input"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={userInfo.password}
              onChange={updateState('password')}
              autoComplete="new-password"
              data-cy="settings-password-input"
            />
          </fieldset>
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={isLoading}
            data-cy="update-settings-button"
          >
            Update Settings
          </button>
        </fieldset>
      </form>

      <hr />
      <button
        className="btn btn-outline-danger"
        onClick={handleLogout}
        data-cy="logout-button"
      >
        Or click here to logout.
      </button>

    </React.Fragment>
  )
}

export default SettingsForm
