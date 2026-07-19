import {hasValue} from '@/utils/helper';
import YiiLang from '@/utils/yii-lang';

import type {TFilemigoUpload} from '@/lib/types';

type TFilemigoUploadBytesErrorMessage = Pick<TFilemigoUpload, 'maxStorageBytes' | 'maxUploadBytes'> & {
  fileBytes: number;
  fileMimeType: string;
  maxImageBytes?: number;
  totalBytes: number;
};

export const CANCELLED_BY_USER_MESSAGE = 'canceled';

const BIG_FILE_MIN_BYTES = 3000000; // A partir de 3 MB é considerado um arquivo pesado

export function formatFileBytes(bytes: number, decimals: number | undefined = undefined, si = true) {
  if (!hasValue(bytes)) return '';
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  const units = si
    ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  let newBytes = bytes;
  do {
    newBytes /= thresh;
    ++u;
  } while (Math.abs(newBytes) >= thresh && u < units.length - 1);
  const decimalsDefault = bytes > 1000000 ? 1 : 0;
  const value = !hasValue(decimals)
    ? parseFloat(newBytes.toFixed(decimalsDefault)) // parseFloat denovo pra tirar o .0
    : newBytes.toFixed(decimals);
  return value + ' ' + units[u];
}

export function isValidImageMimeType(
  mimeType: string,
): mimeType is 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/webp' {
  return mimeType === 'image/jpeg' || mimeType === 'image/jpg' || mimeType === 'image/png' || mimeType === 'image/webp';
}

export function getMultipleFilesTotalBytes(fileList: FileList) {
  let total = 0;
  for (let i = 0; i < fileList.length; i++) {
    total += fileList[i].size;
  }
  return total;
}

export function getUploadBytesErrorMessage({
  fileBytes,
  fileMimeType,
  maxImageBytes,
  maxStorageBytes,
  maxUploadBytes,
  totalBytes,
}: TFilemigoUploadBytesErrorMessage) {
  if (totalBytes > maxStorageBytes) {
    const hint = YiiLang.filemigo('labelFileHandlerMaxStorageBytes') + ': ' + formatFileBytes(maxStorageBytes);
    const message = YiiLang.filemigo('feedbackFileHandlerMaxStorageBytesError') + ': ' + formatFileBytes(totalBytes);
    return resolveErrorMessage(message, `[maxStorageBytes] ${hint}`);
  }
  if (isValidImageMimeType(fileMimeType)) {
    const resolvedMaxImageBytes = maxImageBytes || maxUploadBytes;
    if (fileBytes > resolvedMaxImageBytes) {
      const hint = YiiLang.filemigo('labelFileHandlerMaxImageBytes') + ': ' + formatFileBytes(resolvedMaxImageBytes);
      const message = YiiLang.filemigo('feedbackFileHandlerMaxImageBytesError') + ': ' + formatFileBytes(fileBytes);
      return resolveErrorMessage(message, `[maxImageBytes] ${hint}`);
    }
  }
  if (fileBytes > maxUploadBytes) {
    const hint = YiiLang.filemigo('labelFileHandlerMaxUploadBytes') + ': ' + formatFileBytes(maxUploadBytes);
    const message = YiiLang.filemigo('feedbackFileHandlerMaxUploadBytesError') + ': ' + formatFileBytes(fileBytes);
    return resolveErrorMessage(message, `[maxUploadBytes] ${hint}`);
  }
}

export function resolveUploadTimeout(fileBytes: number) {
  return fileBytes > BIG_FILE_MIN_BYTES ? fileBytes * 10 : 30000; // Quando for um arquivo pesado é conveniente aumentar o timeout
}

export function resolveErrorMessage(message: string, hint: string) {
  return `<span title="${hint}">${message}</span>`;
}
