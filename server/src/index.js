const { ApolloServer, PubSub } = require("apollo-server")
const { PrismaClient } = require("@prisma/client")
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const Subscription = require("./resolvers/Subscription")
const User = require("./resolvers/User")
const Link = require("./resolvers/Link")
const Vote = require("./resolvers/Vote")
const fs = require("fs")
const path = require("path")
const { getUserId } = require("./utils")

const pubsub = new PubSub()

const prisma = new PrismaClient({
  errorFormat: "minimal",
})

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
}

const server = new ApolloServer({
  /**
   * to enable cors in the Apollo server, we have to pass it as an argument
   * during the server instantiation - the origin has to be a callback 😎
   */
  cors: {
    // origin: "*", // <- allow request from all domains
    // credentials: false, // <- enable CORS response for requests with credentials (cookies, http authentication)
    // optionSuccessStatus: 200,
    credentials: true,
    origin: (origin, callback) => {
      // const whitelist = ["http://localhost:4000", "http://localhost:3000"]

      callback(null, true)

      // if (whitelist.indexOf(origin) !== -1) {
      //   callback(null, true)
      // } else {
      //   callback(new Error("Not allowed by CORS"))
      // }
    },
  },
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    }
  },
  subscriptions: {
    onConnect: (connectionParams) => {
      if (connectionParams.authToken) {
        return {
          prisma,
          userId: getUserId(null, connectionParams.authToken),
        }
      } else {
        return {
          prisma,
        }
      }
    },
  },
})

// server.applyMiddleware({ cors: false })

server.listen().then(({ url }) => console.log(`Server is running on ${url}`))
