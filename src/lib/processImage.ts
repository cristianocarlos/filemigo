import {resolveErrorMessage} from '@/lib/helper';
import YiiLang from '@/utils/yii-lang';

import type {TFilemigoContext} from '@/lib/withContext';

type TImageDimensionErrorMessage = TFilemigoContext['imageConstraints'] & {
  naturalHeight: number;
  naturalWidth: number;
};

type TProccessImageResolve = {
  naturalHeight: number;
  naturalWidth: number;
};

function getImageDimensionErrorMessage(params: TImageDimensionErrorMessage) {
  const {exactDimensions, maxDimensions, naturalHeight, naturalWidth} = params;
  const messageRows = [];
  if (maxDimensions) {
    if (naturalHeight > maxDimensions.height) {
      messageRows.push(YiiLang.filemigo('feedbackFileHandlerImageHeightError') + ': ' + naturalHeight + 'px');
    }
    if (naturalWidth > maxDimensions.width) {
      messageRows.push(YiiLang.filemigo('feedbackFileHandlerImageWidthError') + ': ' + naturalWidth + 'px');
    }
  } else if (exactDimensions) {
    if (naturalHeight !== exactDimensions.height) {
      messageRows.push(YiiLang.filemigo('feedbackFileHandlerImageHeightError') + ': ' + naturalHeight + 'px');
    }
    if (naturalWidth !== exactDimensions.width) {
      messageRows.push(YiiLang.filemigo('feedbackFileHandlerImageWidthError') + ': ' + naturalWidth + 'px');
    }
  }
  return messageRows.length === 0 ? undefined : messageRows.join('; ');
}

function getUploadImageErrorMessage(params: TImageDimensionErrorMessage) {
  const maxDimensionErrorMessage = getImageDimensionErrorMessage(params);
  if (!maxDimensionErrorMessage) return;
  let dimensionsDesc;
  if (params.exactDimensions) {
    dimensionsDesc = params.exactDimensions.width + 'x' + params.exactDimensions.height;
  } else if (params.maxDimensions) {
    dimensionsDesc = params.maxDimensions.width + 'x' + params.maxDimensions.height;
  }
  if (!dimensionsDesc) return;
  const hint = YiiLang.filemigo('labelFileHandlerRecommendedImageDimensions') + ': ' + dimensionsDesc;
  return resolveErrorMessage(maxDimensionErrorMessage, hint);
}

export default async function proccessImage(
  uploadFile: File,
  constraints?: TFilemigoContext['imageConstraints'],
): Promise<TProccessImageResolve> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadFile);
    fileReader.onload = () => {
      const image = new Image();
      image.src = fileReader.result as string;
      image.onload = () => {
        const {naturalHeight, naturalWidth} = image;
        const errorMessage = getUploadImageErrorMessage({...constraints, naturalHeight, naturalWidth});
        if (errorMessage) {
          reject(new Error(errorMessage));
        } else {
          resolve({naturalHeight, naturalWidth});
        }
      };
      image.onerror = () => {
        const errorMessage = resolveErrorMessage(
          YiiLang.filemigo('feedbackFileHandlerImageLoadError'),
          '[image.onerror]',
        );
        reject(new Error(errorMessage));
      };
    };
  });
}
