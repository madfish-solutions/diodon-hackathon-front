import { MetamaskError } from './metamask.error';

export class OperationExecutionError extends MetamaskError {
  description: string;

  constructor(description: string) {
    super(`Execution failed with error "${description.trim()}"`);
    this.description = description.trim();
    this.name = this.constructor.name;
  }
}
