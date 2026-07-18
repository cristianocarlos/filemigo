import useProgressSetItemStatus from '@/lib/progress/useProgressSetItemStatus';

import type {AxiosProgressEvent} from 'axios';

export default function useProgressUpload() {
  const progressSetItemStatus = useProgressSetItemStatus();
  return (progressItemId: string) => (progressEvent: AxiosProgressEvent) => {
    const {loaded, total} = progressEvent;
    if (!total) return;
    progressSetItemStatus({
      itemId: progressItemId,
      loaded,
      percent: Math.round((loaded / total) * 100),
      total,
    });
  };
}
