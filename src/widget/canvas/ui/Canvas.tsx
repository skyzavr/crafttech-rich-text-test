import { RefObject, useState } from 'react';
import { Layer, Stage } from 'react-konva';

import { Stage as stageType } from 'konva/lib/Stage';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';

import { Shape, figure } from '@features/shape';

type canvasProps = {
  tool: string;
  stageRef: RefObject<stageType>;
};

export const Canvas = ({ tool, stageRef }: canvasProps) => {
  const [figures, setFigures] = useState<figure[]>([]);
  const [selectedFigure, setSelectedFigure] = useState<string | null>(null);

  const createFigure = (stage: stageType): figure => {
    const point = stage.getPointerPosition() as Vector2d;
    const stageOffset = stage.absolutePosition();
    return {
      id: Date.now().toString(36),
      width: 100,
      height: 100,
      type: 'rect',
      fill: 'red',
      stroke: 'blue',
      x: point.x - stageOffset.x,
      y: point.y - stageOffset.y,
      html: '',
      text: '',
    };
  };

  const handleOnClick = (e: KonvaEventObject<MouseEvent>) => {
    if (e.target === stageRef.current) setSelectedFigure(null);
    if (tool === 'cursor') return;

    const stage = e.target.getStage() as stageType;
    setFigures((prev: figure[]) => [...prev, createFigure(stage)]);
  };

  const setSizeHandler = (figure: figure) => {
    const figuresList = figures.slice().map((el) => {
      if (el.id === figure.id) return { ...figure };
      return el;
    });
    setFigures([...figuresList]);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === 'cursor'}
      onClick={handleOnClick}
      ref={stageRef}
    >
      <Layer>
        {figures.map((figure: figure, i: number) => (
          <Shape
            key={i}
            figure={figure}
            tool={tool}
            isSelected={selectedFigure === figure.id}
            onSelect={() => setSelectedFigure(figure.id)}
            onSetFigureData={setSizeHandler}
          />
        ))}
      </Layer>
    </Stage>
  );
};
