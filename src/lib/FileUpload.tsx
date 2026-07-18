import useUploadStep1Process from '@/lib/useUploadStep1Process';

import type {TDragEventHandler, TFileUpload, TPickEventHandler} from '@/lib/types';
import type {ReactElement} from 'react';

type TFileUploadProps = TFileUpload & {
  children?: ReactElement;
  className?: string;
};

export default function FileUpload({children, className = '', ...restProps}: TFileUploadProps) {
  const multipleSend = useUploadStep1Process(restProps);

  const handleDragOver: TDragEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDrop: TDragEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    multipleSend(e.dataTransfer.files);
  };

  const handlePick: TPickEventHandler = (e) => {
    if (!e.target.files) return;
    multipleSend(e.target.files);
  };

  return (
    <label
      className={`flex items-center gap-1 rounded-lg bg-white p-8 shadow ${className}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children || (
        <>
          <svg
            aria-hidden="true"
            className="lucide lucide-upload"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 3v12"></path>
            <path d="m17 8-5-5-5 5"></path>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          </svg>
          Upload
        </>
      )}
      <input className="hidden" multiple={true} name="file" onChange={handlePick} type="file" />
    </label>
  );
}
