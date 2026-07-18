import type {TArrayKey} from '@/types/common';
import type {StoreApi, UseBoundStore} from 'zustand';

export type TCommonSetValue<G> = (newValue: G | undefined, cKeyPath?: undefined) => void;
export type TCommonKeyPathSetValue<G> = (newValue: G | undefined, cKeyPath: TArrayKey) => void;
//
export type TCommonArrayAddItem<G> = (itemValue: G, cKeyPath?: undefined) => void;
export type TCommonKeyPathArrayAddItem<G> = (itemValue: G, cKeyPath: TArrayKey) => void;
//
export type TCommonObjectMergeValue<G> = (mergeableData: G, cKeyPath?: undefined) => void;
export type TCommonKeyPathObjectMergeValue<G> = (mergeableData: G, cKeyPath: TArrayKey) => void;

export type TZustandCommonState = {
  dataGetValue: (propName: string) => unknown;
  dataGetValueIn: (keyPath: string | TArrayKey) => unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataInject: (initialData: any, resetMethod?: 'init' | 'none') => void;
  dataReset: () => void;
  dataSetValue: <G>(value: G, propName: string) => void;
  dataSetValueIn: <G>(newValue: G, keyPath: string | TArrayKey) => void;
};

export type TZustandObjectState = {
  dataObjectAddItem: <G>(itemValue: G, itemKey: string, keyPath: string | TArrayKey) => void;
  dataObjectMergeValueIn: <G>(mergeableData: G, keyPath: string | TArrayKey) => void;
  dataObjectRemoveItem: (itemKey: string, keyPath: string | TArrayKey) => void;
};

export type TZustandArrayState = {
  dataArrayAddItemAtBeginning: <G>(itemValue: G, keyPath: string | TArrayKey) => void;
  dataArrayMergeValueIn: <G>(mergeableRows: G, keyPath: string | TArrayKey) => void;
  dataArrayRemoveItem: (index: number, keyPath: string | TArrayKey) => void;
};

export type TZustandCommonUseStore = UseBoundStore<StoreApi<TZustandCommonState>>;
export type TZustandObjectUseStore = UseBoundStore<StoreApi<TZustandObjectState>>;
export type TZustandArrayUseStore = UseBoundStore<StoreApi<TZustandArrayState>>;
