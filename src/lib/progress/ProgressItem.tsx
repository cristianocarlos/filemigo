import {useEffect, useRef} from 'react';

import XIconButton from '@/components/XIconButton';
import useProgressRemoveItem from '@/lib/progress/useProgressRemoveItem';
import {useSelectorFileValue} from '@/lib/zustand/hooks';

import ProgressStatus from './ProgressStatus';

import type {TFileProgressItems} from '@/lib/types';

type TProgressItemProps = {
  className?: string;
  progressItemId: string;
};

export default function ProgressItem({className, progressItemId}: TProgressItemProps) {
  const progressRemoveItem = useProgressRemoveItem();

  const requestRef = useRef<AbortController>(undefined);

  const data = useSelectorFileValue<TFileProgressItems[string]>(['progressRows', progressItemId]);
  const request = data?.request;

  const handleRemove = () => {
    progressRemoveItem(progressItemId);
  };

  const handleCancel = () => {
    request?.abort();
    handleRemove();
  };

  useEffect(() => {
    if (requestRef.current) {
      requestRef.current.abort();
    } else {
      // O erro pode acontecer antes de iniciar o upload, é necessário remover o progressItem pra não aparecer o erro em outra tela
      handleRemove();
    }
    // Essa cb só deve rodar na montagem do componente
    // eslint-disable-next-line @eslint-react/exhaustive-deps
  }, []);

  useEffect(() => {
    requestRef.current = request;
  }, [request]);

  if (!data) return;

  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center gap-2 rounded text-xs ${data.errorMessage ? 'h-5 bg-orange-300 px-1' : 'h-6'}`}
      >
        {data.errorMessage ? (
          <>
            <span className="flex-1" dangerouslySetInnerHTML={{__html: data.errorMessage}} />
            <XIconButton onClick={handleRemove} />
          </>
        ) : (
          <ProgressStatus data={data.status} handleCancel={handleCancel} name={data.name} />
        )}
      </div>
    </div>
  );
}
