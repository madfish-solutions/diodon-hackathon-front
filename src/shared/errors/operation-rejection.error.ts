import { MetamaskError } from './metamask.error';

export class OperationRejectionError extends MetamaskError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
