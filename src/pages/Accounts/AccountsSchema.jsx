/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */
import {getFieldValue, getExportValue} from 'pages/Accounts/Accounts';

//----------------------------------------------------------------------------
// auto-generate: schema
export const accountsSchema = [
  {
    name: 'Basics',
    selector: 'separator0',
    type: 'separator',
  },
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    searchable: true,
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'Date/Block',
    selector: 'date',
    type: 'string',
    width: 6,
    editable: true,
    download: true,
    chart: 'range',
    underField: 'marker',
    onDisplay: getFieldValue,
  },
  {
    name: 'Marker',
    selector: 'marker',
    type: 'string',
    onDisplay: getFieldValue,
  },
  {
    name: 'Stat',
    selector: 'marker2',
    type: 'string',
    width: 3,
    onDisplay: getFieldValue,
  },
  {
    name: 'From',
    selector: 'from',
    type: 'address',
    width: 15,
    editable: true,
    download: true,
    chart: 'range',
    searchable: true,
    underField: 'fromName',
    onDisplay: getFieldValue,
  },
  {
    name: 'fromName',
    selector: 'fromName',
    type: 'string',
    searchable: true,
    detail: 1,
    onDisplay: getFieldValue,
  },
  {
    name: 'To',
    selector: 'to',
    type: 'address',
    width: 15,
    editable: true,
    download: true,
    chart: 'range',
    searchable: true,
    underField: 'toName',
    onDisplay: getFieldValue,
  },
  {
    name: 'toName',
    selector: 'toName',
    type: 'string',
    searchable: true,
    detail: 1,
    onDisplay: getFieldValue,
  },
  {
    name: 'Value',
    selector: 'value',
    type: 'wei',
    editable: true,
    chart: 'domain',
    detail: 2,
  },
  {
    name: 'Ether',
    selector: 'ether',
    type: 'double',
    editable: true,
    chart: 'domain',
    detail: 1,
  },
  {
    name: 'Reconciliations',
    selector: 'statements.reconciliations',
    type: 'string',
    width: 18,
    onDisplay: getFieldValue,
  },
  {
    name: 'Reconciliations',
    selector: 'separator1',
    type: 'separator',
    detail: 1,
  },
  {
    name: 'Asset',
    selector: 'statements.asset',
    type: 'string',
    align: 'center',
    download: true,
    onDisplay: getFieldValue,
    detail: 1,
  },
  {
    name: 'Beg',
    selector: 'statements.begBal',
    type: 'value',
    download: true,
    onDisplay: getFieldValue,
    detail: 1,
  },
  {
    name: 'Beg Diff',
    selector: 'statements.begBalDiff',
    type: 'value',
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'Total In',
    selector: 'statements.totalIn',
    type: 'value',
    download: true,
    onDisplay: getFieldValue,
    detail: 1,
  },
  {
    name: 'Amount In',
    selector: 'statements.amountIn',
    type: 'value',
    detail: 1,
    onDisplay: getFieldValue,
  },
  {
    name: 'I-Income',
    selector: 'statements.internalIn',
    type: 'value',
    detail: 1,
    onDisplay: getFieldValue,
  },
  {
    name: 'S-Income',
    selector: 'statements.selfDestructIn',
    type: 'value',
    detail: 1,
    onDisplay: getFieldValue,
  },
  {
    name: 'B-Income',
    selector: 'statements.minerBaseRewardIn',
    type: 'value',
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'N-Income',
    selector: 'statements.minerNephewRewardIn',
    type: 'value',
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'X-Income',
    selector: 'statements.minerTxFeeIn',
    type: 'value',
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'U-Income',
    selector: 'statements.minerUncleRewardIn',
    type: 'value',
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'P-Income',
    selector: 'statements.prefundIn',
    type: 'value',
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'Total Out',
    selector: 'statements.totalOut',
    type: 'value',
    download: true,
    onDisplay: getFieldValue,
    detail: 1,
  },
  {
    name: 'Amount Out',
    selector: 'statements.amountOut',
    type: 'value',
    detail: 1,
    onDisplay: getFieldValue,
  },
  {
    name: 'I-Spending',
    selector: 'statements.internalOut',
    type: 'value',
    detail: 1,
    onDisplay: getFieldValue,
  },
  {
    name: 'S-Spending',
    selector: 'statements.selfDestructOut',
    type: 'value',
    detail: 1,
    onDisplay: getFieldValue,
  },
  {
    name: 'Gas Cost',
    selector: 'statements.gasCostOut',
    type: 'value',
    chart: 'domain',
    detail: 1,
    onDisplay: getFieldValue,
  },
  {
    name: 'Ending',
    selector: 'statements.endBal',
    type: 'value',
    download: true,
    chart: 'domain',
    onDisplay: getFieldValue,
    detail: 1,
  },
  {
    name: 'Calc',
    selector: 'statements.endBalCalc',
    type: 'value',
    download: true,
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'End Diff',
    selector: 'statements.endBalDiff',
    type: 'value',
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'Type',
    selector: 'statements.reconciliationType',
    type: 'string',
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'Okay',
    selector: 'statements.reconciled',
    type: 'string',
    align: 'center',
    download: true,
    onDisplay: getFieldValue,
    detail: 1,
  },
  {
    name: 'Relevant Events',
    selector: 'separator4',
    type: 'separator',
    onDisplay: getFieldValue,
  },
  {
    name: 'Compressed Logs',
    selector: 'compressedLog',
    type: 'string',
    wide: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Input Data',
    selector: 'separator2',
    type: 'separator',
    editable: true,
  },
  {
    name: 'Compressed Tx',
    selector: 'compressedTx',
    type: 'string',
    wide: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Details',
    selector: 'separator5',
    type: 'separator',
    detail: 1,
  },
  {
    name: 'Creations',
    selector: 'creations',
    type: 'string',
    detail: 1,
    onDisplay: getFieldValue,
  },
  {
    name: 'Gas',
    selector: 'gas',
    type: 'gas',
    editable: true,
    detail: 1,
  },
  {
    name: 'Gas Used',
    selector: 'gasUsed',
    type: 'gas',
    editable: true,
    chart: 'domain',
    detail: 1,
  },
  {
    name: 'Gas Price',
    selector: 'gasPrice',
    type: 'wei',
    editable: true,
    detail: 1,
  },
  {
    name: 'Gas Cost (Eth)',
    selector: 'etherGasCost',
    type: 'ether',
    detail: 2,
  },
  {
    name: 'Age',
    selector: 'age',
    type: 'blknum',
    detail: 1,
  },
  {
    name: 'Encoding',
    selector: 'encoding',
    type: 'hash',
    editable: true,
    detail: 1,
  },
  {
    name: 'Input',
    selector: 'input',
    type: 'string',
    editable: true,
    detail: 1,
  },
  {
    name: 'Finalized',
    selector: 'finalized',
    type: 'bool',
    detail: 1,
  },
  {
    name: 'Price',
    selector: 'price',
    type: 'double',
    detail: 1,
  },
  {
    name: 'Error',
    selector: 'isError',
    type: 'string',
    isPill: true,
    detail: 1,
  },
  {
    name: 'All Details',
    selector: 'separator6',
    type: 'separator',
    detail: 2,
  },
  {
    name: 'Receipt',
    selector: 'receipt',
    type: 'CReceipt',
    detail: 2,
  },
  {
    name: 'Articulated Tx',
    selector: 'articulatedTx',
    type: 'CFunction',
    searchable: true,
    detail: 2,
  },
  {
    name: 'Traces',
    selector: 'traces',
    type: 'CTraceArray',
    detail: 2,
  },
  {
    name: 'Events',
    selector: 'events',
    type: 'string',
    detail: 2,
  },
  {
    name: 'Function',
    selector: 'function',
    type: 'string',
    searchable: true,
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'Block Hash',
    selector: 'blockHash',
    type: 'hash',
    editable: true,
    detail: 2,
  },
  {
    name: 'Blk',
    selector: 'blockNumber',
    type: 'blknum',
    download: true,
    editable: true,
    detail: 2,
  },
  {
    name: 'Tx',
    selector: 'transactionIndex',
    type: 'string',
    download: true,
    editable: true,
    detail: 2,
  },
  {
    name: 'Timestamp',
    selector: 'timestamp',
    type: 'timestamp',
    editable: true,
    chart: 'range',
    detail: 2,
  },
  {
    name: 'Hash',
    selector: 'hash',
    type: 'hash',
    editable: true,
    searchable: true,
    detail: 2,
  },
  {
    name: 'Nonce',
    selector: 'nonce',
    type: 'blknum',
    detail: 2,
  },
  {
    name: 'Internal',
    selector: 'internal',
    type: 'string',
    align: 'center',
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'Date Short',
    selector: 'datesh',
    type: 'string',
    detail: 2,
  },
  {
    name: 'Time',
    selector: 'time',
    type: 'string',
    detail: 2,
  },
  {
    name: 'Date',
    selector: 'accounting.date',
    type: 'string',
    detail: 10,
    onDisplay: getExportValue,
  },
  {
    name: 'Amount',
    selector: 'accounting.amount',
    type: 'string',
    detail: 10,
    onDisplay: getExportValue,
  },
  {
    name: 'Payee',
    selector: 'accounting.payee',
    type: 'string',
    detail: 10,
    onDisplay: getExportValue,
  },
  {
    name: 'Description',
    selector: 'accounting.description',
    type: 'string',
    detail: 10,
    onDisplay: getExportValue,
  },
  {
    name: 'Reference',
    selector: 'accounting.reference',
    type: 'string',
    detail: 10,
    onDisplay: getExportValue,
  },
  {
    name: 'Icons',
    selector: 'icons',
    type: 'icons',
  },
];
// auto-generate: schema
