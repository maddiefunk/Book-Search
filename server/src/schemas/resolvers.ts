import { IResolvers } from '@graphql-tools/utils';
import * as userController from '../controllers/user-controller.js';

interface MyContext {
    req: any;
    res: any;
}

const resolvers: IResolvers = {

    Query: {

        me: (_parent, _args, context: MyContext) => {
            context.req.params.id = context.req.user?._id;
            return userController.getSingleUser(context.req, context.res);
        },
        user: (_parent, _args, context: MyContext) => {
            context.req.params = _args;
            return userController.getSingleUser(context.req, context.res);
        },
    },

    Mutation: {

        createUser: (_parent, args, context) => {
            context.req.body = args;
            return userController.createUser(context.req, context.res);
        },
        login: (_parent, args, context) => {
            context.req.body = args;
            return userController.login(context.req, context.res);
        },
        saveBook: (_parent, args, context) => {
            context.req.body = args;
            return userController.saveBook(context.req, context.res);
        },
        deleteBook: (_parent, args, context) => {
            context.req.body = args;
            return userController.deleteBook(context.req, context.res);
        },
    },
};

export default resolvers;