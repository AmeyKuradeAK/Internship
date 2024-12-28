// /whiteboard/utils/socket.ts
export const initializeSocket = (url: string) => {
    const socket = new WebSocket(url);
  
    socket.onopen = () => {
      console.log('WebSocket connection established');
    };
  
    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
      // Here, you can add logic to update the drawing in real-time if you receive data from the server
    };
  
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  
    return socket;
  };
  