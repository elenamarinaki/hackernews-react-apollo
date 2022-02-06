import React from "react"
import { useMutation, gql } from "@apollo/client"

// creating the mutation statement
const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

export const Signup = () => {
  /**
   * When using the `useMutation` hook, we need to de-structure out
   * a function that can be used to call the mutation.
   * This is what the `createLink` does here. It is a FUNCTION!
   * We can now call the function whenever we need to, when the component renders
   */
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      email: "elli@test.com",
      password: "1234",
      name: "Elli",
    },
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          signup()
          //   log
          console.log("signup is: ", signup())
        }}
      >
        <button type='submit'>Signup</button>
      </form>
    </div>
  )
}
