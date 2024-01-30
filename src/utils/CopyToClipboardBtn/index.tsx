import React, { useState } from 'react';
import { Icon } from '~/components/atoms/Icon';
import copyTextToClipboard from './copyTextToClipboard';

type Props = {
  textToCopy: string;
  className?: string;
  tooltip?: string;
  tooltipAfterCopy?: string;
};

const CopyToClipboardBtn = ({
  textToCopy,
  tooltip = 'Copy to clipboard',
}: Props): React.ReactElement => {
  const [clicked, setClicked] = useState<boolean>(false);

  const copy = () => {
    copyTextToClipboard(textToCopy);
    setClicked(true);
  };

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    copy();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    // prevents event from bubbling when `Enter` is pressed
    if (event.keyCode === 13) {
      event.stopPropagation();
    }
    copy();
  };

  const onButtonBlur = (): void => {
    setTimeout((): void => setClicked(false), 300);
  };

  return (
    <button
      type='button'
      onClick={onButtonClick}
      onKeyDown={onKeyDown}
      onMouseLeave={onButtonBlur}
      className='tooltip-right'
      data-tip={clicked ? 'Copied' : tooltip}
    >
      <Icon type={'ContentCopy'} size={'md'} color={'white'} />
    </button>
  );
};

export default CopyToClipboardBtn;
