import {
  useCallback, useContext,
} from 'react';

import {
  DataStoreMessage,
  DataStoreResult,
  GetPage,
  LoadTransactions,
} from '../datastore/messages';
import { DataStoreContext } from '../DatastoreContext';

export function useDatastore() {
  const context = useContext(DataStoreContext);

  if (!context) {
    throw new Error('useDatastore must be used within DatastoreContext.Provider');
  }

  if (!context.datastore) {
    throw new Error('Datastore worker has not been initialized');
  }

  // TODO: listen to `error` event

  const sendMessage = useCallback((message: DataStoreMessage) => {
    if (!context.datastore) {
      throw new Error('Datastore worker has not been initialized');
    }

    console.log('>>> sending', message);
    context.datastore.port.postMessage(message);
  }, [context.datastore]);

  // TODO: move error listeners?
  context.datastore.port.addEventListener('messageerror', (e) => {
    throw new Error(e.data);
  });

  context.datastore.addEventListener('error', (e) => { throw new Error(e.error); });

  type OnMessage = <ResultType>(callback: (message: DataStoreResult<ResultType>) => void) => void
  const onMessage: OnMessage = useCallback((callback) => {
    const listener = (event: MessageEvent) => callback(event.data);
    context.datastore?.port.addEventListener('message', listener);
    return () => context.datastore?.port.removeEventListener('message', listener);
  }, [context.datastore?.port]);

  return {
    onMessage,

    loadTransactions: useCallback((args: LoadTransactions['args']) => sendMessage({
      call: 'loadTransactions',
      args,
    }), [sendMessage]),
    getPage: useCallback((args: GetPage['args']) => sendMessage({
      call: 'getPage',
      args,
    }), [sendMessage]),
  };
}
