import { Request, Response } from 'express';
import { colorScale, newServices } from '@/etc/constants';

class ServicesController {
  async index(req: Request, res: Response) {
    return res.json({
      message: 'ok',
      data: {
        services: newServices,
        colorScale,
      },
    });
  }
}

export default new ServicesController();
