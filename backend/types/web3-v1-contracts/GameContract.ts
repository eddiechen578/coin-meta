/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type BalanceEvent = ContractEventLog<{
  player: string;
  balance: string;
  0: string;
  1: string;
}>;
export type GameResult = ContractEventLog<{
  player: string;
  wager: string;
  bet: string;
  destiny: string;
  balance: string;
  result: string;
  is_bonus: string;
  bonus: string;
  bonus_res: string;
  timestamp: string;
  trigger: boolean;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: boolean;
}>;
export type NewGameEvent = ContractEventLog<{
  player: string;
  game: [string, string, boolean, string, boolean];
  0: string;
  1: [string, string, boolean, string, boolean];
}>;
export type OwnerBalanceEvent = ContractEventLog<{
  owner: string;
  balance: string;
  0: string;
  1: string;
}>;

export interface GameContract extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): GameContract;
  clone(): GameContract;
  methods: {
    build(wager: number | string | BN): NonPayableTransactionObject<string>;

    games(arg0: string): NonPayableTransactionObject<{
      bet: string;
      wager: string;
      isBetSet: boolean;
      destiny: string;
      trigger: boolean;
      0: string;
      1: string;
      2: boolean;
      3: string;
      4: boolean;
    }>;

    ownerBlances(arg0: string): NonPayableTransactionObject<string>;

    playerBlances(arg0: string): NonPayableTransactionObject<string>;

    deposit(): PayableTransactionObject<void>;

    ownerDeposit(): PayableTransactionObject<void>;

    isOwner(): NonPayableTransactionObject<boolean>;

    getOwnerBalance(): NonPayableTransactionObject<string>;

    getBalance(): NonPayableTransactionObject<string>;

    withdraw(): NonPayableTransactionObject<void>;

    ownerWithdraw(
      amount: number | string | BN
    ): NonPayableTransactionObject<void>;

    getGame(): NonPayableTransactionObject<
      [string, string, boolean, string, boolean]
    >;

    roll(
      jackpot: number | string | BN,
      bet: number | string | BN,
      wager: number | string | BN,
      trigger: boolean
    ): NonPayableTransactionObject<string>;

    deleteContract(): NonPayableTransactionObject<void>;
  };
  events: {
    BalanceEvent(cb?: Callback<BalanceEvent>): EventEmitter;
    BalanceEvent(
      options?: EventOptions,
      cb?: Callback<BalanceEvent>
    ): EventEmitter;

    GameResult(cb?: Callback<GameResult>): EventEmitter;
    GameResult(options?: EventOptions, cb?: Callback<GameResult>): EventEmitter;

    NewGameEvent(cb?: Callback<NewGameEvent>): EventEmitter;
    NewGameEvent(
      options?: EventOptions,
      cb?: Callback<NewGameEvent>
    ): EventEmitter;

    OwnerBalanceEvent(cb?: Callback<OwnerBalanceEvent>): EventEmitter;
    OwnerBalanceEvent(
      options?: EventOptions,
      cb?: Callback<OwnerBalanceEvent>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "BalanceEvent", cb: Callback<BalanceEvent>): void;
  once(
    event: "BalanceEvent",
    options: EventOptions,
    cb: Callback<BalanceEvent>
  ): void;

  once(event: "GameResult", cb: Callback<GameResult>): void;
  once(
    event: "GameResult",
    options: EventOptions,
    cb: Callback<GameResult>
  ): void;

  once(event: "NewGameEvent", cb: Callback<NewGameEvent>): void;
  once(
    event: "NewGameEvent",
    options: EventOptions,
    cb: Callback<NewGameEvent>
  ): void;

  once(event: "OwnerBalanceEvent", cb: Callback<OwnerBalanceEvent>): void;
  once(
    event: "OwnerBalanceEvent",
    options: EventOptions,
    cb: Callback<OwnerBalanceEvent>
  ): void;
}
