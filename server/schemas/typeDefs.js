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
        user(_id: ID): User
        me: User       
    }

    type Mutation {
        addUser (first_name: String!, last_name: String!, date_of_birth:String!, email:String!, password:String!): User!
        updateUser (first_name: String, last_name: String, date_of_birth:String, password:String, is_coach:Boolean): User!
        addCoach (first_name: String!, last_name: String!, date_of_birth:String!, email:String!, password:String!, is_coach:Boolean=false): User!
        login (email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;