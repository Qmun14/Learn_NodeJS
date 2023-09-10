import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ResponseError } from '../error/response-error';
import { ValidationError } from 'joi';

const errorMiddleware = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next();
    return;
  }
  if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message
    }).end();
  } else if (err instanceof ValidationError) {
    res.status(400).json({
      errors: err.message
    });
  } else {
    res.status(500).json({
      errors: err.toString()
    }).end();
  }
}

export {
  errorMiddleware
}