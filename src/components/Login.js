import React from "react"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
  })
  return <div>Login</div>
}
