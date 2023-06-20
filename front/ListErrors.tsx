import React from 'react'

const ListErrors = ({ errors }) => (
  <ul className="error-messages">
    {Object.keys(errors).map((key) => {
      return (
        <li key={key} data-cy="wrong-credentials">
          {key}:
          <ul>
            <li data-cy="error-message">{errors[key]}</li>
          </ul>
        </li>
      )
    })}
  </ul>
)

export default ListErrors
