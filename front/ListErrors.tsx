import React from 'react'

const ListErrors = ({ errors }) => (
  <ul className="error-messages">
    {Object.keys(errors).map((key) => {
      return (
        <li key={key}>
          {key}:
          <ul>
            <li data-cy="error-text">{errors[key]}</li>
          </ul>
        </li>
      )
    })}
  </ul>
)

export default ListErrors
