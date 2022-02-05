import React, { useState } from "react"
import { useMutation, gql } from "@apollo/client"

// creating the mutation statement
const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

export const CreateLink = () => {
  const [formState, setFormState] = useState({ description: "", url: "" })

  /**
   * When using the `useMutation` hook, we need to de-structure out
   * a function that can be used to call the mutation.
   * This is what the `createLink` does here. It is a FUNCTION!
   * We can now call the function whenever we need to, when the component renders
   */
  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      ulr: formState.url,
    },
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createLink()
          //   log
          console.log("createLink is: ", createLink())
          console.log("formState is: ", formState)
        }}
      >
        <div className='flex flex-column mt3'>
          <input
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
            value={formState.description}
            className='mb2'
            type='text'
            placeholder='Link description'
          />
          <input
            onChange={(e) =>
              setFormState({ ...formState, url: e.target.value })
            }
            value={formState.url}
            className='mb2'
            type='text'
            placeholder='Link URL'
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
