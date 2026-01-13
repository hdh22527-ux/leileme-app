export default async function handler(req, res) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "你是一位精通CBT的心理顾问..." },
        { role: "user", content: req.body.message }
      ]
    })
  });
  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
