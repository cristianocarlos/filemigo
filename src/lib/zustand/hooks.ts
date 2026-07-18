import {useCallback} from 'react';

import {
  useCommonDispatchArrayAddItemAtBeginning,
  useCommonDispatchArrayRemoveItem,
  useCommonDispatchObjectMergeValue,
  useCommonDispatchObjectRemoveItem,
  useCommonDispatchSetValue,
  useCommonInitValue,
  useCommonSelectorValue,
  useCommonStoreGetValue,
} from '@/utils/zustand/hooksCommon';

import {useStore} from './store';

import type {TZustandFileCustomKeyPath, TZustandFileStateData, TZustandFileStateDataKeys} from '@/lib/zustand/types';
import type {
  TCommonArrayAddItem,
  TCommonKeyPathArrayAddItem,
  TCommonKeyPathObjectMergeValue,
  TCommonKeyPathSetValue,
  TCommonObjectMergeValue,
  TCommonSetValue,
} from '@/utils/zustand/types';

/**
 * common
 */

export function useDispatchFileArrayAddItemAtBeginning<GType>(
  keyPath: TZustandFileCustomKeyPath | undefined,
): TCommonArrayAddItem<GType>;
export function useDispatchFileArrayAddItemAtBeginning<GType>(keyPath: null): TCommonKeyPathArrayAddItem<GType>;
export function useDispatchFileArrayAddItemAtBeginning<G>(keyPath: null | TZustandFileCustomKeyPath | undefined) {
  return useCommonDispatchArrayAddItemAtBeginning<G>(useStore, keyPath);
}

export function useDispatchFileArrayRemoveItem(keyPath: null | TZustandFileCustomKeyPath) {
  return useCommonDispatchArrayRemoveItem(useStore, keyPath);
}

export function useDispatchFileObjectMergeValue<KeyName extends TZustandFileStateDataKeys>(
  keyPath: KeyName | undefined,
): TCommonObjectMergeValue<TZustandFileStateData[KeyName]>;
export function useDispatchFileObjectMergeValue<GType>(
  keyPath: TZustandFileCustomKeyPath | undefined,
): TCommonObjectMergeValue<GType>;
export function useDispatchFileObjectMergeValue<GType>(keyPath: null): TCommonKeyPathObjectMergeValue<GType>;
export function useDispatchFileObjectMergeValue(keyPath: null | TZustandFileCustomKeyPath | undefined) {
  return useCommonDispatchObjectMergeValue(useStore, keyPath);
}

export function useDispatchFileObjectRemoveItem(keyPath: null | TZustandFileCustomKeyPath) {
  return useCommonDispatchObjectRemoveItem(useStore, keyPath);
}

export function useDispatchFileSetValue<KeyName extends TZustandFileStateDataKeys>(
  keyPath: KeyName | undefined,
): TCommonSetValue<TZustandFileStateData[KeyName]>;
export function useDispatchFileSetValue<GType>(keyPath: TZustandFileCustomKeyPath | undefined): TCommonSetValue<GType>;
export function useDispatchFileSetValue<GType>(keyPath: null): TCommonKeyPathSetValue<GType>;
export function useDispatchFileSetValue(keyPath: null | TZustandFileCustomKeyPath | undefined) {
  return useCommonDispatchSetValue(useStore, keyPath);
}

export function useInitFileValue<KeyName extends TZustandFileStateDataKeys>(
  keyPath: KeyName,
): TZustandFileStateData[KeyName];
export function useInitFileValue<GType>(keyPath: TZustandFileCustomKeyPath): GType;
export function useInitFileValue(keyPath: TZustandFileCustomKeyPath) {
  return useCommonInitValue(useStore, keyPath);
}

export function useSelectorFileValue<KeyName extends TZustandFileStateDataKeys>(
  keyPath: KeyName,
): TZustandFileStateData[KeyName];
export function useSelectorFileValue<GType>(keyPath: TZustandFileCustomKeyPath): GType;
export function useSelectorFileValue(keyPath: TZustandFileCustomKeyPath) {
  return useCommonSelectorValue(useStore, keyPath);
}

export function useStoreFileGetValue<KeyName extends TZustandFileStateDataKeys>(
  keyPath: KeyName,
): () => TZustandFileStateData[KeyName];
export function useStoreFileGetValue<GType>(keyPath: TZustandFileCustomKeyPath): () => GType;
export function useStoreFileGetValue(keyPath: TZustandFileCustomKeyPath) {
  return useCommonStoreGetValue(useStore, keyPath);
}

/**
 * setter
 */

export function useDispatchFileProduceState() {
  const fn = useStore((state) => state.produceState);
  return useCallback(
    (callback: (proxyState: TZustandFileStateData) => void) => {
      fn(callback);
    },
    [], // eslint-disable-line @eslint-react/exhaustive-deps
  );
}
