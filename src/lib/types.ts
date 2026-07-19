import type {TFilemigoContext} from '@/lib/withContext';
import type {AxiosProgressEvent} from 'axios';
import type {ChangeEventHandler, DragEventHandler, ReactElement} from 'react';

export type TDragEventHandler = DragEventHandler<HTMLElement>;
export type TPickEventHandler = ChangeEventHandler<HTMLInputElement>;

export type TFileIndexRows = Array<{
  file_byte: number;
  file_code: number;
  file_mity: string;
  file_path: string;
}>;

export type TFilemigoUploadProps = TFilemigoContext & {
  children?: ReactElement;
  className?: string;
};

export type TFilemigoUploadPresignResponseContent = {
  fileData: TFileIndexRows[number];
  presignData: {
    cloudinaryData?: TCloudinaryPresignData;
    uploadUrl: string;
  };
};

export type TFilemigoProgressItems = {
  [itemId: string]: {
    errorMessage?: string;
    itemId: string;
    name: string;
    request?: AbortController;
    size: number;
    status: {itemId: string; loaded: number; percent: number; total?: number};
    type: string; // mime_type
  };
};

export type TFilemigoXhrActions = {
  presign: <GContent>(config: {data: FormData; url: string}) => Promise<GContent>;
  recordDelete: (url: string) => Promise<boolean>;
  recordUpdate: (url: string) => Promise<boolean>;
  serviceUpload: <G>(config: {
    data: File | FormData;
    headers?: Record<string, string>;
    method: 'post' | 'put';
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void;
    signal: AbortSignal;
    timeout: number;
    url: string;
  }) => Promise<G>;
};

export type TCloudinaryPresignData = {
  api_key: string;
  folder: string;
  public_id: string;
  signature: string;
  timestamp: string;
  type: 'authenticated' | 'private' | 'public';
};

export type TCloudinaryUploadApiResponse = {
  bytes: number;
  format: string;
  height: number;
  public_id: string;
  width: number;
};
