import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./components/App"
// import cors from "cors"

// 1️⃣ dependencies to wire up the apollo client
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"

// var corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, // <-- REQUIRED backend setting
// }
// App.use(cors(corsOptions))

/** 2️⃣
 * this will connect our ApolloClient with the GraphQL API
 * the GraphQL server will be running on http://localhost:4000
 */
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
  credentials: "include",
})

// 3️⃣ instantiating apollo
const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() })

// 4️⃣ the App is wrapped with the higher-order component
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
