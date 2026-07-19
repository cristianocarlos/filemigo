import ProgressItem from '@/lib/progress/ProgressItem';
import {useSelectorFileValue} from '@/lib/zustand/hooks';

export default function ProgressItems({className}: {className?: string}) {
  /*
  const progressItems2 = {
    '1': {
      errorMessage: undefined,
      itemId: '1',
      name: 'olarticoechea.jpg',
      size: 1000,
      status: {loaded: 1340, percent: 67, total: 100045000},
      type: 'image/jpg',
    },
    '2': {
      errorMessage: undefined,
      itemId: '2',
      name: 'Mamafrica a minha mãe, é mãe solteira.jpg',
      size: 1000,
      status: {loaded: 1042300, percent: 35, total: 400430000},
      type: 'image/jpg',
    },
    '3': {
      errorMessage: 'Carai fudeu tudo',
      itemId: '3',
      name: 'Se meus joelhos não doe??m mais.png',
      size: 1000,
      status: {loaded: 100000, percent: 35, total: 1000000},
      type: 'image/jpg',
    },
  };
  const setValue = useDispatchFileSetValue('progressRows');
  useDidMountEffect(() => {
    setValue(progressItems2);
  });
  */
  const progressItems = useSelectorFileValue('progressRows');
  if (!progressItems) return;
  const progressItemsValues = Object.values(progressItems);
  if (progressItemsValues.length === 0) return;
  console.log(2, progressItemsValues);
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {progressItemsValues.map((data) => {
        if (!data.itemId) return;
        return <ProgressItem key={data.itemId} progressItemId={data.itemId} />;
      })}
    </div>
  );
}
