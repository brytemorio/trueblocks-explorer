import React from 'react';

import { useGlobalState } from '@state';
import { Card, Space, Tag } from 'antd';
import { Statement, Transaction } from 'trueblocks-sdk';

import {
  double, priceReconciliation,
} from '@modules/types';

import { AccountViewParams } from '../../../Dashboard';
import { useAcctStyles } from '..';

//-----------------------------------------------------------------
export const HistoryRecons = ({ record, params }: { record: Transaction; params: AccountViewParams }) => {
  const { userPrefs } = params;
  const { denom } = useGlobalState();
  const styles = useAcctStyles();

  if (!record) return <></>;
  const key = `${record.blockNumber}.${record.transactionIndex}`;
  return (
    <div key={key} className={styles.container}>
      <div key={key} className={styles.cardHolder}>
        {(record?.statements as unknown as Statement[])?.map((statement: Statement, index: number) => {
          const statementIn = priceReconciliation(statement, denom);
          return oneStatement(statementIn, index, userPrefs.showDetails, userPrefs.setShowDetails, styles, key);
        })}
      </div>
      <div />
    </div>
  );
};

declare type stateSetter<Type> = React.Dispatch<React.SetStateAction<Type>>;
const oneStatement = (
  statement: Statement,
  index: number,
  details: boolean,
  setShowDetails: stateSetter<boolean>,
  styles: any,
  key: string,
) => (
  <Card
    key={`${key}.${index}`}
    className={styles.card}
    headStyle={{
      backgroundColor: 'lightgrey',
      fontSize: '16pt',
      color: 'darkBlue',
    }}
    hoverable
    title={statementHeader(statement, details, setShowDetails)}
  >
    <Space size='middle' direction='vertical' style={{ width: '100%' }}>
      <Space>
        <div>
          Spot price:
          {' '}
          USD
          {' '}
          <strong>
            {statement.spotPrice}
          </strong>
          {' '}

          (
          {statement.priceSource}
          )
        </div>
        {statement.reconciliationType
          ? (
            <Tag>
              {statement.reconciliationType}
            </Tag>
          )
          : null}
      </Space>
      {statementBody(statement, details, styles)}
    </Space>
  </Card>
);

//-----------------------------------------------------------------
const statementHeader = (statement: Statement, details: boolean, setShowDetails: any) => {
  const title = `${statement.assetSymbol} reconciliation`;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '20fr 1fr', textAlign: 'start', alignItems: 'center',
    }}
    >
      <div style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} title={title}>
        {title}
      </div>
      <button style={{ outline: 'none' }} type='button' onClick={() => setShowDetails(!details)}>
        {details ? '-' : '+'}
      </button>
    </div>
  );
};

//-----------------------------------------------------------------
const statementBody = (statement: Statement, details: boolean, styles: any) => {
  const preAppBlkStr = '0'; // statement.prevAppBlk === undefined ? '0' : statement.prevAppBlk.toString();
  const rowStyle = styles.tableRow;
  const detailView = !details ? <></> : (
    <>
      {DividerRow(rowStyle)}
      {DetailRow(rowStyle, 'assetSymbol', statement.assetSymbol)}
      {DetailRow(rowStyle, 'decimals', statement.decimals)}
      {DetailRow(rowStyle, 'prevAppBlk', preAppBlkStr)}
      {DetailRow(rowStyle, 'blockNumber', statement.blockNumber.toString())}
      {DetailRow(rowStyle, 'transactionIndex', statement.transactionIndex.toString())}
      {DetailRow(rowStyle, 'timestamp', statement.timestamp.toString())}

      {DividerRow(rowStyle)}
      {DetailRow(rowStyle, 'type', statement.reconciliationType)}
      {DetailRow(rowStyle, 'prevBal', statement.prevBal)}
      {DetailRow(rowStyle, 'begBal', statement.begBal)}
      {DetailRow(rowStyle, 'begBalDiff', statement.begBalDiff)}
      {DetailRow(rowStyle, 'endBal', statement.endBal)}
      {DetailRow(rowStyle, 'endBalCalc', statement.endBalCalc)}
      {DetailRow(rowStyle, 'endBalDiff', statement.endBalDiff)}
      {DetailRow(rowStyle, 'spotPrice', statement.spotPrice)}
      {DetailRow(rowStyle, 'priceSource', statement.priceSource === '' ? 'not-priced' : statement.priceSource)}
    </>
  );

  const toNumberArguments2 = (v1: string|undefined, v2: string|undefined): number[] => {
    const s1 = v1 === undefined ? '0.0' : v1;
    const s2 = v2 === undefined ? '0.0' : v2;
    return [parseFloat(s1), parseFloat(s2)];
  };

  const toNumberArguments1 = (v1: string|undefined): number[] => {
    const s1 = v1 === undefined ? '0.0' : v1;
    return [parseFloat(s1)];
  };

  return (
    <table style={{ width: '100%', tableLayout: 'fixed' }}>
      <tbody>
        <HeaderRow />
        {BodyRow(rowStyle, 'begBal', details, 0, 0, ...toNumberArguments2(statement.begBal, statement.begBalDiff))}
        {BodyRow(rowStyle, 'amount', details, ...toNumberArguments2(statement.amountIn, statement.amountOut))}
        {BodyRow(rowStyle, 'internal', details, ...toNumberArguments2(statement.internalIn, statement.internalOut))}
        {BodyRow(
          rowStyle,
          'selfDestruct',
          details,
          ...toNumberArguments2(statement.selfDestructIn, statement.selfDestructOut),
        )}
        {BodyRow(rowStyle, 'baseReward', details, ...toNumberArguments1(statement.minerBaseRewardIn), 0)}
        {BodyRow(rowStyle, 'txFee', details, ...toNumberArguments1(statement.minerTxFeeIn), 0)}
        {BodyRow(rowStyle, 'nephewReward', details, ...toNumberArguments1(statement.minerNephewRewardIn), 0)}
        {BodyRow(rowStyle, 'uncleReward', details, ...toNumberArguments1(statement.minerUncleRewardIn), 0)}
        {BodyRow(rowStyle, 'prefund', details, ...toNumberArguments1(statement.prefundIn), 0)}
        {BodyRow(rowStyle, 'gasCost', details, 0, ...toNumberArguments1(statement.gasOut))}
        {BodyRow(rowStyle, 'totalNet', details, 0, 0, ...toNumberArguments1(statement.amountNet))}
        {BodyRow(rowStyle, 'endBal', details, 0, 0, ...toNumberArguments2(statement.endBal, statement.endBalDiff))}
        {detailView}
      </tbody>
    </table>
  );
};

//-----------------------------------------------------------------
const clip2 = (num: double) => {
  if (!num) return <div style={{ color: 'lightgrey' }}>-</div>;
  // parseFloat removes padding zeroes from the result of toFixed
  return <div>{parseFloat(Number(num).toFixed(5))}</div>;
};

//-----------------------------------------------------------------
const clip3 = (num: double) => <div>{Number(num).toFixed(5)}</div>;

//-----------------------------------------------------------------
const BodyRow = (
  style: string,
  name: string,
  details: boolean,
  valueIn: double = 0,
  valueOut: double = 0,
  balance: double = 0,
  diffIn: double = 0,
) => {
  const isShowZero = name === 'begBal' || name === 'endBal' || name === 'totalNet';
  const isBal = name === 'begBal' || name === 'endBal';

  if (valueIn === 0
    && valueOut === 0
    && balance === 0
    && diffIn === 0
    && !isShowZero && !details) { return <></>; }

  const plain = { color: 'black' };
  const green = { color: 'green' };
  const red = { color: 'red' };
  const balStyle = balance < 0 ? red : green;

  return (
    <tr>
      <td className={style} style={{ textOverflow: 'ellipsis', ...plain }} title={name}>
        {name}
      </td>
      <td className={style} style={green}>
        {clip2(valueIn)}
      </td>
      <td className={style} style={red}>
        {clip2(valueOut)}
      </td>
      <td className={style} style={isBal ? plain : balStyle}>
        {isBal ? clip3(balance) : clip2(balance)}
      </td>
      <td className={style} style={red}>
        {clip2(diffIn)}
      </td>
    </tr>
  );
};

//-----------------------------------------------------------------
const DetailRow = (style: string, name: string, value: double | string | undefined) => {
  const isErr: boolean = name?.includes('Diff') && value !== 0;
  const valueToDisplay = (() => {
    if (typeof value === 'number') return clip2(value);

    const parsed = value ? parseFloat(value) : 0;

    if (Number.isNaN(parsed)) return value;

    return clip2(parsed);
  })();

  return (
    <tr>
      <td className={style}>
        {name}
      </td>
      <td />
      <td />
      <td
        className={style}
        style={isErr ? { color: 'red', textAlign: 'right' } : { textAlign: 'right' }}
      >
        {valueToDisplay}
      </td>
    </tr>
  );
};

//-----------------------------------------------------------------
const DividerRow = (style: string) => (
  <tr>
    <td className={style} colSpan={5}>
      <hr />
    </td>
  </tr>
);

//-----------------------------------------------------------------
const HeaderRow = () => {
  const styles = useAcctStyles();
  return (
    <tr>
      <td className={styles.tableHead} style={{ paddingRight: '20px' }} />
      <td className={styles.tableHead} style={{ }}>income</td>
      <td className={styles.tableHead} style={{ }}>outflow</td>
      <td className={styles.tableHead} style={{ }}>balance</td>
      <td className={styles.tableHead} style={{ }}>diff</td>
    </tr>
  );
};
