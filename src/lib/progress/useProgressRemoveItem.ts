import {useDispatchFileObjectRemoveItem} from '@/lib/zustand/hooks';

import type {TFileProgressItems} from '@/lib/types';

export default function useProgressRemoveItem() {
  const fileObjectRemoveProgressItem = useDispatchFileObjectRemoveItem('progressRows');
  return (progressItemId: TFileProgressItems[string]['itemId']) => {
    fileObjectRemoveProgressItem(progressItemId);
  };
}
