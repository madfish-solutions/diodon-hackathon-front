import { MetamaskError } from './metamask.error';

export class OperationExecutionError extends MetamaskError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
