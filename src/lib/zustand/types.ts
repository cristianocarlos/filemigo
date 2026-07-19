import type {TFileIndexRows, TFilemigoProgressItems} from '@/lib/types';
import type {TArrayKey} from '@/types/common';
import type {TImmerDraft} from '@/types/thirdParty';
import type {TZustandArrayState, TZustandCommonState, TZustandObjectState} from '@/utils/zustand/types';

export type TZustandFileStateData = {
  progressRows?: TFilemigoProgressItems;
  rows?: TFileIndexRows;
  storageUsageQuantity?: number;
};

export type TZustandFileState = {
  data: TZustandFileStateData;
  produceState: (cb: (ps: TImmerDraft<TZustandFileStateData>) => void) => void;
} & TZustandArrayState &
  TZustandCommonState &
  TZustandObjectState;

export type TZustandFileStateDataKeys = keyof TZustandFileStateData;
export type TZustandFileCustomKeyPath = [TZustandFileStateDataKeys, ...TArrayKey] | TZustandFileStateDataKeys;
