import type {TLanguage} from '@/types/common';

export function getLanguage(): TLanguage {
  return (getWindowLocalStorage().getItem('language') || 'pt_BR') as TLanguage;
}

function getWindowLocalStorage() {
  return typeof window === 'undefined'
    ? ({
        getItem: (v) => v,
      } as Storage)
    : window.localStorage;
}
