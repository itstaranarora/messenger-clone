import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Input, IconButton } from "@material-ui/core";
import Message from "./Message";
import FlipMove from "react-flip-move";
import db from "./firebase";
import SendIcon from "@material-ui/icons/Send";
import TelegramIcon from "@material-ui/icons/Telegram";
import firebase from "firebase";

function App() {
  const [message, setMessage] = useState([]);
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessage(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Enter your username: "));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <div className="App__header">
        <h1>
          {" "}
          <TelegramIcon /> Messanger
        </h1>
        <h2>{username}</h2>
      </div>
      <FlipMove>
        {message.map(({ id, data }) => (
          <Message key={id} username={username} text={data} />
        ))}
      </FlipMove>
      <form className="app__form" onSubmit={sendMessage}>
        <FormControl className="app_formControl">
          <Input
            value={input}
            className="app__input"
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            className="app__button"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
