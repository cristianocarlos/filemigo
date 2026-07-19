import Upload from '@/lib/Upload';
import {FilemigoContext} from '@/lib/withContext';

import type {TFilemigoUpload} from '@/lib/types';
import type {ReactElement} from 'react';

type TFilemigoUploadProps = TFilemigoUpload & {
  children?: ReactElement;
  className?: string;
};

export default function FilemigoUpload(props: TFilemigoUploadProps) {
  return (
    <FilemigoContext value={{xhrActions: props.xhrActions}}>
      <Upload {...props} />
    </FilemigoContext>
  );
}
