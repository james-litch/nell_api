import { gql } from 'apollo-server-express'

export default gql`
    extend type Query{
        user(id: ID!): User
        users: [User!]!
        me: User
    }

    extend type Mutation{
        signUp(email: String!, name: String!, password: String!): User
        signIn(email: String!, password: String!): AuthData
    }

    type User{
        id: ID!
        email: String!
        name: String!
        createdAt: String!
    }

    type AuthData{
        token: String!
    }
`
