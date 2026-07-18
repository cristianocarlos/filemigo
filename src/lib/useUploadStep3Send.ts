import {resolveUploadTimeout} from '@/lib/helper';
import useProgressSetItemRequest from '@/lib/progress/useProgressSetItemRequest';
import useProgressUpload from '@/lib/progress/useProgressUpload';
import useUploadStatusError from '@/lib/useUploadStatusError';
import useUploadStatusSuccess from '@/lib/useUploadStatusSuccess';
import {useFilemigoContext} from '@/lib/withContext';

import type {
  TCloudinaryPresignData,
  TCloudinaryUploadApiResponse,
  TFileUpload,
  TFileUploadPresignResponseContent,
} from '@/lib/types';

type THandleUploadSendToCloudinaryHook = Pick<TFileUpload, 'confirmPath' | 'deletePath' | 'handleEnd'>;

export default function useUploadStep3SendToCloudinary({
  confirmPath,
  deletePath,
  handleEnd,
}: THandleUploadSendToCloudinaryHook) {
  const {xhrActions} = useFilemigoContext();
  const handleStatusError = useUploadStatusError();
  const handleStatusSuccess = useUploadStatusSuccess();
  const progressSetItemRequest = useProgressSetItemRequest();
  const progressUpload = useProgressUpload();
  return async (
    progressItemId: string,
    uploadFile: File,
    presignResponseContent: TFileUploadPresignResponseContent,
  ) => {
    const {fileData, presignData} = presignResponseContent;
    const request = new AbortController();
    try {
      if (presignData.cloudinaryData) {
        const formData = new FormData();
        formData.append('file', uploadFile);
        Object.keys(presignData.cloudinaryData).forEach((keyName) => {
          formData.append(keyName, presignData.cloudinaryData?.[keyName as keyof TCloudinaryPresignData] as string);
        });
        await xhrActions.serviceUpload<TCloudinaryUploadApiResponse>({
          data: formData,
          method: 'post',
          onUploadProgress: progressUpload(progressItemId),
          signal: request.signal,
          timeout: resolveUploadTimeout(uploadFile.size),
          url: presignData.uploadUrl,
        });
      } else {
        await xhrActions.serviceUpload<undefined>({
          data: uploadFile,
          headers: {'Content-Type': uploadFile.type},
          method: 'put',
          onUploadProgress: progressUpload(progressItemId),
          signal: request.signal,
          timeout: resolveUploadTimeout(uploadFile.size),
          url: presignData.uploadUrl,
        });
      }
      handleStatusSuccess(progressItemId, fileData, `${confirmPath}/${fileData.file_code}`);
      handleEnd?.({fileData});
    } catch (rawError: unknown) {
      if (!(rawError instanceof Error)) {
        console.warn('Upload unkown error: ', rawError);
        return;
      }
      handleStatusError(progressItemId, rawError.message, `${deletePath}/${fileData.file_code}`);
      handleEnd?.({errorMessage: rawError.message});
    }
    progressSetItemRequest(progressItemId, request); // TODO: testar
  };
}
