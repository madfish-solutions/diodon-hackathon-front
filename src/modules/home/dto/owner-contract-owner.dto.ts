import { Typed } from '@shared/decorators';

export class OwnerContractOwnerDto {
  @Typed({ type: String, nullable: true })
  value: string;
}
