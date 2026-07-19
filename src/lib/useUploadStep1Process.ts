import {getMultipleFilesTotalBytes, getUploadBytesErrorMessage, isValidImageMimeType} from '@/lib/helper';
import proccessImage from '@/lib/processImage';
import useProgressAddItems from '@/lib/progress/useProgressAddItems';
import useUploadStep2Presign from '@/lib/useUploadStep2Presign';
import {useFilemigoContext} from '@/lib/withContext';
import {valueAsString} from '@/utils/helper';

import type {TFilemigoProgressItems} from '@/lib/types';

export default function useUploadStep1Process() {
  const {imageConstraints, maxStorageBytes, maxUploadBytes} = useFilemigoContext();
  const progressAddItems = useProgressAddItems();
  const uploadPresign = useUploadStep2Presign();
  return (fileList: FileList) => {
    if (fileList.length === 0) return;
    const progressFiles: TFilemigoProgressItems = {};
    new Promise<void>((resolveAll) => {
      // É necessário usar promises por causa do tratamento de erro das imagens
      // proccessImage para obter as dimensões é assíncrono
      const singleFilePromises = []; // Armazena uma promise por arquivo pra rodar tudo de uma vez com Promisse.all()
      const totalBytes = getMultipleFilesTotalBytes(fileList);
      for (let i = 0; i < fileList.length; i++) {
        singleFilePromises.push(
          new Promise<void>((resolveSingle) => {
            const uploadFile = fileList[i];
            const progressFile: TFilemigoProgressItems[string] = {
              errorMessage: undefined,
              itemId: Date.now().toString() + i,
              name: uploadFile.name,
              size: uploadFile.size,
              status: {
                itemId: '',
                loaded: 0,
                percent: 0,
                total: undefined,
              },
              type: uploadFile.type,
            };
            const sizeErrorMessage = getUploadBytesErrorMessage({
              fileBytes: uploadFile.size,
              fileMimeType: uploadFile.type,
              maxImageBytes: imageConstraints?.maxBytes,
              maxStorageBytes,
              maxUploadBytes,
              totalBytes,
            });
            if (sizeErrorMessage) {
              progressFile.errorMessage = sizeErrorMessage;
              progressFiles[progressFile.itemId] = progressFile;
              resolveSingle();
            } else if (isValidImageMimeType(uploadFile.type)) {
              proccessImage(uploadFile, imageConstraints)
                .then((imageDimensions) => {
                  console.log('image', imageDimensions, progressFile);
                  uploadPresign({
                    additionalParams: {
                      imageHeight: valueAsString(imageDimensions.naturalHeight),
                      imageWidth: valueAsString(imageDimensions.naturalWidth),
                    },
                    progressFile,
                    uploadFile,
                  });
                  progressFiles[progressFile.itemId] = progressFile;
                  resolveSingle();
                })
                .catch((e) => {
                  progressFile.errorMessage = e.message;
                });
            } else {
              uploadPresign({progressFile, uploadFile});
              progressFiles[progressFile.itemId] = progressFile;
              resolveSingle();
            }
          }),
        );
      }
      Promise.all(singleFilePromises).then(() => {
        resolveAll(); // Com todos os arquivos processados já é possível adicionar ao progressItems
      });
    }).then(() => {
      progressAddItems(progressFiles);
    });
  };
}
