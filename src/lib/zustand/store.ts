import {create as zustandCreate} from 'zustand';

import {immerProduceState} from '@/utils/immerHelper';
import {defaultLogger} from '@/utils/zustand/middlewares';
import storeArraySlice from '@/utils/zustand/storeArraySlice';
import storeCommonSlice from '@/utils/zustand/storeCommonSlice';
import storeObjectSlice from '@/utils/zustand/storeObjectSlice';

import type {TZustandFileState, TZustandFileStateData} from '@/lib/zustand/types';

const initialData: TZustandFileStateData = {
  progressRows: undefined,
  rows: undefined,
  storageUsageQuantity: undefined,
};

export const useStore = zustandCreate<TZustandFileState>(
  defaultLogger((set, get, api) => {
    return {
      ...storeCommonSlice(initialData)(set, get, api),
      ...storeArraySlice(set, get, api),
      ...storeObjectSlice(set, get, api),
      produceState: (cb) => {
        return set((prevState) => {
          return {
            data: immerProduceState(prevState.data, (proxyState) => {
              cb(proxyState);
            }),
          };
        });
      },
    };
  }),
);

export const zustandFileResetState = useStore.getState().dataReset;
