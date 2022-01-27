const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        first_name: String
        last_name: String
        date_of_birth: String
        is_coach: Boolean
        email: String
        password: String
        token: String
        created_at: String
    }

    type Auth {
        token: ID
        user: User
    }

    input AddUserInput {
        first_name: String!
        last_name: String!
        date_of_birth: String!
        email: String!
        password: String!
    }

    type Query {
        users: [User]
        user(_id: String): User       
    }

    type Mutation {
        addUser (first_name: String!, last_name: String!, date_of_birth:String!, email:String!, password:String!): User!
        login (email: String!, password: String!): User!
    }
`;

module.exports = typeDefs;