import React, { forwardRef } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Message.css";

const Message = forwardRef(({ text, username }, ref) => {
  const isUser = username === text.username;
  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {!isUser && `${text.username || "Unknown User"}: `} {text.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
