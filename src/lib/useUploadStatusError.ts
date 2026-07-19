import {CANCELLED_BY_USER_MESSAGE, resolveErrorMessage} from '@/lib/helper';
import useProgressRemoveItem from '@/lib/progress/useProgressRemoveItem';
import {useFilemigoContext} from '@/lib/withContext';
import {useDispatchFileSetValue} from '@/lib/zustand/hooks';
import YiiLang from '@/utils/yii-lang';

import type {TFilemigoProgressItems} from '@/lib/types';

export default function useUploadStatusError() {
  const {xhrActions} = useFilemigoContext();
  const progressRemoveItem = useProgressRemoveItem();
  const fileSetProgressItemError = useDispatchFileSetValue<TFilemigoProgressItems[string]['errorMessage']>(null); // progressItems
  return (
    progressItemId: TFilemigoProgressItems[string]['itemId'],
    errorMessage: NonNullable<TFilemigoProgressItems[string]['errorMessage']>,
    deleteUrl?: string,
  ) => {
    if (deleteUrl) {
      // Usando a AWS o registro do banco é criado antes do envio do arquivo, no presign
      // Quando o upload é cancelado ou ocorre um erro é necessário apagar o registro no DB
      xhrActions.recordDelete(deleteUrl);
    }
    if (errorMessage === CANCELLED_BY_USER_MESSAGE) {
      progressRemoveItem(progressItemId);
    } else {
      fileSetProgressItemError(resolveErrorMessage(YiiLang.filemigo('feedbackFileHandlerError'), errorMessage), [
        'progressRows',
        progressItemId,
        'errorMessage',
      ]);
    }
  };
}
