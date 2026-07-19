import Upload from '@/lib/Upload';
import {FilemigoContext} from '@/lib/withContext';

import type {TFilemigoUploadProps} from '@/lib/types';

export default function FilemigoUpload(props: TFilemigoUploadProps) {
  const {
    children,
    className = '',
    confirmPath,
    deletePath,
    handleEnd,
    imageConstraints,
    maxStorageBytes,
    maxUploadBytes,
    presignParams,
    xhrActions,
  } = props;
  return (
    <FilemigoContext
      value={{
        confirmPath,
        deletePath,
        handleEnd,
        imageConstraints,
        maxStorageBytes,
        maxUploadBytes,
        presignParams,
        xhrActions,
      }}
    >
      <Upload className={className}>{children}</Upload>
    </FilemigoContext>
  );
}
