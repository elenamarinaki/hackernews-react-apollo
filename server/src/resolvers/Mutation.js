const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET } = require("../utils")

/**
 * the userId is placed on context by extracting it from the Authorization header,
 * when we set up the server context in index.js
 * * * * * * *
 * * * * * * *
 * we are extracting the userId from the context object of the request
 * the POSTEDBY relation ensures we connect the userId with the Link that's created
 *
 * when we create posts without having logged in, the Authorization header is not
 * provided, so the usedId does not exist
 * POSTEDBY will also be undefined & will be ignored by Prisma
 *
 */
async function post(parent, args, context, info) {
  const { userId } = context

  let postedBy = undefined
  if (userId) {
    postedBy = { connect: { id: userId } }
  }

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy,
    },
  })
  context.pubsub.publish("NEW_LINK", newLink)

  return newLink
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({
    data: { ...args, password },
  })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  })
  if (!user) {
    throw new Error("No such user found")
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error("Invalid password")
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function vote(parent, args, context, info) {
  const { userId } = context
  const vote = await context.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: userId,
      },
    },
  })

  if (Boolean(vote)) {
    throw new Error(`Already voted for link: ${args.linkId}`)
  }

  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    },
  })
  context.pubsub.publish("NEW_VOTE", newVote)

  return newVote
}

module.exports = {
  post,
  signup,
  login,
  vote,
}
