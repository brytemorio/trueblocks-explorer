import * as ApiCallers from "../lib/api_callers";
import { address, topic, fourbyte, Appearance, Reconciliation, Transaction, Receipt, Log, Trace } from "../types";

export function getExport(
  parameters?: {
    addrs: address[],
    topics?: topic[],
    fourbytes?: fourbyte[],
    appearances?: boolean,
    receipts?: boolean,
    logs?: boolean,
    traces?: boolean,
    statements?: boolean,
    neighbors?: boolean,
    accounting?: boolean,
    articulate?: boolean,
    cache?: boolean,
    cacheTraces?: boolean,
    count?: boolean,
    firstRecord?: number,
    maxRecords?: number,
    relevant?: boolean,
    emitter?: address[],
    topic?: topic[],
    asset?: address[],
    staging?: boolean,
    unripe?: boolean,
    firstBlock?: number,
    lastBlock?: number,
    chain: string,
    noHeader?: boolean,
    fmt?: string,
    verbose?: boolean,
    logLevel?: number,
    wei?: boolean,
    ether?: boolean,
    dollars?: boolean,
    raw?: boolean,
    toFile?: boolean,
  },
  options?: RequestInit,
) {
  return ApiCallers.fetch<Appearance[] | Reconciliation[] | Transaction[] | Receipt[] | Log[] | Trace[]>(
    {
      endpoint: '/export', method: 'get', parameters, options,
    },
  );
}
