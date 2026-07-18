import {useDispatchFileObjectMergeValue} from '@/lib/zustand/hooks';

import type {TFileProgressItems} from '@/lib/types';

export default function useProgressAddItems() {
  const fileObjectMergeProgressItems = useDispatchFileObjectMergeValue<TFileProgressItems>(null); // TFileProgressItems
  return (progressFiles: TFileProgressItems) => {
    fileObjectMergeProgressItems(progressFiles, ['progressRows']);
  };
}
