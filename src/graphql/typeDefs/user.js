import { gql } from 'apollo-server-express';

export default gql`

    extend type Query{
        me: User @auth
    }

    extend type Mutation{
        signUp(input: SignUp): AuthResponse
        signIn(input: SignIn): AuthResponse
        invalidateToken: String! @auth
        changePassword(input: ChangePassword): String! @auth
    }

    type User{
        id: ID!
        email: String!
        name: String!
        subjects: [UserSubject!]
        createdAt: String!
        updatedAt: String!
    }

    type Tokens {
        accessToken: String!
        refreshToken: String!
    }

    type UserSubject{
        subject: Subject!
        admin: Boolean
    }

    input SignUp{
        name: String!
        email: String!
        password: String!
    }

    input SignIn{
        email: String!
        password: String!
    }

    input ChangePassword{
        oldPassword: String!
        newPassword: String!
    }

    type AuthResponse{
        tokens: Tokens!
        user: User!
    }
    
`;
