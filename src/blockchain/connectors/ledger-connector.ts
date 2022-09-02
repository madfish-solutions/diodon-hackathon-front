import { type LedgerConnector } from '@web3-react/ledger-connector';

import { Undefined } from '@shared/types';

// NOTE: The ledger live path specify which chain and which account is used
// on the hardware wallet. This should eventually be made dynamic.
const LEDGER_LIVE_PATH = "m/44'/60'/0'/0";
const POLLING_INTERVAL = 12000;

export interface LedgerConnectionParams {
  chainId: number;
  url: string;
}

let LazyLedgerConnector: Undefined<typeof LedgerConnector>;

export async function getLedgerConnector({ chainId, url }: LedgerConnectionParams) {
  if (!LazyLedgerConnector) {
    const ledgerConnectorModule = await import('@web3-react/ledger-connector');
    LazyLedgerConnector = ledgerConnectorModule.LedgerConnector;
  }

  return new LazyLedgerConnector({
    chainId,
    url,
    pollingInterval: POLLING_INTERVAL,
    requestTimeoutMs: POLLING_INTERVAL,
    accountFetchingConfigs: {
      paths: [LEDGER_LIVE_PATH]
    }
  });
}
