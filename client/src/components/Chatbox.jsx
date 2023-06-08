import React, { useEffect, useState } from 'react';
import '../css/chatbox.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Chatbox = () => {
  const param = useParams();
  const token = localStorage.getItem('token');
  const UserId = localStorage.getItem('UserId');
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios
      .get(`http://localhost:9595/api/v1/chat/${param.id}`, {
        headers: {
          'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
          token: `${token}`,
        },
      })
      .then((response) => {
        setMessages(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();

    let data = {
      message: userMessage,
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://localhost:9595/api/v1/singleMessage/${param.id}`,
      headers: {
        'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
        token: `${token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setUserMessage(''); // Clear the input field after sending the message
        fetchMessages(); // Fetch updated messages after sending a new message
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="message-page">
      <div className="message-list">
        {messages.length > 0 ? messages.map((message, index) => (
          <div key={index} className="message-data w-100 d-flex gap-1">
            <img
              className="rounded-circle"
              src={message.profile}
              width={'35px'}
              height={'35px'}
              alt=""
            />
            <div className={`message ${message.user_id == UserId ? 'sent' : 'received'}`}>
              <div className="message-content">{message.message}</div>
              <small className="message-time d-flex justify-content-end">{message.created_at}</small>
            </div>
          </div>
        )) : 'No chat yet'}
      </div>
      <div className="message-reply">
        <form onSubmit={handleReplySubmit} method="post">
          <input
            type="text"
            name="reply"
            value={userMessage}
            onChange={(e) => {
              setUserMessage(e.target.value);
            }}
            placeholder="Type a message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
