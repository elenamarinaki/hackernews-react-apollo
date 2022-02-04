import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./components/App"

// 1️⃣ dependencies to wire up the apollo client
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"

/** 2️⃣
 * this will connect our ApolloClient with the GraphQL API
 * the GraphQL server will be running on http://localhost:4000
 */
const httpLink = createHttpLink({ uri: "http://localhost:4000" })

// 3️⃣ instantiating apollo
const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() })

// 4️⃣ the App is wrapped with the higher-order component
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
