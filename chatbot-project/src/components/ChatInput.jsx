import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css'

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {

    const newChatMessages=[
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(chatMessages);

    const response=Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setInputText('');
  }

  function handleKeyDown(event){
    if(event.key==='Enter'){
      sendMessage();
    }else if(event.key==='Escape'){
      setInputText('');
    }
  }

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Send a message to ChatBot"
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chatInput"
      />
      <button onClick={sendMessage} className="send-button">Send</button>
    </div>
  );
}