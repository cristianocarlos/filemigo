import useProgressSetItemStatus from '@/lib/progress/useProgressSetItemStatus';

export default function useProgressUpload() {
  const progressSetItemStatus = useProgressSetItemStatus();
  return (progressItemId: string) => (progressEvent: ProgressEvent) => {
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
