import cn from 'classnames';

import './buttons.scss';

type controlBtnProps = {
  isChecked: boolean;
  title: string;
  value: string;
  onSetValue: (value: string) => void;
};

export const Button = (props: controlBtnProps) => {
  const { isChecked, title, value, onSetValue } = props;

  const clName = cn('controlBtnWrapper', isChecked ? 'active' : 'passive');

  const handleOnChange = (value: string) => {
    onSetValue(value);
  };

  return (
    <button className={clName} onClick={() => handleOnChange(value)}>
      {title}
    </button>
  );
};
