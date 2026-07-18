import XIcon from '@/components/XIcon';
import YiiLang from '@/utils/yii-lang';

import type {ComponentProps} from 'react';

export type IPXIconButton = ComponentProps<'button'> & {
  className?: string;
  title?: string;
};

export default function XIconButton(props: IPXIconButton) {
  const {
    className = '',
    title = YiiLang.filemigo('textRemove'),
    ...htmlProps // Para os atributos data-*
  } = props;
  return (
    <button {...htmlProps} className={`mf__x-icon-button ${className}`} title={title} type="button">
      <XIcon />
    </button>
  );
}
