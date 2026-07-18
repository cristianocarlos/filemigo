import useProgressRemoveItem from '@/lib/progress/useProgressRemoveItem';
import {useFilemigoContext} from '@/lib/withContext';
import {
  useDispatchFileArrayAddItemAtBeginning,
  useDispatchFileSetValue,
  useStoreFileGetValue,
} from '@/lib/zustand/hooks';

import type {TFileIndexRows, TFileProgressItems} from '@/lib/types';

export default function useUploadStatusSuccess() {
  const {xhrActions} = useFilemigoContext();
  const progressRemoveItem = useProgressRemoveItem();
  const fileArrayAddItem = useDispatchFileArrayAddItemAtBeginning('rows');
  const setStorageUsageQuantity = useDispatchFileSetValue('storageUsageQuantity');
  const storageUsageQuantityGetValue = useStoreFileGetValue('storageUsageQuantity');
  return (
    progressItemId: TFileProgressItems[string]['itemId'],
    fileData: TFileIndexRows[number],
    confirmUrl: string,
  ) => {
    progressRemoveItem(progressItemId);
    fileArrayAddItem(fileData);
    setStorageUsageQuantity((storageUsageQuantityGetValue() || 0) + (fileData.file_byte || 0));
    xhrActions.recordUpdate(confirmUrl);
  };
}
