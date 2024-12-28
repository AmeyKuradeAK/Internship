// /frontend/src/components/DrawingBoard.tsx
import React from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Konva from 'konva';

interface DrawingBoardProps {
  lines: { points: number[] }[];
  setLines: React.Dispatch<React.SetStateAction<{ points: number[] }[]>>;
  drawing: boolean;
  setDrawing: React.Dispatch<React.SetStateAction<boolean>>;
  socket: WebSocket;
}

const DrawingBoard: React.FC<DrawingBoardProps> = ({
  lines,
  setLines,
  drawing,
  setDrawing,
  socket,
}) => {
  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setDrawing(true);
    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (pos) {
      setLines([...lines, { points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!drawing) return;
    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (pos) {
      const newLines = [...lines];
      newLines[newLines.length - 1].points = newLines[newLines.length - 1].points.concat([pos.x, pos.y]);
      setLines(newLines);
      // Send the drawing data to the server for real-time collaboration
      socket.send(JSON.stringify({ points: newLines[newLines.length - 1].points }));
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <Stage
      width={window.innerWidth}   // Ensure the stage width is full screen
      height={window.innerHeight} // Ensure the stage height is full screen
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ border: '1px solid black', color: 'white' }}  // Optional: add border to see stage edges
    >
      <Layer>
        {lines.map((line, index) => (
          <Line
            key={index}
            points={line.points}
            stroke="white"
            strokeWidth={5}
            lineCap="round"
            lineJoin="round"
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default DrawingBoard;
