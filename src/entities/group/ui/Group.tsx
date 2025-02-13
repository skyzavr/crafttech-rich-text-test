import { KonvaEventObject } from 'konva/lib/Node';
import { ReactNode } from 'react';
import { Group } from 'react-konva';

type groupProps = {
  children: ReactNode;
  x: number;
  y: number;
  onClickHandler: () => void;
  onDragEndHandler: (e: KonvaEventObject<DragEvent>) => void;
};

export const CustomGroup = (props: groupProps) => {
  const { children, x, y, onClickHandler, onDragEndHandler } = props;
  return (
    <Group
      x={x}
      y={y}
      onClick={onClickHandler}
      draggable
      onDragEnd={onDragEndHandler}
    >
      {children}
    </Group>
  );
};
