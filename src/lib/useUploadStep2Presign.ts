import useUploadStatusError from '@/lib/useUploadStatusError';
import useUploadStep3Send from '@/lib/useUploadStep3Send';
import {useFilemigoContext} from '@/lib/withContext';
import {valueAsString} from '@/utils/helper';

import type {TFileProgressItems, TFileUpload, TFileUploadPresignResponseContent} from '@/lib/types';

type TFileUploadSingleSendHook = Pick<TFileUpload, 'confirmPath' | 'deletePath' | 'handleEnd' | 'presignParams'>;

type TFileUploadSingleSendHandler = {
  additionalParams?: Record<string, string>;
  progressFile: TFileProgressItems[string];
  uploadFile: File;
};

export default function useUploadStep2Presign({
  confirmPath,
  deletePath,
  handleEnd,
  presignParams,
}: TFileUploadSingleSendHook) {
  const {xhrActions} = useFilemigoContext();
  const serviceSend = useUploadStep3Send({
    confirmPath,
    deletePath,
    handleEnd,
  });
  const handleStatusError = useUploadStatusError();
  return ({additionalParams, progressFile, uploadFile}: TFileUploadSingleSendHandler) => {
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
      .presign<TFileUploadPresignResponseContent>({data: formData, url: presignParams.url})
      .then((responseContent) => {
        serviceSend(progressFile.itemId, uploadFile, responseContent);
      })
      .catch((error: Error) => {
        handleStatusError(progressFile.itemId, error.message);
      });
  };
}
