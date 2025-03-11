import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
const errorHandlerMiddleware = (
   err: any,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   let customError = {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
   };

   console.error(err);

   res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandlerMiddleware;
