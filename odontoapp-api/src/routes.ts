import { Request, Response, Router } from 'express';
import UsersController from './controllers/UsersController';

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

const router = Router();

router.get('/', (req, res) => {
  res.json({ test: 'OdontoApp API' });
});

// AUTH
router.post('/session', (req: Request, res: Response) => {
  res.json({ ok: '/' });
});

router.post('/session/forgot-password', (req: Request, res: Response) => {
  res.json({ ok: '/' });
});

// USERS
router.post('/users', UsersController.create);

export default router;
