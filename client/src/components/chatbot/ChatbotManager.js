

class ChatbotManager {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchQuestions() {
    const response = await fetch(`${this.baseUrl}/questions`);
    if (!response.ok) throw new Error('Failed to fetch questions');
    return response.json();
  }

  async addQuestion(data) {
    const response = await fetch(`${this.baseUrl}/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to add question');
    return response.json();
  }

  async updateQuestion(id, data) {
    const response = await fetch(`${this.baseUrl}/questions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update question');
    return response.json();
  }

  async deleteQuestion(id) {
    const response = await fetch(`${this.baseUrl}/questions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete question');
    return response.json();
  }
}

export default ChatbotManager;