import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';

@controller('/health')
export class HealthController {
  @httpGet('/')
  private Index(_req: Request, res: Response) {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  }
}
