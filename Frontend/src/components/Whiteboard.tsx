// /frontend/src/components/Whiteboard.tsx
import React, { useState, useEffect } from 'react';
import DrawingBoard from './DrawingBoard'; // Assuming you are importing the drawing board component

const Whiteboard: React.FC = () => {
  const [lines, setLines] = useState<{ points: number[] }[]>([]);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Set up the WebSocket connection for real-time drawing
    const ws = new WebSocket('ws://localhost:5000'); // Update with your backend WebSocket URL
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLines((prevLines) => [...prevLines, { points: data.points }]);
    };
    setSocket(ws);

    // Clean up WebSocket on component unmount
    return () => {
      if (ws) ws.close();
    };
  }, []);

  const handleClear = () => {
    setLines([]); // Clear all the lines on the board
    if (socket) {
      socket.send(JSON.stringify({ action: 'clear' })); // Send clear action to the server
    }
  };

  return (
    <div>
      <button onClick={handleClear}>Clear Board</button>
      <DrawingBoard
        lines={lines}
        setLines={setLines}
        drawing={drawing}
        setDrawing={setDrawing}
        socket={socket!} // Non-null assertion because socket is guaranteed to be set in useEffect
      />
    </div>
  );
};

export default Whiteboard;
