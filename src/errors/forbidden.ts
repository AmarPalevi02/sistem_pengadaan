import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './custom-api-error';

export class Forbidden extends CustomAPIError {
   constructor(message: string) {
      super(message, StatusCodes.FORBIDDEN)
   }
}