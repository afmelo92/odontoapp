import { Request, Response, Router } from 'express';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import isAuthenticated from './middlewares/isAuthenticated';
import isAdmin from './middlewares/isAdmin';
import personalAction from './middlewares/personalAction';

const router = Router();

// MAIN TEST
router.get('/', (req, res) => {
  res.json({ test: 'OdontoApp API' });
});

// AUTH
router.post('/session', SessionsController.create);

router.post('/session/forgot-password', (req: Request, res: Response) => {
  res.json({ ok: '/' });
});

// USERS
router.post('/users', UsersController.create);
router.get('/users', isAuthenticated, isAdmin, UsersController.index);
router.put(
  '/users/:id',
  isAuthenticated,
  personalAction,
  UsersController.update
);
router.get('/users/:id', isAuthenticated, personalAction, UsersController.show);
router.delete('/users/:id', isAuthenticated, isAdmin, UsersController.delete);

export default router;

// Extracted from express-serve-static-core
interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
type Query = ParsedQs;

// type for Request body
export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

//type for Request query
export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}

// type for Request query and body

export interface TypedRequest<T extends Query, U> extends Express.Request {
  body: U;
  query: T;
}

export interface TypedRequestParams<T> extends Express.Request {
  params: T;
}
// extracted from express-serve-static-core
// ResBody originally was any
type Send<ResBody = unknown, T = Response<ResBody>> = (body?: ResBody) => T;

export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}
