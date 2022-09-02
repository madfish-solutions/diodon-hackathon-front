import { type InjectedConnector } from '@web3-react/injected-connector';

import { Undefined } from '@shared/types';

export interface InjectedConnectorParams {
  chainIds: number[];
}

let LazyInjectedConnector: Undefined<typeof InjectedConnector>;

export async function getInjectedConnector({ chainIds }: InjectedConnectorParams) {
  if (!LazyInjectedConnector) {
    const injectedConnectorModule = await import('@web3-react/injected-connector');
    LazyInjectedConnector = injectedConnectorModule.InjectedConnector;
  }

  return new LazyInjectedConnector({
    supportedChainIds: chainIds
  });
}
