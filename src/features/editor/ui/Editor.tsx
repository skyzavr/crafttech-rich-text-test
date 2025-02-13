import { useState } from 'react';
import ReactQuill from 'react-quill';

import { CustomToolbar } from './ToolBar';

import 'react-quill/dist/quill.snow.css';
import './editor.scss';

type editorCustomProps = {
  initValue: string;
  onUpdateHandler: (value: string) => void;
  width: number;
};

export const EditorCustom = (props: editorCustomProps) => {
  const { initValue, onUpdateHandler, width } = props;
  const [value, setValue] = useState<string>(initValue);

  const onChangeHandler = (value: string) => {
    setValue(value);
    onUpdateHandler(value);
  };

  return (
    <div className="text-editor" style={{ width }}>
      <CustomToolbar />
      <ReactQuill
        modules={{
          toolbar: {
            container: '#toolbar',
          },
          clipboard: {
            matchVisual: false,
          },
        }}
        formats={['bold', 'italic', 'underline', 'color']}
        theme="snow"
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};
