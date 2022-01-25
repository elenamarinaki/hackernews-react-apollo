import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./components/App"

// dependencies to wire up the apollo client
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"

/**
 * this will connect our ApolloClient with the GraphQL API
 * the GraphQL server will be running on http://localhost:4000
 */
const httpLink = createHttpLink({ uri: "http://localhost:4000" })

// instantiating apollo
const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() })

// the App is wrapped with the higher-order component
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
