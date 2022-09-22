import { TransactionResponse, Provider } from '@ethersproject/abstract-provider';
import { BigNumber as EthersBigNumber, CallOverrides, Signer } from 'ethers';

import erc20TokenAbi from '@abis/erc20-token.json';
import { ContractWrapper } from '@blockchain/contract-wrapper';

type ERC20TokenContractMethods = {
  allowance: (owner: string, spender: string, overrides?: CallOverrides) => Promise<EthersBigNumber | number>;
  approve: (spender: string, amount: EthersBigNumber, overrides?: CallOverrides) => Promise<TransactionResponse>;
  balanceOf: (owner: string, overrides?: CallOverrides) => Promise<EthersBigNumber | number>;
  decimals: (overrides?: CallOverrides) => Promise<number>;
  name: (overrides?: CallOverrides) => Promise<string>;
  symbol: (overrides?: CallOverrides) => Promise<string>;
  totalSupply: (overrides?: CallOverrides) => Promise<EthersBigNumber | number>;
  transfer: (to: string, amount: EthersBigNumber, overrides?: CallOverrides) => Promise<TransactionResponse>;
  transferFrom: (
    sender: string,
    recipient: string,
    amount: EthersBigNumber,
    overrides?: CallOverrides
  ) => Promise<TransactionResponse>;
};

type ERC20TokenContractEvents = {
  Approval: [string, string, EthersBigNumber | number];
  Transfer: [string, string, EthersBigNumber | number];
};

export class ERC20TokenContractWrapper extends ContractWrapper<ERC20TokenContractMethods, ERC20TokenContractEvents> {
  constructor(address: string, provider: Provider | Signer) {
    super(address, erc20TokenAbi, provider);
  }
}
