import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./components/App"
import { setContext } from "@apollo/client/link/context"

// 1️⃣ dependencies to wire up the apollo client
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"

/**
 * 5️⃣ Pass the authorization header to every HTTP request
 * by creating an authLink variable
 */

const authLink = setContext((_, { headers }) => {
  // Create a token variable pasting the token without the "Bearer" part you got from the Playground when creating your user
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY0NDEwNzA5Mn0.DVonHuXQYlqVgtexhYCZwqiOBzUhj1iFb7aKFWG5dCQ"
  // Return the headers to the context so httpLink can read them
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
  }
})

/** 2️⃣
 * this will connect our ApolloClient with the GraphQL API
 * the GraphQL server will be running on http://localhost:4000
 */
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
})

// 3️⃣ instantiating apollo
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("token"),
  },
})

// 4️⃣ the App is wrapped with the higher-order component
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
