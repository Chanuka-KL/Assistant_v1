import OpenAI from 'openai';

export default async function handler(req, res) {
  const { message } = req.body;
  const openai = new OpenAI({
    apiKey: process.env.GITHUB_TOKEN,
    baseURL: 'https://models.inference.ai.azure.com',
  });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
      temperature: 1,
    });

    res.status(200).json({ reply: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Chat request failed' });
  }
}