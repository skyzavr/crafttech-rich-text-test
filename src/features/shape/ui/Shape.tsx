import { useRef, useEffect, useState } from 'react';
import { Rect, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';

import { EditorCustom } from '@features/editor';
import { useDebounce } from '@shared/lib/useDebounce';

import { figure } from '../model/type';
import { KonvaEventObject } from 'konva/lib/Node';
import { Box, Transformer as trType } from 'konva/lib/shapes/Transformer';
import { Rect as rectType } from 'konva/lib/shapes/Rect';
import { rectParams } from '../model/shapeParams';
import { CustomGroup } from '@entities/group';

type shapeProps = {
  figure: figure;
  tool: string;
  isSelected: boolean;
  onSelect: () => void;
  onSetFigureData: (figure: figure) => void;
};

export const Shape = (props: shapeProps) => {
  const anchors = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  const { figure, isSelected, onSelect, onSetFigureData, tool } = props;
  const { x, y, width, height, text, stroke, fill, id } = figure;
  const { minHeight, minWidth } = rectParams;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);
  const debounce = useDebounce(value, 500);
  const shapeRef = useRef<rectType>(null);
  const trRef = useRef<trType>(null);

  const onClickHandler = () => {
    onSelect();
    if (tool === 'shape') return;
    setIsEditing((prev) => !prev);
  };

  const handleInput = (e: string) => setValue(e);

  const onDragEndHandler = (e: KonvaEventObject<DragEvent>) => {
    onSetFigureData({ ...figure, x: e.target.x(), y: e.target.y() });
  };

  const onTransformEndHandler = () => {
    const node = shapeRef.current as rectType;
    onSetFigureData({
      ...figure,
      width: node.scaleX() * node.width(),
      height: node.scaleY() * node.height(),
    });
    node.scaleX(1);
    node.scaleY(1);
  };

  const onBoundBoxHandler = (oldBox: Box, newBox: Box) => {
    const { width, height } = newBox;
    if (Math.abs(width) < minWidth || Math.abs(height) < minHeight)
      return oldBox;
    return newBox;
  };

  useEffect(() => {
    if (isSelected)
      (trRef.current as trType).nodes([shapeRef.current as rectType]);
  }, [isSelected]);

  useEffect(() => {
    onSetFigureData({ ...figure, text: value });
  }, [debounce]);

  return (
    <CustomGroup {...{ x, y, onClickHandler, onDragEndHandler }}>
      <Rect
        stroke={stroke}
        fill={fill}
        width={width}
        height={height}
        ref={shapeRef}
        onTransformEnd={onTransformEndHandler}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          resizeEnabled
          enabledAnchors={anchors}
          boundBoxFunc={onBoundBoxHandler}
        />
      )}
      {isEditing && (
        <Html>
          <EditorCustom
            initValue={value}
            onUpdateHandler={handleInput}
            width={width}
          />
        </Html>
      )}
      <Html>
        <div
          id={id}
          dangerouslySetInnerHTML={{ __html: value }}
          style={{
            padding: '10px',
            maxWidth: width,
            wordBreak: 'break-all',
          }}
        />
      </Html>
    </CustomGroup>
  );
};
