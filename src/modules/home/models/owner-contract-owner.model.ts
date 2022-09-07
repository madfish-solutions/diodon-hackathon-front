import { OwnerContractOwnerDto } from '../dto';

export class OwnerContractOwnerModel extends OwnerContractOwnerDto {
  constructor(dto: OwnerContractOwnerDto) {
    super();

    for (const key in dto) {
      //@ts-ignore
      this[key] = dto[key as keyof OwnerContractOwnerDto];
    }
  }
}
