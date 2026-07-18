import {getLanguage} from '@/utils/globals';
const language = getLanguage();
type TYiiLangKeys = 'pt_BR';

/*
const langFilemigo = {
  pt_BR: {
    feedbackWebcamDenied: 'Para tirar fotos, \u00e9 necess\u00e1rio autorizar o uso da c\u00e2mera pelo navegador',
    feedbackWebcamNotFound: 'N\u00e3o foi poss\u00edvel encontrar uma Webcam configurada',
    feedbackWebcamNotSupported: 'Este navegador n\u00e3o da suporte ao uso da Webcam',
    labelFileHandlerPickButton: 'Arquivo',
    labelFileHandlerWebcamButton: 'Webcam',
    labelWebcamCancelButton: 'Cancelar',
    labelWebcamShootButton: 'Fotografar',
    labelFormCancelButton: 'Cancelar',
    labelFormEditButton: 'Editar',
    labelFormDeleteButton: 'Excluir',
    labelFormDownloadButton: 'Download',
    labelFormSelectButton: 'Selecionar',
    textFormDeleteConfirmAsk: 'Tem certeza que deseja excluir este registro?',
    textFormDeleteConfirmTitle: 'Confirma\u00e7\u00e3o de exclus\u00e3o',
    'Finalizando o envio': 'Finalizando o envio',
    Legenda: 'Legenda',
    'Obtendo informa\u00e7\u00f5es': 'Obtendo informa\u00e7\u00f5es',
    Tags: 'Tags',
  },
};
 */

const langFilemigo = {
  pt_BR: {
    feedbackFileHandlerError: 'N\u00e3o foi poss\u00edvel enviar o arquivo',
    feedbackFileHandlerImageHeightError: 'Erro, altura da imagem inv\u00e1lida',
    feedbackFileHandlerImageLoadError: 'Erro, n\u00e3o foi poss\u00edvel carregar a imagem',
    feedbackFileHandlerImageTypeError: 'Erro, o arquivo precisa ser uma imagem',
    feedbackFileHandlerImageWidthError: 'Erro, largura da imagem inv\u00e1lida',
    feedbackFileHandlerMaxImageBytesError: 'Erro, imagem muito pesada',
    feedbackFileHandlerMaxStorageBytesError: 'Erro, limite de armazenamento excedido',
    feedbackFileHandlerMaxUploadBytesError: 'Erro, arquivo muito pesado',
    labelFileHandlerMaxImageBytes: 'Peso m\u00e1ximo por imagem',
    labelFileHandlerMaxStorageBytes: 'Limite de armazenamento',
    labelFileHandlerMaxUploadBytes: 'Peso m\u00e1ximo por arquivo',
    labelFileHandlerRecommendedImageDimensions: 'Dimens\u00f5es recomendadas',
    textFinishingSend: 'Finalizando o envio',
    textGettingInfo: 'Obtendo informações',
    textRemove: 'Remover',
  },
};
type TYiiLangFilemigoMessageKey = keyof typeof langFilemigo.pt_BR;
const filemigo = (messageKey: TYiiLangFilemigoMessageKey) => langFilemigo[language as TYiiLangKeys]?.[messageKey] || '';

export default {filemigo};
