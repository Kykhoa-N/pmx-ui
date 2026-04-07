import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, Typography, Paper, Stack, useTheme } from "@mui/material";
import { Send, Close } from "@mui/icons-material";

export const PricingAgentChat = ({ onClose }) => {
    const theme = useTheme();
    const [messages, setMessages] = useState([
        { type: 'bot', text: "I'm Ava, pricing agent. How can I help you?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSend = (text = inputValue) => {
        if (!text.trim()) return;

        const newMessages = [...messages, { type: 'user', text }];
        setMessages(newMessages);
        setInputValue('');

        setIsTyping(true);
        setTimeout(() => {
            setMessages([...newMessages, { 
                type: 'bot', 
                text: "Placeholder response! : )" 
            }]);
            setIsTyping(false);
        }, 1500);
    };

  return (
    <Paper elevation={10} sx={{
        position: 'fixed', 
        bottom: 20, 
        right: 20,
        width: 400, 
        height: 550, 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 4, 
        overflow: 'hidden', 
        bgcolor: '#f4f6f8',
        zIndex: 1
    }}>
        <Box sx={{ 
            p: 2, 
            bgcolor: theme.palette.primary.main, 
            color: theme.palette.chatbot.title, 
            display: 'flex', 
            alignItems: 'center' 
        }}>
            <Typography 
                variant="subtitle1" 
                sx={{ 
                    flex: 1, 
                    fontWeight: 'bold' 
                }}
            >
                Chat with Ava, Pricing Agent
            </Typography>
            <IconButton 
                size="small" 
                onClick={onClose} 
                sx={{ color: 'white' }}
            >
                <Close />
            </IconButton>
        </Box>

        <Stack spacing={2} sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            p: 2 
        }}>
            {messages.map((msg, i) => (
                <Box key={i} sx={{ alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <Paper sx={{
                        p: 1.5,
                        bgcolor: msg.type === 'user' ? theme.palette.primary.main : 'white',
                        color: msg.type === 'user' ? 'white' : 'text.primary',
                        borderRadius: msg.type === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0'
                    }}>
                        <Typography variant="body2">{msg.text}</Typography>
                    </Paper>
                </Box>
            ))}

            {isTyping && (
                <Box sx={{ 
                    alignSelf: 'flex-start', 
                    bgcolor: 'white', 
                    p: 1.5, 
                    borderRadius: '12px 12px 12px 0', 
                    boxShadow: 1 
                }}>
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            display: 'flex', 
                            gap: 0.5, 
                            color: 'text.secondary' 
                        }}
                    >
                        <span className="typing-dot">●</span>
                        <span className="typing-dot">●</span>
                        <span className="typing-dot">●</span>
                    </Typography>
                </Box>
            )}

            <div ref={messagesEndRef} />
        </Stack>

        <Box sx={{ 
            p: 2, 
            bgcolor: 'white', 
            borderTop: '1px solid #ddd', 
            display: 'flex', 
            gap: 1 
        }}>
            <TextField
                fullWidth size="small"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <IconButton 
                color="primary" 
                onClick={() => handleSend()} 
                disabled={!inputValue.trim()}
            >
                <Send />
            </IconButton>
        </Box>
    </Paper>
  );
};
export default PricingAgentChat;
