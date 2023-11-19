import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    CircularProgress,
  } from '@mui/material';
  import React, { useState } from 'react';
  import { Configuration, OpenAIApi } from 'openai';
  
  function ChatGptInterface() {
    const [inputValuesWithAnswers, setInputValuesWithAnswers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
  
    const sendData = async () => {
      setLoading(true);
    
      try {
        const response = await fetch('http://localhost:5000/ask', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: inputValue }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        var answer = data.answer;
    
        setInputValuesWithAnswers([
          ...inputValuesWithAnswers,
          { input: inputValue, answer },
        ]);
      } catch (error) {
        console.error('Error during fetching:', error);
      } finally {
        setInputValue('');
        setLoading(false);
      }
    };
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    return (
      <Box
        display="flex"
        flexDirection="column"
        width="96%"
        marginLeft="1%"
        borderRadius={2}
        backgroundColor="#F2F9FE"
        marginTop={1}
        p={2}
        height="90vh"
      >
        <Typography sx={{ fontSize: '30px' }}>
        Macroeconomic Researcher and Large Language Chat GPT Dashboard
        </Typography>
        <div className="body" style={{ minHeight: '87%', overflowY: 'auto' }}>
          <div className="scrolled-body">
            {inputValuesWithAnswers.map((inputValueWithAnswer, index) => (
              <Box>
                <Typography
                  sx={{
                    textAlign: 'left',
                    p: 1,
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginTop: '1%',
                  }}
                >
                  {inputValueWithAnswer.input}
                </Typography>
                <Typography
                  sx={{
                    textAlign: 'left',
                    p: 1,
                    backgroundColor: '#DAEEFC',
                    borderRadius: '10px',
                  }}
                >
                  {inputValueWithAnswer.answer}
                </Typography>
              </Box>
            ))}
          </div>
        </div>
        <Box display="flex">
          <TextField
            sx={{ width: '94%' }}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            variant="outlined"
            sx={{ marginLeft: '0.5%' }}
            onClick={sendData}
          >
            Send
          </Button>
          {loading && <CircularProgress sx={{ marginLeft: '0.5%' }} />}
        </Box>
      </Box>
    );
  }
  
  export default ChatGptInterface;
  