import {createContext, use} from 'react';

import type {TFilemigoXhrActions} from '@/lib/types';

export type TFilemigoContext = {
  xhrActions: TFilemigoXhrActions;
};

export const FilemigoContext = createContext<TFilemigoContext | undefined>(undefined);

export function useFilemigoContext() {
  const context = use(FilemigoContext);
  if (!context) {
    throw Error('FilemigoContext must be used within a FilemigoUpload');
  }
  return context;
}
