import React from 'react'

const ListErrors = ({ errors }) => (
  <ul className="error-messages">
    {Object.keys(errors).map((key) => {
      return (
        <li data-cy="error-message" key={key}>
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
