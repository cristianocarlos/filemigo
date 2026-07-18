import FileUpload from '@/lib/FileUpload';
import {FilemigoContext} from '@/lib/withContext';

import type {TFileUpload} from '@/lib/types';
import type {ReactElement} from 'react';

type TFileUploadProps = TFileUpload & {
  children?: ReactElement;
  className?: string;
};

export default function FilemigoUpload(props: TFileUploadProps) {
  return (
    <FilemigoContext value={{xhrActions: props.xhrActions}}>
      <FileUpload {...props} />
    </FilemigoContext>
  );
}
