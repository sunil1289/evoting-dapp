class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleMessage = (message) => {
    const lower = message.toLowerCase();
    const faq = JSON.parse(localStorage.getItem('faq')) || [];

    const match = faq.find((item) =>
      lower.includes(item.question.toLowerCase())
    );

    const response = match
      ? match.answer
      : "I'm sorry, I don't have an answer for that.";

    const botMessage = this.createChatBotMessage(response);

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
}

export default ActionProvider;