import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
  })
  return (
    <div>
      <h4 className='mv3'>{formState.login ? "Login" : "Sign Up"}</h4>
      <div className='flex flex-column'>
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
            type='text'
            placeholder='Your name'
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
          type='text'
          placeholder='Your email address'
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
          type='text'
          placeholder='Your password'
        />
      </div>
    </div>
  )
}
