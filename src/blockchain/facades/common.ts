import { BigNumber } from 'bignumber.js';
import { Contract, ethers } from 'ethers';

import { address } from './types';

export class CommonFacade {
  static address: address;
  provider: ethers.providers.Web3Provider;
  contract: Contract;
  signer: ethers.providers.JsonRpcSigner;
  public static PRECISION = 1e18;

  constructor(
    provider: ethers.providers.Web3Provider,
    contractAddress: address,
    abi: ethers.ContractInterface,
    signer: ethers.providers.JsonRpcSigner
  ) {
    this.provider = provider;
    this.contract = new ethers.Contract(contractAddress, abi, this.provider);
    this.signer = signer;
  }

  public async getOwner(): Promise<address> {
    return await this.contract.methods.owner().call();
  }

  public fromPrecision(value: BigNumber, precision = CommonFacade.PRECISION): BigNumber {
    return value.div(precision);
  }

  public toPrecision(value: BigNumber, precision = CommonFacade.PRECISION): BigNumber {
    return value.multipliedBy(precision);
  }

  //mapping(address => AmmMap) internal ammMap;
}
