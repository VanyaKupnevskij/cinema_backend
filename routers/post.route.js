import { Router } from 'express';

import CreateAction from '../ations/post/CreateAction.js';
import GetPostesAction from '../ations/post/GetPostesAction.js';
import GetPostByIdAction from '../ations/post/GetPostByIdAction.js';
import DeletePostByIdAction from '../ations/post/DeletePostByIdAction.js';

import auth from '../middlewares/auth.middleware.js';

const postRouter = new Router();

const createAction = new CreateAction();
const getPostesAction = new GetPostesAction();
const getPostByIdAction = new GetPostByIdAction();
const deletePostByIdAction = new DeletePostByIdAction();

postRouter.post('/create', auth, createAction.run);
postRouter.get('/', auth, getPostesAction.run);
postRouter.get('/:id', auth, getPostByIdAction.run);
postRouter.delete('/:id', auth, deletePostByIdAction.run);

export default postRouter;
