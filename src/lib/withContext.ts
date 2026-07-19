import {createContext, use} from 'react';

import type {TFileIndexRows, TFilemigoXhrActions} from '@/lib/types';

export type TFilemigoContext = {
  confirmPath: string;
  deletePath: string;
  handleEnd?: (params: {errorMessage?: string; fileData?: TFileIndexRows[number]}) => void;
  imageConstraints?: {
    exactDimensions?: {height: number; width: number};
    maxBytes?: number;
    maxDimensions?: {height: number; width: number};
  };
  maxStorageBytes: number;
  maxUploadBytes: number;
  presignParams: Record<string, string> & {
    url: string;
  };
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
