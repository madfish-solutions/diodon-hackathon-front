import { BigNumber } from 'bignumber.js';
import { BigNumber as EthersBigNumber, ethers, Transaction } from 'ethers';

import clearingHouseAbi from '@abis/clearing-house.json';
import { ZERO_AMOUNT } from '@config/constants';
import { valueToBigNumber } from '@shared/helpers/bignumber';

import { CommonFacade } from './common';
import { address, Side } from './types';

export enum PNLCalcOption {
  SPOT_PRICE = 0,
  TWAP = 1,
  ORACLE = 2
}

interface RawPositionResponse {
  [i: number]: EthersBigNumber | [EthersBigNumber];
  length: number;
}

export class ClearingHouse extends CommonFacade {
  constructor(
    provider: ethers.providers.Web3Provider,
    contractAddress: address,
    signer: ethers.providers.JsonRpcSigner
  ) {
    super(provider, contractAddress, clearingHouseAbi, signer);
  }

  public async getLiquidationFeeRatio(): Promise<BigNumber> {
    return valueToBigNumber(await this.contract.liquidationFeeRatio());
  }

  public async getInitMarginRatio(): Promise<BigNumber> {
    return valueToBigNumber(await this.contract.initMarginRatio());
  }

  public async getMaintenanceMarginRatio(): Promise<BigNumber> {
    return valueToBigNumber(await this.contract.maintenanceMarginRatio());
  }

  public async getPartialLiqudationRatio(): Promise<BigNumber> {
    return valueToBigNumber(await this.contract.partialLiqudationRatio());
  }

  public async getPosition(amm: address, trader: address) {
    const rawResponse: RawPositionResponse = await this.contract.getPosition(amm, trader);

    const [
      rawSize,
      rawMargin,
      rawOpenNotional,
      rawLastUpdatedCumulativePremiumFraction,
      rawLiquidityHistoryIndex,
      rawBlockNumber
    ] = Array.from(rawResponse);
    const size = valueToBigNumber(rawSize);

    if (size.eq(ZERO_AMOUNT)) {
      return null;
    }

    return {
      size,
      margin: valueToBigNumber(rawMargin),
      openNotional: valueToBigNumber(rawOpenNotional),
      lastUpdatedCumulativePremiumFraction: valueToBigNumber(rawLastUpdatedCumulativePremiumFraction),
      liquidityHistoryIndex: valueToBigNumber(rawLiquidityHistoryIndex),
      blockNumber: valueToBigNumber(rawBlockNumber)
    };
  }

  public async getPositionNotionalAndUnrealizedPnl(amm: address, trader: string, pnlCalcOption: PNLCalcOption) {
    const rawResponse: ArrayLike<[EthersBigNumber]> = await this.contract.getPositionNotionalAndUnrealizedPnl(
      amm,
      trader,
      pnlCalcOption
    );

    const [rawPositionNotional, rawUnrealizedPnl] = Array.from(rawResponse);

    return {
      positionNotional: valueToBigNumber(rawPositionNotional),
      unrealizedPnl: valueToBigNumber(rawUnrealizedPnl)
    };
  }

  /**
   * @notice get margin ratio, marginRatio = (margin + funding payment + unrealized Pnl) / positionNotional
   * use spot and twap price to calculate unrealized Pnl, final unrealized Pnl depends on which one is higher
   * @param amm IAmm address
   * @param trader trader address
   * @return margin ratio in 18 digits
   */
  public async getMarginRatio(amm: address, trader: address): Promise<BigNumber> {
    return await this.contract.getMarginRatio(amm, trader);
  }

  public async getPartialLiquidationRatio(): Promise<BigNumber> {
    return await this.contract.partialLiquidationRatio();
  }
  public async getInsuranceFund(): Promise<address> {
    return await this.contract.insuranceFund();
  }

  /**
    it's not an accurate open interest, just a rough way to control the unexpected loss at the beginning
  */
  public async getOpenInterestNotionalMap(amm: address): Promise<Map<address, BigNumber>> {
    return await this.contract.openInterestNotionalMap(amm);
  }

  /**
   * @remarks add margin to increase margin ratio
   * @return transaction
   * @event MarginChanged
   * @eventParam address indexed sender
   * @eventParam address indexed amm
   * @eventParam uint256 amount
   * @eventParam uint256 fundingPayment
   *
   * @param amount added margin in 18 digits
   */
  public async addMargin(amm: address, amount: BigNumber) {
    await this.contract.connect(this.signer).estimateGas.addMargin(amm, [amount.toFixed()]);

    return await (await this.contract.connect(this.signer).addMargin(amm, [amount.toFixed()])).wait();
  }

  /**
   * @remarks remove margin to decrease margin ratio
   * @param amount removed margin in 18 digits
   * @event RemoveMargin
   * @eventParam address indexed trader
   * @eventParam address indexed amm
   * @eventParam uint256 amount
   * @eventParam uint256 margin
   * @eventParam uint256 marginRatio)
   */
  public async removeMargin(amm: address, amount: BigNumber): Promise<Transaction> {
    await this.contract.connect(this.signer).estimateGas.removeMargin(amm, [amount.toString()]);

    return await (await this.contract.connect(this.signer).removeMargin(amm, [amount.toString()])).wait();
  }
  /**
   * @notice settle all the positions when amm is shutdown. The settlement price is according to IAmm.settlementPrice
   * @param amm Pool address // apple/usd
   */
  public async settlePosition(amm: address): Promise<Transaction> {
    return await (await this.contract.connect(this.signer).settlePosition(amm)).wait();
  }

  /**
   * @notice open a position
   * @param amm amm address
   * @param side enum Side; BUY for long and SELL for short
   * @param quoteAssetAmount quote asset amount in 18 digits. Can Not be 0
   * @param leverage leverage  in 18 digits. Can Not be 0
   * @param baseAssetAmountLimit minimum base asset amount expected to get to prevent from slippage.
   *
   * @event PositionChanged
   * @eventParam address indexed trader,
   * @eventParam address indexed amm,
   * @eventParam uint256 margin,
   * @eventParam uint256 positionNotional,
   * @eventParam int256 exchangedPositionSize,
   * @eventParam uint256 fee,
   * @eventParam int256 positionSizeAfter,
   * @eventParam int256 realizedPnl,
   * @eventParam int256 unrealizedPnlAfter,
   * @eventParam uint256 badDebt,
   * @eventParam uint256 liquidationPenalty,
   * @eventParam uint256 spotPrice,
   * @eventParam int256 fundingPayment
   */
  public async openPosition(
    amm: address,
    side: Side,
    quoteAssetAmount: BigNumber,
    leverage: BigNumber,
    baseAssetAmountLimit: BigNumber
  ): Promise<Transaction> {
    await this.contract
      .connect(this.signer)
      .estimateGas.openPosition(
        amm,
        side,
        [quoteAssetAmount.toString()],
        [leverage.toString()],
        [baseAssetAmountLimit.toString()],
        { gasLimit: 1000000 }
      );

    return await (
      await this.contract
        .connect(this.signer)
        .openPosition(
          amm,
          side,
          [quoteAssetAmount.toString()],
          [leverage.toString()],
          [baseAssetAmountLimit.toString()],
          { gasLimit: 1000000 }
        )
    ).wait();
  }

  /**
   * @notice close all the positions
   * @param _amm IAmm address
   *
   * @event PositionChanged
   * @eventParam address indexed trader,
   * @eventParam address indexed amm,
   * @eventParam uint256 margin,
   * @eventParam uint256 positionNotional,
   * @eventParam int256 exchangedPositionSize,
   * @eventParam uint256 fee,
   * @eventParam int256 positionSizeAfter,
   * @eventParam int256 realizedPnl,
   * @eventParam int256 unrealizedPnlAfter,
   * @eventParam uint256 badDebt,
   * @eventParam uint256 liquidationPenalty,
   * @eventParam uint256 spotPrice,
   * @eventParam int256 fundingPayment
   */
  public async closePosition(_amm: address, _quoteAssetAmountLimit: BigNumber) {
    return await (
      await this.contract.connect(this.signer).closePosition(_amm, [_quoteAssetAmountLimit.toFixed()])
    ).wait();
  }

  /**
   * @notice liquidate trader's underwater position. Require trader's margin ratio less than maintenance margin ratio
   * @dev liquidator can NOT open any positions in the same block to prevent from price manipulation.
   * @param amm IAmm address
   * @param trader trader address
   *
   * @event PositionLiquidated
   * @notice This event is emitted when position liquidated
   * @eventParam trader the account address being liquidated
   * @eventParam amm IAmm address
   * @eventParam positionNotional liquidated position value minus liquidationFee
   * @eventParam positionSize liquidated position size
   * @eventParam liquidationFee liquidation fee to the liquidator
   * @eventParam liquidator the address which execute this transaction
   * @eventParam badDebt liquidation fee amount cleared by insurance funds
   *
   * @event PositionChanged
   * @eventParam address indexed trader
   * @eventParam address indexed amm
   * @eventParam uint256 margin
   * @eventParam uint256 positionNotional
   * @eventParam int256 exchangedPositionSize
   * @eventParam uint256 fee
   * @eventParam int256 positionSizeAfter
   * @eventParam int256 realizedPnl
   * @eventParam int256 unrealizedPnlAfter
   * @eventParam uint256 badDebt
   * @eventParam uint256 liquidationPenalty
   * @eventParam uint256 spotPrice
   * @eventParam int256 fundingPayment
   */
  public async liquidate(amm: address, trader: address): Promise<Transaction> {
    return await (await this.contract.connect(this.signer).liquidate(amm, trader)).wait();
  }

  /**
   *
   * @param amm pool address
   * @param trader trader address
   * @param quoteAssetAmountLimit quote asset amount limit in 18 digits.
   *
   * @event PositionLiquidated
   * @notice This event is emitted when position liquidated
   * @eventParam trader the account address being liquidated
   * @eventParam amm IAmm address
   * @eventParam positionNotional liquidated position value minus liquidationFee
   * @eventParam positionSize liquidated position size
   * @eventParam liquidationFee liquidation fee to the liquidator
   * @eventParam liquidator the address which execute this transaction
   * @eventParam badDebt liquidation fee amount cleared by insurance funds
   *
   * @event PositionChanged
   * @eventParam address indexed trader
   * @eventParam address indexed amm
   * @eventParam uint256 margin
   * @eventParam uint256 positionNotional
   * @eventParam int256 exchangedPositionSize
   * @eventParam uint256 fee
   * @eventParam int256 positionSizeAfter
   * @eventParam int256 realizedPnl
   * @eventParam int256 unrealizedPnlAfter
   * @eventParam uint256 badDebt
   * @eventParam uint256 liquidationPenalty
   * @eventParam uint256 spotPrice
   * @eventParam int256 fundingPayment
   */
  public async liquidateWithSlippage(
    amm: address,
    trader: address,
    quoteAssetAmountLimit: BigNumber
  ): Promise<Transaction> {
    return await (
      await this.contract.connect(this.signer).liquidateWithSlippage(amm, trader, [quoteAssetAmountLimit.toFixed()])
    ).wait();
  }

  /**
   * @notice update funding rate
   * @dev only allow to update while reaching `nextFundingTime`
   *
   * @event FundingRateUpdated
   * @eventParam int256 rate
   * @eventParam uint256 underlyingPrice
   */
  public async updateFundingRate() {
    return await (await this.contract.connect(this.signer).settleFunding()).wait();
  }

  //web3.utils.asciiToHex(str)
  public async addAggregator(key: string, addrr: address) {
    return await (
      await this.contract.connect(this.signer).addAggregator(ethers.utils.formatBytes32String(key), addrr)
    ).wait();
  }
}
