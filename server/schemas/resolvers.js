const { User } = require('../models')
const { AuthenticationError} = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id)

                return user;
            }
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            user.token = token;
            return user;
        },
        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPassword = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials!');
            }

            const token = signToken(user);
            user.token = token;

            return user;
        }
    }
};

module.exports = resolvers;