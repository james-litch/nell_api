import { gql } from 'apollo-server-express';

export default gql`
    extend type Query{
        user(id: ID!): User 
        users: [User!]! @auth
        me: User @auth
    }

    extend type Mutation{
        signUp(input: SignUp): User
        signIn(input: SignIn): Tokens

        invalidateToken: String

        changePassword(input: ChangePassword): String @auth
        deleteAccount(input: SignIn): String @auth
    }

    type User{
        id: ID!
        email: String!
        name: String!
        subjects: [Subject!]
        createdAt: String!
        updatedAt: String!
    }

    type Tokens {
        accessToken: String
        refreshToken: String
  }

    input SignIn{
        email: String!
        password: String!
    }

    input SignUp{
        email: String!
        name: String!
        password: String!
    }

    input ChangePassword{
        oldPassword: String!
        newPassword: String!
    }

    # interface SignInResponse{
    #     code: String!
    #     success: Boolean!
    #     message: String!
    #     user: User
    # }
`;
