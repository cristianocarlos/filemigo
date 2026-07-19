import useUploadStatusError from '@/lib/useUploadStatusError';
import useUploadStep3Send from '@/lib/useUploadStep3Send';
import {useFilemigoContext} from '@/lib/withContext';
import {valueAsString} from '@/utils/helper';

import type {TFilemigoProgressItems, TFilemigoUploadPresignResponseContent} from '@/lib/types';

type TFilemigoUploadSingleSendHandler = {
  additionalParams?: Record<string, string>;
  progressFile: TFilemigoProgressItems[string];
  uploadFile: File;
};

export default function useUploadStep2Presign() {
  const {presignParams, xhrActions} = useFilemigoContext();
  const serviceSend = useUploadStep3Send();
  const handleStatusError = useUploadStatusError();
  return ({additionalParams, progressFile, uploadFile}: TFilemigoUploadSingleSendHandler) => {
    const formData = new FormData();
    formData.append('fileBytes', valueAsString(uploadFile.size));
    formData.append('fileMimeType', uploadFile.type);
    formData.append('fileName', progressFile.name);
    const resolvedParams = {...additionalParams, ...presignParams};
    if (resolvedParams) {
      Object.keys(resolvedParams).forEach((keyName) => {
        if (keyName === 'url') return;
        formData.append(keyName, resolvedParams[keyName]);
      });
    }
    xhrActions
      .presign<TFilemigoUploadPresignResponseContent>({data: formData, url: presignParams.url})
      .then((responseContent) => {
        serviceSend(progressFile.itemId, uploadFile, responseContent);
      })
      .catch((error: Error) => {
        handleStatusError(progressFile.itemId, error.message);
      });
  };
}
