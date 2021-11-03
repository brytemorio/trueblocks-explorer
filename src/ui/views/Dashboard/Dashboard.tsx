import React, {
  useEffect, useMemo, useState,
} from 'react';

import Mousetrap from 'mousetrap';

import { BaseView } from '@components/BaseView';
import {
  useCommand,
} from '@hooks/useCommand';
import { createErrorNotification } from '@modules/error_notification';
import {
  AssetHistory,
  AssetHistoryArray,
  createEmptyAccountname,
  Reconciliation,
  Transaction,
  TransactionArray,
} from '@modules/types';

import {
  DashboardAccountsLocation,
  DashboardCollectionsLocation,
  DashboardMonitorsLocation,
} from '../../Routes';
import { useGlobalNames, useGlobalState } from '../../State';
import { Collections } from './Tabs/Collections';
import { DetailsView } from './Tabs/Details';
import { Monitors } from './Tabs/Monitors';

export const DashboardView = () => {
  const [loading, setLoading] = useState(false);
  const [staging, setStaging] = useState(false);
  const [hideZero, setHideZero] = useState('all');
  const [hideNamed, setHideNamed] = useState(false);
  const [hideReconciled, setHideReconciled] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [period, setPeriod] = useState('by tx');
  const [cancel, setCancel] = useState(false);
  const { denom } = useGlobalState();

  const { currentAddress } = useGlobalState();
  const { namesMap } = useGlobalNames();
  const { totalRecords, setTotalRecords } = useGlobalState();
  const {
    transactionsStatus,
    transactionsData: transactions, // rename GlobalState.transactionsData to transactions here
    transactionsMeta,
    setTransactions,
    addTransactions,
  } = useGlobalState();

  useEffect(() => {
    if (transactionsStatus === 'fail') {
      createErrorNotification({
        description: 'Could not fetch transactions',
      });
    }
  }, [transactionsStatus]);

  // clean up mouse control when we unmount
  useEffect(() => {
    Mousetrap.bind('esc', () => setCancel(true));

    return () => {
      Mousetrap.unbind(['esc']);
    };
  }, []);

  const [listRequest] = useCommand(
    'list',
    {
      count: '',
      appearances: '',
      addrs: currentAddress as string,
    },
    () => currentAddress?.slice(0, 2) === '0x',
    [currentAddress],
  );

  useEffect(() => {
    setTotalRecords(listRequest.status === 'success' ? listRequest.data[0]?.nRecords : 0);
  }, [listRequest.data, listRequest.status, setTotalRecords]);

  // Run this effect until we fetch the last transaction
  const [transactionsRequest, transactionsLoading] = useCommand(
    'export',
    {
      addrs: currentAddress as string,
      fmt: 'json',
      cache: '',
      cache_traces: '',
      // staging: false, // staging,
      // unripe: false, // unripe: '',
      ether: '',
      // dollars: false,
      articulate: '',
      accounting: '',
      // reversed: false,
      relevant: '',
      // summarize_by: 'monthly',
      // If there's only 1 transaction, it's probably the default empty one, so we can
      // start from 0
      first_record: transactions.length === 1 ? 0 : transactions.length,
      max_records: (() => {
        if (transactions.length < 50) return 10;

        if (transactions.length < 150) return 71;

        if (transactions.length < 1500) return 239;

        return 639; /* an arbitrary number not too big, not too small, that appears not to repeat */
      })(),
    },
    () => Boolean(!cancel && currentAddress && totalRecords && transactions.length < totalRecords),
    [currentAddress, totalRecords, transactions.length],
  );

  useEffect(() => {
    const stateToSet = !transactionsLoading ? false : transactions.length < 10;

    setLoading(stateToSet);
  }, [transactions.length, transactionsLoading]);

  useEffect(() => {
    if (!transactionsRequest.data.length) return;

    addTransactions(
      transactionsRequest.data as TransactionArray,
    );
  }, [addTransactions, transactionsRequest, transactionsRequest.data]);

  // Store raw data, because it can be huge and we don't want to have to reload it
  // every time a user toggles "hide reconciled".
  const transactionModels = useMemo(() => (transactions as Transaction[])
    // TODO: remove this filter when we fix emptyData in useCommand (it should never
    // return an array with an empty object)
    .filter(({ hash }) => Boolean(hash))
    .map((transaction, index) => {
      const newId = String(index + 1);
      const fromName = namesMap.get(transaction.from) || createEmptyAccountname();
      const toName = namesMap.get(transaction.to) || createEmptyAccountname();

      return {
        ...transaction,
        id: newId,
        fromName,
        toName,
      };
    }), [namesMap, transactions]);

  // TODO(data): fix this if you can
  const theData = useMemo(() => transactionModels.filter((transaction) => {
    if (!hideReconciled) return true;

    return transaction?.statements?.some?.(({ reconciled }) => !reconciled);
  }), [hideReconciled, transactionModels]);

  const uniqAssets = useMemo(() => {
    if (!theData.length) return [];

    const unique: Array<AssetHistory> = [];

    theData.forEach((tx: Transaction) => {
      tx.statements?.forEach((statement: Reconciliation) => {
        if (unique.find((asset: AssetHistory) => asset.assetAddr === statement.assetAddr) === undefined) {
          unique.push({
            assetAddr: statement.assetAddr,
            assetSymbol: statement.assetSymbol,
            balHistory: [],
          });
        }
      });

      unique.forEach((asset: AssetHistory, index: number) => {
        const found = tx.statements?.find((statement: Reconciliation) => asset.assetAddr === statement.assetAddr);
        // TODO: do not convert the below to strings
        if (found) {
          unique[index].balHistory = [
            ...unique[index].balHistory,
            {
              balance: (denom === 'dollars'
                ? parseInt(found.endBal.toString() || '0', 10) * Number(found.spotPrice)
                : parseInt(found.endBal.toString() || '0', 10)),
              date: new Date(found.timestamp * 1000),
              reconciled: found.reconciled,
            },
          ];
        }
      });
    });

    unique.sort((a: any, b: any) => {
      if (b.balHistory.length === a.balHistory.length) {
        if (b.balHistory.length === 0) {
          return b.assetAddr - a.assetAddr;
        }
        return b.balHistory[b.balHistory.length - 1].balance - a.balHistory[a.balHistory.length - 1].balance;
      }
      return b.balHistory.length - a.balHistory.length;
    });

    return unique.filter((asset: AssetHistory) => {
      if (asset.balHistory.length === 0) return false;
      const show = hideZero === 'all'
        || (hideZero === 'show' && asset.balHistory[asset.balHistory.length - 1].balance === 0)
        || (hideZero === 'hide' && asset.balHistory[asset.balHistory.length - 1].balance > 0);
      return show && (!hideNamed || !namesMap.get(asset.assetAddr));
    });
  }, [hideNamed, hideZero, namesMap, theData, denom]);

  const params: AccountViewParams = {
    loading,
    setLoading,
    prefs: {
      staging,
      setStaging,
      hideZero,
      setHideZero,
      hideNamed,
      setHideNamed,
      hideReconciled,
      setHideReconciled,
      showDetails,
      setShowDetails,
      period,
      setPeriod,
      denom,
    },
    totalRecords,
    theData,
    setTransactions,
    theMeta: transactionsMeta,
    uniqAssets,
  };

  const tabs = [
    { name: 'Monitors', location: DashboardMonitorsLocation, component: <Monitors /> },
    {
      name: 'Details',
      location: DashboardAccountsLocation,
      component: <DetailsView params={params} />,
    },
    { name: 'Collections', location: DashboardCollectionsLocation, component: <Collections /> },
  ];

  return (
    <BaseView
      title='Dashboard'
      cookieName='COOKIE_DASHBOARD'
      tabs={tabs}
    />
  );
};

declare type stateSetter<Type> = React.Dispatch<React.SetStateAction<Type>>;
export type UserPrefs = {
  staging: boolean;
  setStaging: stateSetter<boolean>;
  hideZero: string;
  setHideZero: stateSetter<string>;
  hideNamed: boolean;
  setHideNamed: stateSetter<boolean>;
  hideReconciled: boolean;
  setHideReconciled: stateSetter<boolean>;
  showDetails: boolean;
  setShowDetails: stateSetter<boolean>;
  period: string;
  setPeriod: stateSetter<string>;
  denom: string;
};

export type AccountViewParams = {
  prefs: UserPrefs;
  loading: boolean;
  setLoading: stateSetter<boolean>;
  totalRecords: number | null;
  theData: any;
  // This should not be passed down, as it is in GlobalState
  setTransactions: any;
  theMeta: any;
  uniqAssets: AssetHistoryArray;
};
