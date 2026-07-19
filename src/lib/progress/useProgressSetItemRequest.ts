import {useDispatchFileSetValue} from '@/lib/zustand/hooks';

import type {TFilemigoProgressItems} from '@/lib/types';

export default function useProgressSetItemRequest() {
  const fileSetProgressItemRequest = useDispatchFileSetValue<TFilemigoProgressItems[string]['request']>(null); // progressItems
  return (
    progressItemId: TFilemigoProgressItems[string]['itemId'],
    request: TFilemigoProgressItems[string]['request'],
  ) => {
    fileSetProgressItemRequest(request, ['progressRows', progressItemId, 'request']);
  };
}
