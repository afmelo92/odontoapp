import { Request, Response, Router } from 'express';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import isAuthenticated from './middlewares/isAuthenticated';
import isAdmin from './middlewares/isAdmin';
import personalAction from './middlewares/personalAction';
import PatientsController from './controllers/PatientsController';
import ProstheticsOrdersController from './controllers/ProstheticsOrdersController';
import ServicesController from './controllers/ServicesController';

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

// PATIENTS
router.post('/patients', isAuthenticated, PatientsController.create);
router.get(
  '/patients/:id',
  isAuthenticated,
  personalAction,
  PatientsController.show
);
router.get('/patients/', isAuthenticated, isAdmin, PatientsController.index);
router.delete(
  '/patients/:patient_id',
  isAuthenticated,
  personalAction,
  PatientsController.delete
);

// DENTISTS
router.get('/dentists', (req, res) => {
  res.json({ dentists: [] });
});

// LABS
router.get('/labs', (req, res) => {
  res.json({ labs: [] });
});

// PROSTHETICS ORDERS
router.post(
  '/prosthetics/orders',
  isAuthenticated,
  ProstheticsOrdersController.create
);

// SERVICES
router.get('/services', isAuthenticated, ServicesController.index);

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
