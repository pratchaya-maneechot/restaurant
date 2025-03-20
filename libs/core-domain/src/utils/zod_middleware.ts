import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

type ZodValidator<T> = z.ZodType<T>;

export function validateRequest<T>(schema: ZodValidator<T>) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = {
        query: req.query,
        body: req.body,
        params: req.params,
      };
      await schema.parseAsync(data);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
