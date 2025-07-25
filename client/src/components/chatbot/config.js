
import { createChatBotMessage } from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';

const config = {
  initialMessages: [
    createChatBotMessage(
      `Namaste voter!! I am your chatbot, your Digital Assistant Bot. Please use the buttons below or ask me a question. I will try my best to answer your queries.`
    ),
  ],
  customComponents: {
    header: () => (
      <div
        style={{
          backgroundColor: '#093F89',
          padding: '5px',
          borderRadius: '3px',
          color: '#fff',
        }}
      >
        Welcome
      </div>
    ),
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  state: {},
  widgets: [],
  actionProvider: ActionProvider,
  messageParser: MessageParser,
};

export default config;
