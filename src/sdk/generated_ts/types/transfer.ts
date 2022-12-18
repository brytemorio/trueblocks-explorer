import { blknum, hash, timestamp, Datetime, address, uint64, uint256, double } from "../types";

export type Transfer = {
  blockNumber: blknum
  transactionIndex: blknum
  logIndex: blknum
  transactionHash: hash
  timestamp: timestamp
  date: Datetime
  sender: address
  recipient: address
  assetAddr: address
  assetSymbol: string
  decimals: uint64
  amount: uint256
  spotPrice: double
  priceSource: string
  encoding: string
}
