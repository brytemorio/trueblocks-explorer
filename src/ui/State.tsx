import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { ReactNode } from 'react-markdown';

import { address as Address, Name, Transaction } from '@sdk';
import Cookies from 'js-cookie';

import {
  getThemeByName, Theme, ThemeName,
} from '@modules/themes';
import { createEmptyMeta, Meta } from '@modules/types/Meta';

const THEME: ThemeName = Cookies.get('theme') as ThemeName || 'default';
const ADDRESS = Cookies.get('address');
const CHAIN = Cookies.get('chain') || process.env.CHAIN || 'mainnet';
const DENOM = Cookies.get('denom') || 'ether';

type NamesEditModalState = {
  address: string,
  name: string,
  description: string,
  source: string,
  tags: string
}

type State = {
  theme: Theme,
  chain: string,
  denom: string,
  currentAddress?: string,
  namesMap: Map<Address, Name>
  namesEditModalVisible: boolean,
  namesEditModal: NamesEditModalState,
  transactions: Transaction[],
  meta: Meta
  totalRecords: number,
}

const getDefaultNamesEditModalValue = () => ({
  address: '',
  name: '',
  description: '',
  source: '',
  tags: '',
});

const initialState: State = {
  theme: getThemeByName(THEME),
  chain: CHAIN,
  denom: DENOM,
  currentAddress: ADDRESS,
  namesMap: new Map(),
  namesEditModalVisible: false,
  namesEditModal: getDefaultNamesEditModalValue(),
  transactions: [],
  meta: createEmptyMeta(),
  totalRecords: 0,
};

type SetTheme = {
  type: 'SET_THEME',
  theme: State['theme'],
};

type SetChain = {
  type: 'SET_CHAIN',
  chain: State['chain'],
};

type SetDenom = {
  type: 'SET_DENOM',
  denom: State['denom'],
}

type SetCurrentAddress = {
  type: 'SET_CURRENT_ADDRESS',
  address: State['currentAddress'],
};

type SetNamesMap = {
  type: 'SET_NAMES_MAP',
  namesMap: State['namesMap'],
};

type SetNamesEditModal = {
  type: 'SET_NAMES_EDIT_MODAL',
  val: State['namesEditModal'],
};

type SetNamesEditModalVisible = {
  type: 'SET_NAMES_EDIT_MODAL_VISIBLE',
  visible: State['namesEditModalVisible'],
};

type SetTransactions = {
  type: 'SET_TRANSACTIONS',
  transactions: State['transactions'],
};

type AddTransactions = {
  type: 'ADD_TRANSACTIONS',
  transactions: State['transactions'],
};

type SetMeta = {
  type: 'SET_META',
  meta: State['meta'],
};

type SetTotalRecords = {
  type: 'SET_TOTAL_RECORDS',
  records: State['totalRecords'],
};

type GlobalAction =
  | SetTheme
  | SetChain
  | SetDenom
  | SetCurrentAddress
  | SetNamesMap
  | SetNamesEditModal
  | SetNamesEditModalVisible
  | SetTransactions
  | AddTransactions
  | SetMeta
  | SetTotalRecords;

const GlobalStateContext = createContext<[
  typeof initialState,
  React.Dispatch<GlobalAction>
]>([initialState, () => { }]);

const GlobalStateReducer = (state: State, action: GlobalAction) => {
  switch (action.type) {
    case 'SET_THEME':
      Cookies.set('theme', action.theme.name);
      return {
        ...state,
        theme: action.theme,
      };
    case 'SET_CHAIN':
      Cookies.set('chain', action.chain);
      return {
        ...state,
        chain: action.chain,
      };
    case 'SET_DENOM':
      // TODO(tjayrush): not sure why this doesn't work
      // Cookies.set('denom', action.denom);
      return {
        ...state,
        denom: action.denom,
      };
    case 'SET_CURRENT_ADDRESS':
      Cookies.set('address', action.address || '');
      if (action.address !== state.currentAddress) {
        return {
          ...state,
          currentAddress: action.address,
          transactions: [],
          totalRecords: 0,
        };
      }
      return state;
    case 'SET_NAMES_MAP':
      return {
        ...state,
        namesMap: action.namesMap,
      };
    case 'SET_NAMES_EDIT_MODAL':
      return {
        ...state,
        namesEditModal: action.val,
      };
    case 'SET_NAMES_EDIT_MODAL_VISIBLE':
      return {
        ...state,
        namesEditModalVisible: action.visible,
      };
    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.transactions,
      };
    case 'ADD_TRANSACTIONS': {
      return {
        ...state,
        transactions: [
          ...state.transactions,
          ...action.transactions,
        ],
      };
    }
    case 'SET_META':
      return {
        ...state,
        meta: action.meta,
      };
    case 'SET_TOTAL_RECORDS':
      return {
        ...state,
        totalRecords: action.records,
      };
    default:
      return state;
  }
};

export const useGlobalState2 = () => {
  // TODO: Bogus
  const chain = Cookies.get('chain');
  let apiProvider = new URL('http://localhost:8080');
  if (chain === 'rinkeby') {
    apiProvider = new URL('http://192.168.0.154:8080');
  } else if (chain === 'gnosis') {
    apiProvider = new URL('http://wildmolasses:8080');
  }
  const host = apiProvider.hostname;
  const port = apiProvider.port as unknown as number;
  return ({
    host,
    port,
    apiProvider: apiProvider.href,
  });
};

export const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  const setTheme = (theme: SetTheme['theme']) => {
    dispatch({ type: 'SET_THEME', theme });
  };

  const setChain = (chain: SetChain['chain']) => {
    dispatch({ type: 'SET_CHAIN', chain });
  };

  const setDenom = (denom: SetDenom['denom']) => {
    dispatch({ type: 'SET_DENOM', denom });
  };

  const setCurrentAddress = (address: SetCurrentAddress['address']) => {
    dispatch({ type: 'SET_CURRENT_ADDRESS', address });
  };

  const setNamesMap = useCallback((namesMap: SetNamesMap['namesMap']) => {
    dispatch({ type: 'SET_NAMES_MAP', namesMap });
  }, [dispatch]);

  const setNamesEditModal = (val: SetNamesEditModal['val']) => {
    dispatch({ type: 'SET_NAMES_EDIT_MODAL', val });
  };

  const setNamesEditModalVisible = (visible: SetNamesEditModalVisible['visible']) => {
    dispatch({ type: 'SET_NAMES_EDIT_MODAL_VISIBLE', visible });
  };

  const setTransactions = useCallback((transactions: SetTransactions['transactions']) => {
    dispatch({ type: 'SET_TRANSACTIONS', transactions });
  }, [dispatch]);

  const addTransactions = useCallback((transactions: AddTransactions['transactions']) => {
    dispatch({ type: 'ADD_TRANSACTIONS', transactions });
  }, [dispatch]);

  const setMeta = useCallback((meta: SetMeta['meta']) => {
    dispatch({ type: 'SET_META', meta });
  }, [dispatch]);

  const setTotalRecords = useCallback((records: SetTotalRecords['records']) => {
    dispatch({ type: 'SET_TOTAL_RECORDS', records });
  }, [dispatch]);

  return {
    theme: state.theme,
    setTheme,
    chain: state.chain,
    setChain,
    denom: state.denom,
    setDenom,
    currentAddress: state.currentAddress,
    setCurrentAddress,
    namesMap: state.namesMap,
    setNamesMap,
    namesEditModal: state.namesEditModal,
    setNamesEditModal,
    namesEditModalVisible: state.namesEditModalVisible,
    setNamesEditModalVisible,
    transactions: state.transactions,
    setTransactions,
    addTransactions,
    meta: state.meta,
    setMeta,
    totalRecords: state.totalRecords,
    setTotalRecords,
  };
};

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(GlobalStateReducer, initialState);
  const value = useMemo((): [State, React.Dispatch<GlobalAction>] => [state, dispatch], [state]);

  return <GlobalStateContext.Provider value={value}>{children}</GlobalStateContext.Provider>;
};

export const useGlobalNames = () => {
  const {
    namesMap, setNamesMap,
  } = useGlobalState();
  return {
    namesMap, setNamesMap,
  };
};
