# React-Apollo Hackernews 🚀

### General notes

- pull the functionality from `Apollo` client & each `React` hooks:
  `yarn add @apollo/client graphql `
- overview of the packages:

#### `@apollo/client`

- wire up the `GraphQl` client for the app
- it gives us the `ApolloClient` and the `ApolloProvider` in which we can wrap our app
- provides custom hooks like `useQuery`

#### `graphql`

- Facebook's implementation of `GraphQL`

## Server

### Prisma

- `schema.prisma` -> our data model for the project. Uses PSL (Prisma Schema Language) to define the **shape of our database** tables and the **relationships among them**
- `dev.db` -> SQLite database that will be used here

### Src

- `schema.graphql` -> **Application schema**. It defines the GraphQL operations we can send from the frontend
- `resolvers` -> contains the resolver functions for the operations that we define in the application schema
- `index.js` -> entry point for the `GraphQL` server
