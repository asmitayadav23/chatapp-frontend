import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import AdminLayout from "../../components/layout/AdminLayout";

const AdminChatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "admin", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("https://chatapp-server-06i5.onrender.com/api/v1/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: "admin",
          chatId: "admin-chat",
          message: input,
        }),
      });

      const data = await res.json();
      const botReply = { sender: "bot", content: data.message };
      setMessages((prev) => [...prev, botReply]);
      setInput("");
    } catch (error) {
      console.error("Failed to fetch response:", error);
    }
  };

  return (
    <AdminLayout>
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          margin: "2rem auto",
          borderRadius: "1rem",
          background: "#f9f9f9",
          maxWidth: "700px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Admin Chatbot
        </Typography>

        <Box
          sx={{
            height: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            background: "#fff",
            borderRadius: "0.5rem",
          }}
        >
          {messages.map((msg, i) => (
            <Typography key={i} sx={{ mb: 1 }}>
              <b>{msg.sender}:</b> {msg.content}
            </Typography>
          ))}
        </Box>

        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Paper>
    </AdminLayout>
  );
};

export default AdminChatbot;
