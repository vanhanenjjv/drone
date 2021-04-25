import { NextFunction, Request, Response } from 'express';


type ExpressMiddleware = (request: Request, response: Response, next: NextFunction) => void;

export function paramShouldBeNumber(name: string): ExpressMiddleware {
  return (req, res, next) => {
    const param = Number(req.params[name]);

    if (isNaN(param))
      return res.status(400).json({ message: `'${name}' should be a number.` });

    next();
  };
}
