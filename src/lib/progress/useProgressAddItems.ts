import {useDispatchFileObjectMergeValue} from '@/lib/zustand/hooks';

import type {TFilemigoProgressItems} from '@/lib/types';

export default function useProgressAddItems() {
  const fileObjectMergeProgressItems = useDispatchFileObjectMergeValue<TFilemigoProgressItems>(null); // TFilemigoProgressItems
  return (progressFiles: TFilemigoProgressItems) => {
    fileObjectMergeProgressItems(progressFiles, ['progressRows']);
  };
}
