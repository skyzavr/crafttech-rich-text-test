import { Button } from '@shared/ui';
import './control.scss';

type controlProps = {
  tool: string;
  setTool: (value: string) => void;
};

export const Control = ({ tool, setTool }: controlProps) => {
  const handleOnChange = (value: string) => {
    setTool(value);
  };

  return (
    <section className="controlWrapper">
      <Button
        value="cursor"
        title="Взаимодействие"
        isChecked={tool === 'cursor'}
        onSetValue={handleOnChange}
      />
      <Button
        value="shape"
        title="Добавление"
        isChecked={tool === 'shape'}
        onSetValue={handleOnChange}
      />
    </section>
  );
};
