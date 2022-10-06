import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';

import ammABI from '@abis/amm.json';
import { valueToBigNumber } from '@shared/helpers/bignumber';

import { CommonFacade } from './common';
import { address, Dir } from './types';

export class Amm extends CommonFacade {
  constructor(
    provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
    contractAddress: address,
    signer: ethers.providers.JsonRpcSigner
  ) {
    super(provider, contractAddress, ammABI, signer);
  }

  public async updateFundingRate() {
    const tx = await this.contract.connect(this.signer).settleFunding({ gasLimit: 1000000 });

    return await tx.wait();
  }

  public async getUnderlyingPrice() {
    return valueToBigNumber(await this.contract.getUnderlyingPrice());
  }

  public async setPriceFeed(priceFeed: address) {
    return await (await this.contract.connect(this.signer).setPriceFeed(priceFeed, { gasLimit: 1000000 })).wait();
  }

  public async getSpotPrice() {
    const rawPrice = await this.contract.getSpotPrice();

    return valueToBigNumber(rawPrice);
  }

  public async getInputPrice(_dirOfQuote: Dir, _quoteAssetAmount: BigNumber) {
    return valueToBigNumber(await this.contract.getInputPrice(_dirOfQuote, [_quoteAssetAmount.toFixed()]));
  }
}
