import { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

// this is the same event name as our server. This will allow communication between the server and client possible.
const NEW_MESSAGE_EVENT = "new-message-event";
const SOCKET_SERVER_URL = "http://localhost:3030";

const useChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // create new client w our server url
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // listen for incoming message
    socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        isOwner: message.senderId === socketRef.current.id,
      };
      // send new message to the others in same room
      setMessages((messages) => [...messages, incomingMessage]);
      console.log(incomingMessage);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // send the messageee along w a sender id - the sender id wouold allow us to style the UI
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChatRoom;
