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
    maxRecords?: string,
    relevant?: boolean,
    emitter?: address[],
    topic?: topic[],
    clean?: boolean,
    ether?: boolean,
    fmt?: string,
    verbose?: boolean,
    logLevel?: number,
    noHeader?: boolean,
    chain?: string,
    wei?: boolean,
    dollars?: boolean,
    help?: boolean,
    raw?: boolean,
    toFile?: boolean,
    file?: string,
    version?: boolean,
    noop?: boolean,
    mocked?: boolean,
    noColor?: boolean,
    outputFn?: string,
    testMode?: boolean,
    apiMode?: boolean,
  },
  options?: RequestInit,
) {
  return ApiCallers.fetch<Appearance[] | Reconciliation[] | Transaction[] | Receipt[] | Log[] | Trace[]>({ endpoint: '/export', method: 'get', parameters, options });
}
