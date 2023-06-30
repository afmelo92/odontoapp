import { Request, Response, Router } from 'express';

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
router.post('/users', (req: Request, res: Response) => {
  res.json({ ok: '/' });
});

export default router;
