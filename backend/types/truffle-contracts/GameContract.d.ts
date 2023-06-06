/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface GameContractContract
  extends Truffle.Contract<GameContractInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<GameContractInstance>;
}

export interface BalanceEvent {
  name: "BalanceEvent";
  args: {
    player: string;
    balance: BN;
    0: string;
    1: BN;
  };
}

export interface GameResult {
  name: "GameResult";
  args: {
    player: string;
    wager: BN;
    bet: BN;
    destiny: BN;
    balance: BN;
    result: BN;
    is_bonus: BN;
    bonus: BN;
    bonus_res: BN;
    timestamp: BN;
    trigger: boolean;
    0: string;
    1: BN;
    2: BN;
    3: BN;
    4: BN;
    5: BN;
    6: BN;
    7: BN;
    8: BN;
    9: BN;
    10: boolean;
  };
}

export interface NewGameEvent {
  name: "NewGameEvent";
  args: {
    player: string;
    game: {
      bet: BN;
      wager: BN;
      isBetSet: boolean;
      destiny: BN;
      trigger: boolean;
    };
    0: string;
    1: { bet: BN; wager: BN; isBetSet: boolean; destiny: BN; trigger: boolean };
  };
}

export interface OwnerBalanceEvent {
  name: "OwnerBalanceEvent";
  args: {
    owner: string;
    balance: BN;
    0: string;
    1: BN;
  };
}

type AllEvents = BalanceEvent | GameResult | NewGameEvent | OwnerBalanceEvent;

export interface GameContractInstance extends Truffle.ContractInstance {
  build: {
    (
      wager: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      wager: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    sendTransaction(
      wager: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      wager: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  games(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN; 1: BN; 2: boolean; 3: BN; 4: boolean }>;

  ownerBlances(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  playerBlances(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  deposit: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  ownerDeposit: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  isOwner(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

  getOwnerBalance(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  getBalance(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  withdraw: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  ownerWithdraw: {
    (
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getGame(
    txDetails?: Truffle.TransactionDetails
  ): Promise<{
    bet: BN;
    wager: BN;
    isBetSet: boolean;
    destiny: BN;
    trigger: boolean;
  }>;

  roll: {
    (
      jackpot: number | BN | string,
      bet: number | BN | string,
      wager: number | BN | string,
      trigger: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      jackpot: number | BN | string,
      bet: number | BN | string,
      wager: number | BN | string,
      trigger: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      jackpot: number | BN | string,
      bet: number | BN | string,
      wager: number | BN | string,
      trigger: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      jackpot: number | BN | string,
      bet: number | BN | string,
      wager: number | BN | string,
      trigger: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  deleteContract: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  methods: {
    build: {
      (
        wager: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        wager: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      sendTransaction(
        wager: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        wager: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    games(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN; 2: boolean; 3: BN; 4: boolean }>;

    ownerBlances(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    playerBlances(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    deposit: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    ownerDeposit: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    isOwner(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

    getOwnerBalance(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    getBalance(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    withdraw: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    ownerWithdraw: {
      (
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getGame(
      txDetails?: Truffle.TransactionDetails
    ): Promise<{
      bet: BN;
      wager: BN;
      isBetSet: boolean;
      destiny: BN;
      trigger: boolean;
    }>;

    roll: {
      (
        jackpot: number | BN | string,
        bet: number | BN | string,
        wager: number | BN | string,
        trigger: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        jackpot: number | BN | string,
        bet: number | BN | string,
        wager: number | BN | string,
        trigger: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        jackpot: number | BN | string,
        bet: number | BN | string,
        wager: number | BN | string,
        trigger: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        jackpot: number | BN | string,
        bet: number | BN | string,
        wager: number | BN | string,
        trigger: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    deleteContract: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}