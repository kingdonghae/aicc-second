export const fetchGPTResponse = async (userMessage) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${error}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '응답이 없습니다.';
  } catch (error) {
    console.error('GPT 요청 중 오류 발생:', error);
    return 'GPT 응답을 가져오는 중 오류가 발생했습니다.';
  }
};