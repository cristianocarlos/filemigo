import {useDispatchFileProduceState} from '@/lib/zustand/hooks';

import type {TFileProgressItems} from '@/lib/types';

export default function useProgressSetItemStatus() {
  const produceProgressState = useDispatchFileProduceState(); // Pra não ter que ler o progressRows neste arquivo
  return (data: TFileProgressItems[string]['status']) => {
    produceProgressState((proxyState) => {
      // Após o cancelamento o upload não para imediatamente, é necessário prevenir update de id inexistente
      if (!proxyState.progressRows?.[data.itemId]) return;
      proxyState.progressRows[data.itemId].status = {
        itemId: data.itemId,
        loaded: data.loaded,
        percent: data.percent,
        total: data.total,
      };
    });
  };
}
