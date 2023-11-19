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
      const configuration = new Configuration({
        organization: '',
        apiKey: '',
      });
      const openai = new OpenAIApi(configuration);
  
      const response = await openai.createCompletion({
        model: '',
        prompt: inputValue + '->',
        temperature: 1,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      var answer = response.data.choices[0].text;
  
      setInputValuesWithAnswers([
        ...inputValuesWithAnswers,
        { input: inputValue, answer },
      ]);
      setInputValue('');
      setLoading(false);
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
          ChatGpt - chatbot
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
  