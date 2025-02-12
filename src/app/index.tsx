import { useRef, useState } from 'react';

import { Canvas } from '@widget/canvas';
import { Control } from '@widget/control';

export const App = () => {
  const [tool, setTool] = useState('cursor');
  const stageRef = useRef(null);

  return (
    <main>
      <Canvas tool={tool} stageRef={stageRef} />
      <Control tool={tool} setTool={setTool} />
    </main>
  );
};
