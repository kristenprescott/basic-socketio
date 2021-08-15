import React, { useRef, useState, useEffect } from "react";
import { Paper, TextField, Button, makeStyles } from "@material-ui/core";

import useChatRoom from "../hooks/useChatRoom";
import clsx from "clsx";

const Room = () => {
  const { messages, sendMessage } = useChatRoom();
  const [newMessage, setNewMessage] = useState("");
  const classes = useStyles();
  const messageRef = useRef();

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage !== "") {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  // extra code to send the message as you press the enter key.
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      if (newMessage !== "") {
        sendMessage(newMessage);
        setNewMessage("");
      }
    }
  };

  // allow scrolling to the bottom of the container when a new message arrived.
  useEffect(() => messageRef.current.scrollIntoView({ behavior: "smooth" }));

  return (
    <div className={classes.container}>
      <Paper elevation={5} className={classes.paper}>
        <div className={classes.messageContainer}>
          <ol className={classes.ol}>
            {messages.map((message, i) => (
              <li
                key={i}
                className={clsx(
                  classes.message,
                  message.isOwner ? classes.owner : classes.guest
                )}
              >
                <span
                  className={clsx(
                    message.isOwner ? classes.sender : classes.sendee
                  )}
                  style={{ fontWeight: "bolder" }}
                >
                  {message.senderId}
                </span>
                : &nbsp;
                <span>{message.body}</span>
              </li>
            ))}
          </ol>
          <div ref={messageRef}></div>
        </div>
        <div className={classes.action}>
          <TextField
            className={classes.messageInput}
            id="message"
            label="Message"
            placeholder="enter message here"
            variant="outlined"
            value={newMessage}
            onChange={handleNewMessageChange}
            onKeyUp={handleKeyUp}
          />
          <Button
            disabled={!newMessage}
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            className={classes.sendButton}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Room;

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    // backgroundColor: "#263238",
    backgroundColor: "#282c34",
  },
  paper: {
    width: "50em",
    height: "80%",
    position: "relative",
  },
  action: {
    display: "flex",
    width: "96%",
    alignItems: "center",
    margin: "1em",
    position: "absolute",
    bottom: 0,
  },
  sendButton: {
    width: "10em",
    height: "50%",
    margin: "0 2em",
  },
  messageInput: {
    width: "100%",
  },
  messageContainer: {
    overflowY: "auto",
    height: "85%",
  },
  divider: {
    margin: "0.1em",
  },
  message: {
    listStyle: "none",
  },
  owner: {
    // margin: "1em",
    // backgroundColor: "#0091EA",
    padding: "0.5em 0em",
    // borderRadius: "20px",
    // color: "#fff",
    color: "#000",
    wordBreak: "break-word",
    maxWidth: "65%",
    width: "fit-content",
    marginRight: "auto",
  },
  guest: {
    // margin: "1em",
    // backgroundColor: "#8BC34A",
    padding: "0.5em 0em",
    // borderRadius: "20px",
    // color: "#fff",
    color: "#000",
    wordBreak: "break-word",
    maxWidth: "65%",
    width: "fit-content",
    marginLeft: "auto",
  },
  sender: {
    color: "red",
  },
  sendee: {
    color: "blue",
  },
  ol: {
    paddingInlineEnd: "40px",
  },
});
