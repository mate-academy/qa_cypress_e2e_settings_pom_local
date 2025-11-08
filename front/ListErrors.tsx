import React from 'react'

const ListErrors = ({ errors }) => (
  <ul className="error-messages"
  data-cy='login-errors'>
    {Object.keys(errors).map((key) => {
      return (
        <li key={key}>
          {key}:
          <ul>
            <li>{errors[key]}</li>
          </ul>
        </li>
      )
    })}
  </ul>
)

export default ListErrors
