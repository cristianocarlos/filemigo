import {useDispatchFileObjectRemoveItem} from '@/lib/zustand/hooks';

import type {TFilemigoProgressItems} from '@/lib/types';

export default function useProgressRemoveItem() {
  const fileObjectRemoveProgressItem = useDispatchFileObjectRemoveItem('progressRows');
  return (progressItemId: TFilemigoProgressItems[string]['itemId']) => {
    fileObjectRemoveProgressItem(progressItemId);
  };
}
