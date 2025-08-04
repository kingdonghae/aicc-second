export const fetchGPTResponse = async (prompt) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  if (!apiKey) {
    console.error('OpenAI API 키가 설정되어 있지 않습니다.');
    return 'API 키가 누락되었습니다. 관리자에게 문의하세요.';
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: prompt },
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 오류 (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;

    return message?.trim() || 'GPT로부터 유효한 응답을 받지 못했습니다.';
  } catch (error) {
    console.error('GPT 요청 중 오류:', error.message || error);
    return 'GPT 응답을 가져오는 중 문제가 발생했습니다.';
  }
};
