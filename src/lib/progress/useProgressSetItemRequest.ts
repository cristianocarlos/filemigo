import {useDispatchFileSetValue} from '@/lib/zustand/hooks';

import type {TFileProgressItems} from '@/lib/types';

export default function useProgressSetItemRequest() {
  const fileSetProgressItemRequest = useDispatchFileSetValue<TFileProgressItems[string]['request']>(null); // progressItems
  return (progressItemId: TFileProgressItems[string]['itemId'], request: TFileProgressItems[string]['request']) => {
    fileSetProgressItemRequest(request, ['progressRows', progressItemId, 'request']);
  };
}
