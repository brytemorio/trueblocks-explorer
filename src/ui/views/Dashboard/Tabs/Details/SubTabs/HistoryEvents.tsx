import React from 'react';

import { Card } from 'antd';

import { LogentryArray, Transaction } from '@modules/types';

import { useAcctStyles } from '..';

//-----------------------------------------------------------------
export const HistoryEvents = ({ record }: { record: Transaction }) => {
  const styles = useAcctStyles();
  if (!record) return <></>;
  const key = `${record.blockNumber}.${record.transactionIndex}`;
  // TODO: Comment by @dszlachta
  // TODO: Line 28-29 should not require `?`, but if I remove them, it complains
  return (
    <div key={key} className={styles.container}>
      <div key={key} className={styles.cardHolder}>
        <Card
          key={key}
          className={styles.card}
          headStyle={{
            backgroundColor: 'lightgrey',
          }}
          hoverable
          title='Events'
        >
          {showLogs(record?.receipt?.logs, true)}
          {showLogs(record?.receipt?.logs, false)}
        </Card>
      </div>
    </div>
  );
};

//-----------------------------------------------------------------
const showLogs = (logs: LogentryArray, relevant: boolean) => {
  if (!logs) return <></>;
  return logs.map((log, index) => {
    if ((relevant && !log.address) || (!relevant && log.address)) return <div key={log.logIndex} />;
    return (
      <pre key={log.logIndex}>
        [
        {index}
        {log.address ? `-${log.logIndex}` : ''}
        ]:
        {JSON.stringify(log, null, 2)}
      </pre>
    );
  });
};