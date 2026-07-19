import XIcon from '@/components/XIcon';
import {formatFileBytes} from '@/lib/helper';
import YiiLang from '@/utils/yii-lang';

import type {TFilemigoProgressItems} from '@/lib/types';

type TProgressStatusProps = {
  data: TFilemigoProgressItems[string]['status'];
  handleCancel: () => void;
  name: string;
};

export default function ProgressStatus(props: TProgressStatusProps) {
  const {data, handleCancel, name} = props;
  const inProgress = data.total && data.percent < 100;
  let cancelTitle;
  if (!inProgress) {
    cancelTitle = data.percent === 100 ? YiiLang.filemigo('textFinishingSend') : YiiLang.filemigo('textGettingInfo');
  }
  return (
    <>
      <div className="flex-1">
        <div className="mb-px text-gray-600" title={name}>
          {name}
          {inProgress ? (
            <span className="ml-1" title={formatFileBytes(data.loaded, 2) + ' / ' + formatFileBytes(data.total || 0)}>
              {data.percent + '%'}
            </span>
          ) : undefined}
        </div>
        <progress
          className="flex h-2 w-full rounded bg-gray-300 [&::-moz-progress-bar]:rounded [&::-moz-progress-bar]:bg-blue-600 [&::-webkit-progress-bar]:rounded [&::-webkit-progress-bar]:bg-gray-300 [&::-webkit-progress-value]:rounded [&::-webkit-progress-value]:bg-blue-600"
          max={100}
          value={data.percent}
        />
      </div>
      <button onClick={handleCancel} title={cancelTitle} type="button">
        <svg
          aria-hidden="true"
          className={`lucide lucide-loader absolute animate-spin ${inProgress ? '' : 'invisible'}`}
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2v4"></path>
          <path d="m16.2 7.8 2.9-2.9"></path>
          <path d="M18 12h4"></path>
          <path d="m16.2 16.2 2.9 2.9"></path>
          <path d="M12 18v4"></path>
          <path d="m4.9 19.1 2.9-2.9"></path>
          <path d="M2 12h4"></path>
          <path d="m4.9 4.9 2.9 2.9"></path>
        </svg>
        <XIcon className={`${inProgress ? 'invisible' : ''}`} />
      </button>
    </>
  );
}
