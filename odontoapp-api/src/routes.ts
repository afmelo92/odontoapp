import { Request, Response, Router } from 'express';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

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

export default router;
